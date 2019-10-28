'use strict';

const draw_tree = require('asciitree')

Array.prototype.flatMap = function (lambda) {
  return Array.prototype.concat.apply([], this.map(lambda));
};

function intersection(setA, setB) {
  const _intersection = new Set();
  const _setA = new Set(setA)
  const _setB = new Set(setB)
  for (const elem of _setB) {
    if (_setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

function difference(setA, setB) {
  const _difference = new Set(setA);
  const _setA = new Set(setA)
  const _setB = new Set(setB)
  for (const elem of _setB) {
    _difference.delete(elem);
  }
  return _difference;
}

function is_superset(set, subset) {
  const _set = new Set(set)
  for (const elem of subset) {
    if (!_set.has(elem)) {
      return false;
    }
  }
  return true;
}

function union(setA, setB) {
  const _union = new Set(setA);
  const _setA = new Set(setA)
  const _setB = new Set(setB)
  for (const elem of _setB) {
    _union.add(elem);
  }
  return _union;
}


class Atom {
  constructor(name, variables) {
    this.name = name
    this.variables = variables
  }

  toString() {
    return `${this.name}(${this.variables.join(', ')})`
  }

}


class Node {

  constructor(variable, child_nodes, key_set, anc) {
    this._variable = variable
    this.child_nodes = child_nodes
    this.key_set = key_set
    this.anc = anc
  }

  /*
   * return a list of variable orders
   * create a new copy of the node as long as itself or its decedents are modified
   */
  add_node(variable, query) {

    // if the current node is empty, add to the current node
    if (!this._variable) {
      // root node
      return [new Node(variable, this.child_nodes, this.key_set, this.anc)]
    }

    let resulted_variable_orders = []

    // add to child nodes
    const res = this.child_nodes.flatMap((child_node, i) => {
      const other_child_nodes = this.child_nodes.filter(n => n._variable != child_node._variable)

      return child_node.add_node(variable, query).map(new_child_node => {
        const self = new Node(
          this._variable,
          [...other_child_nodes, new_child_node],
          this.key_set,
          this.anc,
        ) // a copy of the current node with out the changed new_child_node
        // self.child_nodes.push(new_child_node)
        return self
      })
    })
    resulted_variable_orders = resulted_variable_orders.concat(res)


    // add as the child node of the current node
    resulted_variable_orders.push(
      new Node(this._variable,
        [...this.child_nodes, new Node(variable, [], intersection([...this.anc, this._variable], query.dep[variable]), [...this.anc, this._variable])],
        this.key_set, this.anc)
    )

    return resulted_variable_orders

  }

  path_to_variable(target_variable) {
    if (this._variable == target_variable)
      return {
        found: true,
        path: [this]
      }
    if (this.child_nodes.length == 0)
      return {
        found: false
      }

    for (let i = 0; i < this.child_nodes.length; i++) {
      const {found, path} = this.child_nodes[i].path_to_variable(target_variable)
      if (found)
        return {
          found,
          path: [this, ...path],
        }
    }

    return {
      found: false
    }
  }

  contains_variables(variables) {
    if (variables.includes(this._variable))
      return true

    return this.child_nodes.some(child_node => child_node.contains_variables(variables))
  }

  rho_star(query, key_set) {
    const subsets = (arr) => arr.reduce(
        (subsets, value) => subsets.concat(
          subsets.map(set => [value,...set])
        ),
        [[]]
      );
    const cover_sets = subsets(query.atoms.map(atom => atom.variables))
    const valid_cover_sets = cover_sets.filter(cover_set => is_superset(new Set(cover_set.flatMap(s => s)), key_set))
    console.assert(valid_cover_sets.length > 0)
    return Math.min(...valid_cover_sets.map(s => s.length))
  }

  static_width(query) {
    return Math.max(this.rho_star(query, this.key_set), ...this.child_nodes.map(child_node => child_node.static_width(query)))
  }

  delta_width(query) {
    return Math.max(...query.atoms.map(atom => this.delta_width_helper(query, atom)))
  }
  delta_width_helper(query, atom) {
    return Math.max(this.rho_star(query, difference(this.key_set, atom.variables)), ...this.child_nodes.map(child_node => child_node.delta_width_helper(query, atom)))
  }
}

class Query {
  constructor(name, free_variables, atoms) {
    this.name = name
    this.free_variables = free_variables
    this.atoms = atoms
    this.variables = this.get_variables()

    this.dep = {} // dependent set
    this.variables.forEach(v => {
      this.dep[v] = this.atoms.filter(atom => atom.variables.includes(v)).flatMap(atom => atom.variables)
    })
  }

  get_variables() {
    const _variables = new Set([])
    this.atoms.forEach(atom => atom.variables.forEach(variable => {
      _variables.add(variable)
    }))
    return [..._variables]
  }

  get_free_top_variable_orders() {
    // DFS ..
    const init_state = {
      variable_order: new Node(null, [], new Set(), []),
      remaining_variables: this.get_variables(),
    }

    const constructed_variable_orders = []

    let frontier = [init_state]
    while (frontier.length > 0) {

      const state = frontier.pop()
      if (state.remaining_variables.length == 0) {
        constructed_variable_orders.push(state.variable_order)
        continue
      }
      frontier = frontier.concat(this.expand(state))
    }

    return constructed_variable_orders
  }

  widths() {
    const free_top_variable_orders = this.get_free_top_variable_orders()
    const delta_widths = free_top_variable_orders.map(vo => vo.delta_width(this))
    const static_widths = free_top_variable_orders.map(vo => vo.static_width(this))

    const target_delta_width = Math.min(...delta_widths)
    const target_static_width = Math.min(...static_widths)

    for (let i = 0; i < free_top_variable_orders.length; i++) {
      if (delta_widths[i] == target_delta_width && static_widths[i] == target_static_width) {
        return {
          delta_width: delta_widths[i],
          static_width: static_widths[i],
          variable_order: free_top_variable_orders[i],
        }
      }
    }
    console.assert(false, 'Should not reach here')
  }

  /*
   * expand the state
   */
  expand(state) {
    const {variable_order, remaining_variables} = state
    if (remaining_variables.length == 0) {
      return []
    }

    const free_remaining_variables = remaining_variables.filter(v => this.free_variables.has(v))
    const target_variables = free_remaining_variables.length == 0 ? remaining_variables : free_remaining_variables

    const res = target_variables.flatMap(v => {

      const result_variable_orders = variable_order.add_node(v, this)
        .filter(vo => {
        // check whether the position is ok
        const {_, path} = vo.path_to_variable(v)
        for (let i = 0; i < path.length - 1; i++) {
          const node = path[i]
          const next_node = path[i+1]
          const found_incorrect = node.child_nodes.filter(child_node => child_node._variable != next_node._variable)
            .some(child_node => child_node.contains_variables(this.dep[v]))
          if (found_incorrect)
            return false
        }
        return true
      })

      return result_variable_orders.map(vo => {
        return {
          variable_order: vo,
          remaining_variables: remaining_variables.filter(_v => _v != v) // remaining_variables - v
        }
      })
    })

    return res
  }

  set_difference(set1, set2) {
    return new Set([...set1].filter(x => !set2.has(x)));
  }

}

const R = new Atom('R', ['A', 'B', 'D'])
const S = new Atom('S', ['A', 'B', 'E'])
const T = new Atom('T', ['A', 'C', 'F'])
const U = new Atom('U', ['A', 'C', 'G'])

const Q = new Query('Q', new Set(['A', 'C', 'D', 'E', 'F', 'G']), [R, S, T, U])

const widths = Q.widths()
console.log('static width: ', widths.static_width)
console.log('delta width: ', widths.delta_width)
console.log(draw_tree(widths.variable_order, node => `${node._variable} {${[...node.key_set]}}`, node => node.child_nodes))

// const trees = Q.get_free_top_variable_orders()
// trees.forEach(tree => {
//   console.log(draw_tree(tree, node => `${node._variable} {${[...node.key_set]}}`, node => node.child_nodes))
//   console.log('static width:', tree.static_width(Q))
//   console.log('dynamic width:', tree.delta_width(Q))
//   console.log('')
// })
// console.log("Total number: ", trees.length)


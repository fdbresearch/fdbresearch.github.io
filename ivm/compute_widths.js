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

  get_static_width() {
    return Math.max(this.key_set.length, Math.max(this.child_nodes.map(child_node => child_node.get_static_width())))
  }

  get_delta_width() {

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

  get_delta_width() {
    const free_top_variable_orders = this.get_free_top_variable_orders()


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

const Q = new Query('Q', new Set(['E', 'F']), [R, S, T, U])

const trees = Q.get_free_top_variable_orders()


trees.forEach(tree => {
  console.log(draw_tree(tree, node => `${node._variable} {${[...node.key_set]}}`, node => node.child_nodes))
  console.log('')
})

console.log("Total number: ", trees.length)


'use strict';

// const draw_tree = require('asciitree')

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

const subsets = (arr) => arr.reduce(
  (subsets, value) => subsets.concat(
    subsets.map(set => [value,...set])
  ),
  [[]]
);


class Atom {
  constructor(name, variables) {
    this.name = name
    this.variables = variables
  }

  toString() {
    return `${this.name}(${this.variables.join(',')})`
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
   * return the canonical variable order after adding the variable
   */
  add_canonical_node(variable, query) {

    if (!this._variable) {
      this._variable = variable
      return
    }

    const target_child_node = this.child_nodes.find(child_node => query.dominate_sets[child_node._variable].includes(variable))

    if (target_child_node == null) {
      // append to the current variable
      this.child_nodes.push(new Node(variable, [], [], [...this.anc, this._variable]))
    } else {
      // append to the target child node
      target_child_node.add_canonical_node(variable, query)
    }
  }

  /*
   * return the list of possible free variable sets
   */
  get_target_free_variable_sets(query) {
    if (!query.free_variables.has(this._variable)) // this is bound
      return [{
        anchor_bound_variable: this._variable,
        variables: this.get_descendant_free_variables(query)
      }]

    // this is free
    return this.child_nodes.filter(child_node => query.variables.includes(child_node._variable))
      .flatMap(child_node => child_node.get_target_free_variable_sets(query))
  }

  get_descendant_free_variables(query) {
    if (query.free_variables.has(this._variable))
      return [this._variable].concat(this.child_nodes.flatMap(child_node => child_node.get_descendant_free_variables(query)))
    else
      return this.child_nodes.flatMap(child_node => child_node.get_descendant_free_variables(query))
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

  rho_star(atoms, key_set) {

    const cover_sets = subsets(atoms.map(atom => atom.variables))
    const valid_cover_sets = cover_sets.filter(cover_set => is_superset(new Set(cover_set.flatMap(s => s)), key_set))
    console.assert(valid_cover_sets.length >= 0)
    return Math.min(...valid_cover_sets.map(s => s.length))
  }

  static_width(query) {
    return Math.max(this.rho_star(query.atoms, this.key_set), ...this.child_nodes.map(child_node => child_node.static_width(query)))
  }

  delta_width(query) {
    const res = Math.max(this.delta_width_of_this_node(query), ...this.child_nodes.map(child_node => child_node.delta_width(query)))
    return res
  }

  delta_width_of_this_node(query) {
    const res = Math.max(...query.atoms_of_variables[this._variable].map(atom => this.rho_star(query.atoms, difference(this.key_set, atom.variables))))
    // console.log(this._variable, res)
    return res
  }

  toString() {
    return `${this._variable}`
  }
}

class TopoNode {
  constructor(variable, children, parents) {
    this._variable = variable
    this.children = children
    this.parents = parents
  }
}

class Query {
  constructor(name, free_variables, atoms) {
    this.name = name
    this.free_variables = free_variables
    this.atoms = atoms
    this.variables = this.get_variables()

    this.atoms_of_variables = {}
    this.variables.forEach(v => {
      this.atoms_of_variables[v] = this.atoms.filter(atom => atom.variables.includes(v))
    })

    this.dep = {} // dependent set
    this.variables.forEach(v => {
      this.dep[v] = [...new Set(this.atoms_of_variables[v].flatMap(atom => atom.variables))]
    })
  }

  toString() {
    return `${this.name}(${[...this.free_variables].join(',')}) = ${this.atoms.map(atom => atom.toString()).join(',')}`
  }

  get_variables() {
    const _variables = new Set([])
    this.atoms.forEach(atom => atom.variables.forEach(variable => {
      _variables.add(variable)
    }))
    return [..._variables]
  }

  is_hierarchical() {
    const topo_nodes = this.variables.map(v => new TopoNode(v, [], []))
    return subsets(topo_nodes).filter(nodes => nodes.length == 2).every(([n1, n2]) => {
      // any two topo nodes
      const atoms1 = this.atoms_of_variables[n1._variable].map(atom => atom.name)
      const atoms2 = this.atoms_of_variables[n2._variable].map(atom => atom.name)

      // is it hierarchical?
      return is_superset(atoms1, atoms2) || is_superset(atoms2, atoms1) || intersection(atoms1, atoms2).size == 0
    })
  }

  get_canonical_variable_order() {

    this.dominate_sets = {}
    this.variables.forEach(v => {
      this.dominate_sets[v] = []
    })

    // construct topological DAG
    const topo_nodes = this.variables.map(v => new TopoNode(v, [], []))
    subsets(topo_nodes).filter(nodes => nodes.length == 2).forEach(([n1, n2]) => {
      // any two topo nodes
      const atoms1 = this.atoms_of_variables[n1._variable].map(atom => atom.name)
      const atoms2 = this.atoms_of_variables[n2._variable].map(atom => atom.name)

      if (intersection(atoms1, atoms2).size == 0)
        return

      if (is_superset(atoms1, atoms2)) {
        n1.children.push(n2)
        n2.parents.push(n1)
      } else {
        n2.children.push(n1)
        n1.parents.push(n2)
      }

      // construct the dominate sets
      if (is_superset(atoms1, atoms2)) {
        this.dominate_sets[n1._variable].push(n2._variable)
      }
      if (is_superset(atoms2, atoms1)) {
        this.dominate_sets[n2._variable].push(n1._variable)
      }

    })

    // topological sorting: Kahn's algorithm
    let frontier = topo_nodes.filter(topo_node => topo_node.parents.length == 0)
    console.assert(frontier.length == 1, "Only one connected components")

    const canonical_variable_order = new Node(null, [], new Set([]), [])

    while (frontier.length > 0) {
      const n = frontier.pop()
      canonical_variable_order.add_canonical_node(n._variable, this)

      topo_nodes.forEach(m => {
        if (n.children.map(c => c._variable).includes(m._variable)) {
          // remove the edge
          n.children = n.children.filter(c => c._variable != m._variable)
          m.parents = m.parents.filter(p => p._variable != n._variable)

          if (m.parents.length == 0)
            frontier.push(m)
        }
      })

    }

    // append atoms
    this.atoms.forEach(atom => {
      atom.variables.forEach(v => {
        this.dominate_sets[v].push(atom)
      })

      canonical_variable_order.add_canonical_node(atom, this)
    })

    return canonical_variable_order
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

    const canonical_variable_order = this.get_canonical_variable_order()
    // console.log(canonical_variable_order.get_target_free_variable_sets(this))
    const target_free_variable_sets = canonical_variable_order.get_target_free_variable_sets(this)

    const rho_star = new Node().rho_star

    // const valid_atom_combinations =
    const static_width = Math.max(1, ...target_free_variable_sets.map(target_free_variable_set => rho_star(this.atoms, target_free_variable_set.variables)))

    // const delta_width =


    const delta_width = Math.max(...target_free_variable_sets.map(target_free_variable_set => {
      const related_atoms = this.atoms.filter(atom => atom.variables.includes(target_free_variable_set.anchor_bound_variable))
      return Math.max(...related_atoms.map(atom => {
        const other_atoms = related_atoms.filter(a => a.name != atom.name)
        return rho_star(other_atoms, difference(target_free_variable_set.variables, atom.variables))
      }))
    }))

    return {
      delta_width,
      static_width,
      variable_order: draw_tree(this.get_canonical_variable_order(), node => (this.free_variables.has(node.toString()) ? `(${node})` : `${node}`), node => node.child_nodes),
    }
  }

  widths_exhausted() {
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
          variable_order: draw_tree(free_top_variable_orders[i], node => `${node._variable} {${[...node.key_set]}}`, node => node.child_nodes),
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

// const R = new Atom('R', ['A', 'B', 'D'])
// const S = new Atom('S', ['A', 'B', 'E'])
// const T = new Atom('T', ['A', 'C', 'F'])
// const U = new Atom('U', ['A', 'C', 'G'])
// const V = new Atom('V', ['A', 'C'])
//
// const Q = new Query('Q', new Set(['A', 'C', 'D', 'E', 'F']), [R, S, T, U, V])
//
// console.log(Q.is_hierarchical())
// // console.log(draw_tree(Q.get_canonical_variable_order(), node => `${node}`, node => node.child_nodes))
//
// const widths = Q.widths()
// console.log('static width: ', widths.static_width)
// console.log('delta width: ', widths.delta_width)
// console.log(widths.variable_order)

// const trees = Q.get_free_top_variable_orders()
// trees.forEach(tree => {
//   console.log(draw_tree(tree, node => `${node._variable} {${[...node.key_set]}}`, node => node.child_nodes))
//   console.log('static width:', tree.static_width(Q))
//   console.log('dynamic width:', tree.delta_width(Q))
//   console.log('')
// })
// console.log("Total number: ", trees.length)

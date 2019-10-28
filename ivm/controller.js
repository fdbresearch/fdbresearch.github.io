const R = new Atom('R', ['A', 'B'])
const S = new Atom('S', ['B'])

const Q = new Query('Q', new Set(['A']), [R, S])

var app = new Vue({
  el: '#app',
  data: {
    Q,
    query_text: "Q(A) = R(A, B), S(B)",
    widths: Q.widths(),
    computing: false,
  },
  methods: {
    get_widths: function(new_query_text) {
    //  TODO: parse
      this.computing = true

      let [query_part, atom_part] = new_query_text.replace(/\s/g, '').split('=')

      const query_name = query_part.split('(')[0]
      const free_variables = query_part.split('(')[1].replace(')', '').split(',')

      const atoms = atom_part.split('),').map(atom_text => {

        const atom_name = atom_text.split('(')[0]
        const variables = atom_text.split('(')[1].replace(')', '').split(',')

        return new Atom(atom_name, variables)
      })

      const query = new Query(query_name, new Set(free_variables), atoms)

      console.log("Query text parsed")
      console.log(query)

      this.widths = query.widths()
      this.Q = query

      this.computing = false
    }
  }
})
$(document).on('ready', function () {
var app = new Vue({
  el: '#app',
  data: {
    Q: null,
    query_text: "Q(A,C) = R(A, B),S(B,C)",
    widths: {
    },
    computing: false,
    chart: null,
    epsilon: null,
    preprocessing: null,
    update: null,
    delay: null,
    error_message: "",
    incorrect_query: false,
    sample_queries: ['Q(A,C) = R(A, B),S(B,C)', 'Q(A,B,C) = R(A, B),S(B,C)', 'Q(A) = R(A, B), S(B)', 'Q(B) = R(A, B), S(B)',
    'Q(A, D, E) = R(A, B,C),S(A, B, D),T(A, E)',
    'Q(C, D, E, F) = R(A, B, D),S(A, B, E),T(A,C, F),U (A,C,G)',
    'Q(A, C, D, E, F) = R(A, B, D),S(A, B, E),T(A,C, F),U (A,C,G)',
    'Q(A, B, C, D, E, F) = R(A, B, D),S(A, B, E),T(A,C, F),U (A,C,G)'],
    window_width: window.innerWidth
  },
  mounted: function() {
    this.get_widths(this.query_text)
    this.refresh_plot()

    const self = this
    window.addEventListener("resize", function(e) {

      this.console.log(self.window_width, window.innerWidth)
      if (self.window_width < 550 && window.innerWidth >= 550) {
        self.window_width = window.innerWidth
        self.refresh_plot()
      }
      if (self.window_width >= 550 && window.innerWidth < 550) {
        self.window_width = window.innerWidth
        self.refresh_plot()
      }
      self.window_width = window.innerWidth
    });
  },
  watch: {
  },
  methods: {
    clear_target_values: function() {
      this.epsilon = null
      this.preprocessing = null
      this.update = null
      this.delay = null
    },
    get_precision: function(a) {
      var e = 1;
      while (Math.round(a * e) / e !== a) e *= 10;
      return Math.log(e) / Math.LN10;
    },
    epsilon_handler: function(new_epsilon) {
      if (new_epsilon === "" || new_epsilon === null) {
        this.clear_target_values()
        return 
      }
      new_epsilon = parseFloat(new_epsilon).toPrecision(3)
      if (new_epsilon < 0 || new_epsilon > 1) {
        this.error_message = "Invalid input or the target values cannot be achieved."
        this.clear_target_values()
        this.epsilon = new_epsilon
        return
      }
      const {static_width, delta_width} = this.widths
      this.preprocessing = (1 + (static_width-1) * new_epsilon).toPrecision(3)
      this.update = (delta_width * new_epsilon).toPrecision(3)
      this.delay = (1 - new_epsilon).toPrecision(3)
      this.error_message = ""
    },
    preprocessing_handler: function(new_preprocessing) {
      console.log(new_preprocessing)
      if (new_preprocessing === "" || new_preprocessing === null) {
        this.clear_target_values()
        return 
      }
      
      const parsed_new_preprocessing = parseFloat(new_preprocessing).toPrecision(2)
      console.log(parsed_new_preprocessing)
      if (parsed_new_preprocessing < 1) {
        this.error_message = "Invalid input or the target values cannot be achieved."
        this.clear_target_values()
        this.preprocessing = new_preprocessing
        return
      }
      console.log(parsed_new_preprocessing)
      const {static_width, delta_width} = this.widths
      if (static_width == 1) {
        return
      }
      this.epsilon = (parsed_new_preprocessing - 1) / (static_width - 1)
      this.epsilon_handler(this.epsilon)
      this.preprocessing = new_preprocessing
    },
    update_handler: function(new_update) {
      console.log(new_update)
      
      if (new_update === "" || new_update === null) {
        this.clear_target_values()
        return 
      }
      const parsed_new_update = parseFloat(new_update).toPrecision(2)
      if (parsed_new_update < 0) {
        this.error_message = "Invalid input or the target values cannot be achieved."
        this.clear_target_values()
        this.update = new_update
        return
      }
      const {static_width, delta_width} = this.widths
      if (delta_width == 0) {
        return
      }
      this.epsilon = parsed_new_update / delta_width
      console.log(this.epsilon)
      this.epsilon_handler(this.epsilon)
      this.update = new_update
    },
    delay_handler: function(new_delay) {
      
      if (new_delay === "" || new_delay === null) {
        this.clear_target_values()
        return 
      }
      const parsed_new_delay = parseFloat(new_delay).toPrecision(2)
      if (parsed_new_delay < 0) {
        this.error_message = "Invalid input or the target values cannot be achieved."
        this.clear_target_values()
        this.delay = new_delay
        return
      }
      const {static_width, delta_width} = this.widths
      this.epsilon = 1 - parsed_new_delay
      this.epsilon_handler(this.epsilon)
      this.delay = new_delay
    },
    updateMathContent: function () {
      MathJax.typeset();
    },
    parse_query_text: function(new_query_text) {
      let [query_part, atom_part] = new_query_text.replace(/\s/g, '').split('=')
      if (!query_part || !atom_part) {
        return
      }

      if (query_part.split('(').length <= 1) return
      const query_name = query_part.split('(')[0]
      const free_variables = query_part.split('(')[1].replace(')', '').split(',')

      if (atom_part.split('),').length == 0) return
      const atoms = atom_part.split('),').map(atom_text => {

        if (atom_text.split('(').length <= 1) return
        const atom_name = atom_text.split('(')[0]
        const variables = atom_text.split('(')[1].replace(')', '').split(',')

        return new Atom(atom_name, variables)
      })

      if (atoms.some(atom => !atom)) return

      return new Query(query_name, new Set(free_variables), atoms)
    },
    get_widths: function(new_query_text) {
      this.computing = true

      const query = this.parse_query_text(new_query_text)
      if (!query || !query.is_valid() || !query.is_hierarchical()) {
        // console.log(query, query.is_valid(), query.is_hierarchical())
        this.incorrect_query = true
        this.computing = false
        return
      }

      this.incorrect_query = false

      console.log("Query text parsed")
      console.log(query)

      this.widths = query.widths()
      // console.log(query.widths_exhausted())
      this.Q = query
      this.query_text = query.toString()



      this.refresh_plot()
      this.updateMathContent()
      this.clear_target_values()

      this.computing = false
    },
    refresh_plot: function() {
      const ratio = this.window_width < 550 ? 0.8 : 1.5
      const static_width = this.widths.static_width
      const delta_width = this.widths.delta_width

      const update_delay_intersect = 1 / (delta_width + 1)
      const update_1_intersect = 1 / delta_width

      let steps = [...new Set([...[...Array(20).keys()].map(x => x * 0.05), update_delay_intersect, update_1_intersect, 1].sort())];

      window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
      };

      if (this.chart)
        this.chart.destroy()

      var ctx = document.getElementById('myChart').getContext('2d');

      Chart.defaults[this.Q.toString()] = Chart.defaults.scatter;
      Chart.controllers[this.Q.toString()] = Chart.controllers.scatter.extend({
        draw: function (ease) {
          Chart.controllers.scatter.prototype.draw.call(this, ease);

          if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            var activePoint = this.chart.tooltip._active[0],
              ctx = this.chart.ctx,
              x = activePoint.tooltipPosition().x,
              topY = this.chart.scales['y-axis-1'].top,
              bottomY = this.chart.scales['y-axis-1'].bottom;

            // draw line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 2;
            ctx.strokeStyle = window.chartColors.grey;
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      this.chart = new Chart(ctx, {
        type: this.Q.toString(),
        data: {
          // labels: steps,
          // steps.map(x => `EPS = ${x}`),
          labels: ['Enumeration Delay', 'Update Time', 'Preprocessing Time'],
          datasets: [{
            label: 'Enumeration Delay',
            borderColor: window.chartColors.red,
            showLine: true,
            data: steps.map((e => {
              return {
                x: e,
                y: 1 - e
              }
            })),
            fill: false,
          },
            {
              label: 'Update Time',
              borderColor: window.chartColors.blue,
              showLine: true,
              data: steps.map(e => {
                return {
                  x: e,
                  y: delta_width * e
                }
              }),
              fill: false,
            }, {
              label: 'Preprocessing Time',
              showLine: true,
              borderColor: window.chartColors.green,
              data: steps.map(e => {
                return {
                  x: e,
                  y: 1 + (static_width - 1) * e
                }
              }),
              fill: false,
            }
          ]
        },
        options: {
          tooltips: {
            intersect: false,
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.labels[tooltipItem.datasetIndex];
                return `EPS: ${tooltipItem.xLabel.toPrecision(2)}\r\n${label}: ${tooltipItem.yLabel.toPrecision(2)}`

              }
            }
          },
          responsive: true,
          title: {
            display: true,
            text: this.Q.toString()
          },
          aspectRatio: ratio,
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Epsilon'
              },
              ticks: {
                min: 0,
                stepSize: 0.1
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Complexity O(N^y)'
              },
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  }
})
})
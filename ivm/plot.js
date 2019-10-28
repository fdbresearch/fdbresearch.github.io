$(document).on('ready', function () {

  const static_width = 4
  const delta_width = 3

  const update_delay_intersect = 1 / (delta_width + 1)
  const update_1_intersect = 1 / delta_width

  let steps = [...new Set([0, update_delay_intersect, update_1_intersect, 1])];

  window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };


  var ctx = document.getElementById('myChart').getContext('2d');

  Chart.defaults.ScatterWithLine = Chart.defaults.scatter;
  Chart.controllers.ScatterWithLine = Chart.controllers.scatter.extend({
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

  var chart = new Chart(ctx, {
    type: 'ScatterWithLine',
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
            return `EPS: ${tooltipItem.xLabel.toFixed(2)}\r\n${label}: ${tooltipItem.yLabel.toFixed(2)}`

          }
        }
      },
      responsive: true,
      title: {
        display: true,
        text: 'Q(A) = R(A,B), S(B)'
      },
      aspectRatio: 1.5,
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'EPS'
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
            labelString: 'Complexity'
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });


});
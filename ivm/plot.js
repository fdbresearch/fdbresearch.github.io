$(document).on('ready', function () {

  const static_width = 3
  const delta_width = 2

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

  Chart.defaults.LineWithLine = Chart.defaults.line;
  Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
        var activePoint = this.chart.tooltip._active[0],
          ctx = this.chart.ctx,
          x = activePoint.tooltipPosition().x,
          topY = this.chart.scales['y-axis-0'].top,
          bottomY = this.chart.scales['y-axis-0'].bottom;

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
    type: 'LineWithLine',
    data: {
          labels: [0, 0.5, 1].map(x => `EPS = ${x}`),
          datasets: [{
            label: 'Enumeration Delay',
            borderColor: window.chartColors.red,
            data: [1, 0.5, 0],
            fill: false,
          }, {
            label: 'Update Time',
            borderColor: window.chartColors.blue,
            data: [0, 0.5, 1],
            fill: false,
          }, {
            label: 'Preprocessing Time',
            borderColor: window.chartColors.green,
            data: [1, 1.5, 2],
            fill: false,
          }]
        },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Q(A) = R(A,B), S(B)'
      },
      aspectRatio: 1.5,
      tooltips: {
        intersect: false
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: false,
            labelString: 'EPS'
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

  // Chart.defaults.LineWithLine = Chart.defaults.line;
  // Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  //   draw: function(ease) {
  //     Chart.controllers.line.prototype.draw.call(this, ease);
  //
  //     if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
  //       var activePoint = this.chart.tooltip._active[0],
  //         ctx = this.chart.ctx,
  //         x = activePoint.tooltipPosition().x,
  //         topY = this.chart.scales['y-axis-0'].top,
  //         bottomY = this.chart.scales['y-axis-0'].bottom;
  //
  //       // draw line
  //       ctx.save();
  //       ctx.beginPath();
  //       ctx.moveTo(x, topY);
  //       ctx.lineTo(x, bottomY);
  //       ctx.lineWidth = 2;
  //       ctx.strokeStyle = '#07C';
  //       ctx.stroke();
  //       ctx.restore();
  //     }
  //   }
  // });
  //
  // var chart = new Chart(ctx, {
  //   // The type of chart we want to create
  //   type: 'line',
  //
  //   // The data for our dataset
  //   data: {
  //     labels: [0, 0.5, 1],
  //     datasets: [{
  //       label: 'Enumeration Delay',
  //       borderColor: window.chartColors.red,
  //       data: [1, 0.5, 0],
  //       fill: false,
  //     }, {
  //       label: 'Update Time',
  //       borderColor: window.chartColors.blue,
  //       data: [0, 0.5, 1],
  //       fill: false,
  //     }]
  //   },
  //
  //   // Configuration options go here
  //   options: {
  //     tooltips: {
  //       intersect: false
  //     },
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }]
  //     }
  //   }
  // });

});
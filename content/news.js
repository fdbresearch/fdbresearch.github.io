const news_data = [{
  date: "Sep 31, 2017",
  html: `
    <p class="g-color-gray-dark-v1">New PhD and postdoc positions available in my group funded by a 5-year ERC consolidator grant! Please contact
    a project member for details if you are interested.</p>
    <p>
      <ul>
        <li>
          <a class="g-font-weight-700 g-font-size-13" href="#">Senior Researcher on in-database analytics</a>
        </li>
        <li>
          <a class="g-font-weight-700 g-font-size-13" href="#">Fully-Funded Doctoral Studentship in Databases</a>
        </li>
      </ul>
    </p>
    `
}, {
  date: "Sep 2017",
  html: `<p class="g-color-gray-dark-v1">Our own Ahmet Kara helping out at the ERC-funded
  <a class="g-font-weight-700 g-font-size-13" href="http://www.ox.ac.uk/curiosity-carnival/whats-on?utm_source=ox.ac.uk&utm_medium=referral">Curiosity Festival</a> taking place in Oxford.</p>`
}, {
  date: "June 2017",
  html: `<p class="g-color-gray-dark-v1">We received a Microsoft Azure grant to support our research experiments. Thank you Microsoft!</p>`
}, {
  date: "March 2017",
  html: `<p class="g-color-gray-dark-v1">The CS department and Oxford celebrated ERC on its 10th anniversary, see
  <a class="g-font-weight-700 g-font-size-13" href="http://www.cs.ox.ac.uk/news/1273-full.html">here</a> and
  <a class="g-font-weight-700 g-font-size-13" href="http://www.ox.ac.uk/news-and-events/european-research-council-anniversary">here</a>.</p>`
}, {
  date: "October 2016",
  html: `<p class="g-color-gray-dark-v1">Pierre-Yves was awarded the Hoare Prize for best MSc in CS project 2016. His project investigates the problem
  of many-core and distributed regression learning over factorised joins.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.</p>`
}]

const awards_data = [{
    date: "June 2017",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "We received a Microsoft Azure grant to support our research experiments. Thank you Microsoft!",
  },
  {
    date: "June 2017",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "We received a Microsoft Azure grant to support our research experiments. Thank you Microsoft!",
  },
  {
    date: "June 2017",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "We received a Microsoft Azure grant to support our research experiments. Thank you Microsoft!",
  },
  {
    date: "June 2017",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "We received a Microsoft Azure grant to support our research experiments. Thank you Microsoft!",
  },
]

var news_app = new Vue({
  el: '#fdb-app',
  data: {
    news: news_data,
    awards: awards_data,
  },
  computed: {
    top_news: function () {
      return news_data.slice(0, Math.min(7, news_data.length))
    }
  }
})
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
  date: "March 2017",
  html: `<p class="g-color-gray-dark-v1">The CS department and Oxford celebrated ERC on its 10th anniversary, see
  <a class="g-font-weight-700 g-font-size-13" href="http://www.cs.ox.ac.uk/news/1273-full.html">here</a> and
  <a class="g-font-weight-700 g-font-size-13" href="http://www.ox.ac.uk/news-and-events/european-research-council-anniversary">here</a>.</p>`
}, {
  date: "March 2016",
  html: `<p class="g-color-gray-dark-v1">The FDB project was featured in three interviews with Dan on Romanian National Radio (Radio
    Romania Cultural).</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Congratulations to Jakub, who successfully defended his PhD and joined Google Zurich!</p>`
}, {
  date: "May 2016",
  html: `<p class="g-color-gray-dark-v1">Jakub will do an internship over the summer of 2012 at Google Zurich.</p>`
}, ]

const awards_data = [{
    date: "June 2017",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "We received a Microsoft Azure grant to support our research experiments. Thank you Microsoft!",
  },
  {
    date: "October 2016",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "Pierre-Yves was awarded the Hoare Prize for best MSc in CS project 2016. His project investigates the problem of many-core and distributed regression learning over factorised joins. ",
  },
  {
    date: "May 2016",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.",
  },
  {
    date: "March 2016",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "Maximilian received the honourable mention (2nd place out of 17 submissions) from Vienna Centre for Logic and Algorithms (VCLA) International Student Awards for Outstanding Master Thesis.",
  },  {
    date: "December 2015",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "Dan received a prestigious ERC Consolidator Grant worth almost 2 Million Euro to work on foundations of factorized data management systems.",
  },
  {
    date: "September 2015",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "Maximilian was awarded the Hoare Prize for best MSc in CS project 2015. His project investigates the problem of learning linear regression models over factorised joins. ",
  },
  {
    date: "January 2015",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "We received an AWS in Education Research grant. Thank you Amazon!",
  },  {
    date: "August 2014",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "We received a Google Research Award. Thank you Google!",
  },  {
    date: "October 2013",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "Laura was awarded the Hoare Prize for best MSc in CS project 2013. Her project investigates the problem of updates in factorised databases.",
  }, {
    date: "September 2012",
    img: "assets/acknowledgements/epsrc-logo.png",
    html: "Tomáš was awarded the Gloucester Research Project Prize for best 4th year Maths&CS project 2012. His project investigates the evaluation problem for queries with ORDER-BY and GROUP-BY clauses on factorised databases. ",
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
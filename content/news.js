const news_data = [{
  date: "Sep 31, 2017",
  html: `
    <p class="g-color-gray-dark-v1">New PhD and postdoc positions available funded by a 5-year ERC consolidator grant! Please contact
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
  html: `<p class="g-color-gray-dark-v1">Ahmet Kara helped out at the European Researcher's
  <a class="g-font-weight-700 g-font-size-13" href="http://www.ox.ac.uk/curiosity-carnival/whats-on?utm_source=ox.ac.uk&utm_medium=referral">Curiosity Festival</a> in Oxford.</p>`
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
  date: "November 2013",
  html: `<p class="g-color-gray-dark-v1">Congratulations to Jakub, who successfully defended his PhD and joined Google Zurich!</p>`
}, {
  date: "June 2012",
  html: `<p class="g-color-gray-dark-v1">Jakub started his summer internship at Google Zurich.</p>`
}, ]

const acknowledgements_data = [{
    date: "June 2017",
    tag: "azure",
    html: "We received a Microsoft Azure grant to support our research experiments. Thank you Microsoft!",
    img: "assets/acknowledgements/azure.png",
    url: "https://azure.microsoft.com/",
  },
  {
    date: "2017-2019",
    tag: "fwq",
    html: "Dan received a Fondation Wiener Anspach grant.",
    img: "assets/acknowledgements/fwq.jpeg",
    url: "http://fwa.ulb.ac.be/",
  },
  {
    date: "2016",
    tag: "dbonto",
    html: "Radu Ciucanu has been supported by the DBOnto EPSRC platform grant (2016).",
    img: "assets/acknowledgements/dbonto.png",
    url: "http://dbonto.cs.ox.ac.uk/",
  },
  {
    date: "December 2015",
    tag: "erc",
    html: "Dan received a prestigious ERC Consolidator Grant worth almost 2 Million Euro to work on foundations of factorized data management systems.",
    img: "assets/acknowledgements/erc-logo.png",
    url: "https://erc.europa.eu/",
  },
  {
    date: "2015-2017",
    tag: "vada",
    html: "Yu Tang has been supported by the VADA EPSRC programme grant (2015-2017).",
    img: "assets/acknowledgements/vada.png",
    url: "http://vada.org.uk/"
  },
  {
    date: "January 2015",
    tag: "aws",
    html: "We received an AWS in Education Research grant. Thank you Amazon!",
    img: "assets/acknowledgements/aws.png",
    url: "https://aws.amazon.com/",
  },
  {
    date: "August 2014",
    tag: "google",
    html: "We received a Google Research Award. Thank you Google!",
    img: "assets/acknowledgements/google-logo.png",
    url: "https://google.com/"
  },
  {
    date: "2013",
    tag: "astortravel",
    html: "Dan Olteanu acknowledges the support of an Astor Travel Fund grant.",
    img: "assets/acknowledgements/oxford.png",
    url: ""
  },
  {
    tag: "alanturinginstitute",
    img: "assets/acknowledgements/alanturinginstitute.png",
    url: "https://www.turing.ac.uk/",
  },
  {
    tag: "logicblox",
    img: "assets/acknowledgements/logicblox.png",
    url: "http://www.logicblox.com/"
  }
]

// student awards
const awards_data = [{
    date: "October 2016",
    img: "assets/acknowledgements/oxford.png",
    html: "Pierre-Yves was awarded the Hoare Prize for best MSc in CS project 2016. His project investigates the problem of many-core and distributed regression learning over factorised joins. ",
  },
  {
    date: "May 2016",
    img: "assets/acknowledgements/sigmod2016.png",
    html: "Maximilian received a SIGMOD travel grant to attend SIGMOD in San Francisco in June 2016.",
  },
  {
    date: "March 2016",
    img: "assets/acknowledgements/vcla.png",
    html: "Maximilian received the honourable mention (2nd place out of 17 submissions) from Vienna Centre for Logic and Algorithms (VCLA) International Student Awards for Outstanding Master Thesis.",
  },
  {
    date: "September 2015",
    img: "assets/acknowledgements/oxford.png",
    html: "Maximilian was awarded the Hoare Prize for best MSc in CS project 2015. His project investigates the problem of learning linear regression models over factorised joins. ",
  },
  {
    date: "October 2013",
    img: "assets/acknowledgements/oxford.png",
    html: "Laura was awarded the Hoare Prize for best MSc in CS project 2013. Her project investigates the problem of updates in factorised databases.",
  }, {
    date: "September 2012",
    img: "assets/acknowledgements/oxford.png",
    html: "Tomáš was awarded the Gloucester Research Project Prize for best 4th year Maths&CS project 2012. His project investigates the evaluation problem for queries with ORDER-BY and GROUP-BY clauses on factorised databases. ",
  },
]

var news_app = new Vue({
  el: '#fdb-app',
  data: {
    news: news_data,
    awards: awards_data,
    acknowledgements: acknowledgements_data,
  },
  computed: {
    // control the number of news shown on the home page
    top_news: function () {
      return news_data.slice(0, Math.min(3, news_data.length))
    },
    acknowledgement_logos: function () {
      return acknowledgements_data.sort((a,b) => a.tag > b.tag)
    },
  }
})
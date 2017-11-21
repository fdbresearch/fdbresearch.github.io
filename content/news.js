const news_data = [{
  date: "Sep 31, 2017",
  html: `
    <p class="g-color-gray-dark-v1">Research positions available in our research group! Please contact
    Professor Dan Olteanu (dan.olteanu@cs.ox.ac.uk) for details.</p>
    <p>
      <ul>
        <li>
          <a class="g-font-weight-700 g-font-size-13" href="http://www.cs.ox.ac.uk/news/1379-full.html">Senior Researcher on in-database analytics</a>
        </li>
        <li>
          <a class="g-font-weight-700 g-font-size-13" href="http://www.cs.ox.ac.uk/news/1372-full.html">Fully-Funded Doctoral Studentship in Databases, partially sponsored by Ordnance Survey</a>
        </li>
        <li>
          <span class="g-font-weight-700 g-font-size-13">Several ERC-Funded Doctoral Studentships to start any term in the academic year</span>
        </li>
        </ul>
    </p>
    `
}, {
  date: "Sep 2017",
  html: `<p class="g-color-gray-dark-v1">Ahmet helped out at the European Researcher's
  <a class="g-font-weight-700 g-font-size-13" href="http://www.ox.ac.uk/curiosity-carnival/whats-on?utm_source=ox.ac.uk&utm_medium=referral">Curiosity Festival</a> in Oxford.</p>`
}, {
  date: "March 2017",
  html: `<p class="g-color-gray-dark-v1">The CS department and Oxford celebrated ERC on its 10th anniversary, see
  <a class="g-font-weight-700 g-font-size-13" href="http://www.cs.ox.ac.uk/news/1273-full.html">here</a> and
  <a class="g-font-weight-700 g-font-size-13" href="http://www.ox.ac.uk/news-and-events/european-research-council-anniversary">here</a>.</p>`
}, {
  date: "March 2016",
  html: `<p class="g-color-gray-dark-v1">FDB featured in a series of three interviews with Dan on Romanian National Radio (Radio
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

const visitors_data = [{
  id: "modal-2000",
  title: "Adding Path-Functional Dependencies to the Guarded Two-Variable Fragment with Counting",
  name: "Dr. George Kourtis (Manchester U.) is visiting on Nov 23, 2017 to talk about factorized databases and his work on path-functional dependencies",
  author_url: "http://cs.ulb.ac.be/members/stijn/index.html",
  date: "22 Nov 2017",
  place: "441",
  abstract: [
    `The satisfiability and finite satisfiability problems for the two-variable guarded fragment of first-order logic with counting quantifiers, a database, and path-functional dependencies are both ExpTime-complete.`
  ],
  oxford_url: "#",
}, {
  id: "modal-1928",
  title: "The Dynamic Yannakakis Algorithm: Compact and Efficient Query Processing Under Updates",
  name: "FWA project partner Stijn Vansummeren (Université Libre de Bruxelles) is visiting with his postdocs Martin Ugarte and Iman Elghandour on Nov 20-21, 2017",
  author_url: "http://cs.ulb.ac.be/members/stijn/index.html",
  date: "21 Nov 2017",
  place: "051",
  abstract: [
    `Modern computing tasks such as real-time analytics require refresh of query results under high update rates. Incremental View Maintenance (IVM) approaches this problem by materializing results in order to avoid recomputation. IVM naturally induces a trade-off between the space needed to maintain the materialized results and the time used to process updates.`,
    `In this talk, we show that the full materialization of results is a barrier for more general optimization strategies. In particular, we present a new approach for evaluating queries under updates. Instead of the materialization of results, we require a data structure that allows: (1) linear time maintenance under updates, (2) constant-delay enumeration of the output, (3) constant-time lookups in the output, while (4) using only linear space in the size of the database. We call such a structure a Dynamic Constant delay Linear Representation (DCLR) for the query. We show that Dyn, a dynamic version of the Yannakakis algorithm, yields DCLRs for the class of free-connex acyclic CQs. We show that this is optimal in the sense that no DCLR can exist for CQs that are not free-connex acyclic. Moreover, we identify a sub-class of queries for which Dyn features constant-time update per tuple and show that this class is maximal. An experimental validation of Dyn shows that it is highly effective in practice.`,
    `The talk will conclude with current insights on ongoing research on how Dyn can be extended to also allow processing of more general classes of queries, in particular queries that feature in-equality joins rather than equality joins. Such in-equality joins are important in relational-style queries, but are also prominently present in the area of Complex Event Recognition.`
  ],
  oxford_url: "http://www.cs.ox.ac.uk/seminars/1928.html",
}, {
  id: "modal-1932",
  title: "Decision-theoretic planning via probabilistic programming",
  name: "Vaishak Belle ( Edinburgh and Alan Turing Institute)",
  author_url: "http://vaishakbelle.com/",
  date: "13 Nov 2017",
  place: "LTB",
  abstract: [
    'We study planning in Markov decision processes involving discrete and continuous states and actions, and an unknown number of objects. Planning in such domains is notoriously challenging and often requires restrictive assumptions. We introduce HYPE: a sample-based planner for hybrid domains that is very general, which combines model-based approaches with state abstraction. Most significantly, the domains where such planners are deployed are usually very complex with deep structural and geometric constraints. HYPE is instantiated in a probabilistic programming language that allows compact codification of such constraints.',
    'In our empirical evaluations, we show that HYPE is a general and widely applicable planner in domains ranging from strictly discrete to strictly continuous to hybrid ones. Moreover, empirical results showed that abstraction provides significant improvements.',
    'In the final part of the talk, we turn to the question of whether there is any hope of developing computational methodologies that are not based on sampling. In particular, it is tricky in hybrid domains to deal with low-probability observations, and most sampling-based schemes only provide asymptotic guarantees.',
    'This talk is based on a Machine Learning Journal article (2017), and is joint work with Davide Nitti, Tinne De Laet and Luc De Raedt.',
  ],
  oxford_url: "http://www.cs.ox.ac.uk/seminars/1932.html",
}, {
  id: "modal-1922",
  title: "Toward a Principled Framework for Clustering Techniques",
  name: "Shuai Li ( Cambridge )",
  author_url: "https://sites.google.com/site/shuailidotsli/",
  date: "13:00 11 Oct 2017",
  place: "441",
  abstract: [
    `I will talk about algorithmic and theoretical aspects of an adaptive clustering framework for the content recommendation based on exploration-exploitation strategies in the multi-armed bandit scenarios. First, I'll give an introduction to the centralized clustering methods  in a standard stochastic noise setting for networked users on the graph.  Next, in the decentralized clustering setting I'll describe two distributed efficient algorithms for solving linear regression based problems in peer to peer networks with limited communication capabilities. Last, I'll establish upper bounds on the generalized collaborative filtering applications combined with clustered models. In all cases, the technically sound theoretical guarantees are provided, and extensive real-world data sets based experiments demonstrated the significantly increased performance compared to the state-of-the-art approaches.`,
    `Dr Shuai Li is currently a postdoctoral researcher in the Engineering Design Centre of the Department of Engineering, at the University of Cambridge. He has 7+ years professional experience across Europe, North America, Middle East, and Asia Pacific; and 19+ years project experience in Computer Science and Information Engineering; also he served as CEO for the industry and released several successful products. He has been engaged in internationally leading research in the analysis of complex, dynamic data at scale, and brought cutting-edge data mining and machine learning to the heart of industrial-scale big data analytics and data science. As the academic service he has been involved in a number of international prestigious conferences and journals including SIGIR, SIGKDD, ICDM, SDM, NIPS, UAI, AISTATS, WWW, WSDM, IJCAI, etc.`,
  ],
  oxford_url: "http://www.cs.ox.ac.uk/seminars/1922.html",
},  {
  id: "modal-1884",
  title: "Shannon-type inequalities, submodular width, and disjunctive datalog",
  name: "Hung Ngo ( stealth mode )",
  author_url: "https://www.cse.buffalo.edu/~hungngo/",
  date: "11:00 11 Sept 2017",
  place: "LTB",
  abstract: [
    'This talk overviews recent results on bounding the output size and on efficiently evaluating a disjunctive datalog rule, given input statistics such as relation sizes, functional dependencies, and degree bounds. These are the kind of statistics prevalent in database query evaluation, and our results apply to aggregate queries as well. The disjunctive datalog query evaluation problem is fairly general, as both conjunctive query evaluation and the basic constraint satisfaction problem are special cases. These new combinatorial and algorithmic results are built up on a fundamental connection between query evaluation and Shannon-type inequalities. It was observed in different contexts over the past 40 years that information-theoretic inequalities can be used to bound combinatorial quantities. First, one can derive (sometimes tight) output size bounds of conjunctive queries and disjunctive datalog rules using Shannon-type inequalities. This talk discusses these bounds and techniques. Second, we show how one can turn a proof of an information-inequality into an efficient algorithm to evaluate such queries. The algorithm’s runtime is bounded by a generalized version of the submodular width of the query, which is optimal modulo complexity-theoretic assumptions. ',
    'The talk is based on joint works with Mahmoud Abo Khamis and Dan Suciu.',
  ],
  oxford_url: "http://www.cs.ox.ac.uk/seminars/1884.html",
}, {
  id: "modal-1712",
  title: "High-Performance Incremental Processing of Complex Analytical Queries",
  name: "Milos Nikolic",
  author_url: "#",
  date: "11:30 15 Nov 2016",
  place: "051",
  abstract: [
    `Many of today's popular computing applications require real-time analytics over large and dynamic datasets, from social web applications to online data warehousing, network monitoring, and algorithmic trading. These applications have long-lived analysis queries that require low latency processing over rapidly changing datasets. `,
    `In this talk, I will present techniques for efficient incremental processing of complex analytical queries, ranging from classical SQL queries to linear algebra programs. Our system, called DBToaster, compiles declarative database queries into high-performance stream processing engines that keep query results (views) fresh at very high update rates. DBToaster uses a recursive  query compilation algorithm that materializes a supporting set of higher-order delta views to achieve a substantially lower view maintenance cost. Our implementation supports batched processing in local and distributed environments and can deliver up to 5 orders of magnitude better performance than existing DBMS and stream engines.`,
    `The LINVIEW system focuses on the incremental computation of iterative linear algebra programs that consist of the standard matrix operations. LINVIEW uses matrix factorization techniques to make the incremental computation of standard machine learning algorithms, like linear regression, practical and usually substantially cheaper than re-evaluation. LINVIEW generates parallel incremental programs that outperform re-evaluation techniques by more than an order of magnitude. `,
  ],
  oxford_url: "http://www.cs.ox.ac.uk/seminars/1712.html",
}, {
  id: "modal-mihnea-andrei",
  title: "Darwinian evolution: 3 implementations of snapshot isolation in SAP HANA",
  name: "Mihnea Andrei ( SAP )",
  author_url: "#",
  date: "14:00 11 Mar 2016",
  place: "051",
  abstract: [
    `The talk presents the HANA column store, then focuses on 3 historical version of snapshot isolation implementation, presenting for each what was working well and why we evolved to the next one.`,
    `Mihnea Andrei`,
    `MS in computer science in 1988; the Bucharest Polytechnic Institute, Automatic Control and Computers engineering school; Prof. Cristian Giumale`,
    `DEA in Machine Learning in 1990; Universite Paris 6; Prof. Jean-Gabriel Ganascia`,
    `Joined Sybase in 1993; currently working at SAP, which has acquired Sybase in 2010.`,
    `Worked on the core engine of several RDBMs (Sybase ASE and IQ; SAP HANA): query optimization, Abstract Plans (optimizer hints), query compilation and execution, eager-lazy aggregation, shared-disk and shared-nothing scale-out. Current focus: database stores (in-memory and on-disk, row and column oriented), transaction processing, data lifecycle.`,
  ],
  oxford_url: "#",
}, {
  id: "modal-bart-samwel",
  title: "F1 - The Distributed SQL Database Supporting Google's Ad Business",
  name: "Bart Samwel ( Google )",
  author_url: "#",
  date: "14:00 19 Feb 2016",
  place: "051",
  abstract: [
    `Large scale internet operations such as Google, Facebook, and Amazon manage amazing amounts of data. Doing so requires databases that are distributed across multiple servers or even multiple data centers, with high throughput, strong latency requirements, "five nines" of availability, and often with strict data consistency requirements. This talk starts by introducing relational SQL databases, NoSQL databases, and the current state of the art in such databases as deployed in industry. It then provides an introduction to Google F1, a SQL database based on Google's Spanner distributed storage system. F1 is used to store the data for AdWords, Google's search advertising product, as well as several other major products in the Ads & Commerce area. F1 and Spanner represent a new, hybrid approach to distributed databases that combines the scalability and availability of NoSQL storage systems like Google's Bigtable and Amazon's DynamoDB, with the convenience and consistency guarantees provided by traditional SQL relational databases.`,
    `Bart Samwel is a senior staff software engineer at Google. He is infamous at his alma mater Leiden University for completing his Master's degree with honors (and with several peer-reviewed publications on his resume), but more importantly for taking a full twelve years to do this. It is rumored that this discrepancy has caused him to be excluded as an outlier from the Computer Science department graduation statistics. At Google, Bart is a core member of the F1 team, working mostly on the F1 SQL query engine.`
  ],
  oxford_url: "#",
}, {
  id: "modal-paul-beame",
  title: "Parallel Query Evaluation",
  name: "Paul Beame and Paris Koutris",
  author_url: "#",
  date: "14:00 5 Nov 2015",
  place: "LTB",
  abstract: [
    `Fix a full, conjunctive query, and consider the following problem: what is the amount of communication required to compute the query in parallel, on p servers, over a large database instance?  We define the Massively Parallel Communication (MPC) model, where the computation proceeds in rounds consisting of local computations followed by a global reshuffling of the data.  Servers have unlimited computational power and are allowed to exchange any data, the only cost parameters are the number of rounds and the maximum amount of communication per server.  I will describe tight bounds on the amount of communication for the case of a single round and data without skew, then discuss extensions to skewed data and multiround.`,
    `Joint work with Paul Beame and Paris Koutris`,
  ],
  oxford_url: "#",
}, {
  id: "modal-dan-suciu",
  title: "Query Compilation: the View from the Database Side",
  name: "Dan Suciu",
  author_url: "#",
  date: "6 Nov 2015",
  place: "#",
  abstract: [
    `We study knowledge compilation for Boolean formulas that are given as
    groundings of First Order formulas.  This problem is motivated by
    probabilistic databases, where each record in the database is an
    independent probabilistic event, and the query is given by a SQL
    expression or, equivalently, a First Order formula.  The query's
    probability can be computed in linear time in the size of the
    compilation representation, hence the interest in studying the size of
    such a representation.  We consider the "data complexity" setting,
    where the query is fixed, and the input to the problem consists only
    of the database instance.  We consider several compilation targets, of
    increasing expressive power: OBDDs, FBDDs, and decision-DNNFs (a
    subclass of d-DNNFs).  For the case of OBDDs we establish a dichotomy
    theorem for queries in restricted languages FO(\exists, \wedge, \vee)
    and FO(\forall, \wedge, \vee): for each such query the OBDD is either
    linear in the size of the database, or grows exponentially, and the
    complexity can be determined through a simple analysis of the query
    expression.  For the other targets we describe a class of queries for
    which (a) the decision-DNNF is exponentially large in the size of the
    database, and (b) the probability of the query can be computed in
    polynomial time in the size of the database.  This suggests that the
    compilation target decision-DNNF is too weak to capture all tractable
    cases of probabilistic inference.  Our lower bound for decision-DNNF's
    relies on a translation into FBDD's, which is of independent interest.`,
    `Joint work with Paul Beame, Abhay Jha, Jerry Li, and Sudeepa Roy`,
  ],
  oxford_url: "#",
}]

var news_app = new Vue({
  el: '#fdb-app',
  data: {
    news: news_data,
    awards: awards_data,
    acknowledgements: acknowledgements_data,
    visitors: visitors_data,
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
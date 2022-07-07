const Trade = require("../models/trade");
const Indicator = require("../models/indicator");
const request = require("request");

function signUp(req, res) {
  res.render("signup", { title: "Sign Up" });
}

function login(req, res) {
  res.render("login", { title: "Log In" });
}

function index(req, res) {
  Trade.find({})
  .populate("ind")
  .exec(function (err, trades) {
    res.render("trades/index", { trades });
  });
}

function trade(req, res) {
  Trade.find({})
    .populate("ind")
    .exec(function (err, trades) {
      res.render("trades/trades", { trades });
    });
}

// function trade(req, res) {
//   Trade.find({}, function (err, trades) {
//     res.render("trades/trades", { trades });
//   });
// }

function show(req, res) {
  Trade.findOne({ _id: req.params.id })
    .populate("ind")
    .exec(function (err, trade) {
      Indicator.find({ _id: { $nin: trade.ind } }, function (err, indicators) {
        res.render("trades/show", {
          trade,
          indicators,
        });
      });
    });
}

function newTrade(req, res) {
  const tradesD = new Trade();
  const dt = tradesD.openDate;
  const tradeDate = dt.toISOString().slice(0, 10);
  Indicator.find({}, function (err, indicators) {
    request(
      `https://api.binance.com/api/v3/exchangeInfo`,
      function (err, response, body) {
        const cryptoData = JSON.parse(body);
        res.render("trades/new", { tradeDate, cryptoData, indicators });
      }
    );
  });
}

function create(req, res) {
  console.log(req.body);
  req.body.openPrice = parseInt(req.body.openPrice);
  req.body.quantity = parseInt(req.body.quantity);
  if (req.body.closePrice) {
    req.body.closePrice = parseInt(req.body.closePrice);
  } else {
    delete req.body.closePrice;
  }
  if (req.body.fees) {
    req.body.fees = parseInt(req.body.fees);
  } else {
    delete req.body.fees;
  }
  request(
    `https://api.binance.com/api/v3/exchangeInfo`,
    function (err, response, body) {
      const cryptoData = JSON.parse(body);
      const trade = new Trade(req.body);
      console.log(trade);
      console.log(req.body.ind);
      // trade.ind.push(req.body.ind);
      trade.save(function (err) {
        res.redirect("/trades/trades");
      });
    }
  );
}

function deleteTrade(req, res, next) {
  Trade.find({ _id: req.params.id })
    .remove()
    .exec(function (err, trades) {
      console.log(trades);
      res.redirect("/trades/trades");
    });
}

function update(req, res) {
  Trade.findById(req.params.id, function (err, trade) {
    if (!trade) return false;
    trade.position = req.body.position;
    trade.stat = req.body.stat;
    trade.pair = req.body.pair;
    trade.openDate = req.body.openDate;
    trade.openPrice = req.body.openPrice;
    trade.quantity = req.body.quantity;
    trade.closeDate = req.body.closeDate;
    trade.closePrice = req.body.closePrice;
    trade.fees = req.body.fees;
    request(
      `https://api.binance.com/api/v3/exchangeInfo`,
      function (err, response, body) {
        const cryptoData = JSON.parse(body);
        trade.save(function (err) {
          res.redirect("/trades/trades");
        });
      }
    );
  });
}

function edit(req, res) {
  Trade.findById(req.params.id, function (err, trade) {
    const dtOpen = trade.openDate;
    const tradeDateOpen = dtOpen.toISOString().slice(0, 10);
    const dtClose = trade.closeDate;
    let tradeDateClose = null;
    if (dtClose) {
      tradeDateClose = dtClose.toISOString().slice(0, 10);
    }
    request(
      `https://api.binance.com/api/v3/exchangeInfo`,
      function (err, response, body) {
        const cryptoData = JSON.parse(body);
        trade.save(function (err) {
          res.render("trades/edit", {
            trade,
            tradeDateOpen,
            tradeDateClose,
            cryptoData,
          });
        });
      }
    );
  });
}

module.exports = {
  index,
  signUp,
  login,
  trade,
  new: newTrade,
  create,
  delete: deleteTrade,
  show,
  edit,
  update,
};

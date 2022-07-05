const Trade = require("../models/trade");

function signUp(req, res) {
  res.render("signup", { title: "Sign Up" });
}

function login(req, res) {
  res.render("login", { title: "Log In" });
}

function trade(req, res) {
  Trade.find({}, function (err, trades) {
    res.render("trades/trades", { trades });
  });
}

function show(req, res) {
  Trade.findById(req.params.id, function (err, trade) {
    res.render("trades/show", { trade });
  });
}

function newTrade(req, res) {
  const tradesD = new Trade();
  const dt = tradesD.openDate;
  const tradeDate = dt.toISOString().slice(0, 10);
  console.log(tradeDate);
  res.render("trades/new", { tradeDate });
}

function create(req, res) {
  req.body.openPrice = parseInt(req.body.openPrice);
  req.body.closePrice = parseInt(req.body.closePrice);
  req.body.quantity = parseInt(req.body.quantity);
  req.body.fees = parseInt(req.body.fees);

  const trades = new Trade(req.body);

  trades.save(function (err) {
    if (err) return res.render("trades/new");
    res.redirect("/trades/trades");
  });
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
    trade.save(function (err) {
      res.redirect("/trades/trades");
    });
  });
}

function edit(req, res) {
  Trade.findById(req.params.id, function (err, trade) {
    const tradesD = new Trade();
  const dtOpen = tradesD.openDate;
  const tradeDateOpen = dtOpen.toISOString().slice(0, 10);
  const dtClose = tradesD.closeDate;
  const tradeDateClose = dtClose.toISOString().slice(0, 10);
    res.render("trades/edit", { trade, tradeDateOpen, tradeDateClose});
  });
}

module.exports = {
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

const Indicator = require("../models/indicator");
const Trade = require("../models/trade");
const request = require("request");

async function addToInd(req, res, next) {
  try {
    const trade = await Trade.findById(req.params.id);
    trade.ind.push(req.body.indicatorId);
    console.log(req.body.indicatorId);
    await trade.save();
    res.redirect(`/trades/${trade._id}`);
  } catch (err) {
    console.log(err);
    next(new Error(err.message));
  }
}

async function delInd(req, res, next) {
  try {
    const trade = await Trade.findById(req.params.id);
    console.log(trade);
    console.log(req.params.iid);
    console.log(trade.ind[0]._id);
    id = req.params.iid;
    const idx = trade.ind.findIndex((t) => t._id == id);
    console.log(idx);
    if (idx === -1) {
      return false;
    } else {
      trade.ind.splice(idx, 1);
    }
    // await indicator.remove();
    await trade.save();
    res.redirect(`/trades/${trade._id}`);
  } catch (err) {
    console.log(err);
    next(new Error(err.message));
  }
}

function create(req, res) {
  Indicator.create(req.body, function (err, indicator) {
    res.redirect("/indicators/new");
  });
}

function newIndicator(req, res) {
  Indicator.find({}, function (err, indicators) {
    res.render("indicators/new", {
      indicators,
    });
  });
}

module.exports = {
  new: newIndicator,
  create,
  delete: delInd,
  addToInd,
};

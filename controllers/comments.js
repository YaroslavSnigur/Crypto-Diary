const Trade = require("../models/trade");

function create(req, res) {
  Trade.findById(req.params.id, function (err, trade) {
    trade.comments.push(req.body);
    trade.save(function (err) {
      res.redirect(`/trades/${trade._id}`);
    });
  });
}

function deleteComm(req, res, next) {
  Trade.findById(req.params.id, function (err, trade) {
    const id = req.params.cid;
    const idx = trade.comments.findIndex((t) => t.id === id);
    if (idx === -1) {
      return false;
    } else {
      trade.comments.splice(idx, 1);
    }
    trade.save(function (err) {
      res.redirect(`/trades/${trade._id}`);
    });
  });
}

module.exports = {
  create,
  delete: deleteComm,
};

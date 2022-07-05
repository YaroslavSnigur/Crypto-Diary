var express = require("express");
var router = express.Router();
const request = require('request');
const rootURL = 'https://api.binance.com/api/v3/exchangeInfo';
const tradesCtrl = require("../controllers/trades");

router.get("/signup", tradesCtrl.signUp);
router.get("/login", tradesCtrl.login);
router.get("/trades/trades", tradesCtrl.trade);
router.get("/trades/new", tradesCtrl.new);
router.get("/trades/:id", tradesCtrl.show);
router.post("/trades/trades", tradesCtrl.create);
router.delete("/trades/:id", tradesCtrl.delete);
router.put("/trades/:id", tradesCtrl.update);
router.get("/trades/:id/edit", tradesCtrl.edit);

router.get('/', function(req, res, next) {
    request(
      `https://api.binance.com/api/v3/exchangeInfo`,
      function(err, response, body) {
        data = JSON.parse(body);
        res.render('index', {data});
      }
    );
  });

module.exports = router;

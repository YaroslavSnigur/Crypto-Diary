var express = require("express");
var router = express.Router();
const request = require('request');


/* GET home page. */
router.get("/", function (req, res, next) {
    request(
      `https://api.binance.com/api/v3/exchangeInfo`,
      function(err, response, body) {
        cryptoData = JSON.parse(body);
        res.render('index', {cryptoData});
      }
    );
  });

module.exports = router;

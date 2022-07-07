var express = require("express");
var router = express.Router();
const request = require("request");
const tradesCtrl = require("../controllers/trades");

router.get("/signup", tradesCtrl.signUp);
router.get("/trades/index", tradesCtrl.index);
router.get("/trades/trades", tradesCtrl.trade);
router.get("/trades/new", tradesCtrl.new);
router.get("/trades/:id", tradesCtrl.show);
router.post("/trades/trades", tradesCtrl.create);
router.delete("/trades/:id", tradesCtrl.delete);
router.put("/trades/:id", tradesCtrl.update);
router.get("/trades/:id/edit", tradesCtrl.edit);

module.exports = router;

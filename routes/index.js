var express = require("express");
var router = express.Router();
const request = require("request");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login");
});

router.post("/", function (req, res, next) {
  if (req.body.uname === "Yara" && req.body.psw === "yara") {res.redirect("/trades/index");}
});

module.exports = router;

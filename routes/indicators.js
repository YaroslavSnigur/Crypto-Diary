const express = require("express");
const router = express.Router();
const indicatorsCtrl = require("../controllers/indicators");

router.get("/indicators/new", indicatorsCtrl.new);
router.post("/indicators", indicatorsCtrl.create);
router.post("/trades/:id/indicators", indicatorsCtrl.addToInd);
router.delete("/trades/:id/indicators/:iid", indicatorsCtrl.delete);

module.exports = router;

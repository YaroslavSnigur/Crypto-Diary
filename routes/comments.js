var express = require("express");
var router = express.Router();
const commentsCtrl = require("../controllers/comments");

router.post("/trades/:id/comments", commentsCtrl.create);
router.delete("/trades/:id/comments/:cid", commentsCtrl.delete);

module.exports = router;

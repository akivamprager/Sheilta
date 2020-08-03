const express = require("express");
const router = express.Router();
const textsController = require("./texts-controller");
const commentsController = require("./comments-controller");

router.use("/texts", textsController);
router.use("/comments", commentsController);

module.exports = router;

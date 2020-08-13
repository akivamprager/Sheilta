const express = require("express");
const router = express.Router();
const textsController = require("./texts-controller");
const topicsController = require("./topics-controller");
const categoriesController = require("./categories-controller");

router.use("/texts", textsController);
router.use("/topics", topicsController);
router.use("/categories", categoriesController);

module.exports = router;

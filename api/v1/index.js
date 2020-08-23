const express = require("express");
const router = express.Router();
const textsController = require("./texts-controller");
const topicsController = require("./topics-controller");
const categoriesController = require("./categories-controller");
const usersController = require("./users-controller");
const postsController = require("./posts-controller");

router.use("/texts", textsController);
router.use("/topics", topicsController);
router.use("/categories", categoriesController);
router.use("/users", usersController);
router.use("/posts", postsController);

module.exports = router;

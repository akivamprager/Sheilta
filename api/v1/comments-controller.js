const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:book/:chapter", async (req, res) => {
    const params = req.params;
    //let reqUrl = `http://discourse2.akiva.ml/tags/${`${req.params.book}`}-${`${req.params.chapter}`}+".json"`;
    let reqUrl = `http://discourse2.akiva.ml/tags/${`${req.params.book}`}-${`${req.params.chapter}`}.json`;
    const discourseRes = await axios.get(reqUrl);
    res.json(discourseRes.data);
});

module.exports = router;

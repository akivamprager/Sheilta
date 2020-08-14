const express = require("express");
const router = express.Router();
const axios = require("axios");
const secrets = require("../../secrets.json");

function createCommonHeaders() {
    return {
        'Content-Type': 'application/json',
        'Api-Key': secrets.discourse_global_key,
        'Api-Username': 'system',
        'Accept': 'application/json'
    };
}

function createDiscourseUrl(path) {
    return `http://discourse2.akiva.ml/${path}.json`;
}

function createDiscourseRequest(method, path, data) {
    return {
        method: method,
        headers: createCommonHeaders(),
        url: createDiscourseUrl(path),
        data: data
    };
}

async function proxyRequest(req, res, axiosReq) {
    try {
         res.json((await axios(axiosReq)).data);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: e + ""
        });
    }
}



// List all categories
router.get("/", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("GET", "categories"));
});

// Get existing category
router.get("/:categoryId", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("GET", `c/${req.params.categoryId}`));
});

router.get("/:category/:source", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("GET", `search?expanded=true&q=${req.params.source}%20%23${req.params.category}%20order%3Alatest`));
});
  

/*
// Update existing topic
router.patch("/:topicId", async (req, res) => {
});

// Delete existing topic
router.delete("/:topicId", async (req, res) => {
});

// ------------------- Comments------------------

// List all comments on an existing topic
router.get("/:topicId/comments", async (req, res) => {

});

// Create a comment on an existing topic
router.post("/:topicId/comments", async (req, res) => {

});

// Get an existing comment on an existing topic
router.get("/:topicId/comments/:commentId", async (req, res) => {

});

// Update an existing comment on an existing topic
router.patch("/:topicId/comments/:commentId", async (req, res) => {

});

// Delete an existing comment on an existing topic
router.delete("/:topicId/comments/:commentId", async (req, res) => {

});
*/
module.exports = router;

// get only questions/kashyas/etc for specific source:
// http://discourse2.akiva.ml/search.json?expanded=true&q=%23{CATEGORY}%20tags%3A{TAG}
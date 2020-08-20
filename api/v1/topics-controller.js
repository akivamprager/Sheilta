const express = require("express");
const router = express.Router();
const axios = require("axios");
const secrets = require("../../secrets.json");

function createCommonHeaders() {
    return {
        "Content-Type": "application/json",
        "Api-Key": secrets.discourse_global_key,
        "Api-Username": "system",
        "Accept": "application/json"
    };
}
function createDiscourseUrl(path) {
    return `http://discourse2.akiva.ml/${path}`;
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
        console.error(e+"\n"+"Error Message: "+e.response.statusText);
        res.status(500).json({
            error: e + ""
        });
    }
}


// List all topics for source
router.get("/tags/:tag", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("GET", `tag/${req.params.tag}.json?order=category`));
});

// Create a new topic
router.post("/", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("POST", "posts", req.body));
});

// Get existing topic
router.get("/:topicId", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("GET", `t/${req.params.topicId}`));
});

// Update existing topic
router.put("/:topicId", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("PUT", `t/-/${req.params.topicId}`, req.body));
});

// Delete existing topic
router.delete("/:topicId", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("DELETE", `t/${req.params.topicId}`));
});

// ------------------- Comments------------------

// List all comments on an existing topic
router.get("/:topicId/comments", async (req, res) => {

});

// Create a comment on an existing topic
router.post("/:topicId/comments", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("POST", "posts", req.body));
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

module.exports = router;

// get only questions/kashyas/etc for specific source:
// http://discourse2.akiva.ml/search.json?expanded=true&q=%23{CATEGORY}%20tags%3A{TAG}
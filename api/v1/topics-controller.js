const express = require("express");
const router = express.Router();
const axios = require("axios");

function createCommonHeaders() {
    return {
        "Content-Type": "application/json",
        "Api-Key": "ca68a9c8302248472e8963ff371b613a7c614cbdd8b3af8e8a5ce5f8a468dfea",
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
        res.status(500).json({
            error: e + ""
        });
    }
}



// List all topics for source
//router.get("/", async (req, res) => {
  //  proxyRequest(req, res, createDiscourseRequest("GET", `search?expanded=true&q=%23${category}%20tags%3A${tag}`));
//});

// Create a new topic
router.post("/", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("POST", "posts", req.body));
});

// Get existing topic
router.get("/:topicId", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("GET", `t/${req.params.topicId}`));//, req.body));
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
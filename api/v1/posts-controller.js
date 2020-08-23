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

// TODO
router.get("/:postId", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("GET", ``));
});

// Create a new topic
router.post("/:postId", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("POST", "posts", req.body));
});

module.exports = router;

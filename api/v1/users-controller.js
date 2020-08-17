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
        res.status(500).json({
            error: e + ""
        });
    }
}

router.post("/", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("POST", "users", req.body));
});

router.post("/:userId/logout", async (req, res) => {
    proxyRequest(req, res, createDiscourseRequest("POST", `admin/users/${req.params.userId}`));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:book.:chapter", async (req, res) => {
    let reqUrl = `https://sefaria.org/api/texts/${`${req.params.book}`}.${`${req.params.chapter}`}`;
    const sefariaRes = await axios.get(reqUrl);
    res.json(sefariaRes.data);
});

module.exports = router;

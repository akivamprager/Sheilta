const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:book/:chapter", async (req, res) => {
    const params = req.params;
    const sefariaRes = await axios.get("http://www.sefaria.org/api/texts/Kohelet.5");
    res.json(sefariaRes.data);
});

module.exports = router;

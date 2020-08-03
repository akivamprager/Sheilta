const express = require("express");
const router = express.Router();

router.get("/:book/:chapter", (req, res) => {
    const params = req.params;
    res.json({
        fish: "goldies",
        turtle: "big"
    });
});

module.exports = router;

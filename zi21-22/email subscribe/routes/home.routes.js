const express = require("express");
const router = express.Router();

const repoInstance = require("../repository/repo.js")

router.get("/", (req, res) => {
    console.log(repoInstance.getRepo())
    res.render("home", {
        categories: repoInstance.getRepo()
    })
})

module.exports = router;
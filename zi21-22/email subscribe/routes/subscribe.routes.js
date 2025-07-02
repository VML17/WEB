const express = require("express");
const router = express.Router();

const repo = require("../repository/repo.js")
// console.log(repo.getRepo())

router.get("/:name", (req, res) => {
    res.render("subscribe", {
        name: req.params.name,
        errMsg: null
    })
})

router.post("/:name", (req, res) => {

    const name = req.params.name;
    const newUser = {
        nick: req.body.nickname,
        email: req.body.email
    }

    if (repo.addUser(name, newUser)){
        console.log(repo.getRepo());
        res.redirect("/");
    }else{
        res.render("subscribe", {
            name: name,
            errMsg: `This nick and email (${newUser.nick}, ${newUser.email}) combination is already subscribed.`
        })
    }
})

module.exports = router;
const express = require("express");
const { route } = require("./home.routes");
const router = express.Router();

let movieRepo = [{name: "Inception", director: "Christopher Nolan"}];

router.get("/", (req, res) => {
    res.render("movieList", {
        movies: movieRepo
    })
})

router.get("/add", (req, res) => {
    res.render("addMovie")
})

router.post("/add", (req, res) => {
    const newMovie = {
        name: req.body.title,
        director : req.body.director
    }

    movieRepo.push(newMovie)

    res.redirect("/movies")
})

router.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    if (movieRepo.length > id){
        movieRepo.splice(id, 1);
        res.status(200).redirect("/movies");
    }else{
        res.status(404).json({msg:"No movie with that id"});
    }

})

module.exports = router;
const express = require("express");
const router = express.Router();
const repo = require("../repo/repo.quiz.js")



router.get("/start", (req, res) => {

    req.session.current = 1;
    req.session.correct = 0;

    res.redirect("/quiz/question/1");
});

router.get("/question/:num", (req, res) => {

    const id = parseInt(req.params.num);
    const current = req.session.current;

    console.log(id, current)

    if (current != id){
        res.redirect(`/quiz/question/${current}`)
    }else{
        const question = repo.questions.find(question => question.id == id);
        res.render("question", {
            question: question
        })
    }


});

router.get("/results", (req, res) => {
    console.log(req.session.correct)
    const correct = req.session.correct;
    const perc = ((correct / 6) * 100).toFixed(0);

    res.render("results", {
        correct: correct,
        perc: perc

    });
})

router.post("/question/:num/answer", (req, res) => {
    const id = parseInt(req.params.num)
    const idNext = id + 1;
    const answer = req.body.answer;
    const correct = repo.questions.find(question => question.id == id).correctAnswer;
    console.log(answer == correct);
    if(answer == correct){
        req.session.correct++;
    }

    req.session.current++;
    
    if(idNext > 6) {
        res.redirect("/quiz/results");
    }else{
        res.redirect(`/quiz/question/${idNext}`)
    }

});


module.exports = router;
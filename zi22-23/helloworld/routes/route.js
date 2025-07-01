const express = require('express')
const router = express.Router();

const categories = [
        {name: "Work", quantity:"0", reminders:[]}, 
        {name: "Movies and books", quantity:"0", reminders:[]}, 
        {name: "Fun", quantity:"0", reminders:[]}, 
        {name: "Sports", quantity:"0", reminders:[]}
    ];

let totalQuantity = 0;

router.get('/', (req, res) => {
    if (!req.session.todo)
        req.session.todo = categories;
    if(!req.session.quantity)
        req.session.quantity = 0;

    const todo = req.session.todo;
    const quantity = req.session.quantity;
    res.render('home', {
        categories: todo,
        sessionQuantity: quantity,
        totalQuantity: totalQuantity
    });
});

router.post('/add', (req, res) => {
    const today = new Date();
    const newReminder = {msg: req.body.textInput, date: today.toLocaleDateString('hr-HR')};
    // index = req.session.todo.findIndex(cat => cat.name === req.body.type);
    // req.session.todo[index].reminders.push(newReminder);
    
    category = req.session.todo.find(cat => cat.name === req.body.type);
    category.quantity++;
    category.reminders.push(newReminder)

    req.session.quantity++;
    totalQuantity++;
    
    res.redirect('/')
});

router.post('/delete', (req, res) => {

    category = req.session.todo.find(cat => cat.name === req.body.type);
    console.log(category)
    category.quantity--;
    category.reminders.splice(req.body.index - 1, 1);

    req.session.quantity--;
    totalQuantity--;

    res.redirect('/')
})

module.exports = router;
const express = require('express');
const router = express.Router();
const data = require('../data/mydata');
const e = require('express');

router.get('/', (req, res) => {
    res.redirect('/home/getCategories');
});

router.get('/getCategories', (req, res) => {

    const cart = req.session.cart || [];
    res.render('home', { 
        title: 'Dobrodošli', 
        categories : data.categories,
        totalCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    });
});


router.get('/getProducts/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = data.categories[categoryId - 1];
    const total = req.session.cart ? req.session.cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
    console.log(`Fetching products for category ID: ${categoryId}`);

    res.render('categoryPage', { 
        title: category.name, 
        products: category.products,
        categories : data.categories,
        activeCat: categoryId,
        cart: req.session.cart || [],
        totalCount: total,
    });
});

module.exports = router;
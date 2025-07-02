const express = require('express');
const router = express.Router();
const data = require('../data/mydata');

router.get('/', (req, res) => {
    res.redirect('/cart/getAll');
});

router.get('/getAll', (req, res) => {
    const cart = req.session.cart || [];
    
    
    const cartItems = cart.map(item => {
        let name = '';
        let price = 0;
        let image = '';

        for (category of data.categories) {
            for (product of category.products) {
                if (product.id == item.id) {
                    name = product.name;
                    image = product.image;
                    price = product.price;
                    break;
                }
            }
        }

        console.log(`Cart item: ${item.id}, Name: ${name}, Price: ${price}, Quantity: ${item.quantity}, image: ${image}`);

        return ({
            id: item.id,
            name: name,
            image: image,
            price: price,
            quantity: item.quantity
        })
    });

    console.log(`Cart items: ${JSON.stringify(cartItems)}`);

    res.render('cart', { 
        title: 'Košarica',
        cartItems: cartItems,
        totalCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    });
});



router.post('/add/:id', (req, res) => {
    const id = req.params.id;
    if (req.session.cart === undefined) {
        req.session.cart = [];
    }
    const item = req.session.cart.find(item => item.id === id);
    if (!item) {
        req.session.cart.push({ id: id, quantity: 1 });
    }else {
        item.quantity += 1;
    }


    console.log(`Adding product with ID: ${id}`);

    res.status(200).json({ success: true, cart: req.session.cart, message: `Product ${id} added to cart` });
});

router.post('/remove/:id', (req, res) => {
    const id = req.params.id;
 
    const itemIndex = req.session.cart.findIndex(item => item.id === id);
    const item = req.session.cart.find(item => item.id === id);

    if (item.quantity > 1) {
        item.quantity -= 1;
    }else {
        req.session.cart.splice(itemIndex, 1);
    }

    console.log(`Removing product with ID: ${id}`);

    res.status(200).json({ success: true, cart: req.session.cart, message: `Product ${id} removed from cart` });
});


module.exports = router;
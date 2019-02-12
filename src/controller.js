// controller.js
// Import cart model
Cart = require('./cart-model');

// Handle index actions
exports.index = function (req, res) {
    Cart.get(function (err, carts) {
        if (err) {
            res.json({
                status: "500",
                message: "Error Message:" + err,
            });
        }
        res.json({
            status: "200",
            message: "carts retrieved successfully",
            data: carts
        });
    });
};

// Handle create product actions
exports.new = function (req, res) {
    var cart = new Cart();    

// save the product and check for errors
    cart.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            status: '201',
            message: 'New cart created!',
            data: cart
        });
    });
};

// Handle view cart info
exports.view = function (req, res) {
    Cart.findById(req.params.cart_id, function (err, cart) {
        if (err)
            res.send(err);
        res.json({
            message: 'cart details loading..',
            data: cart
        });
    });
};


// Handle update cart info
exports.update = function (req, res) {
Cart.findById(req.params.cart_id, function (err, cart) {
        if (err)
            res.send(err);
        cart.cartId = req.body.cartId ? req.body.cartId : cart.cartId;
        cart.items = req.body.cart.items;

        cart.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: '201',
                message: 'product information is updated',
                data: cart
            });
        });
    });
};

// Handle delete cart
exports.delete = function (req, res) {
    Cart.remove({
        _id: req.params.cart_id
    }, function (err, cart) {
        if (err)
            res.send(err);
                res.json({
                status: "201",
                message: 'Cart is deleted'
            });
        });
};

exports.newItem = function (req, res) {
    Cart.findById(req.param.cart_id, function (err, cart) {
        cart.items.add(req.body.itemId, req.body.productLink, req.body.quantity);        
    });
};
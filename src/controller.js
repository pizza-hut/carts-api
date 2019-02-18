// controller.js
// Import cart model
Cart = require('./cart-model');

// Handle index actionss
exports.index = function (req, res) {
    console.log("carts api index");
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
    console.log("requestor:" + req.body.requestor);
    console.log("JSON:" + JSON.stringify(req.body.items));
    
    cart.items = req.body.items.slice();

// save the product and check for errors
    cart.save(function (err) {
        if (err) res.json(err);
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
        if (err) res.send(err);
        res.json({
            status: '200',
            message: 'cart ' + req.params.cart_id + ' details',
            data: cart
        });
    });
};


// Handle update cart info
exports.update = function (req, res) {
Cart.findById(req.params.cart_id, function (err, cart) {
        if (err)
            res.send(err);
        console.log(JSON.stringify(req.body.items));
        cart.items = req.body.cart.items.slice();        
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
    Cart.remove({ _id: req.params.cart_id}, function (err, cart) {
        if (err)
            res.send(err);
        res.json({
        status: "201",
        message: 'Cart is deleted'
            });
        });
};

//Get cart items
exports.getItems = function(req, res) {
    Cart.findById(req.params.cart_id, function(err, cart) {
        console.log(req.params);
        res.json({
            status: '200',
            data: cart.items.slice()
        });
    });                                                
                                                    
};

//Add a new item to cart
exports.newItem = function (req, res) {
    Cart.findById(req.params.cart_id, function (err, cart) {        
        //var item =[req.body._id, req.body.productId, req.body.productLink, req.body.quantity];
        cart.items.push(req.body._id, req.body.productId, req.body.productLink, req.body.quantity);      
        cart.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: '201',
                message: 'Item No.' + cart.items.length + ' is added',
                data: cart.items.slice(cart.items.length -1)
            });
        });
    });
};
                  
//view a specific item in cart
exports.viewItem = function (req, res) {
    Cart.findById(req.params.cart_id, function(err, cart) {
        if (err)
            res.send(err);
        res.json({
            status: "200",
            data: cart.items.slice(req.params.itemIndex, req.params.itemIndex+1) 
        });
    });
};

//checkout
exports.checkout = function (req, res) {
    if (err)
        res.send(err);

};
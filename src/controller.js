// controller.js
// Import cart model
Cart = require('./cart-model');
orderService = require('./orderService');

const config = require('./config');
const uuid = require('uuid/v5');

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

// Handle create cart actions
exports.new = function (req, res) {
    var cart = new Cart();
    console.log("requestor:" + req.body.requestor);
    console.log("JSON:" + JSON.stringify(req.body.items));
    
    cart.cart_id = uuid(config.get('server.hostName'), uuid.DNS);
    console.log(cart.cart_id);
    cart.items = req.body.items.slice();

// save the cart and check for errors
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
        var itemId = cart.items.length + 1;
        var item ={"productId":req.body.productId, "productLink":req.body.productLink};
        cart.items.push(item);
        console.log(cart.items);      
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
    Cart.findById(req.params.cart_id, function(err, cart) {
        console.log(req.params.cart_id + ' checking out...');
        if (err) {
            console.log(req.params.cart_id + ' ' + err);    
            res.send(err);
        } else {
            var orderId;
            orderId = orderService.createOrder(cart);
            console.log('controller ' + orderId);
            cart.status = 'checkout';
            cart.save;
        };

        console.log(cart._id + ' ' + cart.status);
        res.json({
            status: "200",
            data: cart.items.slice(req.params.itemIndex, req.params.itemIndex+1)})    
    });    
};
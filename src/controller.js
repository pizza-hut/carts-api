// controller.js
// Import cart model
Cart = require('./cart-model');
orderService = require('./orderServicePromise');

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
    cart.cart_id = uuid(config.get('server.hostName'), uuid.DNS);
    console.log(cart.cart_id + ' is created');
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
        
        //initialize totalPrice to calculate totalPrice
        cart.totalPrice = 0;

        if (err)
            res.send(err);
        console.log(req.params.cart_id + ' requesting checkout Cart._id ' + cart._id);

        //Calculate cart subTotal and totalPrice
        for (var i=0; i < cart.items.length; i++) {

            //initialize subTotal to calculate subTotal
            var subTotal = 0;
            cart.items[i].subTotal = subTotal;

            if (cart.items[i].price === null || cart.items[i].price === 0) {
                cart.items[i].price = 0;
            }

            if (cart.items[i].quantity === null || cart.items[i].quantity === 0) {
                cart.items[i].quantity = 1;
            }
            
            subTotal = cart.items[i].price * cart.items[i].quantity;
            cart.items[i].subTotal = subTotal;            
            cart.totalPrice = cart.totalPrice + cart.items[i].subTotal;
        }

        //create order
        orderService.createOrderPromise(cart)
            .then(function(response){
                console.log('controller is fulfilled');
                console.log(response);
                cart.status = 'checkout';
                cart.orderId = response.data;
                
                //save cart
                cart.save(function (err) {
                    if (err) {
                        res.send(err);
                        console.log(err);
                    }
                    //console.log(cart);
                    res.json({response});
                });
            })
            .catch(function(error){
                console.log(error);
            }) 
                
    });    
}; 
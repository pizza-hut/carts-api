// cart-model.js
var mongoose = require('mongoose');
// Setup schema

var SchemaTypes = mongoose.Schema.Types;

var cartSchema = mongoose.Schema({
    cartId: String,
    items: [{
        // _id: Number,
        productId: String,
        productLink: String,
        productOptionValues: [{
            option: String,
            value: String
        }],
        quantity: Number,
        price: Number,
        subTotal: Number         
    }],                                      
    totalPrice: {
        type: Number
    },
    status: {
        type: String
    },
    orderId: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now  
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now  
    }
});

// Export Cart model
var Cart = module.exports = mongoose.model('cart', cartSchema);

module.exports.get = function (callback, limit) {
    Cart.find(callback).limit(limit);
};
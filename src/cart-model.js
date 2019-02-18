// cart-model.js
var mongoose = require('mongoose');
// Setup schema

var SchemaTypes = mongoose.Schema.Types;

var cartSchema = mongoose.Schema({
    
    items: [{
        //_id: Number,
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
                                      
    totalCost: {
        type: Number
    },
    
    createdDate: {
        type: Date,
        default: Date.now  
    }
});

// Export Cart model
var Cart = module.exports = mongoose.model('cart', cartSchema);

module.exports.get = function (callback, limit) {
    Cart.find(callback).limit(limit);
};
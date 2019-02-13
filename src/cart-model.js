// cart-model.js
var mongoose = require('mongoose');
// Setup schema

var SchemaTypes = mongoose.Schema.Types;

var cartSchema = mongoose.Schema({
    
    items: [{
        productId: String,
        productLink: String,
        quantity: Number         
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
}
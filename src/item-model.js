var mongoose = require('mongoose');
// Setup schema

var itemSchema = mongoose.Schema({
    itemId: String,
    productLink: String,
    quantity: Number        
});
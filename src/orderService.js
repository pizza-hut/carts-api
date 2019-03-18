//orderService.js

const axios = require('axios');
const Cart = require('./cart-model');

function OrderResponse(httpCode, status, message) {
    this.httpCode = httpCode;
    this.status = status;
    this.message = message;
};

function createOrder(Cart) {
axios.post('http://localhost:9191/api/orders', {
    items: Cart.items,                                      
    totalCost: Cart.totalCost
    })
    .then(function (response) {
        return response;        
    })
    .catch(function (error) {
        console.log('ecounter error');
        console.log(error);
    });
};

module.exports.createOrder = function(orderItems, orderTotalCost) {
    createOrder(orderItems, orderTotalCost);
};
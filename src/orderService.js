//orderService.js

const axios = require('axios');

function OrderResponse(httpCode, status, message) {
    this.httpCode = httpCode;
    this.status = status;
    this.message = message;
};

function createOrder(orderItems, orderTotalCost) {
axios.post('http://localhost:9191/orders', {
    items: orderItems,                                      
    totalCost: orderTotalCost
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
//orderService.js

const axios = require('axios');
const Cart = require('./cart-model');
const config = require('./config.js');

var orderServiceUrl = config.get('order.url');

var Promise = require('promise');

var createOrderResponse;

function createOrder(Cart) {
    console.log(Cart._id);
    axios.post(orderServiceUrl, {
    items: Cart.items,
    totalCost: Cart.totalCost
    })
    .then(function (response) {
        let createOrderResponse = response.data;
        console.log (response.data);
        console.log(createOrderResponse);
        //console.log(response.status);        
        //console.log(response.data);
        //console.log(response.status);
        //console.log(response.statusText);
        //console.log(response.headers);
        //console.log(response.config);

        return response.data;
    })
    .catch(function (error) {
        console.log('order remote ' + error);
        return error;
    });       
}

var errHandler = function(err) {
    console.log(err);
}

module.exports.createOrder = function (Cart) {
    createOrder(Cart)
    .then(function (response){
            return response;
        }
    );
};

//orderService.js

const axios = require('axios');
const Cart = require('./cart-model');
const config = require('./config.js');

var orderServiceUrl = config.get('order.url');

var orderId;

function createOrderPromise(Cart) {
    return new Promise(function(resolve, reject){
        createOrder(Cart) 
    })
}

function createOrder(Cart) {
    axios.post(orderServiceUrl, {
    items: Cart.items,
    totalCost: Cart.totalCost
    })
    .then(function (response) {
        console.log(response.status);        
        console.log(response.data);
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

module.exports.createOrder = function(Cart) {
    var orderIdPromise = createOrderPromise(Cart);
    orderIdPromise.then(JSON.parse, errHandler)
                  .then(function(result){
                      orderId = result;
                      console.log('export orderid' + orderId);
                  }, errHandler)
                  .then(function(data) {
                      console.log('export ' + data);
                  }, errHandler);    
};
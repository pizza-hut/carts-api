//orderServicePromise.js

const axios = require('axios');
const Cart = require('./cart-model');
const config = require('./config.js');

var orderServiceUrl = config.get('order.url');

var Promise = require('promise');

function createOrder(Cart) {
    console.log(Cart._id);
    return new Promise(function(resolve, reject) {
        axios.post(orderServiceUrl, {
            items: Cart.items,
            totalCost: Cart.totalCost
            })
            .then(function (response) {
                console.log('remote order is fulfilled');
                console.log(response.data);
                var res = response.data;
                resolve(res);
                console.log('remote order is returning');
            })
            .catch(function (error) {
                console.log(error);
                reject(error);                
            });    
    });
}


module.exports.createOrder = function(Cart) {createOrder(Cart)};

module.exports.createOrderPromise = function(Cart) {
    return new Promise(function(resolve, reject){
        createOrder(Cart)
            .then(function(response) {
                console.log ('export module is fulfilled');
                console.log (response);
                console.log ('export module returning...');
                resolve(response);
            })
            .catch(function(error) {
                console.log(error);
                reject(error);
            })

    })   

};
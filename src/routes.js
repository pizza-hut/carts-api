// api-routes.js
// Initialize express router

var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: '200',
        message: 'Carts API',
    });
    console.log("logging /");
});

// Import product controller
var controller = require('./controller');

// Product routes
router.route('/carts')
    .get(controller.index)
    .post(controller.new);

router.route('/carts/:cart_id')
    .get(controller.view)
    .patch(controller.update)
    .put(controller.update)
    .delete(controller.delete);

router.route('/carts/:cart_id/items')
    .post(controller.newItem)
    .get(controller.getItems)
//   .putItem(controller.update)
//    .deleteItem(controller.delete)

router.route('/carts/:cart_id/items/:itemIndex')
    .get(controller.viewItem)

// Export API routes
module.exports = router;
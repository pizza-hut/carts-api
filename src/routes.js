// api-routes.js
// Initialize express router
let router = require('express').Router();

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
//   .putItem(controller.update)
//    .deleteItem(controller.delete)

// Export API routes
module.exports = router;
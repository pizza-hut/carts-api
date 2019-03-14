// api-routes.js
// Initialize express router

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

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

// Swagger routes
//router.use('/', swaggerUi.serve);
//router.use('/', swaggerUi.setup(swaggerDocument));

// Carts routes
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
    .get(controller.getItems);
//   .putItem(controller.update)
//    .deleteItem(controller.delete)

router.route('/carts/:cart_id/items/:itemIndex')
    .get(controller.viewItem);

router.route('/carts/:cart_id/checkout')
    .post(controller.checkout);
// Export API routes
module.exports = router;
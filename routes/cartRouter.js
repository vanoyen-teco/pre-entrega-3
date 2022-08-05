const express = require("express");
const router = express.Router();
const passport = require('passport');

const cartController = require("../controllers/cartController");

/*Middleware Cart*/
const cartHandler = require("../middlewares/cartHandler");

router.get('/', cartController.printCart);

router.get('/add/:id', cartHandler, cartController.addProductToCart);

router.get('/prod/remove/:id', cartHandler, cartController.deleteProductFromCart);

router.get('/process', cartController.processCart);

router.get('/success', cartController.successCart);


module.exports = router;
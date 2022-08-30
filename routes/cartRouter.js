const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");


router.get('/', cartController.printCart);

router.get('/add/:id', cartController.addProductToCart);

router.get('/prod/decrease/:id', cartController.decreaseOneProduct);

router.get('/prod/remove/:id', cartController.deleteProductFromCart);

router.post('/process', cartController.processCart);

router.get('/success', cartController.successCart);


module.exports = router;
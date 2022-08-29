const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get('/all', productController.getProducts);

router.get('/product/:id', productController.getProductById);

router.post('/add', productController.createNewProduct);

router.put('/edit/:id', productController.updateOneProduct);

router.delete('/remove/:id', productController.deleteOneProduct);

module.exports = router;
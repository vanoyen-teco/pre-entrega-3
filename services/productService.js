const Product = require("../database/Product");
const config = require('../config/global');

const mainPath = config.mainPath;
const path = mainPath + config.imgPath;

const getAllProducts = (section) => {
    const allProducts = Product.getAllProducts(section);
    let prods = allProducts.then((prods) => {
        prods.forEach((element, index) => {
            prods[index].foto = path+element.foto;
        });
        return prods;
    });
    return prods;
};

const getProductById = (productId) => {
    const getProduct = Product.getProductById(productId);
    return getProduct;
};

const createNewProduct = (newProduct) => {
    try {
        const createdProduct = Product.createNewProduct(newProduct);
        return createdProduct;
    } catch (error) {
        return false;
    }
};

const updateOneProduct = (productId, changes) => {
    try {
        const updatedProduct = Product.updateOneProduct(productId, changes);
        return updatedProduct;
    } catch (error) {
        return false;
    }
};

const deleteOneProduct = (productId) => {
    const deletedProduct = Product.deleteOneProduct(productId);
    return deletedProduct;
};

const getSelectedProducts = (selection) => {
    return Product.getSelectedProducts(selection);
}

module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    updateOneProduct,
    deleteOneProduct,
    getSelectedProducts,
};
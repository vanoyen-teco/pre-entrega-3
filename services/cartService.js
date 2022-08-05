const Cart = require("../database/Cart");

const createNewCart = (userEmail) => {
    const CartToInsert = {
        timestamp: new Date().getTime(),
        email: userEmail,
    };
    try {
        const createdCart = Cart.createNewCart(CartToInsert);
        return createdCart;
    } catch (error) {
        return false;
    }
};

const deleteOneCart = (cartId) => {
    const deletedCart = Cart.deleteOneCart(cartId);
    return deletedCart;
};

const getCartById = (cartId) => {
    return Cart.getCartById(cartId);
};

const isCart = (email) => {
    return Cart.getCartById(email);
};


const insertNewProduct = (cartId, newProduct) => {
    try {
        const insertedProduct = Cart.insertNewProduct(cartId, newProduct);
        return insertedProduct;
    } catch (error) {
        return false;
    }
};

const deleteProductFromCart = (cartId, prodId) => {
    try {
        return (Cart.getCartById(cartId))?Cart.deleteOneProduct(cartId, prodId):false;
    } catch (error) {
        return false;
    }
};

const addProductToCart = (cartId, prodId) => {
    try {
        return Cart.addProductToCart(cartId, prodId);
    } catch (error) {
        return false;
    } 
}

module.exports = {
    createNewCart,
    insertNewProduct,
    getCartById,
    deleteOneCart,
    deleteProductFromCart,
    isCart,
    addProductToCart,
};
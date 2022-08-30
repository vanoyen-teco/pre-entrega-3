require('dotenv/config');
let dataBaseType = process.env.DB || 'MongoDb';
// Verifico contenido de variable de entorno DB

dataBaseType = (dataBaseType == 'MongoDb' || dataBaseType == 'Firebase')?dataBaseType:'MongoDb';
const db = require(`./daos/cart${dataBaseType}`);

const getAllCarts = () => {
    return db.get();
};

const getCartById = (cartId) => {
    return db.getById(cartId);
};

const isCart = (email) => {
    return db.isCart(email);
};

const createNewCart = (CartToInsert) => {
    const res = db.add(CartToInsert);
    return (res)?CartToInsert:false;
};

const insertNewProduct = async (cartId, newProduct) => {
    const cart = await getCartById(cartId);
    
    // cart item
    if(cart.productos != undefined){
        const isAlreadyAdded =
        cart.productos.findIndex((product) => product.id == newProduct.id) > -1;
        if (isAlreadyAdded) {
            return false;
        }else{
            cart.productos.push(newProduct);
        }
    }else{
        cart.productos = [newProduct];
    }
    db.update(cartId, cart.productos);
    return newProduct;
};

const deleteOneCart = (cartId) => {
    try {
        return db.remove(cartId);
    } catch (error) {
        return false;
    }  
};

const deleteOneProduct = async (cartId, prodId) => {
    const cart = await getCartById(cartId);
    const productIndex =
        cart.productos.findIndex(
            (product) => product.id === prodId
        );
    if (productIndex === -1) {
        return false;
    }else{
        cart.productos.splice(productIndex, 1);
        db.update(cartId, cart.productos);
        return true;
    }
};

const addProductToCart = async (cartId, prodId) => {
    let cart = await getCartById(cartId);
    if(!cart){
        const CartToInsert = {
            timestamp: new Date().getTime(),
            email: cartId,
            productos: [{id: prodId, cant: 1}]
        };
        cart = await createNewCart(CartToInsert);
        return true;
    }
    productIndex =
    cart.productos.findIndex(
        (product) => product.id === prodId
    );  
    if (productIndex === -1) {
        cart.productos.push({id: prodId, cant: 1});
        db.update(cartId, cart.productos);
        return true;
    }else{
        cart.productos[productIndex].cant += 1;
        db.update(cartId, cart.productos);
        return true;
    }
}

const decreaseOneProduct = async (cartId, prodId) => {
    const cart = await getCartById(cartId);
    const productIndex =
        cart.productos.findIndex(
            (product) => product.id === prodId
        );
    if (productIndex === -1) {
        return false;
    }else{
        cart.productos[productIndex].cant -= 1;
        if(cart.productos[productIndex].cant < 1){
            return deleteOneProduct(cartId, prodId);
        }else{
            db.update(cartId, cart.productos);
            return true;
        }
    }
}

module.exports = { 
    getAllCarts,
    createNewCart,
    insertNewProduct,
    getCartById,
    deleteOneCart,
    deleteOneProduct,
    isCart,
    addProductToCart,
    decreaseOneProduct,
};
const cartService = require("../services/cartService");
const productService = require("../services/productService");
const notifications = require('../controllers/notifications');

const createNewCart = (userEmail) => {
    const createdCart = cartService.createNewCart(userEmail);
    (createdCart)?true:false;
};

const insertNewProduct = (userEmail, prodId) => {

};

const deleteOneCart = (req, res) => {
    if(!req.params.id){
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const deletedCart = cartService.deleteOneCart(req.params.id);
    deletedCart.then((del)=>{
        (del)
        ?res.status(200).send({ status: "OK", data: deletedCart })
        :res.status(404).send({ status: "NOT FOUND", data: {error: "Lo sentimos, no encontramos el carrito."} })
    })    
};

const getAllFromOneCart = (userEmail) => {
    if(!userEmail){
        return false;
    }else{
        const cart = cartService.getCartById(userEmail);
        return (cart)?cart:false;
    }
};

const isCart = (userEmail) => {
    return cartService.isCart(userEmail);
}

const deleteProductFromCart = (req, res) => {
    if(!req.user || !req.params.id){
        res.redirect('/error');
    }
    const deletedProduct = cartService.deleteProductFromCart(req.user.email, req.params.id);
    return (!deletedProduct)
    ?res.redirect('/error')
    :res.redirect('/cart');
};

const addProductToCart = (req, res) => {
    const {email} = req.user;
    cartService.addProductToCart(email, req.params.id)
    .then(() => {
        res.redirect('/cart');
    });
};

const printCart = (req, res) => {
    let productos = false;
    if(!req.user){
        res.redirect('/login');       
    }else{        
        let cart = isCart(req.user.email);  
        cart.then((cartRes) => {
            if(cartRes.productos){
                productos = cartRes.productos;
                getIds = productos.map((prod) => parseInt(prod.id));
                productService.getSelectedProducts(getIds)
                .then(response => response.json())
                .then(result => {
                    if(result != null){
                        productos = result;
                        productos.forEach(item => {
                            let num = cartRes.productos.find((product) => product.id == item.id);
                            item.cantidad = num.cant;
                        });
                    }
                    res.render("carrito", {
                        pageTitle: "Carrito",
                        productos: productos,
                        loggedIn: true,
                        signUp: false
                    });
                })
            };
        });
    }    
}

const processCart = (req, res) => {
    if(!req.user){
        res.redirect('/login');
    }else{
        let cart = isCart(req.user.email);  
        cart.then((cartRes) => {
            if(cartRes.productos){
                productos = cartRes.productos;
                getIds = productos.map((prod) => parseInt(prod.id));
                productService.getSelectedProducts(getIds)
                .then(response => response.json())
                .then(result => {
                    if(result != null){
                        productos = result;
                        productos.forEach(item => {
                            let prod = cartRes.productos.find((product) => product.id == item.id);
                            item.cantidad = prod.cant;
                            item.subto = prod.cant * item.precio;
                        });
                    }
                    notifications.sendCart(req.user, productos);
                    notifications.sendSMS(req.user);
                    notifications.sendCartAlert(req.user);
                    res.redirect('/cart/success');
                })
            };
        });
    }
}

const successCart = (req, res) => {
    res.render("success", {
        pageTitle: "Carrito",
        loggedIn: true,
        signUp: false
    });
}

module.exports = {
    createNewCart,
    getAllFromOneCart,
    insertNewProduct,
    deleteOneCart,
    deleteProductFromCart,
    isCart,
    addProductToCart,
    printCart,
    processCart,
    successCart,
};
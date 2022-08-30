const cartService = require("../services/cartService");
const orderService = require("../services/orderService");
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

const decreaseOneProduct = (req, res) => {
    const {email} = req.user;
    cartService.decreaseOneProduct(email, req.params.id)
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
                        signUp: false,
                        scripts : [{ script: './js/cart.js'}]
                    });
                })
            }else{
                res.render("carrito", {
                    pageTitle: "Carrito",
                    productos: [],
                    loggedIn: true,
                    signUp: false,
                    scripts : [{ script: './js/cart.js'}]
                });
            }
        });
    }    
}


const processCart = (req, res) => {
    const { body } = req;
    if(!req.user){
        res.redirect('/login');
    }else{
        if (
            !body.direccion 
        ){
            res.redirect('/cart');
        }
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
                            item.precio = item.precio;
                            item.titulo = item.titulo;
                            item.SKU = item.SKU;
                            item.cantidad = prod.cant;
                            item.subto = prod.cant * item.precio;
                        });
                    }
                    // Crea la orden
                    orderService.createNewOrder(req.user.email, productos, body.direccion);
                    // Notificaciones generales
                    notifications.sendCart(req.user, productos);
                    notifications.sendSMS(req.user);
                    notifications.sendCartAlert(req.user);
                    // Elimino el carrito procesado y pasado a orden.
                    cartService.deleteOneCart(cartRes._id);
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
    decreaseOneProduct,
    printCart,
    processCart,
    successCart,
};
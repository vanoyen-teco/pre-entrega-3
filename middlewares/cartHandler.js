const logger = require("../config/logger");
const cartController = require("../controllers/cartController");

function cartHandler(req, res, next){
    if(req.user){
        let cart = cartController.isCart(req.user.email);
        cart.then((cartRes) => {
            if(!cartRes){
                cart = cartController.createNewCart(req.user.email);
                if(!cart){
                    logger.loggerConsole.error('No hay usuario');
                    res.redirect('/error');
                }
            }
            next();
        })        
    }else{
        logger.loggerConsole.error('No se encuentra logueado');
        res.redirect('/login');
    }
}

module.exports = cartHandler;
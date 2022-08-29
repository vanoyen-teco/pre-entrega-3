const notifications = require('./notifications');
const logger = require("../config/logger");
const images = require("../models/images");
let fs = require('fs');
const totalCPUs = require("os").cpus().length;

const root = (req, res) => {
    if(req.user){
        res.redirect('/products');
    }else{
        res.redirect('/login');
    }
}

const error = (req, res) => {
    res.render("error", {
        pageTitle: "Error",
        signUp: true
    });
}
const loginGet = (req, res) => {
    res.render("login", {
        pageTitle: "LogIn",
        signUp: true
    });
}

const loginPost = (req, res) => {
    res.redirect('/products');
}

const loginFail = (req, res) => {
    res.render("login", {
        pageTitle: "LogIn",
        signUp: true,
        error: true
    });
}
const signupGet = (req, res) => {
    res.render("signup", {
        pageTitle: "Sign Up",
        signUp: true
    });
}
const signupFile = (req, res) => {
    let name = req.file.mimetype;
    name = name.split('/');
    name = req.file.filename+'.'+name[1];
    fs.rename('./public/uploads/'+req.file.filename, './public/uploads/'+'/'+name, function(err) {
        if(err){
            logger.loggerError.log(err);
        }else{
            images.resizeImage('./public/uploads/',name,400,400);
        }
        
    });
    notifications.registrationNotice(req.user);
    res.redirect('/dashboard');
}

const signupFail = (req, res) => {
    res.render("signup", {
        pageTitle: "Sign Up",
        signUp: false,
        fail: true
    });
}
const dashboard = (req, res) => {
    if(req.user){
        res.render("dashboard", {
            pageTitle: "Dashboard",
            userName: req.user.nombre,
            userEmail: req.user.email,
            userDir: req.user.direccion,
            userAge: req.user.edad,
            userPhone: req.user.telefono,
            userImage: req.user.imagen,
            loggedIn: true,
            signUp: false
        });
    }else{
        res.redirect('/login');
    }
}

const logout = (req, res) => {
    req.logout((err) => {
        res.redirect('/login');
    })
}

const info = (req, res) => {
    let loggedIn = (req.user)?true:false;
    let signUp = (req.user)?false:true;
    const argumentos = (process.argv)?process.argv.slice(2):false;
    const datos = {
        pageTitle: "Server Info",
        loggedIn: loggedIn,
        signUp: signUp,
        server: { 
            "processId": process.pid,
            "directorio" : __dirname,
            "path": process.cwd(),
            "nodeVersion": process.version,
            "proceso": process.title,
            "os": process.platform,
            "memory": process.memoryUsage().rss,
            "argumentos": argumentos,
            "cpus": totalCPUs
        }
    }
    res.render("info",datos);
}

module.exports = {
    root,
    error,
    loginGet,
    loginPost,
    loginFail,
    signupGet,
    signupFile,
    signupFail,
    dashboard,
    logout,
    info,
};
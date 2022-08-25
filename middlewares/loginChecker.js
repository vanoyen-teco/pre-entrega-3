const express = require("express");

function loginChecker(req, res, next){
    if(req.user){
        next();
    }else{
        res.redirect('/login');
    }
}

function adminChecker(req, res, next){
    if(req.user && req.user.nivel == 'admin'){
        next();
    }else{
        res.redirect('/login');
    }
}


module.exports = {
    loginChecker,
    adminChecker,
};
const express = require("express");

function loginChecker(req, res, next){
    if(req.user){
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = loginChecker;
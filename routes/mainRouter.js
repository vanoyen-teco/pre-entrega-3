const express = require("express");
const router = express.Router();
const totalCPUs = require("os").cpus().length;

const passport = require('passport');

const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
let fs = require('fs');

const productController = require("../controllers/productController");
const notifications = require('../controllers/notifications');

const loginChecker = require("../middlewares/loginChecker");
const { loggerConsole } = require("../config/logger");

router.get('/', (req, res) => {
    res.redirect('/login');
})

router.get('/error', (req, res) => {
    res.render("error", {
        pageTitle: "Error",
        signUp: true
    });
})

router.get('/products/:section?', loginChecker, productController.getProducts);

router.route('/login')
    .get((req, res) => {
        res.render("login", {
            pageTitle: "LogIn",
            signUp: true
        });
    })
    .post(passport.authenticate('login', { failureRedirect: '/login/fail'}), (req, res)=>{
        res.redirect('/products');
    });

router.route('/login/fail')
    .get((req, res) => {
        res.render("login", {
            pageTitle: "LogIn",
            signUp: true,
            error: true
        });
    });
  
router.route('/signup')
    .get((req, res) => {
        res.render("signup", {
            pageTitle: "Sign Up",
            signUp: true
        });
    })
    .post(upload.single('imagen'), passport.authenticate('register', { failureRedirect: '/signup/fail'}), (req, res)=>{
        let name = req.file.mimetype
        name = name.split('/');
        name = req.file.filename+'.'+name[1];
        fs.rename('./public/uploads/'+req.file.filename, './public/uploads/'+'/'+name, function(err) {
            if ( err ) console.error(err);
        });
        notifications.registrationNotice(req.user);
        res.redirect('/dashboard');
    });

router.route('/signup/fail')
    .get((req, res) => {
        res.render("signup", {
            pageTitle: "Sign Up",
            signUp: false,
            fail: true
        });
    });

router.route('/dashboard')
    .get((req, res) => {
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
    });

router.route('/logout')
    .get((req, res) => {
        req.logout((err) => {
            if (err) { res.redirect('/login') }
            else 
            res.render("logout", {
                pageTitle: "Logout",
                signUp: false 
            });
        })    
    });

router.route('/info')
    .get((req, res) => {
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
        //console.log(datos);
        res.render("info",datos);
    });

module.exports = router;
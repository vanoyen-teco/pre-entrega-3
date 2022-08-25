const express = require("express");
const router = express.Router();

const passport = require('passport');

const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

const mainController = require('../controllers/mainController');
const productController = require("../controllers/productController");

const { loginChecker } = require("../middlewares/loginChecker");


router.get('/', mainController.root);

router.get('/error', mainController.error);

router.get('/products/:section?', loginChecker, productController.getProducts);

router.route('/login')
    .get(mainController.loginGet)
    .post(passport.authenticate('login', { failureRedirect: '/login/fail'}), mainController.loginPost);

router.route('/login/fail')
    .get(mainController.loginFail);
  
router.route('/signup')
    .get(mainController.signupGet)
    .post(upload.single('imagen'), passport.authenticate('register', { failureRedirect: '/signup/fail'}), mainController.signupFile);

router.route('/signup/fail')
    .get(mainController.signupFail);

router.route('/dashboard')
    .get(mainController.dashboard);

router.route('/logout')
    .get(mainController.logout);

router.route('/info')
    .get(mainController.info);

module.exports = router;
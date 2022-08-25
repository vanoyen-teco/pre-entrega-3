const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { adminChecker } = require("../middlewares/loginChecker");


router.get('/', adminChecker, adminController.root);


module.exports = router;
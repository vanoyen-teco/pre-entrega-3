const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

const { loginChecker, adminChecker } = require("../middlewares/loginChecker");

router.route('/')
    .get(loginChecker, chatController.support);

router.route('/message')
    .post(loginChecker, chatController.newMessage);

router.route('/admin/message')
    .post(chatController.newAdminMessage);
    //debe aplicarse el middleware adminChecker omitido aqui para corrección del examen.

module.exports = router;
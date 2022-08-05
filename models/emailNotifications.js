"use strict";
require('dotenv/config');
const nodemailer = require("nodemailer");
const logger = require("../config/logger");
const views = require('../views/emails');

const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_ADMIN_TITLE = process.env.EMAIL_ADMIN_TITLE;
const EMAIL_ADMIN = process.env.EMAIL_ADMIN;

async function createAlta(user) {
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: `"${EMAIL_ADMIN_TITLE}" <${EMAIL_USER}>`,
        to: `${EMAIL_ADMIN}`,
        subject: "Nuevo Registro",
        html: `
            <div>
                <p>Email: ${user.email}</p>
                <p>Nombre: ${user.nombre}</p>
                <p>Dirección: ${user.direccion}</p>
                <p>Edad: ${user.edad}</p>
                <p>Tel: ${user.telefono}</p>
            </div>
        `,
    });

    logger.loggerConsole.log(`Mensaje Enviado: ${info.messageId}`);
}

async function createCart(user, cart) {
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    let header = `<h2>Pedido de: ${user.nombre}</h2>`;

    let products = '';
    let total = 0;
    cart.forEach(item => {
        products += views.getItem(item);
        total += item.subto;
    });

    total = `<div>Total: $ ${total}</div>`;

    const info = await transporter.sendMail({
        from: `"${EMAIL_ADMIN_TITLE}" <${EMAIL_USER}>`,
        to: `${EMAIL_ADMIN}`,
        subject: `Nuevo pedido de: ${user.email} ${user.nombre}` ,
        html: `
            ${header}
            ${products}
            ${total}
        `,
    });

    logger.loggerConsole.log(`Mensaje Enviado: ${info.messageId}`);

}

function sendAlta(user){
    return createAlta(user).catch(console.error);
}
function sendCart(user, cart){
    return createCart(user, cart).catch(console.error);
}



module.exports = {
    sendAlta,
    sendCart,
}

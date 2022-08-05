require('dotenv/config');
const logger = require("../config/logger");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);


const sendSMS = (user) => {
    client.messages
        .create({
            body: 'Hola, tu pedido ha sido recibido y se encuentra en proces. Gracias.',
            to: user.telefono,
            from: process.env.TWILIO_FROM_NUMBER,
        })
        .then((message) => logger.loggerConsole.log(message.sid, message.status));
};

const sendCartAlert = (user) => {
    client.messages
    .create({
        body: `Nuevo Pedido en el sitio. Pedido de: ${user.nombre} (${user.telefono})`,
        to: `whatsapp:${process.env.TWILIO_TO_NUMBE}`,
        from: `whatsapp:${process.env.WHATSAPP_FROM_NUMBER}`,
    })
    .then(message => logger.loggerConsole.log(message.sid, message.status));
}


module.exports = {
    sendSMS,
    sendCartAlert,
}
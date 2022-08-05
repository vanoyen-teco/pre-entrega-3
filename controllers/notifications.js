const emails = require("../models/emailNotifications");
const twilio = require("../models/twilioNotifications");

const registrationNotice = (user) => {
    emails.sendAlta(user);
}

const sendCart = (user, cart) => {
    emails.sendCart(user, cart);
}

const sendSMS = (user) => {
    twilio.sendSMS(user);
}

const sendCartAlert = (user) => {
    twilio.sendCartAlert(user);
}

module.exports = {
    registrationNotice,
    sendCart,
    sendSMS,
    sendCartAlert,
}
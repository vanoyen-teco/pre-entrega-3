const Chat = require("../database/Chat");

const getAll = (user) => {
    const allMessages = Chat.getAll(user);
    let items = allMessages.then((items) => {
        return items;
    });
    return items;
};

const createNewMessage = (newMessage) => {
    try {
        const createdMessage = Chat.createNew(newMessage);
        return createdMessage;
    } catch (error) {
        return false;
    }
};

module.exports = {
    getAll,
    createNewMessage,
};
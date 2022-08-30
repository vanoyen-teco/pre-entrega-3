const Order = require("../database/Order");

const createNewOrder = (userEmail, products, direccion) => {
    const OrderToInsert = {
        productos: products,
        email: userEmail,
        direccion: direccion,
    };
    try {
        const createdOrder = Order.createNewOrder(OrderToInsert);
        return createdOrder;
    } catch (error) {
        return false;
    }
};

module.exports = {
    createNewOrder,
};
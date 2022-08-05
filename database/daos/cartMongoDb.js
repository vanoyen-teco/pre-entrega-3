const mongoose = require('mongoose');

const { mongoDbConfig } = require("./config");
const url = mongoDbConfig.connectString;

mongoose.connect(url)
.catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})

mongoose.connection;

const Schema = mongoose.Schema;
const CartModelSchema = new Schema({
    productos: [],
    timestamp: { type: Number },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    id: String
});
const CartModel = mongoose.model('carritos', CartModelSchema );

async function get(){
    const querySnapshot = await CartModel.find();
    return querySnapshot;
}

async function getById(cartId){
    const cart = await CartModel.findOne({email: cartId});
    return (cart == null)?false:cart;
}

async function isCart(email){
    return await CartModel.findOne({email});
}

async function add(newCart){
    CartModel.create({ timestamp: newCart.timestamp, email: newCart.email }, function (err, cart) {
        if (err) console.log(err);
    })

    const doc = await CartModel.findOne({ email: newCart.email });
    return doc;
}

async function update(cartId, changes){
    await CartModel.updateOne({ email: cartId }, {
        productos: changes
    });
    const doc = await CartModel.findOne();
    return doc;
}

async function remove(cartId){
    const res = await CartModel.deleteOne({ id: cartId });
    return res;
}

module.exports = {
    get,
    getById,
    add,
    update,
    remove,
    isCart,
};
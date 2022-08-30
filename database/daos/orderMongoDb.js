const mongoose = require('mongoose');

const { mongoDbConfig } = require("./config");
const url = mongoDbConfig.connectString;

mongoose.connect(url)
.catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})

mongoose.connection;

const Schema = mongoose.Schema;
const OrderModelSchema = new Schema({
    productos:[],
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
    },
    direccion:{
        type: String,
        required: [true, 'La dirección es obligatoria'],
    },
    estado:{
        type: String,
        default: 'ingresada'
    },
    numero:{
        type: Number,
        required: false,
    },
},{ timestamps: true });

// Cuenta el numero actual de ordenes y agrega 1
OrderModelSchema.pre('save', function(next) {
    let doc = this
    if (this.isNew) {
        doc.constructor.countDocuments(function(err, cantidad) {
        if(err){
            return next(err);
        }
        doc.numero = cantidad + 1
        return next();
        });
    } else {
        next();
    }
});

const OrderModel = mongoose.model('ordenes', OrderModelSchema );

async function get(){
    const querySnapshot = await OrderModel.find();
    return querySnapshot;
}

async function add(newOrder){
    OrderModel.create({
        productos: newOrder.productos,
        email: newOrder.email,
        direccion: newOrder.direccion,
    }, function (err, order) {
        if (err) console.log(err);
    })

    const doc = await OrderModel.findOne({ email: newOrder.email });
    return doc;
}

async function update(orderId, estado){
    await OrderModel.updateOne({ _id: orderId }, {
        estado: estado
    });
    const doc = await OrderModel.findOne();
    return doc;
}

async function remove(orderId){
    const res = await OrderModel.deleteOne({ _id: orderId });
    return res;
}

module.exports = {
    get,
    add,
    update,
    remove,
};
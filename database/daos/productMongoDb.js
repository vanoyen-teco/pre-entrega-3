const mongoose = require('mongoose');

const { mongoDbConfig } = require("./config");
const url = mongoDbConfig.connectString;

mongoose.connect(url)
.catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})

mongoose.connection;
const Schema = mongoose.Schema;
const ProductModelSchema = new Schema({
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: { type: Number },
    stock: { type: Number },
    id: String
});
const ProductModel = mongoose.model('producto', ProductModelSchema );


async function get(){
    const querySnapshot = await ProductModel.find();
    return querySnapshot;
}

async function add(newProduct){
    let id;
    ProductModel.create({ name: newProduct.nombre }, function (err, prod) {
        if (err) return handleError(err);
        id = prod._id;
    })

    const doc = await ProductModel.findOne({ id });
    let updateProduct = {...newProduct};
    updateProduct.id = id;
    doc.overwrite(updateProduct);
    const data = await doc.save();

    return data;
}

async function update(productId, changes){
    const doc = await ProductModel.findOne({ productId });
    let updateProduct = {...changes};
    updateProduct.id = productId;
    doc.overwrite(updateProduct);
    const data = await doc.save();
    return data;
}

async function remove(productId){
    const res = await ProductModel.deleteOne({ id: productId });
    return res;
}

module.exports = {
    get,
    add,
    update,
    remove,
};
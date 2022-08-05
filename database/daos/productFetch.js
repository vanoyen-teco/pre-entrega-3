const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const config = require('../../config/global');
const logger = require('../../config/logger');

const mainPath = config.mainPath;

async function get(param = 'new'){
    let all;
    try {
        await fetch(`${mainPath}${param}`)
        .then(response => response.json())
        .then(result => {
            all = result;
        })
    } catch(error) {
        logger.loggerError.error(error);
    }
    return all;
}

async function selectedProducts(prods) {
    try {
        const data = {ids: prods};
        const res = await fetch(`${mainPath}seleccionados`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return res;
    } catch(error) {
        logger.loggerError(error);        
    }
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
    selectedProducts,
};
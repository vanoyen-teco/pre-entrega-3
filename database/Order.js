require('dotenv/config');
let dataBaseType = process.env.DB || 'MongoDb';
// Verifico contenido de variable de entorno DB

dataBaseType = (dataBaseType == 'MongoDb' || dataBaseType == 'Firebase')?dataBaseType:'MongoDb';
const db = require(`./daos/order${dataBaseType}`);

const createNewOrder = (OrderToInsert) => {
    const res = db.add(OrderToInsert);
    return (res)?OrderToInsert:false;
};

module.exports = { 
    createNewOrder,
};
require('dotenv/config');
let dataBaseType = process.env.DB || 'MongoDb';
// Verifico contenido de variable de entorno DB

dataBaseType = (dataBaseType == 'MongoDb' || dataBaseType == 'Firebase')?dataBaseType:'MongoDb';
const db = require(`./daos/chat${dataBaseType}`);

const getAll = (user) => {
    return db.get(user);
};


const createNew = (newMessage) => {
    const res = db.add(newMessage);
    return (res)?true:false;
};

module.exports = { 
    getAll,
    createNew,
};
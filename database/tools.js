const fs = require("fs");

const saveProuctToDatabase = (DB) => {
    fs.writeFileSync("./src/database/productos.json", JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
    });
};

const saveCartToDatabase = (DB) => {
    fs.writeFileSync("./src/database/carritos.json", JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
    });
};


module.exports = { 
    saveProuctToDatabase,
    saveCartToDatabase,
};
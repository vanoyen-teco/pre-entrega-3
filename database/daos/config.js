require('dotenv/config');

const mongoDbConfig = {
    connectString: process.env.DB_CNX,
}


module.exports = {
    mongoDbConfig,
};
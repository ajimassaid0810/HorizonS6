const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

module.exports = {
    rootPath: path.resolve(__dirname,'..'),
    secretKey: process.env.SECRET_KEY,
    serviceName:process.env.SERVICE_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLIENT_KEY,
    serverKey: process.env.SERVER_URL
}
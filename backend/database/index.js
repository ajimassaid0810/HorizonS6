const mongoose = require('mongoose');
const{dbHost,dbPass,dbName,dbPort,dbUser, serverKey}= require('../app/config');

mongoose.connect(serverKey);

const db=mongoose.connection;

module.exports =db;
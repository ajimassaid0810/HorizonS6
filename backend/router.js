var express = require('express');
var router = express.Router();

var AuthRoute = require('./app/auth/router');

router.use('/api', AuthRoute);

module.exports = router;

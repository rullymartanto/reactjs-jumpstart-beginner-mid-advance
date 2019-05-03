var express = require('express');
var cors = require('cors')
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');
global.__root   = __dirname + '/'; 
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});
var ProductController = require(__root + 'product/ProductController');
app.use('/api/products', ProductController);

var CustomerController = require(__root + 'customer/CustomerController');
app.use('/api/customers', CustomerController);

var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);



module.exports = app;
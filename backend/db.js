// var mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/securing-rest-apis-with-jwt', { useMongoClient: true });
const Sequelize = require('sequelize');
const UserModel = require('./user/User')
const CustomerModel = require('./customer/Customer')
const ProductModel = require('./product/Product')

// Option 1: Passing parameters separately
const sequelize = new Sequelize('_dashboard', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const User = UserModel(sequelize, Sequelize)
const Customer = CustomerModel(sequelize, Sequelize)
const Product = ProductModel(sequelize, Sequelize)

module.exports = {
  User,
  Customer,
  Product,
}
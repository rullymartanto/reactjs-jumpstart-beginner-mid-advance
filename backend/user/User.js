const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const { secret } = require('../config')
module.exports = (sequelize, type) => {
  const User = sequelize.define('User', {
    id: {
      type: type.STRING,
      primaryKey: true
    },
    username: {
      type: type.STRING,
    },
    email: {
      type: type.STRING,
      unique: true,
      validate: {
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    },
    password: type.STRING,
    createdAt: type.NOW,
    updatedAt: type.NOW,
  });

  User.associate = function (models) {
    // User.hasMany(models.AuthToken);
  };

  User.authenticate = async function (email, password) {

    const user = await User.findOne({ where: { email } });

    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }

    throw new Error('invalid password');
  }

  // in order to define an instance method, we have to access
  // the User model prototype. This can be found in the
  // sequelize documentation
  User.prototype.authorize = async function () {
    const user = this
    // const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey");
    var token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    return { user, token }
  };


  // User.prototype.logout = async function (token) {
  //   // destroy the auth token record that matches the passed token
  //   sequelize.models.AuthToken.destroy({ where: { token } });
  // };

  return User;
};
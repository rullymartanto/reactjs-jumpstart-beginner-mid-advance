var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const { User } = require('../db')
const { secret } = require('../config') // NewGuid
/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');

router.post('/login', async function (req, res) {

  const { email, password } = req.body;
  // if the username / password is missing, we use status code 400
  // indicating a bad request was made and send back a message
  if (!email || !password) {
    return res.status(400).send({
      error : 'Request missing email or password param'
    });
  }

  try {
    let user = await User.authenticate(email, password)

    return res.json({ auth: true, token: user.token });

  } catch (err) {
    // return res.status(400).send('invalid email or password');
    return res.status(400).send({
      error : 'invalid email or password'
    });
  }
});

router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', function (req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    id: uuidv4(), //NewGuid(),
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  }).then(user => {
    // create a token
    var token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.json({
      auth: true,
      token: token
    })
  }).catch(error => res.json({
    error: error.errors
  }));

});

router.get('/me', VerifyToken, function (req, res, next) {
    User.findOne({
      where: {id: req.userId},
      attributes: ['name', 'email']
    }).then(user => {
    res.json({
      user: user,
    })
  }).catch(error => res.json({
    error: error.errors
  }));

});

module.exports = router;
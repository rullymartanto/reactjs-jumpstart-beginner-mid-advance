'use strict';
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const { Customer } = require('../db')
const { secretCust } = require('../config') // NewGuid
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
            error: 'Request missing username or password param'
        });
    }

    try {
        let customer = await Customer.authenticate(email, password)

        return res.json({ auth: true, token: customer.token });

    } catch (err) {
        // return res.status(400).send('invalid email or password');
        return res.status(400).send({
            error: 'invalid email or password'
        });
    }
});

router.post('/register', function (req, res) {
    const { email, password } = req.body;
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    Customer.findOne({
        where: { email }
    }).then(cust => {
        if (cust === null) {
            Customer.create({
                customerId: uuidv4(), //NewGuid(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPassword,
            }).then(customer => {
                // create a token
                var token = jwt.sign({ customerId: customer.customerId }, secretCust, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.json({
                    auth: true,
                    token: token
                })
            }).catch(error => res.json({
                error: error.errors
            }));
        } else {
            res.status(400).send({
                error: 'email already exist !'
            });
        }
    }).catch(error => res.json({
        error: error.errors
    }));

    // var hashedPassword = bcrypt.hashSync(req.body.password, 8);


});

router.get('/', VerifyToken, function (req, res) {
    Customer.findAll({
        attributes: ['customerId', 'firstname', 'lastname', 'email']
    }).then(customers => {
        res.json({
            customers: customers,
        })
    }).catch(error => res.json({
        error: error.errors
    }));
});

router.get('/:id', VerifyToken, function (req, res) {
    Customer.findOne({
        where: {
            customerId: req.params.id
        },
        attributes: ['customerId', 'firstname', 'lastname', 'email']
    }).then(customer => {
        res.json({
            customer: customer,
        })
    }).catch(error => res.json({
        error: error.errors
    }));

});

router.delete('/:id', VerifyToken, function (req, res) {
    Customer.destroy({
        where: {
            customerId: req.params.id
        }
    }).then(res => {
        res.status(200);
    }).catch(error => res.json({
        error: error.errors
    }));

});

router.put('/:id', VerifyToken, function (req, res) {
    Customer.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
    }, {
            where: { customerId: req.params.id }
        }).then(customer => {
            res.json({
                customer: customer,
            })
        }).catch(error => res.json({
            error: error.errors
        }));
});


module.exports = router;
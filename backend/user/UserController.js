var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
const { User } = require('../db')
// CREATES A NEW USER
router.post('/', function (req, res) {

});

router.get('/', VerifyToken, function (req, res) {
    User.findAll({
        attributes: ['id', 'username', 'email']
    }).then(users => {
        res.status(200).send(users);
        // res.json({
        //     users: users,
        // })
    }).catch(error => res.json({
        error: error.errors
    }));
});

router.get('/:id', VerifyToken, function (req, res) {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'username', 'email']
    }).then(user => {
        res.json({
            user: user,
        })
    }).catch(error => res.json({
        error: error.errors
    }));

});

router.delete('/:id', VerifyToken, function (req, res) {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(res => {
        res.status(200);
    }).catch(error => res.json({
        error: error.errors
    }));

});

router.put('/:id', VerifyToken, function (req, res) {
    User.update({
        username: req.body.username
    }, {
            where: { id: req.params.id }
        }).then(user => {
            // res.json({
            //     user: user,
            // })
            res.status(200).send(user);
        }).catch(error => res.json({
            error: error.errors
        }));
});


module.exports = router;
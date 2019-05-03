var express = require('express');
var router = express.Router();
const { body, check, validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
var bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
var VerifyToken = require(__root + 'auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
router.use(bodyParser.json());

const { Product } = require('../db')

router.post('/', VerifyToken,
    [
        check('productSKU').not().isEmpty(),
        check('productName').not().isEmpty(),
        body('productWeight')
            .not().isEmpty()
            .trim()
            .escape(),
        check('productCartDesc').not().isEmpty(),
    ], function (req, res) {
        req.body.productID = uuidv4()
        Product.create(
            req.body
        ).then(prod => {
            res.status(200).send(prod);
        }).catch(error => res.json({
            error: error.errors
        }));
    });

router.get('/page/:page?/max/:max?/search/:search?', VerifyToken, function (req, res) {
    let page = 1;
    let max = 5;
    max = req.params.max;
    page = req.params.page;
    const search = req.params.search ? req.params.search : '';

    Product.findAndCountAll({
        attributes: ['productID', 'productSKU', 'productName', 'productWeight', 'productCartDesc', 'productShortDesc', 'productLongDecs'],
        where: {
            productName: { [Op.like]: '%' + search + '%' },
        },
        offset: parseInt(page - 1) * max,
        limit: parseInt(max)
    }).then(prods => {
        res.status(200).send(prods);
    }).catch(error => res.json({
        error: error.errors
    }));
});

router.get('/:id', VerifyToken, function (req, res) {
    Product.findOne({
        where: {
            productID: req.params.id
        },
        attributes: ['productID', 'productSKU', 'productName', 'productWeight', 'productCartDesc', 'productShortDesc', 'productLongDecs'],
    }).then(prod => {
        res.status(200).send(prod);
    }).catch(error => res.json({
        error: error.errors
    }));

});

router.delete('/:id', VerifyToken, function (req, res) {
    Product.destroy({
        where: {
            productID: req.params.id
        }
    }).then(res => {
        res.status(200);
    }).catch(error => res.json({
        error: error.errors
    }));

});

router.put('/:id', VerifyToken,
    [
        body('productID')
            .not().isEmpty()
            .trim()
            .escape(),
        body('productSKU')
            .not().isEmpty()
            .trim()
            .escape(),
        check('productName').not().isEmpty(),
        body('productWeight')
            .not().isEmpty()
            .trim()
            .escape(),
        check('productCartDesc').not().isEmpty(),
    ], function (req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        Product.update(
            req.body
            , {
                where: { productID: req.params.id }
            }).then(prod => {
                res.status(200).send(req.body);
            }).catch(error => res.json({
                error: error.array()
            }));
    });


module.exports = router;
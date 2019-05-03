const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const { secretCust } = require('../config')

module.exports = (sequelize, type) => {
    const Customer = sequelize.define('Customer', {
        customerId: {
            type: type.STRING,
            primaryKey: true
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
        firstname: {
            type: type.STRING,
        },
        lastname: {
            type: type.STRING,
        },
        address1: {
            type: type.STRING,
        },
        address2: {
            type: type.STRING,
        },
        city: {
            type: type.STRING,
        },
        state: {
            type: type.STRING,
        },
        phone: {
            type: type.STRING,
        },
        password: type.STRING,
        createdAt: type.NOW,
        updatedAt: type.NOW,
    });

    // sequelize.query("UPDATE package_values pk INNER JOIN packages p ON pk.package_id = p.id SET pk.value = true WHERE pk.feature_id = 2 AND (p.based_on = 2 OR pk.package_id = 2)",
    //     { type: sequelizeLogista.QueryTypes.UPDATE }).then(() => {
    //         console.log("done")
    //     });
    Customer.associate = function (models) {
        // Customer.hasMany(models.AuthToken);
    };

    Customer.authenticate = async function (email, password) {

        const customer = await Customer.findOne({ where: { email } });

        if (bcrypt.compareSync(password, customer.password)) {
            return customer.authorize();
        }

        throw new Error('invalid password');
    }

    // in order to define an instance method, we have to access
    // the Customer model prototype. This can be found in the
    // sequelize documentation
    Customer.prototype.authorize = async function () {
        const customer = this
        var token = jwt.sign({ id: customer.customerId }, secretCust, {
            expiresIn: 86400 // expires in 24 hours
        });

        return { customer, token }
    };

    // Customer.exists = async function (email) {
    //     const customer = await Customer.findOne({ where: { email } });
    //     return customer
    // };

    return Customer;
};
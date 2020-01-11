'use strict';

const Messages = require('@helper/messages');
const helper = require('@helper/helper');
const User = require('@models/User');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var controller = {};

/**
 * @author Mohamed Kashif
 * @description controller for testing the API
 * @param {req HTTP request argument to the middleware function, called "req" by convention.} req 
 * @param {res HTTP response argument to the middleware function, called "res" by convention.} res 
 * @param {Callback argument to the middleware function, called "next" by convention, as if you write return;} next 
 */
controller.index = (req, res, next) => {
    res.send(200,
        { success: true, message: Messages(req.params.lang || 'en', 'welcome') }
    );
}

/**
 * @author Mohamed Kashif
 * @description Controller for creating new users
 * @param {req HTTP request argument to the middleware function, called "req" by convention.} req 
 * @param {res HTTP response argument to the middleware function, called "res" by convention.} res 
 * @param {Callback argument to the middleware function, called "next" by convention, as if you write return;} next 
 */
controller.register = (req, res, next) => {

    if ((req.params.name) && (req.params.password) && (req.params.confirm_password) && (req.params.email)) {
        // \S match any thing but whitespace
        // \w is a special class called "word characters". It is shorthand for [a-zA-Z0-9_]
        // g = global, match all instances of the pattern in a string, not just one
        if (!helper.regCheck(/([\S]+@[\w](?:\.[\w]+)+)/gi, req.params.email)) {
            res.json(406, cb(false, null, Messages(req.params.lang || 'en', 'valid_email')));
            return res.end();
        }
        // The password should has a minimum of 8 characters, 
        // at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces
        if (!helper.regCheck(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/, req.params.password)) {
            res.json(406, cb(false, null, Messages(req.params.lang || 'en', 'password_specs')));
            return res.end();
        }

        // bcrypt is a password hashing function designed by 
        // Niels Provos and David Mazières, based on the Blowfish cipher
        if ((req.params.password) == (req.params.confirm_password)) {

            // With "salt round" they actually mean the cost factor. The cost factor controls how much time 
            // is needed to calculate a single BCrypt hash. 
            // The higher the cost factor, the more hashing rounds are done
            var hashedPassword = bcrypt.hashSync(req.params.password, 8);
            var user = {
                name: req.params.name,
                password: hashedPassword,
                email: req.params.email
            };
            user = new User(user);
            user.save(function (err) {
                if (err) {
                    //console.log('error', err, req.user);
                    if (err.code == 11000) {
                        return res.json(406, cb(false, null, Messages(req.params.lang || 'en', 'user_exist')));
                    }
                } else {
                    var token = jwt.sign({ id: user._id, email: user.email, password: user.password },
                        process.env.TOKEN_SECRET, { expiresIn: 86400 }); // expires in 24 hours
 
                    res.json(201, cb(true, { token: token }, Messages(req.params.lang || 'en', 'registered')));

                }
            });

        } else {
            res.json(406, cb(false, null, Messages(req.params.lang || 'en', 'pass_not_match')));
        }

    } else {
        res.json(406, cb(false, null, Messages(req.params.lang || 'en', 'provide_info')));
    }
}

/**
 * @author Mohamed Kashif
 * @description controller for login
 * @returns message containg authentication token
 * @param {req HTTP request argument to the middleware function, called "req" by convention.} req 
 * @param {res HTTP response argument to the middleware function, called "res" by convention.} res 
 * @param {Callback argument to the middleware function, called "next" by convention, as if you write return;} next 
 */


 // mongoose ODM
 // Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
 // It manages relationships between data, provides schema validation, 
 // and is used to translate between objects in code and the representation of those objects in MongoDB
controller.login = (req, res, next) => {
    User.findOne({
        $or: [{ email: req.body.email }, { name: req.body.name }]
    }, (err, user) => {
        if (err) {
            console.log('error', err, req.user);
            return res.json(500, cb(false, null, err));
        }
        if (!user) {
            console.log('info', Messages('en', 'auth_faild'), req.user);
            return res.json(401, cb(false, null, Messages(req.params.lang || 'en', 'auth_faild')));
        } else {

            // check if the password is valid
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.json(401, cb(false, null, Messages(req.params.lang || 'en', 'wrong_pass')));

            var token = jwt.sign({ id: user._id, email: user.email, password: user.password },
                process.env.TOKEN_SECRET, { expiresIn: 86400 }); // expires in 24 hours
            // return the information including token as JSON
            res.json(200, cb(true, { token: token }, Messages(req.params.lang || 'en', 'logged')));

        }
    });

}



/**
 * @author Mohamed Kashif
 * @description call back function to handle the returned message
 * @param {*} success 
 * @param {*} data 
 * @param {*} message 
 */
const cb = (success, data, message) => {
    return {
        success: success,
        data: data,
        message: message
    }
}

module.exports = controller;
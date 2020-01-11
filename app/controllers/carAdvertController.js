'use strict'
var _ = require('lodash'); // should br removed as it never been used
const Advert = require('@models/Advert');
const User = require('@models/User');
const Messages = require('@helper/messages');

var carAdvertController = {};

/**
 * @author Mohamed Kashif
 * @description Controller for creating car adverts
 * @param {req HTTP request argument to the middleware function, called "req" by convention.} req 
 * @param {res HTTP response argument to the middleware function, called "res" by convention.} res 
 * @param {Callback argument to the middleware function, called "next" by convention, as if you write return;} next 
 */
carAdvertController.carAdvert = (req, res, next) => {
    var carAdvert = new Advert({
        title: req.body.title,
        postedBy: req.userId,
        price: req.body.price,
        fuel: req.body.fuel,
        new: req.body.new,
        mileage: req.body.mileage,
        first_registration: req.body.first_registration

    });
    carAdvert.save(function (error) {
        if (!error) {
            User.findById(req.userId, function (err, user) {
                user.adverts.push(carAdvert._id);
                user.save(function (err) {
                    console.log("new Advert");
                });
            });
            Advert.findById(carAdvert._id)
                .populate('postedBy', '_id name email')
                .exec(function (error, adverts) {
                    res.json(200, cb(true, { data: adverts }, Messages(req.params.lang || 'en', 'advert_created')));
                })
        }
        else if (error) {
            return res.json(500, cb(false, null, error.message));
        }
    });

}


/**
 * @author Mohamed Kashif
 * @description controller for listing all adverts
 * @param {HTTP request argument to the middleware function, called "req" by convention.} req 
 * @param {res HTTP response argument to the middleware function, called "res" by convention.} res 
 * @param {Callback argument to the middleware function, called "next" by convention, as if you write returnl;} next 
 */
carAdvertController.listAdverts = (req, res, next) => {
    // Default sorting is by id
    if (req.query.sort == undefined) {
        req.query.sort = '-_id'; // Decending
    }
    Advert.find({}).sort(req.query.sort).exec(function (err, advert) {
        if (err)
            res.json(500, null, err);
        res.json(200, cb(true, { data: advert }, Messages(req.params.lang || 'en', 'found_advert')));
    })
}


/**
 * @author Mohamed Kashif
 * @description return data for single car advert by id
 * @param {HTTP request argument to the middleware function, called "req" by convention.} req 
 * @param {HTTP response argument to the middleware function, called "res" by convention.} res 
 * @param {Callback argument to the middleware function, called "next" by convention} next 
 */
carAdvertController.listAdvertsSingleCar = (req, res, next) => {
    Advert.findById(req.params.id, function (err, advert) {
        if (err) return res.json(500, cb(false, null, err));
        if (!advert) res.json(404, cb(false, null, Messages(req.params.lang || 'en', 'no_advert')));
        res.json(200, cb(true, { data: advert }, Messages(req.params.lang || 'en', 'found_advert')));

    });
}


/**
 * @author Mohamed Kashif
 * @description Controller for updating i.e editing car advert by id 
 * @param {HTTP request argument to the middleware function, called "req" by convention.} req 
 * @param {HTTP response argument to the middleware function, called "res" by convention.} res 
 * @param {Callback argument to the middleware function, called "next" by convention} next 
 */
carAdvertController.update = (req, res, next) => {
    Advert.findOneAndUpdate(
        // the id of the item to find
        { $and: [{ _id: req.params.id }, { postedBy: req.userId }] },

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, updated) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            res.json(200, cb(true, { data: updated }, Messages(req.params.lang || 'en', 'advert_updated')));
        }
    )
}


/**
 * 
 * @author Mohamed Kashif
 * @description controller to delete advert by id
 * @param {HTTP request argument to the middleware function, called "req" by convention.} req 
 * @param {HTTP response argument to the middleware function, called "res" by convention.} res 
 * @param {Callback argument to the middleware function, called "next" by convention} next 
 */
carAdvertController.delete = (req, res, next) => {
    Advert.findOneAndRemove({ $and: [{ _id: req.params.id }, { postedBy: req.userId }] }, function (err, foundAdvert) {
        if (err) console.log(err);
        if (!foundAdvert) return res.json(403, cb(false, "You are not authorized to delete this advert"));
        User.findById(req.userId, function (err, user) {
            user.adverts.pop(foundAdvert._id);
            user.save(function (err) {
                console.log("delete post");
            });
        });
        res.json(200, cb(true, Messages(req.params.lang || 'en', 'advert_deleted')));
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

module.exports = carAdvertController;
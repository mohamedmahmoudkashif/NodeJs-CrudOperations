'use strict';

var Router = require('restify-router').Router;
var authRoutes = new Router();
const userController = require('@controllers/userController');
const carAdvertController = require('@controllers/carAdvertController');
var VerifyToken = require('@controllers/VerifyToken');

// we could use symbolic (Symlink) link in only linux and mac,
// A symbolic link (also known as a soft link or symlink) 
// consists of a special type of file that serves as a reference to another file or directory

// To handle the annoying ../../../../ require in the project instead 


// This module allows you to define your routes using a Router interface that is identical 
// to how routes are registered on a restify server. You can then apply the routes to a server instance.
authRoutes.get('/', userController.index);
/**
 * @author Mohamed Kashif
 * @description Available routes for use by client 
 * i.e POSTMAN or web-interface or Mobile-interface 
 */
authRoutes.post('/register', userController.register);
authRoutes.post('/login', userController.login);

// Create entity i.e Create a advert
authRoutes.post('/addAdvert', VerifyToken, carAdvertController.carAdvert);

// List all car adverts
authRoutes.get('/list', carAdvertController.listAdverts);

// List data for single car i.e get data by id
authRoutes.get('/list/:id', carAdvertController.listAdvertsSingleCar);

// Update advert by id
authRoutes.put('/update/:id', VerifyToken, carAdvertController.update);

// Delete advert by id
authRoutes.del('/delete/:id', VerifyToken, carAdvertController.delete);

module.exports = authRoutes;
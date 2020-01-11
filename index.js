// ==========================
// Starting the server
// ==========================
var appzip = require('appmetrics-zipkin');
'use strict'

require('dotenv').config();
require('module-alias/register');
const restify = require('restify');
const logger = require('restify-logger');
const  port = process.env.PORT || 3000;
//const routes = require('@http/routes/routes');
const routes = require('./app/http/routes/routes');
const database = require('./app/db');
const corsMiddleware = require('restify-cors-middleware');


const startServer = (restify) => {
     // creating server
     var server = restify.createServer({
        name:process.env.NAME,
        versoion:process.env.VERSION
    });

     // miidlewares

     // The use handler chains is executed after a route has been chosen to service the request

     // log info about the sent request
     server.use(logger(':date[iso] - req: :method :url HTTP/:http-version :status :response-time ms - :res[content-length] :append'));
     // Parses the Accept header, and ensures that the server can respond to what the client asked for. 
     // In almost all cases passing in server.acceptable is all that’s required, 
     // as that’s an array of content types the server knows how to respond to (with the formatters you’ve registered). 
     // If the request is for a non-handled type, this plugin will return a NotAcceptableError (406).
     server.use(restify.plugins.acceptParser(server.acceptable));

     //Parses the HTTP query string (i.e., /foo?id=bar&name=mark). If you use this, 
     // the parsed content will always be available in req.query, additionally params are merged into req.params
     server.use(restify.plugins.queryParser());
      
     // Blocks your chain on reading and parsing the HTTP request body. 
     // Switches on Content-Type and does the appropriate logic. 
     //application/json, application/x-www-form-urlencoded and multipart/form-data are currently supported.
     server.use(restify.plugins.bodyParser());

    server.opts("*", (req,res,next) => {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
	    res.send(200);
	    return next();
    });

    // Setting routes
    routes(restify, server);

    server.listen(port, () => {
        database.connect();
        console.log(`${server.name} listening on ${server.url}`);


    })
    module.exports = server; // for testing
}

startServer(restify);

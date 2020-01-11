'use strict'

const jwt = require('jsonwebtoken');

/**
 * @author Mohamed Kashif
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @description function s a middleware to authenticate the user before sending request.
 */
const verifyToken = (req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  if (!token)
    //return res.status(403).send({ auth: false, message: 'No token provided.' });
    //The 403 (Forbidden) status code indicates that the server understood the request but refuses to authorize it
    return res.json(403, cb(false, null, 'No token provided'));

  // verifies secret and checks exp
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err)
      //return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });  
      return res.json(500, cb(false, null, 'Failed to authenticate token'));

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    //console.log(decoded);
    next();
  });
}

function cb(success, data, message) {
  return {
    success: success,
    data: data,
    message: message
  }
}

module.exports = verifyToken;
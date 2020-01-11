'use strict';

// get an instance of mongoose 
const mongoose = require('mongoose');

/**
 * @author Mohamed Kashif
 * @description  User schema model, it can be modified to, add more attributes depend on business needs
 */
var UserSchema = new mongoose.Schema({
    name: { type: String, required: false },  // We may add trim:true
    email: { type: String, required: true, unique: true }, // We may add lowercase: true option 
    // AND We may add trim:true
    password: { type: String, required: true },
    adverts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advert' }]
});



mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');


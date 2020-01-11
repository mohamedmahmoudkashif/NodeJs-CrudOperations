'use strict'

const mongoose = require('mongoose');

var database = {};

/**
 * @author Mohamed Kashif
 * @description create connection to mongoDB database hosted in www.mlab.com
 */
database.connect = () => {
    var DB = `${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    // Mongoose 5 uses Node.js' native promises by default.
    mongoose.Promise = global.Promise;
    /**
     * DeprecationWarning: current URL string parser is deprecated, and will be
        removed in a future version. To use the new parser, pass option
        { useNewUrlParser: true } to MongoClient.connect.
     */
    mongoose.connect(`mongodb://${DB}`, { useNewUrlParser: true } ,
    // { autoIndex: false }
    );

    // My suggestion is to leave autoIndex enabled unless you have a specific situation 
    // where it's giving you trouble; like if you want to add a new index to an existing collection 
    // that has millions of docs and you want more control over when it's created

    // Can be removed as I did't define an index in my schemas
    mongoose.set('useCreateIndex', true);

    mongoose.connection.on('error', (err) => {
        console.log('error', err);
        process.exit(1);
    });
    mongoose.connection.once('open', () => {
        console.log('Connected to Database!');
    });
};

database.close = () => {
    mongoose.connection.close();
};

module.exports = database;
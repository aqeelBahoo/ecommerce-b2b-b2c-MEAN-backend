
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    password: {
        type: String,
    },
    name: {
        type: String
    },
    mobNumber: {
        type: String
    },
    age: {
        type: Number
    },
    dob: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    language: {},
    gender: {
        type: String
    },
    address: {},
    aboutYou: {
        type: String
    },
    uploadPhoto: {
        type: String
    },
    agreetc: {
        type: String
    },
    role: {
        type: String
    },
});

module.exports = mongoose.model('User', user);

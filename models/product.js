/**
 * Created by Home on 2/5/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
    name: {
        type: String
    },
    uploadPhoto: {
        type: String
    },
    productDesc: {
        type: String
    },
    mrp: {
        type: String
    },
    dp: {
        type: String
    },
    status: {
        type: String
    },
    sellerId: {
        type: String
    },
    count: Number
}
);


module.exports = mongoose.model('Product', product);

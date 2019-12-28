var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var order = new Schema({
    userId: {
        type: String
    },
    deliveryAddress: {},
    contact: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    totalAmount: {
        type: Number
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, { timestamps: { createdAt: 'created_at' } }
);


module.exports = mongoose.model('Order', order);

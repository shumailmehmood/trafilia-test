const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const courierSchema = mongoose.Schema({
    uid: {
        item: {
            type: ObjectId,
            ref: 'User',
            require: true
        },
        name: {
            type: String,
        },
        vehical_no: {
            type: String,
            required: true
        },
    },
    sendItems: [{
        item_id: {
            type: ObjectId,
            ref: 'Item',
            required: true
        },
        item_name: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            require: true
        },
        sale_price: {
            type: Number,
            require: true
        },
        purchase_price: {
            type: Number,
            require: true
        }
    }],
    returnItems: [{
        item_id: {
            type: ObjectId,
            required: true
        },
        item_name: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            require: true
        },
        sale_price: {
            type: Number,
            require: true
        },
        purchase_price: {
            type: Number,
            require: true
        }
    }],
    
},
    { timestamps: true })
module.exports = mongoose.model('Courier', courierSchema);


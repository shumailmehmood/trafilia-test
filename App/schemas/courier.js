const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const courierSchema = mongoose.Schema({
    uid: {
        item: {
            type: ObjectId,
            require: true
        }
    },
    vehical_no: {
        type: String,
        required: true
    },
    sendItems: {
        type: [{
            item_id: {
                type: ObjectId,
                required: true
            },
            count: {
                type: Number,
                require: true
            },
            price: {
                type: Number,
                require: true
            }
        }],
        default: null
    },
    returnItems: {
        type: [{
            item_id: {
                type: ObjectId,
                required: true
            },
            count: {
                type: Number,
                require: true
            },
            price: {
                type: Number,
                require: true
            }
        }],
        default: null
    }
},
    { timestamps: true })
module.exports = mongoose.model('Courier', courierSchema);


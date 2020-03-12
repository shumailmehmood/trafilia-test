const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const cashSchema = mongoose.Schema({
    uid: {
        item: {
            type: ObjectId,
            ref: 'User',
        },
        name: {
            type: String
        }
    },
    amount: {
        type: Number,
        default: 0
    },
    remaining: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Cash', cashSchema);

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ObjectId = Schema.Types.ObjectId;
const salarySchema = mongoose.Schema({
    uid: {
        item: {
            type: ObjectId,
            ref: 'User',
        }
    },
    salary_type: {
        catagory: {
            type: String,
            enum: ['base', 'percent']
        },
        amount: {
            type: Number,
            default: 0
        }
    },
    total_remaining: {
        type: Number,
        default: 0
    },
    current_month_remaining: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Salary', salarySchema);

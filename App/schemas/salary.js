const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const salarySchema = mongoose.Schema({
    uid: {
        item: {
            type: ObjectId,
            ref: 'User',
        },
        name:{
            type:String
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
    upto_current_month_remaining: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Salary', salarySchema);

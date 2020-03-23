const Salary = require('../../schemas/salary')
const { validateUserSalary } = require("../../validatingMethods/validate");
const { id_convertor } = require("../../misc/functions");
const CashLog = require("../../schemas/cashRevieveLog");
const constants = require("../../misc/constants");
exports.salaryReg = async (req, res) => {
    try {
        let data = {
            uid: {
                item: id_convertor(req.user._id),
                name: req.user.name
            },

        }
        let { error } = validateUserSalary(data);
        if (error) res.status(400).send(error.details[0].message);
        let salary = new Salary(data);
        salary = await salary.save();
        let response = {
            user: req.user,
            salary: salary
        }
        return res.send(response);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}
exports.salaryUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        let data = {
            remainingAmount: +req.transac.amount_payed
        }
        let response = await Salary.findOne({ 'uid.item': id_convertor(id) }).select('upto_current_month_remaining').lean();
        if (+response.upto_current_month_remaining < +req.transac.amount_payed) return res.status(400).send('Your requsted amount is greater than current amount!')
        data.upto_current_month_remaining = +response.upto_current_month_remaining - data.upto_current_month_remaining;
        response = await Salary.findOneAndUpdate({ 'uid.item': id_convertor(id) }, data, { new: true }).lean();
        data = {
            transaction: req.transac,
            salary: response
        }

        res.send(data);
    } catch (err) {
        return res.status(400).send(err.message)
    }
}
exports.transactionPost = async (req, res, next) => {
    try {
        let { recieveAmount, uid, courierId,reserveAmount } = req.locals;
        let data = {
            uid: uid,
            courierid: courierId,
            amount: recieveAmount
        }
        data = new CashLog(data);
        await data.save();
        if (reserveAmount === 0) return res.send(constants.UPDATED_SUCCESS)
        next()
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

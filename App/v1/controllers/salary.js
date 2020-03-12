const Salary = require('../../schemas/salary')
const { validateUserSalary } = require("../../validatingMethods/validate");
const { id_convertor } = require("../../misc/functions");
exports.salaryReg = async (req, res) => {
    try {
        let data = {
            uid: {
                item: id_convertor(req.user._id),
                name:req.user.name
            },
            salary_type: {
                catagory: req.body.salary_type,               
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
exports.salaryUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        let data = {
            upto_current_month_remaining: +req.transac.amount_payed
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
exports.transactionPost = async (req, res) => {
    try {


    } catch (err) {
        return res.status(400).send(err.message);
    }
}

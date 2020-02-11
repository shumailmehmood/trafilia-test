import SalarySchema from "../../schemas/salary";
import { validateUserSalary } from "../../validatingMethods/validate";
import Transaction from "../../schemas/transaction";
exports.salaryReg = async (req, res) => {
    try {
        let { error } = validateUserSalary(req.body);
        if (error) res.status(400).send(error.details[0].message);
        let salary = new SalarySchema(req.body);
        salary = await salary.save();
        return res.send(salary);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}
exports.salaryUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        let { error } = validateUserSalary(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let response = await SalarySchema.findOneAndUpdate({ _id: id }, req.body, { new: true }).lean();
        res.send(response);
    } catch (err) {
        return res.status(400).send(err.message)
    }
}
exports.transactionPost=async(req,res)=>{
    try{

        
    }catch(err)
    {
        return res.status(400).send(err.message);
    }
}

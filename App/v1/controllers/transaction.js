const Transaction = require("../../schemas/transaction");
const { validateTransaction } = require("../../validatingMethods/validate");
const { id_convertor } = require("../../misc/functions");
exports.transactionPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        let { amount } = req.body;
        let data = {
            uid: {
                item: id_convertor(id)
            },
            amount_payed: +amount
        };
        const { error } = validateTransaction(data);
        if (error) return res.status(400).send(error.details[0].message);
        let transac = new Transaction(data);
        transac = await transac.save();
        req.transac=transac;
        next();
    } catch (err) {
        return res.status(400).send(err.message)
    }
}
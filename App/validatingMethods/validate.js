const Joi = require('joi');
exports.validateUserLogin = (user) => {
    const schema =
    {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(user, schema);
}
exports.validateUserRegister = (user) => {
    const schema =
    {
        name: Joi.string().required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(user, schema);
}
exports.validateUserSalary = (details) => {
    const schema =
    {
        uid: Joi.object().keys({
            item: Joi.object().required()
        }).required(),
        salary_type: Joi.object().keys({
            catagory: Joi.string().required(),
            amount: Joi.number().required()
        }).required(),
        total_remaining: Joi.number().required(),
        current_month_remaining: number().required()
    }
    return Joi.validate(details, schema);
}
exports.validateUserTransaction = (details) => {
    const schema =
    {
        uid: Joi.object().keys({
            item: Joi.object().required()
        }).required(),
        salary_type: Joi.object().keys({
            catagory: Joi.string().required(),
            amount: Joi.number().required()
        }).required(),
        total_remaining: Joi.number().required(),
        current_month_remaining: number().required()
    }
    return Joi.validate(details, schema);
}
const Joi = require("joi");
const product = require("../schemas/product");
exports.validateUserLogin = (user) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  };
  return Joi.validate(user, schema);
};
exports.validateUserRegister = (user) => {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  };
  return Joi.validate(user, schema);
};
exports.validateProduct = (product) => {
  const schema = {
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.any()
      .valid(["coffee", "equipment", "accessories"])
      .required(),
  };
  return Joi.validate(product, schema);
};
exports.validateCart = (cart) => {
  const schema = {
    quantity: Joi.number().required(),
    productId: Joi.string().required(),
  };
  return Joi.validate(cart, schema);
};
exports.validatePromotions = (cart) => {
  const schema = {
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    type: Joi.string().required(),
    value: Joi.string().required(),
    productId: Joi.string().required(),
  };
  return Joi.validate(cart, schema);
};

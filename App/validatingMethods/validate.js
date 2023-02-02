const Joi = require("joi");
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
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(1024).required(),
  };
  return Joi.validate(user, schema);
};
exports.validateProduct = (product) => {
  const schema = {
    name: Joi.string().required(),
    price: Joi.number().required().min(1),
    category: Joi.any()
      .valid(["coffee", "equipment", "accessories"])
      .required(),
    shippment: Joi.number().required().min(5),
  };
  return Joi.validate(product, schema);
};
exports.validateCart = (cart) => {
  const schema = {
    quantity: Joi.number().required().min(1),
    productId: Joi.string().required(),
  };
  return Joi.validate(cart, schema);
};

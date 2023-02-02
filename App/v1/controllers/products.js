const _ = require("lodash");
const { validateProduct } = require("../../validatingMethods/validate");
const Repository = require("../../repository/product");
exports.Register = async (req, res) => {
  try {
    const { error } = validateProduct(
      _.pick(req.body, ["name", "price", "category"])
    );
    if (error) return res.status(400).send(error.details[0].message);
    let product = await Repository.findSpecific({
      name: req.body.name,
      category: req.body.category,
    });

    if (product)
      return res
        .status(400)
        .send("Same Product is already registered in this category");

    return res
      .status(200)
      .send(
        await Repository.createProduct(
          _.pick(req.body, ["name", "price", "category"])
        )
      );
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
exports.get = async (req, res) => {
  try {
    return res.send(await Repository.getAll());
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

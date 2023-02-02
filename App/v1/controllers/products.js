const _ = require("lodash");
const { validateProduct } = require("../../validatingMethods/validate");
const Repository = require("../../repository/product");
exports.Register = async (req, res) => {
  try {
    const { error } = validateProduct(
      _.pick(req.body, ["name", "price", "category", "shippment"])
    );
    if (error)
      return res.status(400).json({
        type: "Invalid",
        message: "Something went wrong",
        data: error.details[0].message,
      });
    let product = await Repository.findSpecific({
      name: req.body.name,
      category: req.body.category,
    });

    if (product)
      return res.status(400).json({
        type: "Invalid",
        message: "Same Product is already registered in this category",
        data: product,
      });

    return res.status(200).json({
      type: "Success",
      message: "Product has been registered.",
      data: await Repository.createProduct(
        _.pick(req.body, ["name", "price", "category", "shippment"])
      ),
    });
  } catch (err) {
    return res.status(400).json({
      type: "Failed",
      message: "Something went wront",
      data: err,
    });
  }
};
exports.get = async (req, res) => {
  try {
    return res.status(200).json({
      type: "Success",
      message: "Data Fetched",
      data: await Repository.getAll(),
    });
  } catch (err) {
    return res.status(400).json({
      type: "Failed",
      message: "Something went wront",
      data: err,
    });
  }
};

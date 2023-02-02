const Product = require("../schemas/product");

module.exports = class {
  static async createProduct(payload) {
    return await new Product(payload).save();
  }
  static async getAll() {
    return await Product.find({});
  }
  static async findSpecific(query) {
    return await Product.findOne(query);
  }
  static async findSpecificAndJoin(query, from, localField, foreignField, as) {
    return await Product.aggregate([
      { $match: query },
      {
        $lookup: {
          from,
          localField,
          foreignField,
          as,
        },
      },
    ]);
  }
};

const Order = require("../schemas/order");

module.exports = class {
  static async create(payload) {
    return await new Order(payload).save();
  }
  static async getAll() {
    return await Order.find({});
  }
  static async findSpecific(query) {
    return await Order.findOne(query);
  }
};

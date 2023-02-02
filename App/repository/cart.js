const Cart = require("../schemas/cart");

module.exports = class {
  static async createCart(payload) {
    return await new Cart(payload).save();
  }
  static async getAll() {
    return await Cart.find({});
  }
  static async findSpecific(query) {
    return await Cart.findOne(query);
  }
  static async update(query, payload) {
    return await Cart.updateOne(query, payload, { upsert: true });
  }
};

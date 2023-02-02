const User = require("../schemas/user");

module.exports = class {
  static async createUser(payload) {
    return await new Product(payload).save();
  }
  static async getAll() {
    return await User.find({});
  }
  static async findSpecific(query) {
    return await User.findOne(query);
  }
};

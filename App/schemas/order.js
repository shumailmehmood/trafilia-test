const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
let orderSchema = mongoose.Schema(
  {
    cartID: {
      type: ObjectId,
      ref: "Cart",
      required: true,
    },
    total: {
      product: Number,
      discounts: Number,
      shipping: Number,
      order: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);

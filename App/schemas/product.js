const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["coffee", "equipment", "accessories"],
      require: true,
    },
    shippment: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

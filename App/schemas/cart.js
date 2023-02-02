const string = require("joi/lib/types/string");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
let cartSchema = mongoose.Schema(
  {
    userID: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: Number,
        name: String,
        category: String,
        price: Number,
        total: Number,
        shippment: Number,
        total_shippment: Number,
        promo: { type: Boolean, default: false },
      },
    ],
    subTotal: {
      type: Number,
      default: 0,
    },
    isCheckout: {
      type: Boolean,
      default: false,
    },
    shippment: Number,
    order: Number,
    productsAdded: Number,
    discount: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);

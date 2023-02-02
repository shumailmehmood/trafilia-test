const Cart = require("../../schemas/cart");
const { createShippingNumber } = require("../../misc/utility");
const Repository = require("../../repository/index");

exports.create = async (req, res) => {
  try {
    let cart = await Repository.cart.findSpecific({
      userID: req.user.id,
      isCheckout: false,
    });
    if (!cart)
      return res.status(400).json({
        type: "Invalid",
        message: "Cart Not found",
        data: cart || {},
      });
    let payload = {
      cartID: cart._id,
      orderId: createShippingNumber(),
      total: {
        shipping: cart.shippment,
        product: cart.products.length,
        discounts: cart.discount,
        order: cart.order,
      },
    };
    await Repository.cart.update(
      {
        userID: req.user.id,
        isCheckout: false,
      },
      { isCheckout: true }
    );
    return res.status(200).json({
      type: "success",
      message: "Order has been placed",
      data: await Repository.order.create(payload),
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
    let cart = await Cart.find({});
    return res.status(200).json({
      type: "success",
      message: "Data Fetch successfuly",
      data: cart,
    });
  } catch (err) {
    return res.status(400).json({
      type: "Failed",
      message: "Something went wront",
      data: err,
    });
  }
};

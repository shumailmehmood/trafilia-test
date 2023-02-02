const Cart = require("../../schemas/cart");
const {
  createShippingNumber,
  calculateDiscount,
} = require("../../misc/functions");
const Repository = require("../../repository/index");

exports.create = async (req, res) => {
  try {
    let cart = await Repository.cart.findSpecific({
      userID: req.user.id,
      isCheckout: false,
    });
    if (!cart) return res.status(400).send("Cart Not Found");
    let payload = {
      cartID: cart._id,
      total: {
        shipping: createShippingNumber(),
        product: cart.products.length,
        discounts: calculateDiscount(cart),
        order: createShippingNumber(),
      },
    };
    await Repository.cart.update(
      {
        userID: req.user.id,
        isCheckout: false,
      },
      { isCheckout: true }
    );
    return res.send(await Repository.order.create(payload));
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
exports.get = async (req, res) => {
  try {
    let cart = await Cart.find({});
    return res.send(cart);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

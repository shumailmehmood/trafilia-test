const _ = require("lodash");
const mongoose = require("mongoose");

const {
  findItemIndex,
  calculateSubTotal,
  createPayload,
  applyPromotions,
  calculateShippmentTotal,
  calculateDiscount,
} = require("../../misc/utility");
const Mocks = require("../../misc/mocks/promotions");
const { validateCart } = require("../../validatingMethods/validate");
const Repository = require("../../repository/index");

exports.create = async (req, res) => {
  try {
    //at the same time they are send one product at a time.
    const { error } = validateCart(_.pick(req.body, ["productId", "quantity"]));
    if (error)
      return res.status(400).json({
        type: "Invalid",
        message: "Something went wrong",
        data: error.details[0].message,
      });
    let query = { userID: req.user.id, isCheckout: false };

    let cart = (await Repository.cart.findSpecific(query)) || {};

    let product = await Repository.product.findSpecific({
      _id: mongoose.Types.ObjectId(req.body.productId),
    });
    if (!product)
      return res.status(400).json({
        type: "Invalid",
        message: "No Product found against id:" + req.body.productId,
        data: product || {},
      });

    if (Object.keys(cart).length) {
      const itemIndex = findItemIndex(
        cart.products,
        _.pick(req.body, ["productId"]).productId
      );

      if (itemIndex === -1) {
        // If product does not exist in cart, add it

        let payload = createPayload(req, product);

        cart.products.push(payload);
      } else {
        // If product exists in cart, update its quantity
        cart.products[itemIndex].quantity += req.body.quantity;
        cart.products[itemIndex].total = cart.products[itemIndex].promo
          ? cart.products[itemIndex].total + cart.products[itemIndex].price
          : cart.products[itemIndex].quantity * product.price;
      }

      cart = applyPromotions(Mocks.PROMOTIONS, cart);
      cart.subTotal = calculateSubTotal(cart.products);
      cart.shippment = calculateShippmentTotal(cart.products);
      cart.order = cart.subTotal + cart.shippment;
      cart.discount = calculateDiscount(cart);
      cart = await Repository.cart.update(
        { userID: req.user.id, isCheckout: false },
        cart
      );

      return res.status(200).json({
        type: "success",
        message: "Item Added",
        data: await Repository.cart.findSpecific(query),
      });
    }

    cart.products = [createPayload(req, product)];
    cart = applyPromotions(Mocks.PROMOTIONS, cart);
    cart.subTotal = calculateSubTotal(cart.products);
    cart.shippment = calculateShippmentTotal(cart.products);
    cart.order = cart.subTotal + cart.shippment;
    cart.discount = calculateDiscount(cart);
    cart.userID = req.user.id;
    if (!cart.userID)
      return res.status(400).json({
        type: "Invalid",
        message: "No user found. Login to continue",
        data: err,
      });
    return res.status(200).json({
      type: "success",
      message: "Item Added",
      data: await Repository.cart.createCart(cart),
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
    let cart = await Repository.cart.getAll();
    return res.status(200).json({
      type: "success",
      message: "Data fetched successfully",
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
exports.getSpecific = async (req, res) => {
  try {
    let cart = await Repository.cart.findSpecific({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    if (!cart)
      return res.status(400).json({
        type: "Invalid",
        message: "Cart Not found",
        data: cart || {},
      });
    return res.status(200).json({
      type: "success",
      message: "Cart fetched successfully",
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
exports.remove = async (req, res) => {
  try {
    //at the same time they are send one product at a time.
    let query = {
      _id: mongoose.Types.ObjectId(req.params.id),
    };

    let cart = (await Repository.cart.findSpecific(query)) || {};

    if (Object.keys(cart).length) {
      cart = await Repository.cart.update(
        { userID: req.user.id, isCheckout: false },
        { isCheckout: true }
      );
      return res.status(200).json({
        type: "success",
        message: "Your Cart has been removed.",
        data: {},
      });
    }
    return res.status(400).json({
      type: "Failed",
      message: "Cart not Found",
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

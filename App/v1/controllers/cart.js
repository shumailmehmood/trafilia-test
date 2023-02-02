const Cart = require("../../schemas/cart");

const _ = require("lodash");
const mongoose = require("mongoose");

const {
  findItemIndex,
  calculateSubTotal,
  createPayload,
  applyPromotions,
  calculateShippmentTotal,
  calculateDiscount,
} = require("../../misc/functions");
const Mocks = require("../../misc/mocks/promotions");
const { validateCart } = require("../../validatingMethods/validate");
const Repository = require("../../repository/index");

exports.create = async (req, res) => {
  try {
    //at the same time they are send one product at a time.
    const { error } = validateCart(_.pick(req.body, ["productId", "quantity"]));
    if (error) return res.status(400).send(error.details[0].message);
    let query = { userID: req.user.id, isCheckout: false };
    let cart = (await Repository.cart.findSpecific(query)) || {};

    //fetch the promotions on the basis of productid
    let product = await Repository.product.findSpecific({
      _id: mongoose.Types.ObjectId(req.body.productId),
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
        // cart.products[itemIndex].total_shippment = cart.products[itemIndex]
        //   .promo
        //   ? cart.products[itemIndex].quantity + product.shippment
        //   : cart.products[itemIndex].quantity * product.shippment;
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

      return res.send(await Repository.cart.findSpecific(query));
    }

    cart.products = [createPayload(req, product)];
    cart = applyPromotions(Mocks.PROMOTIONS, cart);
    cart.subTotal = calculateSubTotal(cart.products);
    cart.shippment = calculateShippmentTotal(cart.products);
    cart.order = cart.subTotal + cart.shippment;
    cart.discount = calculateDiscount(cart);
    cart.userID = req.user.id;

    return res.status(200).send(await Repository.cart.createCart(cart));
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

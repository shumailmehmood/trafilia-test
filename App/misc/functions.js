const _ = require("lodash");
module.exports = class utils {
  static findItemIndex(list, condition) {
    return _.findIndex(list, (e) => e.productId.toString() === condition);
  }
  static calculateSubTotal(list) {
    return list.map((item) => item.total).reduce((acc, next) => acc + next);
  }
  static calculateShippmentTotal(list) {
    return list
      .map((item) => item.total_shippment)
      .reduce((acc, next) => acc + next);
  }
  static createPayload(req, product) {
    return {
      productId: _.pick(req.body, ["productId"]).productId,
      quantity: _.pick(req.body, ["quantity"]).quantity,
      price: _.pick(product, ["price"]).price,
      shippment: _.pick(product, ["shippment"]).shippment,
      total:
        _.pick(product, ["price"]).price *
        _.pick(req.body, ["quantity"]).quantity,
      total_shippment:
        _.pick(product, ["shippment"]).shippment *
        _.pick(req.body, ["quantity"]).quantity,
      name: product.name,
      category: product.category,
      promo: false,
    };
  }

  static createShippingNumber() {
    let timestamp = Date.now().toString();
    return timestamp.substr(timestamp.length - 5);
  }
  static countObjectsByProperty(arr, property) {
    const frequencyMap = {};
    let cache = 0;
    arr.forEach((obj) => {
      if (obj.category !== "accessories") {
        if (!frequencyMap[obj[property]]) {
          frequencyMap[obj[property]] = obj.quantity;
        } else {
          frequencyMap[obj[property]] += obj.quantity;
        }
      } else {
        cache = frequencyMap[obj[property]];
        frequencyMap[obj[property]] = cache
          ? obj.quantity * obj.price + cache
          : obj.quantity * obj.price;
      }
    });
    return frequencyMap;
  }
  static verifyPromoApplied(cart, key) {
    return _.findIndex(
      cart.products,
      (e) => e.category === key && e.promo === false
    );
  }
  static applyPromotions(mocks, cart) {
    let count = utils.countObjectsByProperty(cart.products, "category");

    let mock = null,
      index = null,
      check = null;
    for (let [key, value] of Object.entries(count)) {
      mock = mocks[key];
      check = utils.verifyPromoApplied(cart, key);
      switch (mock.type) {
        case "item":
          if (check >= 0) {
            if (value >= mock.criteria) {
              index = _.findIndex(
                cart.products,
                (e) => e.category === key && e.promo === false
              );
              cart.products[index].quantity += mock.discount;
              cart.products[index].total_shippment =
                cart.products[index].quantity * cart.products[index].shippment;
              cart = utils.updatePromo(cart, key);
            }
          }
          break;
        case "shippment":
          if (check >= 0) {
            if (value > mock.criteria) {
              for (let i = 0; i < cart.products.length; i++) {
                if (cart.products[i].category === key)
                  cart.products[i].total_shippment = 0;
              }

              cart = utils.updatePromo(cart, key);
            }
          }
          break;
        case "percentage":
          if (check >= 0) {
            if (value > mock.criteria) {
              for (let i = 0; i < cart.products.length; i++) {
                if (
                  cart.products[i].category === key &&
                  cart.products[i].promo === false
                ) {
                  cart.products[i].total =
                    cart.products[i].total -
                    (cart.products[i].total * mock.discount) / 100;
                }
              }
              cart = utils.updatePromo(cart, key);
            }
          }
          break;
      }
    }
    return cart;
  }
  static updatePromo(cart, category) {
    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].category === category) {
        cart.products[i].promo = true;
      }
    }
    return cart;
  }
  static calculateFullPrice(cart) {
    return cart.products
      .map((e) => e.price * e.quantity)
      .reduce((acc, next) => acc + next);
  }
  static calculateFullShippment(cart) {
    return cart.products
      .map((e) => e.shippment * e.quantity)
      .reduce((acc, next) => acc + next);
  }
  static calculateDiscount(cart) {
    let total_price_without_discount = utils.calculateFullPrice(cart);
    let total_shippment_without_discount = utils.calculateFullShippment(cart);
    return (
      +(total_price_without_discount + total_shippment_without_discount) -
      cart.order
    );
  }
};

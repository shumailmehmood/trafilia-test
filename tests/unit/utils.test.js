const {
  findItemIndex,
  calculateSubTotal,
  createPayload,
  calculateDiscount,
  updatePromo,
  countObjectsByProperty,
  calculateFullPrice,
  calculateFullShippment,
} = require("../../App/misc/functions");

describe("findItemIndex", () => {
  it("should return the index of the item in the list whose productId matches the given condition", () => {
    const list = [
      { productId: 1, name: "item1" },
      { productId: 2, name: "item2" },
    ];
    const condition = "2";
    const result = findItemIndex(list, condition);
    expect(result).toBe(1);
  });

  it("should return -1 if the item is not found in the list", () => {
    const list = [
      { productId: 1, name: "item1" },
      { productId: 2, name: "item2" },
    ];
    const condition = "3";
    const result = findItemIndex(list, condition);
    expect(result).toBe(-1);
  });

  it("should handle different data types of the productId and condition properly", () => {
    const list = [
      { productId: "1", name: "item1" },
      { productId: "2", name: "item2" },
    ];
    const condition = 2;
    const result = findItemIndex(list, condition);
    expect(result).toBe(-1);
  });
});

describe("calculateFullPrice", () => {
  it("should return full price without any promotion", () => {
    const cart = {
      subTotal: 200,
      order: 630,
      products: [
        {
          promo: true,
          _id: "63db6947262b8e1bd7f3ae8f",
          productId: "63da0d41e4a62d361a9ac186",
          quantity: 2,
          price: 100,
          shippment: 10,
          total: 200,
          total_shippment: 0,
          name: "maker",
          category: "equipment",
        },
        {
          promo: true,
          _id: "63db6955262b8e1bd7f3ae90",
          productId: "63da0b6542799f34acf6cd85",
          quantity: 3,
          price: 100,
          shippment: 10,
          total: 200,
          total_shippment: 30,
          name: "latte",
          category: "coffee",
        },
        {
          promo: true,
          _id: "63db698e4682bc1c14c68739",
          productId: "63da0d31e4a62d361a9ac185",
          quantity: 2,
          price: 100,
          shippment: 10,
          total: 200,
          total_shippment: 0,
          name: "crusher",
          category: "equipment",
        },
      ],
    };

    const result = calculateFullPrice(cart);
    expect(result).toBe(700);
  });
});
describe("calculateFullShippment", () => {
  it("should return full shippment without any promotion", () => {
    const cart = {
      subTotal: 200,
      order: 630,
      products: [
        {
          promo: true,
          _id: "63db6947262b8e1bd7f3ae8f",
          productId: "63da0d41e4a62d361a9ac186",
          quantity: 2,
          price: 100,
          shippment: 10,
          total: 200,
          total_shippment: 0,
          name: "maker",
          category: "equipment",
        },
        {
          promo: true,
          _id: "63db6955262b8e1bd7f3ae90",
          productId: "63da0b6542799f34acf6cd85",
          quantity: 3,
          price: 100,
          shippment: 10,
          total: 200,
          total_shippment: 30,
          name: "latte",
          category: "coffee",
        },
        {
          promo: true,
          _id: "63db698e4682bc1c14c68739",
          productId: "63da0d31e4a62d361a9ac185",
          quantity: 2,
          price: 100,
          shippment: 10,
          total: 200,
          total_shippment: 0,
          name: "crusher",
          category: "equipment",
        },
      ],
    };

    const result = calculateFullShippment(cart);
    expect(result).toBe(70);
  });
});
describe("calculateDiscount", () => {
  it("should return 152 discount", () => {
    const cart = {
      subTotal: 200,
      order: 788,
      products: [
        {
          promo: true,
          _id: "63db6947262b8e1bd7f3ae8f",
          productId: "63da0d41e4a62d361a9ac186",
          quantity: 2,
          price: 100,
          shippment: 10,
          total: 200,
          total_shippment: 0,
          name: "maker",
          category: "equipment",
        },
        {
          promo: true,
          _id: "63db6955262b8e1bd7f3ae90",
          productId: "63da0b6542799f34acf6cd85",
          quantity: 3,
          price: 100,
          shippment: 10,
          total: 200,
          total_shippment: 30,
          name: "latte",
          category: "coffee",
        },
        {
          promo: true,
          _id: "63db698e4682bc1c14c68739",
          productId: "63da0d31e4a62d361a9ac185",
          quantity: 2,
          price: 100,
          shippment: 10,
          total: 200,
          total_shippment: 0,
          name: "crusher",
          category: "equipment",
        },
      ],
    };

    const result = calculateDiscount(cart);
    expect(result).toBe(152);
  });
});
describe("countObjectsByProperty", () => {
  it("should return object containing coffee property with no of existance", () => {
    const cart = {
      subTotal: 200,
      products: [{ category: "coffee", quantity: 3, price: 100 }],
    };

    const result = countObjectsByProperty(cart.products, "category");
    expect(result).toEqual(expect.objectContaining({ coffee: 3 }));
  });
  it("should return object containing coffee property with no of existance", () => {
    const cart = {
      subTotal: 200,
      products: [
        { category: "coffee", quantity: 3, price: 100 },
        { category: "coffee", quantity: 3, price: 100 },
      ],
    };

    const result = countObjectsByProperty(cart.products, "category");
    expect(result).toEqual(expect.objectContaining({ coffee: 6 }));
  });
});

describe("updatePromo", () => {
  it("should return with containing promo true for coffee category", () => {
    const cart = {
      subTotal: 200,
      products: [{ promo: false, category: "coffee", quantity: 3, price: 100 }],
    };

    const result = updatePromo(cart, "coffee");
    expect(result).toEqual(
      expect.objectContaining({
        products: expect.arrayContaining([
          expect.objectContaining({
            promo: true,
          }),
        ]),
      })
    );
  });
  it("should return with containing promo true for equipment category", () => {
    const cart = {
      subTotal: 200,
      products: [
        { promo: false, category: "equipment", quantity: 3, price: 100 },
      ],
    };

    const result = updatePromo(cart, "equipment");
    expect(result).toEqual(
      expect.objectContaining({
        products: expect.arrayContaining([
          expect.objectContaining({
            promo: true,
          }),
        ]),
      })
    );
  });
  it("should return with containing promo true for accessories category", () => {
    const cart = {
      subTotal: 200,
      products: [
        { promo: false, category: "accessories", quantity: 3, price: 100 },
      ],
    };

    const result = updatePromo(cart, "accessories");
    expect(result).toEqual(
      expect.objectContaining({
        products: expect.arrayContaining([
          expect.objectContaining({
            promo: true,
          }),
        ]),
      })
    );
  });
});

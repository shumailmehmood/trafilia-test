module.exports = Object.freeze({
  PROMOTIONS: {
    coffee: {
      criteria: 2,
      includeBaseCriteria: true,
      discount: 1,
      type: "item",
    },
    equipment: {
      criteria: 3,
      includeBaseCriteria: false,
      discount: null,
      type: "shippment",
    },
    accessories: {
      criteria: 70,
      includeBaseCriteria: false,
      discount: 10,
      type: "percentage",
    },
  },
});

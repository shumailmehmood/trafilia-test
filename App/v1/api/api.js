var express = require("express");
var router = express.Router();
const UsersController = require("../controllers/users");
const ProductController = require("../controllers/products");
const cartController = require("../controllers/cart");
const orderController = require("../controllers/order");

const Auth = require("../../middleware/auth");

router.post("/login", UsersController.login);
router.post("/register", UsersController.Register);
router.get("/get/users", Auth, UsersController.get);

router.post("/register/product", Auth, ProductController.Register);
router.get("/get/products", Auth, ProductController.get);

router.post("/cart", Auth, cartController.create);
router.delete("/cart/:id", Auth, cartController.remove);
router.get("/cart", Auth, cartController.get);
router.get("/cart/:id", Auth, cartController.getSpecific);

router.post("/create/order", Auth, orderController.create);
router.get("/get/order", Auth, orderController.get);

module.exports = router;

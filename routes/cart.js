const express = require("express");
const router = express.Router({ mergeParams: true });

const WrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn } = require("../middleware.js");

const cartController=require("../controllers/cart.js");

router.get("/add", isLoggedIn, WrapAsync(cartController.addProduct));

router.post("/checkout", WrapAsync(cartController.checkout));

router.post("/delete/:orderid", WrapAsync(cartController.destroyProduct));

module.exports = router;
const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const WrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const Product = require("../models/product.js");
const farmController = require("../controllers/farm.js");

router.get("/", WrapAsync(farmController.index)
);

router.get("/shop", isLoggedIn, WrapAsync(farmController.shop)
);

router.route("/connect").get(isLoggedIn, WrapAsync(farmController.connect))
    .post( WrapAsync(farmController.ConnectForm));

router.get("/events", isLoggedIn, WrapAsync(farmController.event)
);

router.get("/cart", isLoggedIn, WrapAsync(farmController.cart));

module.exports = router;
const Product = require("../models/product.js");

module.exports.index = async (req, res) => {
    res.render("./products/home.ejs");
}

module.exports.shop = async (req, res) => {
    const allproducts = await Product.find({});
    res.render("./products/shop.ejs", { allproducts });
}

module.exports.connect = async (req, res) => {
    res.render("./products/connect.ejs");
}

module.exports.event = async (req, res) => {
    res.render("./products/event.ejs");
}
module.exports.ConnectForm = async (req, res) => {
    let { name, phoneNumber, email, msg } = req.body;
    req.flash("success", "Form Submitted");
    res.redirect("/farm");
}
module.exports.cart = async (req, res) => {
    req.user.populate('cart.items.productId').then(user => {
        res.render("./products/cart.ejs", { cart: user.cart, id: user.id });
    }).catch(err => {
        console.log(err);
    })
}
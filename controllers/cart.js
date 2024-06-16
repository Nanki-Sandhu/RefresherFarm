const Product = require("../models/product.js");
const User = require("../models/user.js");

module.exports.addProduct = async (req, res) => {
    let { id } = req.params;
    const product = await Product.findById(id);
    let result = await req.user.save();
    req.user.addToCart(product);
    req.flash("success", "Product added to your basket");
    res.redirect("/farm/shop");
}
module.exports.destroyProduct = async (req, res) => {
    let { id, orderid } = req.params;
    req.user.deleteProduct(orderid).then(() => {
        req.flash("success", "Product Deleted");
        res.redirect("/farm/cart");
    }).catch(err => console.log(err));
}
module.exports.checkout = async (req, res) => {
    let { id } = req.params;
    if (req.user.cart.items.length == 0) {
        req.flash("error", "Cart is Empty");
        res.redirect("/farm/shop");
    } else {
        let result2 = await User.findByIdAndUpdate(id, { $set: { 'cart.items': [], 'cart.totalPrice': 0 } }, { multi: true });
        req.flash("success", "Order is placed");
        res.redirect("/farm");
    }
}
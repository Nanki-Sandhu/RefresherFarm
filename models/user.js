const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const Product = require("./product.js");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                default: 0
            },
        }],
        totalPrice: Number
    }
});

userSchema.plugin(passportLocalMongoose);

userSchema.methods.addToCart = function (product) {
    let cart = this.cart;
    if (cart.items.length == 0) {
        cart.items.push({ productId: product.id, quantity: 1 });
        cart.totalPrice = product.price;
    } else {
        const exist = cart.items.findIndex(p => {
            return new String(p.productId).trim() == new String(product.id).trim();
        });
        if (exist == -1) {
            cart.items.push({ productId: product.id, quantity: 1 });
            cart.totalPrice += product.price;
        } else {
            cart.items[exist].quantity += 1;
            cart.totalPrice += product.price;
        }
    }
    return this.save();
};

userSchema.methods.deleteProduct = async function (orderid) {
    const cart = this.cart;
    const exist = cart.items.findIndex(p => {
        return new String(p.productId).trim() == new String(orderid).trim();
    });
    console.log(exist);
    if (exist >= 0) {
        const product = await Product.findById(orderid);
        cart.totalPrice -= product.price * cart.items[exist].quantity;
        cart.items.splice(exist, 1);
        return this.save();
    }
};

userSchema.methods.totalItems = async function () {
    const cart = this.cart;
    let totalItems = 0;
    cart.items.forEach(item => {
        totalItems = totalItems + item.quantity;
    });
    return totalItems;
}

module.exports = mongoose.model("User", userSchema);

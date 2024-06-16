const initData = require("./data.js");
const mongoose = require("mongoose");
const Product = require("../models/product.js");
const User=require("../models/user.js");

const mongoUrl = "mongodb://127.0.0.1:27017/farm";
main()
    .then(() => {
        console.log("connection successful");
    }).catch((err) => console.log(err));

async function main() {
    await mongoose.connect(mongoUrl);
}

const Productdata = async () => {
    await Product.deleteMany({});
    await Product.insertMany(initData.data);
}
Productdata();
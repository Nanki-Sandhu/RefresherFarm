const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const mongoose = require("mongoose");
var methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.js");
//const expressError = require("./utils/ExpressError.js");

const farmRouter=require("./routes/farm.js");
const cartRouter=require("./routes/cart.js");
const userRouter=require("./routes/user.js");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoUrl = "mongodb://127.0.0.1:27017/farm";

main()
    .then(() => {
        console.log("connection successful");
    }).catch((err) => console.log(err));

async function main() {
    await mongoose.connect(mongoUrl);
}
const store = MongoStore.create({
    mongoUrl: mongoUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },
};

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(async (req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;

    if (!req.user) {
        req.session.length = 0;
    } else {
        req.session.length = await req.user.totalItems();
    }
    res.locals.l = req.session.length;
    next();

});

/*Pages */
app.use("/farm",farmRouter);
/* Cart */
app.use("/farm/cart/:id",cartRouter);
/* Login, Signup and Logout */
app.use("/",userRouter);

app.listen(port, () => {
    console.log("Port is Listening")
});




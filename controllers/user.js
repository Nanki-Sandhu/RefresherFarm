const User=require("../models/user");
module.exports.renderSignup=async (req, res) => {
    res.render("./users/signup.ejs");
}
module.exports.renderLogin=async (req, res) => {
    res.render("./users/login.ejs");
}
module.exports.signup=async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
       
        /*Login the user after Signup */
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "We are here to Serve You");
            res.redirect("/farm");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/farm");
    }
}
module.exports.login=(req, res) => {
    req.flash("success", "We are here to Serve you");
    let redirectUrl=res.locals.redirectUrl||"/farm";
    res.redirect(redirectUrl);
}
module.exports.logout=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logout!");
        res.redirect("/farm");
    })
}
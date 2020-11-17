const User = require("../modules/user")
const Donor = require("../modules/donor")
const Donation = require("../modules/donation")
const Request = require("../modules/request")

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash("info", "You need to be logged in to access more");
    res.redirect("/login")
}

module.exports = { isLoggedIn }
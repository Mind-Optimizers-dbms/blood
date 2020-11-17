const express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    flash = require("connect-flash"),
    methodoverride = require("method-override"),
    passport = require("passport"),
    LocalStratergy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    mongoose = require("./db/mongoose"),
    User = require('./modules/user'),
    Donor = require('./modules/donor'),
    Donation = require('./modules/donation'),
    Request = require('./modules/request'),
    Userrouter = require('./routers/user'),
    Donorrouter = require('./routers/donor'),
    Donationrouter = require('./routers/donation'),
    Requestrouter = require('./routers/request'),
    Donorsrouter = require('./routers/donors')

const port = process.env.PORT || 3000

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(flash())
app.use(methodoverride("_method"))

app.use(require("express-session")({
    //secret:process.env.SECURITY_KEY,
	secret:'praju',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    res.locals.info = req.flash("info")
    next();
});


app.use("/",Userrouter)
app.use("/",Donorrouter)
app.use("/",Requestrouter)
app.use('/',Donorsrouter)
//app.use("/",Donationrouter)


app.listen(port, () => {
    console.log("B|_00|) website listening at port ");
});



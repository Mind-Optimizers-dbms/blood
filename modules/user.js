const mongoose = require("../db/mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const Donor = require("./donor")
const Request = require("./request")

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
},
 {
    timestamps: true
})

/*userSchema.virtual("donor", {
   ref: "Donor",
    localField: "_id",
    foreignField: "donor_id" //name on other thing  here its task
})*/

/*userSchema.virtual("request", {
    ref: "Request",
    localField: "_id",
    foreignField: "request_id" //name on other thing  here its task
})*/


userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema)
module.exports = User

const mongoose = require("../db/mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const validator = require("validator")

const Donation = require("./donation")
const User=require('./user')

const donorSchema = new mongoose.Schema({
	donor_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User",
		required:true
	},
	first_name:{
		type:String,
		required: true,
		trim:true
	},
	last_name:{
		type:String,
		trim:true
	},
	date_of_birth:{
		type:String,
		//required: true
	},
	gender:{
		type:String,
		required: true,
		trim:true
	},
	blood_group:{
		type:String,
		required: true
	},
	security:{
		type:Boolean,
		default:false

	},
	phone_number:{
		type:Number,
		required: true,
		maxlength:13
	},
	email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
	city:{
		type:String,
		required: true
	},
	address:{
		type:String,
		required: true
	},
	pincode:{
		type:Number,
		required: true
	}
},
{
	timestamps: true

})

/*donorSchema.virtual("donation", {
    ref: "Donation",
    localField: "donor_id",
    foreignField: "d_donor_id" //name on other thing  here its task
})*/

module.exports = mongoose.model("Donor", donorSchema);



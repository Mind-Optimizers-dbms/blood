const validator = require("validator")
const mongoose = require("../db/mongoose")
const User = require('./user')

const requestSchema = new mongoose.Schema({
	request_id:{
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
	phone_number:{
		type:Number,
		required: true
	},
	email:{
        type: String,
        trim: true,
        lowercase: true,
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
	},
	message:{
		type:String,
	}
},{
	timestamps: true
})

module.exports = mongoose.model("Request", requestSchema);



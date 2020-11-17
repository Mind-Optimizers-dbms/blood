const express = require("express")
const router = new express.Router()
const passport = require("passport")
const { isLoggedIn } = require("../middleware/middleware")
const Donor = require("../modules/donor");

router.get("/home", (req, res) => {
    res.render("home")
});

router.post("/donorform", (req, res) => {
	req.body.donor_id=req.user._id
	var newdonor= new Donor({
		donor_id:req.body.donor_id,
		first_name:req.body.first_name,
		last_name:req.body.last_name,
		date_of_birth:req.body.date_of_birth,
		gender:req.body.gender,
		blood_group:req.body.blood_group,
		email:req.body.email,
		phone_number:req.body.phone_number,
		city:req.body.city,
		address:req.body.address,
		pincode:req.body.pincode
	})
	newdonor.save((err,doc) => {
        if(!err)
        {
        	req.flash('success','Profile Created');
            res.redirect('./home')
        }
        else{
            //console.log('Error during insert'+err)
            req.flash('error', err.message);
        }
    })
});

router.get("/donorform", isLoggedIn , (req,res) => {
	Donor.findOne({donor_id:req.user},(err, result) =>{
	 	if(result)
	 	{
	 		req.flash('error', 'Your Profile exists in database');
                res.redirect("profile")
	 	}
	 	else{
	res.render("donorform")
}
})
});
module.exports = router;

const express = require("express")
const router = new express.Router()
const passport = require("passport")
const { isLoggedIn } = require("../middleware/middleware")
const Donor = require("../modules/donor");

router.get("/home", (req, res) => {
    res.render("home")
});

router.get("/donors", (req, res) => {
    Donor.find({},(err, result) => {
        if (err) {
            console.log(err);
        } else {
            //    console.log(result)
              res.render("donors", { user: result });
}
})
})
router.post("/donors", (req, res) => {
	var b=req.body.blood_group,
		c=req.body.city,
		p=req.body.pincode
	//console.log(b,c,p)
	if(b && c && p)
	{
    Donor.find(
    	{
    	blood_group:b ,
    	city:c,
    	pincode:p
    }
    ,
    (err, result) => {
        if (err) {
            req.flash('error', err.message);
            res.render("home")
        } else {
             //   console.log(result)
              res.render("donors", { user: result });}})
	}
	else{
		Donor.find({
			blood_group:b,city:c
		},
		(err,result) => {
			if (err) {
				req.flash('error', err.message);
				res.render("home")
			}else{
				res.render("donors",{user:result})
			}
		})
	}

})


module.exports = router;

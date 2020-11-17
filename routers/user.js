const express = require("express")
const router = new express.Router()
const passport = require("passport")
const User = require("../modules/user")
const Donor = require('../modules/donor')
const Request = require('../modules/request')
const { isLoggedIn } = require("../middleware/middleware");

router.get("/login", (req, res) => {    
    res.render("login")
});

router.get("/", (req,res) => {
    res.render("home")
})
  router.get("/home",(req,res) => {
    res.render("home")
  })
router.get("/settings",isLoggedIn ,(req,res) => {
    Donor.findOne({donor_id:req.user._id},(err,result1) =>{
        Request.findOne({request_id:req.user._id},(err,result2) => {
            if(!err){
                res.render("settings",{donor : result1,request : result2})
            }
            else{
                req.flash('error',err.message)
            }
        })
        if(err && !result1)
        {
            req.flash('error',err.message)
            res.render("home")
        }

    })
    
})

router.get("/securityupdatetofalse/:id",(req,res) => {
    console.log(req.params.id)
    console.log(req.user._id)
    if(req.params.id==req.user._id){
        console.log('success')
        Donor.updateOne({donor_id:req.user._id},{$set : {security : false}},(err,result) =>{
            console.log(err)
            console.log(result)
            req.flash('info','Allowed others to view Profile')
            res.redirect('home')
        } )
    }
    else{
        console.log('failed')
    }

})
router.get("/securityupdatetotrue/:id",(req,res) => {
    if(req.params.id==req.user._id){
        Donor.updateOne({donor_id:req.user},{$set : {security : true}},(err,result) =>{
            req.flash('info','Allowed others to view Profile')
            res.render('home')
        } )
    }
})
router.get("/requestlist", (req, res) => {
    Request.find({},(err, result) => {
        if (err) {
            console.log(err);
        } else {
            //    console.log(result)
              res.render("requestlist", { user: result });
}
})
})

router.get("/requestdelete/:id", (req, res) => {    
    Request.deleteOne({_id:req.params.id},(err,result) => {
        if(result)
        {
            req.flash('success','Request deleted Successfully')
           // res.redirect("home")
           Request.find({},(err,result) => {
            res.render("requestlist",{user:result})
           })
            
        }   
        else{
            req.flash('error',err.message)
            res.render("home")
        }
        })
    })

/*router.get('/requestedit',(req,res) => {
    res.render("/requestedit")
})*/

router.get("/requestedit/:id", (req , res) =>{
    Request.findOne({_id:req.params.id},(err,result) => {
        res.render("/requestedit", { user: result} )
    })

})



router.get("/profile", (req, res) => {
    Donor.findOne({donor_id:req.user},(err, result) => {
        if (err) {
           // console.log(err);
           req.flash('error', err.message);
           res.render("home")
        } else {
               // console.log(result)
               if(result)
               {
                res.render("profile", { user: result });
            }
            else
            {
                req.flash('error', 'Profile Not Created');
                res.redirect("donorform")
            }
}
})
})
router.get('/request', isLoggedIn , (req ,res) => {
    Request.countDocuments({request_id:req.user},(err,result) => {
        console.log(result)
        if(result <3)
        {
            res.render("request")
        }
        else
        {
            req.flash('error', "You can request only 3 ");
            req.flash('info','You can delete previous requests')
            res.redirect('home')
        }

    })

});
router.get("/profile/:id", (req, res) => {
    Donor.findOne({donor_id:req.params.id},(err, result) => {
      res.render("profile", { user: result })
    })
  })  

router.get("/editprofile", (req, res) => {
    Donor.findOne({donor_id:req.user},(err, result) => {
        if (err) {
            //console.log(err);
            req.flash('error', err.message);
            res.redirect('home')
        } else {
              //  console.log(result)
              if(result)
              {
                res.render("editprofile", { user: result });
            }
            else{
                req.flash('error', 'Profile Not Created');
                res.redirect("donorform")

            }
}
})
})
router.post("/editprofile", (req, res) => {
        req.body.donor_id=req.user
   
    Donor.replaceOne({"donor_id":req.user._id},{"donor_id":req.user._id,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        gender:req.body.gender,
        blood_group:req.body.blood_group,
        email:req.body.email,
        date_of_birth:req.body.date_of_birth,
        "phone_number":req.body.phone_number,
        "city":req.body.city,
        "address":req.body.address,
        security:req.body.security,
        "pincode":req.body.pincode} ,(err, result) => {
  
        if (err) {
            //console.log(err);
            req.flash('error', err.message);
            res.render("home")
        } else {
             //   console.log(result)
              if(result)
              {
                req.flash('success','Profile Updated Successfully')
                res.redirect("profile");
            }
            else
            {
                req.flash('error', err.message);
                res.render("home");
            }
}
})
})



router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: 'Logged in successfully'
}), (req, res) => {});

router.get("/signup", (req, res) => {
    res.render("signup")
});

//handling user sign up
router.post("/signup", (req, res) => {
    const newuser = new User({ username: req.body.username })
    
    User.register(newuser, req.body.password, (err, user) => {
        if (err) {
            console.log(err.message)
            req.flash('error', err.message);
            res.redirect("back")
        }
        passport.authenticate("local")(req, res, function() {
            req.flash('success', "Account Created   Welcome " + user.username);
            res.redirect("/")
        });
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged out successfully")
    res.redirect("/home");
});

module.exports = router;
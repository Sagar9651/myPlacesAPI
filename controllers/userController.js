const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');


router.post('/authenticate', authenticate )
router.post('/register', register )
router.get('/getProfile/:userId', getUserData )
router.put('/updateProfile/:userId', updateProfile)

module.exports = router;

function authenticate(req, res, next) {
    userModel.find({ emailId: req.body.emailId }, { password: req.body.password }, function (err, user) {
        if (err) {
            // return res.json({ message: "Email ID or Password is Incorrect" });
            res.json({ error: err });
        } else {
            const { password, ...userWithoutPassword } = user;
            return res.json(...userWithoutPassword);
        }
    });

}

 function getUserData(req, res, next) {
    userModel.findById(req.params.userId, function (err, user) {
        if (err) {
            res.json({ error: err });
        }
        res.json(user);
    })
}

function register(req, res, next) {
    console.log(req.body);
    let profileRes = new userModel();
    profileRes = req.body;
    profileRes.save(function (err,data) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ message: 'User Registered Successfully', Profile: profileRes });
        }
    });
}

function updateProfile(req, res, next) {
    userModel.findByIdAndUpdate(req.params.userId, req.body, function (err) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ message: "Profile Updated Successfully" });
        }
    });
}
const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');


// router.post('/authenticate', authenticate )
// router.post('/register', register )
// router.get('/getProfile/:userId', getUserData )
// router.put('/updateProfile/:userId', updateProfile)

// module.exports = router;

module.exports = {
    authenticate,
    getUserData,
    register,
    updateProfile
};

// async function authenticate(req, res, next) {
//     await userModel.find({ emailId: req.body.emailId, password: req.body.password }, function (err, user) {
//         if (err) {
//             // return res.json({ message: "Email ID or Password is Incorrect" });
//             res.json({ error: err });
//         } else {
//             // const { password, ...userWithoutPassword } = user;
//             // res.json(...userWithoutPassword);
//             res.json({ User: user });
//         }
//     });

// }

async function authenticate(req, res, next) {
  const user = await userModel.findOne({ emailId: req.body.emailId, password: req.body.password }).select('-password');
    if(!user) {
        res.status(404).json({message: 'User Not Found'});
    } else{
        res.json({user});
    }
}

async function getUserData(req, res, next) {
    await userModel.findById(req.params.userId, function (err, user) {
        if (err) {
            res.json({ message: "User Not Found" });
        } else {
            res.json(user);
        }
    }).select('-password')
}


async function register(req, res, next) {
    console.log(req.body);
    let profileRes = new userModel(req.body);
    // profileRes = req.body;
    await profileRes.save(function (err, data) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ message: 'User Registered Successfully', Profile: profileRes });
        }
    });
}

async function updateProfile(req, res, next) {
    await userModel.findByIdAndUpdate(req.params.userId, req.body, function (err) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ message: "Profile Updated Successfully" });
        }
    });
}
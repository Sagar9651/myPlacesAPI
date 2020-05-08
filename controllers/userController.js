const express = require('express');
const router = express.Router();
const config = require('../helpers/config.json');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');

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

async function authenticate(req, res, next) {
    const user = await userModel.findOne({ emailId: req.body.emailId });
    if (!user) {
        res.status(404).json({ message: 'User Not Found' });
    } else {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const token = jwt.sign({ sub: user.id, email: user.emailId }, config.secret);
            // const { password, ...userWithoutPassword } = user;
            // res.json(...userWithoutPassword);
            res.json({ user, token });
        } else {
            res.json({ message: 'Password Incorrect' });
        }
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
    bcrypt.hash(req.body.password, 10).then(hash => {
        profileRes.password = hash;
        profileRes.save(function (err, data) {
            if (err) {
                res.json({ error: err });
            } else {
                res.json({ message: 'User Registered Successfully' });
            }
        });
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
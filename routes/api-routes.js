const router = require('express').Router();
var userController = require('../controllers/userController');
var placesController = require('../controllers/placeController');
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});


router.use('/profile/',userController);
router.use('/places/',placesController);

// router.route('/profile')
//     .post('/authenticate', userController.authenticate )
//     .post('/register', userController.register )
//     .get('/getProfile/:userId', userController.getUserData )
//     .put('/updateProfile/:userId', userController.updateProfile)

module.exports = router;

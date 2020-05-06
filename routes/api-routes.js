// const router = require('express').Router();
// var userController = require('../controllers/userController');
// var placesController = require('../controllers/placeController');
// router.get('/', function (req, res) {
//     res.json({
//         status: 'API Its Working',
//         message: 'Welcome to RESTHub crafted with love!',
//     });
// });


// router.use('/profile/',userController);
// router.use('/places/',placesController);

// // router.route('/profile')
// //     .post('/authenticate', userController.authenticate )
// //     .post('/register', userController.register )
// //     .get('/getProfile/:userId', userController.getUserData )
// //     .put('/updateProfile/:userId', userController.updateProfile)

// module.exports = router;

module.exports = (app) => {
    const userController = require('../controllers/userController');

    app.post('/authenticate', userController.authenticate);
    app.post('/register', userController.register);
    app.get('/getProfile/:userId', userController.getUserData);
    app.put('/updateProfile/:userId', userController.updateProfile);

    const placesController = require('../controllers/placeController');
    
    app.post('/savePlace', placesController.savePlace);
    app.get('/getPlaces/:userId', placesController.getPlaces);
    app.put('/updatePlace/:placeId', placesController.updatePlace);
    app.delete('/deletePlace/:placeId', placesController.deletePlace);
}
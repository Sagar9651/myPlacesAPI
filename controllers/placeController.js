const express = require('express');
const router = express.Router();
const placeModel = require('../model/placesModel');


// router.post('/savePlace', savePlace)
// router.get('/getPlaces/:userId', getPlaces)
// router.put('/updatePlace/:placeId', updatePlace)
// router.delete('/deletePlace/:placeId', deletePlace)

// module.exports = router;


module.exports = {
    savePlace,
    getPlaces,
    updatePlace,
    deletePlace
}

async function getPlaces(req, res) {
    await placeModel.find({ userId: req.params.userId }, function (err, places) {
        if (err) {
            res.json({ error: err });
        }
        res.json(places);
    })
}

async function savePlace(req, res) {
    let place = new placeModel();
    place = req.body;
    await place.save(function (err) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ message: 'Place Saved', Place: place });
        }
    });

}

async function updatePlace(req, res) {
    await placeModel.findByIdAndUpdate(req.params.placeId, req.body, function (err) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ message: "Place Updated Successfully" });
        }
    });
}

async function deletePlace(req, res) {
    await placeModel.findByIdAndDelete(req.params.placeId, function (err) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ message: "Place Deletd Successfully" });
        }
    })
}

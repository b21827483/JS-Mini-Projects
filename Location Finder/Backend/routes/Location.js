const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const router = express.Router();

const url = "mongodb+srv://bug:chngPs01>@cluster0.jkhsyu7.mongodb.net/locations?retryWrites=true&w=majority"

const client = new MongoClient(url); 

const locationStorage = {
    locations: []
}

router.post("/add-loc", (req, res, next) => {

    client.connect(function(err, client) {
        const db = client.db('locations');
    
        db.collection('user-locations').insertOne(
          {
            address: req.body.address,
            coords: { lat: req.body.lat, lng: req.body.lng }
          },
          function(err, r) {
            res.json({ message: 'Stored location!', locId: r.insertedId });
          }
        );
      });

})

router.get("/location/:locid", (req, res, next) => {
    const locationId = req.params.locid;
    client.connect(function(err, client) {
        const db = client.db('locations');
    
        db.collection('user-locations').findOne(
          {
            _id: new mongodb.ObjectId(locationId)
          },
          function(err, doc) {
            if (!doc) {
              return res.status(404).json({ message: 'Not found!' });
            }
            res.json({ address: doc.address, coordinates: doc.coords });
          }
        );
      });
});

module.exports = router
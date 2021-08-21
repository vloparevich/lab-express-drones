const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find().then((dronesFromDB) => {
    console.log(dronesFromDB);
    res.render('drones/list', { dronesFromDB });
  });
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  const dataFromForm = req.body;
  Drone.create(dataFromForm)
    .then((addedDrone) => {
      console.log('This is a new Drone: ', addedDrone);
      res.redirect('/drones');
      // throw new Error('BROKEN')
    })
    .catch((err) => {
      console.log('Drone was not added to DB', err);
      res.redirect('/drones/create');
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  const droneId = req.params.id;
  console.log(droneId);
  Drone.findById(droneId)
    .then((foundDrone) => {
      console.log(foundDrone);
      res.render('drones/update-form', foundDrone);
    })
    .catch((err) => {
      console.log(`Drone was not found: ${err}`);
    });
});

router.post('/drones/:id/delete', (req, res, next) => {
  console.log(`To be deleted ${req.params.id}`);
  Drone.findOneAndDelete(req.params.id)
    .then((deletedDocument) => {
      console.log(
        `Successfully deleted document that had the form: ${deletedDocument}.`
      );
      res.redirect('/drones');
    })
    .catch((err) =>
      console.error(`Failed to find and delete document: ${err}`)
    );
});

router.post('/drones/:id/edit', (req, res, next) => {
  Drone.findOneAndUpdate(req.params.id, req.body, {
    new: true,
  }).then((updatedDrone) => {
    console.log(updatedDrone);
    res.redirect('/drones');
  });
});
module.exports = router;

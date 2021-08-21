// Iteration #1
const mongoose = require('mongoose');
const Drone = require('../models/Drone.model');
require('../db/index');

const drones = [
  { name: 'Creeper XL 500', propellers: 3, maxSpeed: 12 },
  { name: 'Racer 57', propellers: 4, maxSpeed: 20 },
  { name: 'Courier 3000i', propellers: 6, maxSpeed: 18 },
];

Drone.create(drones)
  .then((responseFromDB) => {
    console.log(`Drones were successfully added to the DB ${responseFromDB}`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(
      `Something bad has happened during the storing drones into the DB ${err}`
    );
  });

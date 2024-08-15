const express = require("express");
const router = express.Router();

const {
  createPassenger,
  getPassenger
} = require("../../controllers/passengerController");
const { validateCreatePassenger } = require('../../middlewares/index');

router.post('/passenger', validateCreatePassenger, createPassenger);
router.get('/passenger/:id', getPassenger);

module.exports = router;
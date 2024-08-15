const express = require('express');
const router = express.Router();

const ticketRoutes = require('./v1/ticketRoutes');
const passengerRoutes = require('./v1/passengerRoutes');

router.use('/v1', ticketRoutes);
router.use('/v1', passengerRoutes);

module.exports = router
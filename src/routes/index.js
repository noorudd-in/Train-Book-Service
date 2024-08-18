const express = require('express');
const router = express.Router();

const ticketRoutes = require('./v1/ticketRoutes');

router.use('/v1', ticketRoutes);

module.exports = router
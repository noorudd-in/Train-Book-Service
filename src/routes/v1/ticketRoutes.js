const express = require("express");
const router = express.Router();

const {
  createTicket,
  updateTicket,
  getTicket
} = require("../../controllers/ticketController");
const { validateCreateBooking, validateUpdateBooking } = require('../../middlewares/index')

router.post('/booking', validateCreateBooking, createTicket);

// Routes available to users
// Cancel a ticket (Update the ticket status)
router.patch('/ticket/:id', validateUpdateBooking, updateTicket);
// Get the details of thier ticket
router.get('/pnr/:pnr', getTicket);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createTicket,
  cancelTicket,
  getTicket,
} = require("../../controllers/ticketController");
const { validateCreateBooking, isLoggedIn, validateCreatePassenger, validateGetTicket } = require('../../middlewares/index')



// Routes available to users
router.post('/booking', isLoggedIn, validateCreatePassenger, validateCreateBooking, createTicket);
// Cancel a ticket (Update the ticket status)
router.patch('/ticket/:pnr', isLoggedIn, cancelTicket);
// Get the details of thier ticket
router.post('/pnr/:pnr', isLoggedIn, validateGetTicket, getTicket);

module.exports = router;
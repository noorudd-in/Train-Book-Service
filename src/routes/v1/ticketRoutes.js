const express = require("express");
const router = express.Router();

const {
  createTicket,
  updateTicket,
  getTicket
} = require("../../controllers/ticketController");
const { validateCreateBooking, validateUpdateBooking, isLoggedIn, validateCreatePassenger } = require('../../middlewares/index')



// Routes available to users
router.post('/booking', isLoggedIn, validateCreatePassenger, validateCreateBooking, createTicket);
// Cancel a ticket (Update the ticket status)
router.patch('/ticket/:id', validateUpdateBooking, isLoggedIn, updateTicket);
// Get the details of thier ticket
router.get('/pnr/:pnr', getTicket);

module.exports = router;
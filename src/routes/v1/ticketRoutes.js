const express = require("express");
const router = express.Router();

const {
  createTicket,
  updateTicket,
  getTicket
} = require("../../controllers/ticketController");
const { validateCreateBooking, validateUpdateBooking, isLoggedIn } = require('../../middlewares/index')



// Routes available to users
router.post('/booking', validateCreateBooking, isLoggedIn, createTicket);
// Cancel a ticket (Update the ticket status)
router.patch('/ticket/:id', validateUpdateBooking, isLoggedIn, updateTicket);
// Get the details of thier ticket
router.get('/pnr/:pnr', getTicket);

module.exports = router;
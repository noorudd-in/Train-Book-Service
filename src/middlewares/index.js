const {
  validateCreateBooking,
  validateUpdateBooking,
  validateCreatePassenger,
  validateGetTicket
} = require("./validateRequest");

const { isLoggedIn } = require('./authValidation')

module.exports = {
    validateCreateBooking,
    validateUpdateBooking,
    validateCreatePassenger,
    isLoggedIn,
    validateGetTicket
}
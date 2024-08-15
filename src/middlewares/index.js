const {
  validateCreateBooking,
  validateUpdateBooking,
  validateCreatePassenger,
} = require("./validateRequest");

const { isLoggedIn } = require('./authValidation')

module.exports = {
    validateCreateBooking,
    validateUpdateBooking,
    validateCreatePassenger,
    isLoggedIn
}
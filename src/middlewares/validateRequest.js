const { client } = require("../utils/statusCodes");

const validateCreateBooking = (req, res, next) => {
  if (!req.body.user_id) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "User Id is required.",
      success: false,
      error: "Invalid request",
    });
  }
  if (!req.body.from_schedule_id) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Source Schedule Id is required.",
      success: false,
      error: "Invalid request",
    });
  }
  if (!req.body.to_schedule_id) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Destination Schedule Id is required.",
      success: false,
      error: "Invalid request",
    });
  }
  if (!req.body.class) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Booking Class is required.",
      success: false,
      error: "Invalid request",
    });
  }
  if (!["SL", "3E", "1A", "2A", "3A"].includes(req.body.class)) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message:
        "Invalid booking class. Allowed values are 'SL', '3E', '1A', '2A' or '3A'",
      success: false,
      error: "Invalid request",
    });
  }
  if (!req.body.category) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Booking Category is required.",
      success: false,
      error: "Invalid request",
    });
  }
  if (
    !["general", "ladies", "senior_citizen", "tatkal"].includes(
      req.body.category
    )
  ) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message:
        "Invalid booking category. Allowed values are 'general', 'ladies', 'senior_citizen' or 'tatkal'",
      success: false,
      error: "Invalid request",
    });
  }
  next();
};

const validateUpdateBooking = (req, res, next) => {
  const data = req.body;
  if (
    data.user_id ||
    data.pnr ||
    data.schedule_id ||
    data.class ||
    data.category ||
    data.passenger_id ||
    data.booked
  ) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Only ticket status can be changed after it's booked.",
      success: false,
      error: "Invalid request",
    });
  }
  if (!data.status) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Booking Status is required.",
      success: false,
      error: "Invalid request",
    });
  }
  if (!["booked", "cancelled"].includes(data.status)) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message:
        "Invalid booking status. Allowed values are 'booked' or 'cancelled'",
      success: false,
      error: "Invalid request",
    });
  }
  if (data.status == "cancelled") {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Booking status cannot be changed once it's cancelled.",
      success: false,
      error: "Invalid request",
    });
  }
  next();
};

const validateCreatePassenger = (req, res, next) => {
  if (!req.body.p1_name) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Passenger one name is required.",
      success: false,
      error: "Invalid request",
    });
  }
  if (!req.body.p1_age) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Passenger one age is required.",
      success: false,
      error: "Invalid request",
    });
  }
  if (!req.body.p1_status) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Passenger one ticket status is required.",
      success: false,
      error: "Invalid request",
    });
  }
  if (!req.body.p1_gender) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Passenger one gender is required.",
      success: false,
      error: "Invalid request",
    });
  }
  if (!["M", "F", "T"].includes(req.body.p1_gender)) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message:
        "Invalid gender. Allowed values are 'M', 'F' or 'T'",
      success: false,
      error: "Invalid request",
    });
  }
  next();
};

module.exports = {
  validateCreateBooking,
  validateUpdateBooking,
  validateCreatePassenger,
};

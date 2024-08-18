const { client } = require("../utils/statusCodes");

const validateCreateBooking = (req, res, next) => {
  if (!req.body.train_number) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Train Number is required.",
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
  if (!req.body.p1_name || !req.body.p1_age || !req.body.p1_gender) {
    return res.status(client.BAD_REQUEST).json({
      data: null,
      message: "Passenger one name is required.",
      success: false,
      error: "Invalid request",
    });
  }

  for (let i = 1; i <= 6; i++) {
    const name = req.body[`p${i}_name`];
    const age = req.body[`p${i}_age`];
    const gender = req.body[`p${i}_gender`];
    if (name) {
      if (Number(age) > 100 || Number(age) < 1) {
        return res.status(client.BAD_REQUEST).json({
          data: null,
          message: `Invalid age for passenger ${i}`,
          success: false,
          error: "Invalid request",
        });
      }
      if (!["M", "F", "T"].includes(gender)) {
        console.log("TRUEEE");
        return res.status(client.BAD_REQUEST).json({
          data: null,
          message: `Invalid gender for passenger ${i}. Allowed values are 'M', 'F' or 'T'`,
          success: false,
          error: "Invalid request",
        });
      }
      // If selected category is ladies then check thier gender.
      if (req.body.category == "ladies" && gender != 'F') {
        return res.status(client.BAD_REQUEST).json({
          data: null,
          message:
            "Since you selected ladies as category, all passengers should be female.",
          success: false,
          error: "Invalid request",
        });
      }

      // If selected category is senior citizen then check thier age.
      if (req.body.category == "senior_citizen" && Number(age) < 60) {
        return res.status(client.BAD_REQUEST).json({
          data: null,
          message:
            "All passengers should be above 60 years since you selected category as senior citizen.",
          success: false,
          error: "Invalid request",
        });
      }
    }
  }

  next();
};

module.exports = {
  validateCreateBooking,
  validateUpdateBooking,
  validateCreatePassenger,
};

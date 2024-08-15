const { PassengerService } = require("../services/index");
const {success, client, server} = require('../utils/statusCodes')
const passengerService = new PassengerService();

const createPassenger = async (req, res) => {
  try {
    const passenger = await passengerService.create(req.body);
    if (passenger.success == false) {
      return res.status(server.INTERNAL_SERVER_ERROR).json({
        data: null,
        success: false,
        message: passenger.message,
        error: passenger.error,
      });
    }
    return res.status(success.CREATED).json({
      data: passenger,
      success: true,
      message: "Passenger created successfully.",
      error: null,
    });
  } catch (error) {
    return res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot create a passenger.",
      error: error,
    });
  }
};

const getPassenger = async (req, res) => {
  try {
    const passenger = await passengerService.get(req.params.id);
    if (!passenger) {
      return res.status(client.NOT_FOUND).json({
        data: passenger,
        success: false,
        message: "Passenger you specified doesn't exist!",
        error: "Passenger not found",
      });
    }
    return res.status(success.OK).json({
      data: passenger,
      success: true,
      message: "Passenger fetched successfully.",
      error: null,
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot fetch a passenger.",
      error: error,
    });
  }
};

module.exports = {
  createPassenger,
  getPassenger,
};

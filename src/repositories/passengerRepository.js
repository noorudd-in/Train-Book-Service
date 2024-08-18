const { Passenger } = require("../models/index");

class PassengerRepository {
  async create(data) {
    try {
      const result = await Passenger.create(data);
      return result;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      return {
        data: null,
        message: error.message,
        success: false,
        error: error.name,
      };
    }
  }

  async get(id) {
    try {
      const result = Passenger.findByPk(id);
      if (!result) {
        return null;
      }
      return result;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      console.log(error);
      return {
        data: null,
        message: error.message,
        success: false,
        error: error.name
      };
    }
  }
}

module.exports = PassengerRepository;

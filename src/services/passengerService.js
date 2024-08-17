const { PassengerRepository } = require("../repositories/index");

class PassengerService {
  constructor() {
    this.passengerRepository = new PassengerRepository()
  }

  async create(data) {
    try {
      const result = await this.passengerRepository.create(data);
      return result;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }

  async get(id) {
    try {
      const result = this.passengerRepository.get(id);
      return result;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
}
module.exports = PassengerService;
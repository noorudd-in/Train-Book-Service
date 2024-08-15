const CrudService = require('./crudService')
const { PassengerRepository } = require("../repositories/index");

class PassengerService extends CrudService {
  constructor() {
    const passengerRepository = new PassengerRepository()
    super(passengerRepository)
  }
}
module.exports = PassengerService;
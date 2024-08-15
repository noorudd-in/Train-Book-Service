const CrudRepository = require("./crudRepository");
const { Passenger } = require("../models/index");

class PassengerRepository extends CrudRepository {
    constructor() {
      super(Passenger);
    }
  }
  
  module.exports = PassengerRepository;
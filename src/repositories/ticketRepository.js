const CrudRepository = require("./crudRepository");
const { Ticket } = require("../models/index");

class TicketRepository extends CrudRepository {
    constructor() {
      super(Ticket);
    }
  }
  
  module.exports = TicketRepository;
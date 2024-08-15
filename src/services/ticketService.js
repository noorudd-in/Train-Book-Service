const CrudService = require('./crudService')
const { TicketRepository } = require("../repositories/index");

class TicketService extends CrudService {
  constructor() {
    const ticketRepository = new TicketRepository()
    super(ticketRepository)
  }
}
module.exports = TicketService;

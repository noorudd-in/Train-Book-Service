const { Ticket } = require("../models/index");

class TicketRepository {
  async create(data) {
    try {
      const result = await Ticket.create(data);
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

  async cancelTicket(pnr) {
    try {
      const result = await Ticket.findOne({
        where: {
          pnr: pnr,
        },
      });
      if (!result) {
        return {
          data: null,
          message: "Ticket doesn't exist",
          success: false,
          error: "Ticket you want to update doesn't exist",
        };
      }
      if (result.status == 'cancelled') {
        return {
          data: null,
          message: "Ticket already cancelled",
          success: false,
          error: "Ticket you want to cancel is already cancelled!",
        };
      }
      result.status = "cancelled",
      result.cancelled = new Date()
      result.save()
      return result;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      console.log(error);
      return {
        data: null,
        message: error.message,
        success: false,
        error: error.name,
      };
    }
  }

  async getTicket(data) {
    try {
      const result = await Ticket.findOne({
        where: {
          pnr: data.pnr,
        },
      });
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
        error: error.name,
      };
    }
  }
}

module.exports = TicketRepository;

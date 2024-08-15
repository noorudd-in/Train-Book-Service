const { TicketService } = require("../services/index");
const { success, client, server } = require("../utils/statusCodes");

const ticketService = new TicketService();

const createTicket = async (req, res) => {
  try {
    const ticket = await ticketService.create(req.body);
    if (ticket.success == false) {
      return res.status(server.INTERNAL_SERVER_ERROR).json({
        data: null,
        success: false,
        message: ticket.message,
        error: ticket.error,
      });
    }
    return res.status(success.CREATED).json({
      data: ticket,
      success: true,
      message: "Ticket created successfully.",
      error: null,
    });
  } catch (error) {
    return res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot create a ticket.",
      error: error,
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticket = await ticketService.update(req.params.id, req.body);
    if (ticket[0] == 0 || !ticket) {
      return res.status(server.INTERNAL_SERVER_ERROR).json({
        data: null,
        success: false,
        message: "Ticket you want to update, doesn't exist!",
        error: "Ticket not found",
      });
    }
    return res.status(success.CREATED).json({
      data: ticket,
      success: true,
      message: "Ticket updated successfully.",
      error: null,
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot update a ticket.",
      error: error,
    });
  }
};

const getTicket = async (req, res) => {
  try {
    const ticket = await ticketService.get(req.params.id);
    if (!ticket) {
      return res.status(client.NOT_FOUND).json({
        data: ticket,
        success: false,
        message: "Ticket you specified doesn't exist!",
        error: "Ticket not found",
      });
    }
    return res.status(success.OK).json({
      data: ticket,
      success: true,
      message: "Ticket fetched successfully.",
      error: null,
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot fetch a ticket.",
      error: error,
    });
  }
};

module.exports = {
  createTicket,
  updateTicket,
  getTicket,
};

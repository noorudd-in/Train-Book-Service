const { TicketService } = require("../services/index");
const { success, client, server } = require("../utils/statusCodes");

const ticketService = new TicketService();

const createTicket = async (req, res) => {
  try {
    const ticket = await ticketService.create(req.body, req.headers);
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

const cancelTicket = async (req, res) => {
  try {
    const ticket = await ticketService.cancelTicket(req.params.pnr);
    if (ticket[0] == 0 || !ticket) {
      return res.status(server.INTERNAL_SERVER_ERROR).json({
        data: null,
        success: false,
        message: "Ticket you want to cancel, doesn't exist!",
        error: "Ticket not found",
      });
    }
    return res.status(success.CREATED).json({
      data: ticket,
      success: true,
      message: "Ticket has been cancelled.",
      error: null,
    });
  } catch (error) {
    res.status(server.INTERNAL_SERVER_ERROR).json({
      data: null,
      success: false,
      message: "Cannot cancel a ticket.",
      error: error,
    });
  }
};

const getTicket = async (req, res) => {
  try {
    const ticket = await ticketService.getTicket({
      pnr: req.params.pnr,
      user_id: req.body.user_id,
      authtoken: req.headers.authtoken
    });
    if (!ticket) {
      return res.status(client.NOT_FOUND).json({
        data: ticket,
        success: false,
        message: "Invalid PNR!",
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
    console.log(error)
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
  cancelTicket,
  getTicket,
};

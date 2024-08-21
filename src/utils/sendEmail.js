const transporter = require("../config/mailer");
const {
  createTicketEmailBody,
  cancelTicketEmailBody,
} = require("./htmlContent");

function sendCreateTicketEmail(to, fullName, pnr) {
  const emailBody = createTicketEmailBody
    .replace("{{fullName}}", fullName)
    .replace("{{pnr}}", pnr);

  const mailOptions = {
    from: "Tickets <tickets@noorudd.in>",
    to,
    subject: "Booking Confirmation",
    html: emailBody,
    attachments: [
      {
        filename: "Ticket.pdf",
        path: "./data/ticket.pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

function sendCancelTicketEmail(to, fullName, pnr, refund) {
  const emailBody = cancelTicketEmailBody
    .replace("{{fullName}}", fullName)
    .replace("{{pnr}}", pnr)
    .replace("{{refund}}", refund);

  const mailOptions = {
    from: "Tickets <tickets@noorudd.in>",
    to,
    subject: "Ticket Cancellation Confirmation",
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = { sendCreateTicketEmail, sendCancelTicketEmail };

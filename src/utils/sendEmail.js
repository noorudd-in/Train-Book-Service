const transporter = require("../config/mailer");
const { createTicketEmailBody } = require("./htmlContent");

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

module.exports = sendCreateTicketEmail;

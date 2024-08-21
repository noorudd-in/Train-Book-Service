const nodemailer = require("nodemailer");
const { EMAIL_HOST, EMAIL_ID, EMAIL_PASS, EMAIL_PORT } = require("./constants");
let transporter = nodemailer.createTransport({
  pool: true,
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: true,
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PASS,
  },
});

module.exports = transporter;
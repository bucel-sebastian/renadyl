const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  host: "mail.renadyleurope.com",
  port: "465",
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PW,
  },
});

// import { transporter } from "./Nodemailer";

const nodemailer = require("nodemailer");
export const sendNewAccountEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "mail.renadyleurope.com",
    port: "465",
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  try {
    console.log("se incearca sa se trimita");
    const mailOptions = {
      from: '"Renadyl.ro "<no-reply@renadyleurope.com>',
      to: data.sendTo,
      subject: data.lang === "RO" ? "" : "",
      text: "text",
    };
    console.log("optiuni configurate");
    transporter.sendMail(mailOptions, function (error, info) {
      console.log(info, error);
      if (error) {
        console.log(error);
        return { status: "fail", error: error };
      } else {
        console.log("ok");
        return { status: "ok" };
      }
    });
  } catch (error) {
    console.log("error trycatch - ", error);
  }
};

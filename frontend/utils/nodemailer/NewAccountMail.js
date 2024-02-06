import { transporter } from "./Nodemailer";

export const sendNewAccountEmail = async (data) => {
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

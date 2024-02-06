import { FaIgloo } from "react-icons/fa";
import { transporter } from "./Nodemailer";

export const sendNewAccountEmail = async (data) => {
  const mailOptions = {
    from: '"Renadyl.ro "<no-reply@renadyleurope.com>',
    to: data.sendTo,
    subject: data.lang === "RO" ? "" : "",
    text: "text",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return { status: "fail", error: error };
    } else {
      console.log("ok");
      return { status: "ok" };
    }
  });
};

import { transporter } from "./Nodemailer";

export const sendNewAccountEmail = async (data) => {
  const mailOptions = {
    from: '"Renadyl.ro "<no-reply@healthymedical.ro>',
    to: "bucel.ionsebastian@gmail.com",
    subject: "Subiect",
    text: "text",
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return { status: "fail", error: error };
    } else {
      return { status: "ok" };
    }
  });
};

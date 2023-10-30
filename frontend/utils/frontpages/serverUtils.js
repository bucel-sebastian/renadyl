import Database from "../Database";

const nodemailer = require("nodemailer");

export const saveContactFormToDatabase = async (formData) => {
  const database = new Database();

  formData["date"] = new Date().toISOString();

  try {
    const insertResp = await database.insert("renadyl_contact_form", formData);
    console.log(insertResp);
  } catch (error) {
    console.error("Eroare: ", error);
  } finally {
    await database.pool.end();
  }
};

export const saveDistributorFormToDatabase = async (formData) => {
  const database = new Database();

  formData["date"] = new Date().toISOString();

  try {
    const insertResp = await database.insert(
      "renadyl_distributors_form",
      formData
    );
    console.log(insertResp);
  } catch (error) {
    console.error("Eroare: ", error);
  } finally {
    await database.pool.end();
  }
};

export const sendContactFormEmail = async (formData) => {
  const transporter = nodemailer.createTransport({
    host: "mail.renadyleurope.com",
    port: "465",
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const mailOptions = {
    from: '"Renadyl.ro "<no-reply@renadyleurope.com>',
    to: "office@healthymedical.ro",
    subject: "Renadyl - Mesaj nou din formularul de contact",
    text: `Mesaj nou din formularul de contact\r\n
        nume - ${formData["lname"]}\r\n
        prenume - ${formData["fname"]}\r\n
        email - ${formData["email"]}\r\n
        phone - ${formData["phone"]}\r\n
        categorie - ${formData["type"]} \r\n
        mesaj - ${formData["message"]}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email sent!");
      return true;
    }
  });
};

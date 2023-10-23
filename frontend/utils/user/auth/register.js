import Database from "@/utils/Database";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const checkIfEmailExists = async (email) => {
  const database = new Database();
  const where = new Object();
  where["email"] = email;
  const result = await database.select("renadyl_users", where);
  return result.length > 0;
};

export const checkIfIDExists = async (id) => {
  const database = new Database();
  const where = new Object();
  where["id"] = id;
  const result = await database.select("renadyl_users", where);
  return result.length > 0;
};

export const generateRandomCode = (length) => {
  const digits = "0123456789";
  let randomCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    randomCode += digits.charAt(randomIndex);
  }
  return randomCode;
};

const generateUniqID = async () => {
  let uniqId;
  do {
    uniqId = "client" + generateRandomCode(10);
  } while (await checkIfIDExists(uniqId));
  return uniqId;
};

const generateActivationCode = () => {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let activationCode = "";

  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    activationCode = +characters.charAt(randomIndex);
  }

  return activationCode;
};

export const handleRegister = async (formData) => {
  const database = new Database();

  delete formData.tc;
  if (formData.password === formData.re_password) {
    delete formData.re_password;
  } else {
    return { status: "fail", error: "error-1" };
  }

  const registerData = formData;

  if (await checkIfEmailExists(registerData.email)) {
    return { status: "fail", error: "error-2" };
  }

  const hashedPassword = await hash(registerData.password, 10);

  registerData.password = hashedPassword;
  registerData.role = "client";
  registerData.register_date = new Date().toISOString();
  registerData.id = await generateUniqID();
  registerData.activation_code = generateActivationCode();

  try {
    const insertRes = await database.insert("renadyl_users", registerData);
  } catch (error) {
    console.error("Eroare: ", error);
    return { status: "fail", error: "error-3" };
  } finally {
    await database.pool.end();
    return { status: "ok" };
  }
};

import Database from "@/utils/Database";
import { compare } from "bcrypt";

export const checkAdminLoginDetails = async (email, password) => {
  const database = new Database();
  const where = new Object();
  where["email"] = email;
  const loginRes = await database.select("renadyl_admins", where);
  const user = await loginRes[0];
  const passwordCorrect = await compare(password || "", user.password);
  console.log(passwordCorrect);
  if (passwordCorrect) {
    delete user.passowrd;
    return await user;
  }

  return null;
};

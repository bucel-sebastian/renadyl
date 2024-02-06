import Database from "@/utils/Database";
import { compare } from "bcrypt";

export const checkLoginDetails = async (email, password) => {
  const database = new Database();

  const where = new Object();
  where["email"] = email;

  const loginRes = await database.select("renadyl_users", where);

  if (loginRes.length !== 0) {
    const user = await loginRes[0];

    const passwordCorrect = await compare(password || "", user.password);
    console.log(passwordCorrect);
    if (passwordCorrect) {
      delete user.passowrd;
      return await user;
    }
  }
  return null;
};

export const checkProviderAccountDetails = async (email) => {
  const database = new Database();
  const where = new Object();
  where["email"] = email;
  where["status"] = 1;
  const loginRes = await database.select("renadyl_users", where);

  if (loginRes.length !== 0) {
    const user = await loginRes[0];
    return await user;
  }
  return null;
};

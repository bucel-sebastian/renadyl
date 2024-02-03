import Database from "@/utils/Database";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const checkIfIDExists = async (id) => {
  const database = new Database();
  const where = new Object();
  where["id"] = id;
  const result = await database.select("renadyl_admins", where);
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
    uniqId = "admin" + generateRandomCode(10);
  } while (await checkIfIDExists(uniqId));
  return uniqId;
};

export async function POST(req, { params }) {
  const requestBody = await req.json();

  const database = new Database();

  const checkIfEmailExists = await database.select("renadyl_admins", {
    email: requestBody.email,
  });

  if (checkIfEmailExists.length !== 0) {
    return NextResponse.json({
      status: 200,
      response: false,
      error: "exists",
    });
  }

  const hashedPassword = await hash(requestBody.password, 10);

  const accountValues = {
    id: await generateUniqID(),
    f_name: requestBody.f_name,
    l_name: requestBody.l_name,
    email: requestBody.email,
    password: hashedPassword,
    role: "admin",
    status: 1,
  };

  const databaseResponse = await database.insert(
    "renadyl_admins",
    accountValues
  );

  if (databaseResponse.length !== 0) {
    return NextResponse.json({
      status: 200,
      response: true,
    });
  } else {
    return NextResponse.json({
      status: 200,
      response: false,
      error: "database",
    });
  }
}

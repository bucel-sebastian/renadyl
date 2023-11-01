import Database from "../Database";

export const checkPromocode = async (formData) => {
  const database = new Database();
  const where = new Object();
  where["code"] = formData.code;

  const response = await database.select("renadyl_promo_codes", where);
  //   console.log("db response ", await response);
  return await response;
};

import Database from "../Database";

export const checkPromocode = async (promocode) => {
  const database = new Database();
  const where = new Object();
  where["code"] = promocode.code;

  const response = await database.select("renadyl_promo_codes", where);

  console.log("db response ", await response);
  console.log("db response ", {
    code: response[0].code,
    value: response[0].value,
  });
  return {
    code: response[0].code,
    value: response[0].value,
  };
};

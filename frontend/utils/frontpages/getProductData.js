import Database from "../Database";

export const getProductData = async (countryCode) => {
  const database = new Database();
  let data = null;
  try {
    data = database.select("renadyl_product_data", { country: countryCode });
  } catch (error) {
    console.error(`Error - ${error}`);
  } finally {
    database.pool.end();
  }
  console.log(data);
  return data;
};

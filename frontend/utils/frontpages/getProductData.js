import Database from "../Database";

export const getProductData = async (productName) => {
  const database = new Database();
  let data = null;
  try {
    data = await database.select("renadyl_products_data", {
      product_name: productName,
    });
  } catch (error) {
    console.error(`Error - ${error}`);
  } finally {
    database.pool.end();
  }
  console.log(data);
  return data;
};

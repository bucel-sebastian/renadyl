import { checkPromocode } from "@/utils/frontpages/checkPromocode";
import { getProductData } from "@/utils/frontpages/getProductData";
import { estimateSamedayCost } from "@/utils/sameday/estimateSamedayCost";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { cart, checkoutData } = await req.json();
  const countryCode = checkoutData.countryCode;

  console.log("calculateData", checkoutData);

  let vatProcent = 9;

  let productsTotal = 0;
  let productsTotalWithoutVat = 0;
  let productsSaleTotal = 0;
  let vatTotal = 0;
  let shippingTotal = 0;
  let promoTotal = 0;
  let orderTotal = 0;

  for (const item of cart) {
    const data = await getProductData(item.productName);

    const price = JSON.parse(data[0].price);
    const on_sale = JSON.parse(data[0].on_sale);
    const sale_value = JSON.parse(data[0].sale_value);
    const sale_percentage = JSON.parse(data[0].sale_percentage);
    const sale_price = JSON.parse(data[0].sale_price);

    if (countryCode === "RO") {
      if (on_sale.nat) {
        productsTotal += sale_price.nat * item.quantity;

        if (sale_percentage.nat) {
          productsSaleTotal += (price.nat - sale_price.nat) * item.quantity;
        } else {
          productsSaleTotal += sale_value.nat * item.quantity;
        }
      } else {
        productsTotal += price.nat * item.quantity;
      }
    } else {
      if (on_sale.int) {
        productsTotal += sale_price.int * item.quantity;

        if (sale_percentage.int) {
          productsSaleTotal += (price.int - sale_price.int) * item.quantity;
        } else {
          productsSaleTotal += sale_value.int * item.quantity;
        }
      } else {
        productsTotal += price.int * item.quantity;
      }
    }

    // console.log(item.productName, " - ", productsTotal);
  }

  if (checkoutData.promocode !== null) {
    const promocodeData = await checkPromocode({
      code: checkoutData.promocode,
    });
    promoTotal = (productsTotal * promocodeData.value) / 100;
  }

  vatTotal = (productsTotal * vatProcent) / 100;

  productsTotalWithoutVat = productsTotal - vatTotal;

  orderTotal = productsTotal - promoTotal;

  console.log("Response - ", {
    productsTotal: productsTotal,
    productsTotalWithoutVat: productsTotalWithoutVat,
    productsSaleTotal: productsSaleTotal,
    vatProcent: vatProcent,
    vatTotal: vatTotal,
    shippingTotal: shippingTotal,
    promoTotal: promoTotal,
    orderTotal: orderTotal,
  });

  // console.log("Parametrii din post ", cart, checkoutData);

  return NextResponse.json({
    status: 200,
    body: {
      productsTotal: productsTotal,
      productsTotalWithoutVat: productsTotalWithoutVat,
      productsSaleTotal: productsSaleTotal,
      vatProcent: vatProcent,
      vatTotal: vatTotal,
      shippingTotal: shippingTotal,
      promoTotal: promoTotal,
      orderTotal: orderTotal,
    },
  });
}

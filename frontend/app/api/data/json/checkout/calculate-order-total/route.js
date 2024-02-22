import { estimateDhlCost } from "@/utils/dhl/estimateDhlCost";
import { checkPromocode } from "@/utils/frontpages/checkPromocode";
import { getProductData } from "@/utils/frontpages/getProductData";
import { estimateSamedayCost } from "@/utils/sameday/estimateSamedayCost";
import { authUps } from "@/utils/ups/authUps";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { cart, checkoutData } = await req.json();
  const countryCode = checkoutData.countryCode;

  let checkoutIsValid = true;

  console.log("cart", cart);
  console.log("checkout", checkoutData);

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

    const price = data[0].price;
    const on_sale = data[0].on_sale;
    const sale_value = data[0].sale_value;
    const sale_percentage = data[0].sale_percentage;
    const sale_price = data[0].sale_price;

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

  // Shipping - start

  if (checkoutData.isLoggedIn === false) {
    if (checkoutData.shipping.wantsAccount === false) {
      if (checkoutData.shipping.countryKey === "RO") {
        const shippingData = await estimateSamedayCost({
          payment: checkoutData.payment,
          type: checkoutData.shipping.type,
        });

        console.log("Shipping data - ", shippingData);

        shippingTotal = shippingData.amount;
      } else {
        if (checkoutData.shipping.provider === "DHL") {
          const shippingData = await estimateDhlCost({
            countryKey: checkoutData.shipping.countryKey,
            postalCode: checkoutData.shipping.postalCode,
            city: checkoutData.shipping.city,
          });
          if (shippingData !== null) {
            if (countryCode === "RO") {
              for (let i = 0; i < shippingData?.length; i++) {
                if (
                  shippingData[i]?.currencyType === "BASEC" ||
                  shippingData[i]?.currencyType === "BILLC"
                ) {
                  if (shippingData[i]?.priceCurrency === "RON") {
                    shippingTotal = shippingData[i].price;
                  }
                }
              }
            } else {
              for (let i = 0; i < shippingData?.length; i++) {
                if (
                  shippingData[i]?.currencyType === "BASEC" ||
                  shippingData[i]?.currencyType === "BILLC"
                ) {
                  if (shippingData[i]?.priceCurrency === "EUR") {
                    shippingTotal = shippingData[i]?.price;
                  }
                }
              }
            }
          } else {
            checkoutIsValid = false;
          }
        } else if (checkoutData.shipping.provider === "UPS") {
        }
        // const shippingData = await authUps();
      }
    }
  }

  // Shipping - end

  orderTotal = productsTotal - promoTotal + shippingTotal;

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
    checkoutIsValid: checkoutIsValid
  });
}

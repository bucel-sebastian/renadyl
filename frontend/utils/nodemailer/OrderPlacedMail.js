import { transporter } from "./Nodemailer";
import fs from "fs";
import path from "path";
import Database from "../Database";

const imagePath = path.join(process.cwd(), "public", "renadyl-logo.png");
const imageBuffer = fs.readFileSync(imagePath);
const imageBase64 = imageBuffer.toString("base64");

const datetimeOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

const formatter = new Intl.DateTimeFormat("ro-RO", datetimeOptions);

export const sendOrderPlacedEmail = async (data) => {
  console.log("email data - ", data);

  const database = new Database();

  let client_email;

  if (data.client_id !== null) {
    const dbemail = await database.query(
      `SELECT email FROM renadyl_users WHERE id = $1`,
      [data.client_id]
    );
    client_email = dbemail[0].email;
  } else {
    client_email = data.shipping.email;
  }

  console.log("email - ", client_email);

  const mailOptions = {
    from: '"Renadyleurope.com "<no-reply@healthymedical.ro>',
    to: client_email,
    subject: `${
      data.lang === "ro"
        ? "Comanda dvs. a fost plasată cu succes!"
        : "Your order has been successfully placed!"
    }`,
    html: `
      
      <!DOCTYPE html>
  <html
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    lang="en"
  >
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!--[if mso
        ]><xml
          ><o:OfficeDocumentSettings
            ><o:PixelsPerInch>96</o:PixelsPerInch
            ><o:AllowPNG /></o:OfficeDocumentSettings></xml
      ><![endif]-->
      <!--[if !mso]><!-->
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;200;300;400;500;600;700;800;900"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Sofia+Sans:ital,wght@0,1..1000;1,1..1000&display=swap"
        rel="stylesheet"
      />
  
      <!--<![endif]-->
      <style>
        * {
          box-sizing: border-box;
        }
  
        body {
          margin: 0;
          padding: 0;
        }
  
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
  
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
  
        p {
          line-height: inherit;
        }
  
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
  
        .image_block img + div {
          display: none;
        }
  
        @media (max-width: 520px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }
  
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
  
          .mobile_hide {
            display: none;
          }
  
          .row-content {
            width: 100% !important;
          }
  
          .stack .column {
            width: 100%;
            display: block;
          }
  
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
    </head>
  
    <body
      style="
        background-color: #fafafa;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      "
    >
      <table
        class="nl-container"
        width="100%"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #fafafa;
        "
      >
        <tbody>
          <tr>
            <td>
              <table
                class="row row-1"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0;
                          color: #000000;
                          width: 500px;
                          margin: 0 auto;
                        "
                        width="500"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                            >
                              <table
                                class="empty_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div></div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="row row-2"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #ffffff;
                          border-radius: 10px 10px 0 0;
                          color: #000000;
                          width: 500px;
                          margin: 0 auto;
                        "
                        width="500"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                            >
                              <table
                                class="image_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="15"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      class="alignment"
                                      align="center"
                                      style="line-height: 10px"
                                    >
                                      <div style="max-width: 225px">
                                        <a
                                          href="https://renadyleurope.com"
                                          target="_blank"
                                          style="outline: none"
                                          tabindex="-1"
                                          ><img
                                            src="cid:unique@logo"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                              width: 100%;
                                            "
                                            width="225"
                                        /></a>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="row row-3"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #ffffff;
                          border-radius: 0;
                          color: #000000;
                          width: 500px;
                          margin: 0 auto;
                        "
                        width="500"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                            >
                              <table
                                class="heading_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="text-align: center; width: 100%"
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        color: #1a1a1a;
                                        direction: ltr;
                                        font-family: 'Sofia Sans', sans-serif,
                                          'Helvetica Neue', Helvetica, Arial,
                                          sans-serif;
                                        font-size: 24px;
                                        font-weight: 700;
                                        letter-spacing: normal;
                                        line-height: 120%;
                                        text-align: center;
                                        margin-top: 0;
                                        margin-bottom: 0;
                                        mso-line-height-alt: 28.799999999999997px;
                                      "
                                    >
                                      <span class="tinyMce-placeholder"
                                        >${
                                          data.lang === "ro"
                                            ? "Comanda dvs. a fost plasată cu succes!"
                                            : "Your order has been successfully placed!"
                                        }</span
                                      >
                                    </h1>
                                  </td>
                                </tr>
                              </table>
                              
                              
                              
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
              class="row row-4"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #ffffff;
                        border-radius: 0;
                        color: #000000;
                        width: 500px;
                        margin: 0 auto;
                      "
                      width="500"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              padding-left:10px;padding-right:10px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="heading_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <h3
                                    style="
                                      margin: 0;
                                      color: #1e0e4b;
                                      direction: ltr;
                                      font-family: 'Sofia Sans', sans-serif,
                                        'Helvetica Neue', Helvetica, Arial,
                                        sans-serif;
                                      font-size: 18px;
                                      font-weight: 700;
                                      letter-spacing: normal;
                                      line-height: 120%;
                                      text-align: left;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                      mso-line-height-alt: 21.599999999999998px;
                                    "
                                  >
                                    <span class="tinyMce-placeholder"
                                      >${
                                        data.lang === "ro"
                                          ? "Detalii"
                                          : "Details"
                                      }</span
                                    >
                                  </h3>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="html_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      font-family: 'Sofia Sans', sans-serif,
                                        'Helvetica Neue', Helvetica, Arial,
                                        sans-serif;
                                      text-align: center;
                                    "
                                    align="center"
                                  >
                                    <div>
                                      <table width="100%">
                                       
                                        <tbody>
                                          <tr>
                                            <td
                                            style="text-align:left;
                                            font-size: 16px;"
                                            width="50%"
                                            >
                                              ${
                                                data.lang === "ro"
                                                  ? "Număr comandă"
                                                  : "Order number"
                                              }
                                            </td>
                                            <td
                                            style="text-align:left;font-size: 16px;"
                                            >
                                              ${data.order_id}
                                            </td>
                                          
                                          </tr>
                                          <tr>
                                            <td
                                            style="text-align:left;font-size: 16px;"
                                            >${
                                              data.lang === "ro"
                                                ? "Data comandă"
                                                : "Order date"
                                            }</td>
                                            <td
                                            style="text-align:left;font-size: 16px;"
                                            >
                                            ${formatter.format(
                                              new Date(data.order_date)
                                            )}
                                            </td>
                                          
                                          </tr>
                                          <tr>
                                            <td
                                            style="text-align:left;font-size: 16px;"                                            
                                            >${
                                              data.lang === "ro"
                                                ? "Total comandă"
                                                : "Order total"
                                            }</td>
                                            <td
                                            style="text-align:left;font-size: 16px;"
                                            >
                                            ${data.order_total} ${data.currency}
                                            </td>
                                          
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          
                        </tr>
                        <tr>
                          <td
                            class="column column-2"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              padding-right:10px;
                              padding-left:10px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="heading_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <h3
                                    style="
                                      margin: 0;
                                      color: #1e0e4b;
                                      direction: ltr;
                                      font-family: 'Sofia Sans', sans-serif,
                                        'Helvetica Neue', Helvetica, Arial,
                                        sans-serif;
                                      font-size: 18px;
                                      font-weight: 700;
                                      letter-spacing: normal;
                                      line-height: 120%;
                                      text-align: left;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                      mso-line-height-alt: 21.599999999999998px;
                                    "
                                  >
                                    <span class="tinyMce-placeholder"
                                      >
                                            ${
                                              data.lang === "ro"
                                                ? "Livrare"
                                                : "Shipping"
                                            }
                                      </span
                                    >
                                  </h3>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="paragraph_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #444a5b;
                                      direction: ltr;
                                      font-family: 'Sofia Sans', sans-serif,
                                        'Helvetica Neue', Helvetica, Arial,
                                        sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p style="margin: 0">
                                      ${
                                        data.shipping.type === "courier"
                                          ? `${data.shipping?.address}, ${data.shipping?.postalCode}, ${data.shipping?.city}, ${data.shipping?.state}, ${data.shipping?.country}`
                                          : `${data.shipping?.locker?.name}, ${data.shipping?.locker?.address}, ${data.shipping?.locker?.city}, ${data.shipping?.locker?.county}`
                                      }
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
              
              <table
                class="row row-5"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #ffffff;
                          border-radius: 0 0 10px 10px;
                          color: #000000;
                          width: 500px;
                          margin: 0 auto;
                        "
                        width="500"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                            >
                            <table
                            class="html_block block-1"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                            "
                          >
                            <tr>
                              <td class="pad" style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              padding-left:10px;
                              padding-right:10px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            ">
                                <div
                                  style="
                                    font-family: 'Sofia Sans', sans-serif,
                                      'Helvetica Neue', Helvetica, Arial,
                                      sans-serif;
                                    text-align: center;
                                  "
                                  align="center"
                                >
                                  <div>
                                    <table
                                              width="100%"
                                              cellpadding="10"
                            cellspacing="0"
                            role="presentation"
                            style="
                            
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                              border-collapse: collapse;
                            "
                                    >
                                      <thead>
                                        <tr>
                                          <th
                                              style="text-align:left;
                                              border-bottom: 1px solid #aaaaaa;
                                              "
                                            
                                          >${
                                            data.lang === "ro"
                                              ? "Produs"
                                              : "Product"
                                          }</th>
                                          <th style="text-align:left;
                                          border-bottom: 1px solid #aaaaaa;
                                          ">${
                                            data.lang === "ro"
                                              ? "Cantitate"
                                              : "Quantity"
                                          }</th>
                                          <th
                                          style="text-align:right;border-bottom: 1px solid #aaaaaa;"
                                          >${
                                            data.lang === "ro"
                                              ? "Preț"
                                              : "Price"
                                          }</th>
                                        </tr>
                                      </thead>

                                      <tbody>
                                      ${data.cart
                                        .map(
                                          (row) => `<tr>
                                          <td style="text-align:left;
                                          border-bottom: 1px solid #aaaaaa;
                                          ">
                                          ${
                                            row.productName === "renal_single"
                                              ? "Renadyl™"
                                              : "Bundle 3x Renadyl™"
                                          }
                                          </td>
                                          <td style="text-align:left;
                                          border-bottom: 1px solid #aaaaaa;
                                          ">
                                          ${row.quantity}
                                          </td>
                                          <td style="text-align:right;border-bottom: 1px solid #aaaaaa;"
                                          ">
                                          ${
                                            parseInt(row.price) *
                                            parseInt(row.quantity)
                                          } ${data.currency}
                                          </td>
                                      </tr>`
                                        )
                                        .join("")}
                                        <tr>
                                          <td colspan="2" style="text-align:right;">
                                          <p style="margin: 0; margin-bottom: 1px">
                                          ${
                                            data.lang === "ro"
                                              ? "Produse"
                                              : "Products"
                                          }
                                          </p>
                                          <p style="margin: 0; margin-bottom: 1px">
                                          ${
                                            data.lang === "ro"
                                              ? "Transport"
                                              : "Shipping"
                                          }
                                          </p>
                                          ${
                                            data.promo_total !== 0
                                              ? `
                                          
                                          <p style="margin: 0; margin-bottom: 1px">
                                          ${
                                            data.lang === "ro"
                                              ? "Reducere"
                                              : "Discount"
                                          }
                                          </p>`
                                              : ""
                                          }
                                          
                                          <p style="margin: 0; margin-bottom: 1px;font-weight:800;">
                                          Total
                                          </p>
                                          </td>
                                          <td style="text-align:left;
                                      ">
                                        <p style="margin: 0; margin-bottom: 1px">
                                         
                                        </p>
                                          <p style="margin: 0; margin-bottom: 1px">
                                          ${data.products_total} ${
      data.currency
    }
                                          </p>
                                          <p style="margin: 0; margin-bottom: 1px">
                                          ${data.shipping_total} ${
      data.currency
    }
                                          </p>
                                          ${
                                            data.promo_total !== 0
                                              ? `<p style="margin: 0; margin-bottom: 1px">
                                          -${data.promo_total} ${data.currency}
                                          </p>`
                                              : ""
                                          }
                                          <p style="margin: 0; margin-bottom: 1px;font-weight:800;">
                                            ${data.order_total} ${data.currency}
                                          </p>
                                      </td>
                                        
                                        </tr>
                                       
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                                          <td>
                                          <table
                                class="button_block block-4"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:90px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#7f5af8">
  <w:anchorlock/>
  <v:textbox inset="0px,0px,0px,0px">
  <center style="color:#fafafa; font-family:Arial, sans-serif; font-size:16px">
  <![endif]-->
                                      <div
                                        style="
                                          text-decoration: none;
                                          display: inline-block;
                                          color: #fafafa;
                                          background-color: #7f5af8;
                                          border-radius: 4px;
                                          width: auto;
                                          border-top: 0px solid transparent;
                                          font-weight: 400;
                                          border-right: 0px solid transparent;
                                          border-bottom: 0px solid transparent;
                                          border-left: 0px solid transparent;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          font-family: 'Sofia Sans', sans-serif,
                                            'Helvetica Neue', Helvetica, Arial,
                                            sans-serif;
                                          font-size: 16px;
                                          text-align: center;
                                          mso-border-alt: none;
                                          word-break: keep-all;
                                        "
                                      >
                                        <a href="http://localhost:3000/order/${
                                          data.order_id
                                        }"
                                        style="color: #fafafa;"
                                        >
                                        <span
                                            style="
                                              padding-left: 20px;
                                              padding-right: 20px;
                                              font-size: 16px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                              color: #fafafa;
                                            "
                                            ><span
                                              style="
                                                word-break: break-word;
                                                line-height: 32px;
                                                color: #fafafa;
                                              "
                                              >${
                                                data.lang === "ro"
                                                  ? `Vezi comanda`
                                                  : `Preview order`
                                              }</span
                                            ></span
                                          >
                                        </a>
                                        
                                      </div>
                                      <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                    </div>
                                  </td>
                                </tr>
                              </table>
                                          </td>
                            </tr>
                          </table>
                              <table
                                class="paragraph_block block-2"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #444a5b;
                                        direction: ltr;
                                        font-family: 'Sofia Sans', sans-serif,
                                          'Helvetica Neue', Helvetica, Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                        line-height: 120%;
                                        text-align: center;
                                        mso-line-height-alt: 19.2px;
                                      "
                                    >
                                      <p style="margin: 0; margin-bottom: 1px">
                                        <strong
                                          ><a
                                            href="tel: 4073356600"
                                            style="
                                              text-decoration: underline;
                                              color: #7747ff;
                                            "
                                            >+40 733 566 000</a
                                          ></strong
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 1px">
                                        <strong
                                          ><a
                                            href="mailto:%20office@healthymedical.ro"
                                            style="
                                              text-decoration: underline;
                                              color: #7747ff;
                                            "
                                            >OFFICE@HEALTHYMEDICAL.RO</a
                                          ></strong
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 1px">
                                        &nbsp;
                                      </p>
                                      <p style="margin: 0; margin-bottom: 1px">
                                        <strong
                                          >S.C. HEALTHY MEDICAL S.R.L.</strong
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 1px">
                                        RO 43590495
                                      </p>
                                      <p style="margin: 0; margin-bottom: 1px">
                                        J40/869/2021
                                      </p>
                                      <p style="margin: 0; margin-bottom: 1px">
                                        &nbsp;
                                      </p>
                                      <p style="margin: 0">
                                        CAL. DOROBANȚI NR. 111-131<br />BUCUREȘTI,
                                        ROMÂNIA
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="row row-6"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-radius: 0 0 10px 10px;
                          color: #000000;
                          width: 500px;
                          margin: 0 auto;
                        "
                        width="500"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 15px;
                                padding-top: 15px;
                                vertical-align: top;
                                border-top: 0px;
                                border-right: 0px;
                                border-bottom: 0px;
                                border-left: 0px;
                              "
                            >
                              <table
                                class="empty_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div></div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- End -->
    </body>
  </html>
  
      `,

    attachments: [
      {
        filename: "renadyl-logo.png", // The filename to be displayed in the email
        path: imagePath,
        cid: "unique@logo",
      },
    ],
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error - ", error);
      return { status: "fail", error: error };
    } else {
      console.log("sent");
      return { status: "ok" };
    }
  });
};

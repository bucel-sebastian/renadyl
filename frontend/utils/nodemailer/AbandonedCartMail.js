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

export const sendAbandonedCartMail = async (data) => {
  console.log("email data - ", data);

  const database = new Database();

  let client_email;

  console.log("email - ", client_email);

  const mailOptions = {
    from: '"Renadyleurope.com "<no-reply@healthymedical.ro>',
    to: client_email,
    subject: `${
      data.lang === "ro"
        ? "AWB-ul pentru comanda dvs. a fost generat!"
        : "The AWB for your order has been generated!"
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
                                              ? "AWB-ul pentru comanda dvs. a fost generat!"
                                              : "The AWB for your order has been generated!"
                                          }</span
                                        >
                                      </h1>
                                    </td>
                                  </tr>
                                </table>
  
                                <table
                                  class="paragraph_block block-3"
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
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        "
                                      >
                                        <p style="margin: 0">
                                          ${
                                            data.lang === "ro"
                                              ? `Am generat AWB-ul de livrare pentru comanda #${data.order_id}, puteți urmări livrarea făcând click pe butonul de mai jos.`
                                              : `We have generated the delivery AWB for order #${data.order_id}, you can track the delivery by clicking the button below.`
                                          }
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
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
                                          <a href="https://sameday.ro/#awb=${
                                            data.shipping_awb.awbNumber
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
                                                    ? `Verifică livrarea`
                                                    : `Check delivery`
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
        filename: "renadyl-logo.png",
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

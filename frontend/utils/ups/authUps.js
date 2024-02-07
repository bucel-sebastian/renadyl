export const authUps = async () => {
  try {
    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    reqHeaders.append("x-merchant-id", process.env.UPS_MERCHANT_ID);
    reqHeaders.append(
      "Authorization",
      "Basic " +
        Buffer.from(
          `${process.env.UPS_USERNAME}:${process.env.UPS_PASSWORD}`
        ).toString("base64")
    );

    const formData = { grant_type: "client_credentials" };

    const response = await fetch(
      `https://wwwcie.ups.com/security/v1/oauth/token`,
      {
        method: "POST",
        headers: reqHeaders,
        body: new URLSearchParams(formData).toString(),
      }
    );

    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error(`Error - ${error}`);
  }
};

export const authSameday = async () => {
  try {
    const reqHeaders = new Headers();
    reqHeaders.append(
      "X-Auth-Username",
      process.env.NEXT_PUBLIC_SAMEDAY_API_USERNAME
    );
    reqHeaders.append(
      "X-Auth-Password",
      process.env.NEXT_PUBLIC_SAMEDAY_API_PASSWORD
    );
    const response = await fetch(process.env.NEXT_PUBLIC_SAMEDAY_API_AUTH_URL, {
      method: "POST",
      headers: reqHeaders,
    });
    console.log(
      `user ${process.env.NEXT_PUBLIC_SAMEDAY_API_USERNAME} ---- pass ${process.env.NEXT_PUBLIC_SAMEDAY_API_PASSWORD}`
    );
    console.log(response);
    const body = await response.json();
    console.log(body);
    console.log("Authenitcated - ", body.token);
    return body.token;
  } catch (error) {
    console.error(`Error - ${error}`);
  }
};

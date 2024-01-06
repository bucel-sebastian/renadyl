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
    console.log("Authenitcated");
    const body = await response.json();
    return body.token;
  } catch (error) {
    console.error(`Error - ${error}`);
  }
};

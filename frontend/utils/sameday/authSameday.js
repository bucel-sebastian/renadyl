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
    reqHeaders.append("cache-control", "no-cache");
    const response = await fetch(process.env.NEXT_PUBLIC_SAMEDAY_API_AUTH_URL, {
      method: "POST",
      headers: reqHeaders,
    });
    console.log(
      `user ${process.env.NEXT_PUBLIC_SAMEDAY_API_USERNAME} ---- pass ${process.env.NEXT_PUBLIC_SAMEDAY_API_PASSWORD}`
    );
    const body = await response.json();
    return body.token;
  } catch (error) {
    console.error(`Error - ${error}`);
  }
};

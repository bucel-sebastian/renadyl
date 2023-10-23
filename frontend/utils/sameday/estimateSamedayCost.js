export const estimateSamedayCost = async (data) => {
  const apiUrl = "";

  const options = {
    method: "GET",
    headers: {
      "Content-type": "aaplication/json",
      "X-AUTH-TOKEN": process.env.SAMEDAY_API_KEY,
    },
  };

  const response = await fetch(apiUrl, options);
};

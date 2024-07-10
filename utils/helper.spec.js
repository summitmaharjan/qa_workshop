export function TodayDate() {
  const now = new Date();
  const date = now.getDate();

  return date;
}

export async function authneticateUser1({ request }) {
  try {
    const apiUrl = await "thinking-tester-contact-list.herokuapp.com";
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await request.post(apiUrl + "/users/login", {
      headers,
      data: {
        email: "ishan@gmail.com",
        password: "ishan123",
      },
    });

    const statusCode = response.status();
    if (statusCode !== 200) {
      console.error(`Unexpected status code: ${statusCode}`);
      const responseBody = await response.json();
      console.error("Response body: ", responseBody);
      throw new Error("Authentication failed");
    }

    const responseBody = await response.json();
    console.log("Authentication successful, Responsebody: ", responseBody);
  } catch (error) {
    console.error("Error during authentication", error.message);
    throw error;
  }
}

async function createEntity(userData, accessToken, module, { request }) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: "Bearer" + accessToken,
    sig: "Automation",
  };
  const response = await request.post(apiUrl + module, {
    headers,
    data: JSON.stringify(userData),
  });
  const responseBody = await response.json();
  const statusCode = response.status();
  expect(statusCode).toBe(201);

  if (responseBody && responseBody.id) {
    return responseBody.id;
  } else {
    return null;
  }
}

module.exports = { createEntity, authneticateUser1 };

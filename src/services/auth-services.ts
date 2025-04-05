//login

const userLogin = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
};

const userRefreshToken = async (currentToken: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: currentToken }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data = await response.json();
  return data; // { access_token: string }
};

export { userLogin, userRefreshToken };

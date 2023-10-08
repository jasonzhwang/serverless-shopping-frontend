import React, { useState, useEffect } from "react";
import Link from "next/link";

// Define the types for setUserId and setToken
type SetUserIdFunction = (userId: string) => void;
type SetTokenFunction = (token: string) => void;

//PostData component
const postData = async (data: any, setUserId: SetUserIdFunction, setToken: SetTokenFunction) => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!apiUrl) {
    // Handle the case where the API URL is not defined
    return console.error("BACKEND_API_URL is not defined.");
  }
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    setUserId(responseData.user);
    setToken(responseData.token);
    console.log(responseData.user, responseData.token);
  } catch (error) {
    console.log(error);
  }
};

export default function SignInPage() {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  }, [userId, token]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    postData(
      {
        email: email,
        password: pwd,
      },
      setUserId,
      setToken
    );
    console.log(userId, token);
  };
  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form method="post" className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
        <p>
          <label>Username or email address</label>
          <br />
          <input
            type="text"
            name="email"
            required
            onChange={(event) => {
              setEmail(event.target.value);
              console.log(event.target.value);
            }}
          />
        </p>
        <p>
          <label>Password</label>
          <Link href="/forget-password">
            <label className="right-label">Forget password?</label>
          </Link>
          <br />
          <input
            type="password"
            name="password"
            required
            onChange={(event) => {
              setPwd(event.target.value);
              console.log(event.target.value);
            }}
          />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Login
          </button>
        </p>
      </form>
      <div className="text-center">
        <p>
          First time? <Link href="/register">Create an account</Link>.
        </p>
        <p>
          <Link href="/">Back to Homepage</Link>.
        </p>
      </div>
    </div>
  );
}

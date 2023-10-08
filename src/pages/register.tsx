import React from "react";
import { useState } from "react";
import Link from "next/link";

type RegistrationData = {
  email: string;
  password: string;
};

const postData = async (data: RegistrationData) => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!apiUrl) {
    // Handle the case where the API URL is not defined
    return console.error("BACKEND_API_URL is not defined.");
  }

  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.log(error);
  }
};

export default function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    postData({
      email: email,
      password: pwd,
    });
  };
  return (
    <div className="text-center m-5-auto">
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form method="post" className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
        <p>
          <label>Username</label>
          <br />
          <input
            type="text"
            name="first_name"
            required
            onChange={(event) => {
              setUserName(event.target.value);
              console.log(event.target.value);
            }}
          />
        </p>
        <p>
          <label>Email address</label>
          <br />
          <input
            type="email"
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
          <br />
          <input
            type="password"
            name="password"
            onChange={(event) => {
              setPwd(event.target.value);
              console.log(event.target.value);
            }}
          />
        </p>
        <p>
          <input type="checkbox" name="checkbox" id="checkbox" required />{" "}
          <span>
            I agree all statements in{" "}
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
              terms of service
            </a>
          </span>
          .
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Register
          </button>
        </p>
      </form>
      <footer>
        <p>
          <Link href="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}

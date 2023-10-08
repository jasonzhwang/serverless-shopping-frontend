import React from "react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form action="/home" className="flex flex-col gap-[20px]">
        <p>
          <label>Username or email address</label>
          <br />
          <input type="text" name="first_name" required />
        </p>
        <p>
          <label>Password</label>
          <Link href="/forget-password">
            <label className="right-label">Forget password?</label>
          </Link>
          <br />
          <input type="password" name="password" required />
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

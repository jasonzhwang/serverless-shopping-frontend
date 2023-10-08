import React from "react";
import Link from "next/link";

export default function ForgetPasswordPage() {
  return (
    <div className="text-center m-5-auto">
      <h2>Reset your password</h2>
      <h5>Enter your email address and we will send you a new password</h5>
      <form action="/login" className="flex flex-col gap-[20px]">
        <p className="flex flex-col">
          <label id="reset_pass_lbl">Email address</label>
          <br />
          <input type="email" name="email" required className="w-full" />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Send password reset email
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link href="/register">Create an account</Link>.
        </p>
        <p>
          <Link href="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}

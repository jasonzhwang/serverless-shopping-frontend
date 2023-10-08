import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col mx-auto">
      <p className="text-center main-title">Please Login before shopping, or Create new account</p>
      <div className="text-center buttons">
        <Link href="/login">
          <button className="primary-button">log in</button>
        </Link>
        <Link href="/register">
          <button className="primary-button" id="reg_btn">
            <span>register </span>
          </button>
        </Link>
      </div>
    </div>
  );
}

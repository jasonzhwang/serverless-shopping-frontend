import Link from "next/link";
type HeaderProps = {
  logon: boolean;
};

const Header: React.FC<HeaderProps> = ({ logon }) => {
  return logon ? (
    <header>
      User logged in,&#20;&#20;&#20;{" "}
      <Link className="underline" href="/use-shopping-cart">
        Start Shopping
      </Link>
    </header>
  ) : (
    <header>
      Not yet!&#20;&#20;&#20;
      <Link className="underline" href="/login">
        Please Log in
      </Link>
    </header>
  );
};

export default Header;

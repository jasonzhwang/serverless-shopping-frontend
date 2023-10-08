import { Session } from "next-auth";

const Header = ({ session }: { session: Session | null }) => {
  return <header>Please Login</header>;
};

export default Header;

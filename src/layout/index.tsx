import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer/Footer";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logon, setLogon] = useState(false);
  const backgroundStyle = {
    backgroundImage: `url('/bg.png')`, // Replace 'bg.png' with your actual image path
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  };

  useEffect(() => {
    setLogon(localStorage.getItem("userId") != "" ? true : false);
  }, []);

  return (
    <section>
      <div className="absolute top-0 w-full text-center">
        <Header logon={logon} />
      </div>
      <main style={backgroundStyle}>{children}</main>
      <Footer />
    </section>
  );
};
export default Layout;

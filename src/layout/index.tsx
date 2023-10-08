import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer/Footer";
import { useSession } from "next-auth/react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const backgroundStyle = {
    backgroundImage: `url('/bg.png')`, // Replace 'bg.png' with your actual image path
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
  };

  const { data: session } = useSession();
  return (
    <section>
      <div className="absolute top-0 w-full text-center">
        <Header session={session} />
      </div>
      <main style={backgroundStyle}>{children}</main>
      <Footer />
    </section>
  );
};
export default Layout;

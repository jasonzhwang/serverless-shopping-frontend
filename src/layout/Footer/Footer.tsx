const FooterStyle: React.CSSProperties = {
  background: "#222",
  fontSize: ".8rem",
  color: "#fff",
  position: "absolute",
  bottom: 0,
  padding: "1rem",
  margin: 0,
  width: "100%",
  opacity: 0.5,
};

const Footer = () => {
  return (
    <footer style={FooterStyle}>
      -<h1 className="text-center text-[36px]">Simple-serveless-shopping-Demo</h1>
      <p className="text-center">Designed & coded by {"JayJay"}</p>
    </footer>
  );
};

export default Footer;

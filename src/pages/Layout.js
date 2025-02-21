
import React, { useState, useEffect } from "react";
import Footer from "@/components/Navigation/Footer";
import Header from "@/components/Navigation/Header";

function Layouts({ children }) {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: windowHeight,
  };

  const contentStyle = {
    flex: 1, // Takes up remaining height
    marginTop: "0.2%",
    padding: "20px",
  };

  return (
    <div style={layoutStyle}>
      <Header />
      <main style={contentStyle}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layouts;

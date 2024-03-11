import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#212529",
        color: "#f8f9fa",
        padding: "2rem 0",
        marginTop: "100px",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <p style={{ marginTop: "1.5rem" }}>
          Discover New Opportunities and Expand your Horizons with Our Services!
        </p>
      </div>
      <div
        style={{
          backgroundColor: "#212529",
          color: "#f8f9fa",
          padding: "1.5rem 0",
          textAlign: "center",
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} Moringa Daily. All rights reserved.
          For support, contact support@moringadaily.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;

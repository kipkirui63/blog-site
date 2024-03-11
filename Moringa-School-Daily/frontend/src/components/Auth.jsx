import React from "react";
import signInImage from "../assets/college-students-different-ethnicities-cramming.jpg";
import signUpImage from "../assets/medium-shot-girls-looking-notebook.jpg";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";

export default function Auth({ children }) {
  const location = useLocation();
  const loginExcperpt = `"Join the Community, Explore the Possibilities, Empower Your Tech
  Journey."`;
  const signupExcertpt = `"Connect, Learn, Innovate: Your Tech Adventure Starts Here."`;

  const backgroundImageStyle = {
    backgroundImage: `url(${
      location.pathname === "/login" || location.pathname === "/" ? signInImage : signUpImage
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="row auth">
      <div className="col-md-7 col-sm-12 auth-image-section" style={backgroundImageStyle}>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "95vh", padding: "2rem" }}
        >
          <div className="mt-4 auth-logo">
            <Logo />
          </div>
          <div className="excerpt">
            <h5>
              {location.pathname === "/login" ? loginExcperpt : signupExcertpt}
            </h5>
          </div>
        </div>
      </div>
      <div className="col-md-5 col-sm-12">
        <div
          className="d-flex flex-column justify-content-center p-3"
          style={{ height: "100vh" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

import React, { useContext } from "react";
import Logo from "./Logo";
import Avatar from "./Avatar";
import { SchoolContext } from "../contexts/SchoolContext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { userEmail, userRole, setUser } = useContext(SchoolContext);
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser("");
    history("/login")
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark d-flex justify-content-between p-4">
      <div className="custom-logo">
        <Logo />
      </div>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center"
              href="/"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Avatar height={40} alt="User Avatar" />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <button className="dropdown-item" href="/">
                  {userEmail} | {userRole}
                </button>
              </li>
              <hr className="mb-0 mt-0"/>
              <li>
                <button className="dropdown-item" href="/">
                  My profile
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

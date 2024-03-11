import { Link, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import AuthButton from "./AuthButton";
import { useContext, useState } from "react";
import { SchoolContext } from "../contexts/SchoolContext";
import Spinner from "./Spinner";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { URL } = useContext(SchoolContext);
  const [loading, setLoading] = useState(false);

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          "confirm-password": confirmPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Error while creating user");
      }

      const data = await response.json();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      console.log(data);
      history("/login");
    } catch (error) {
      console.error("Sign-up failed:", error.message);
      //setError("Check your details and try again.");
    }
  };

  return (
    <Auth>
      <div>
        <h3>Sign Up</h3>
        <div className="auth-header">
          <p>
            Already have an account? <Link to="/login">Sign in Here</Link>
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="row gx-1">
                <div className="col-sm-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirm_password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
            <AuthButton name="Sign up Here" />
          </form>
        </div>
      </div>
      {loading && <Spinner />}
    </Auth>
  );
}

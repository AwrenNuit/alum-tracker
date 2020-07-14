import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../firebase";
import "./Register.css";

export default function Register() {
  const history = useHistory();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert(`Passwords don't match!`);
    } else if (email.trim() === "" || password.trim() === "") {
      return alert(`Email and Password required.`);
    }
    const res = await registerUser(email, password);
    if (res) {
      history.push("/home");
    }
  }

  return (
    <div className="login-container">
      <h1 style={{ WebkitTextStroke: "1px black" }}>Register</h1>
      <form onSubmit={(e) => register(e)}>
        <div className="input-container">
          <label className="login-label">Email</label>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="login-label">Password</label>
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="login-label">Confirm Password</label>
          <input
            type="text"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
      <hr style={{ margin: "1rem" }} />
      <div>
        <button className="secondary-btn" onClick={() => history.push("/")}>
          back
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser } from "../../firebase";
import "./Login.css";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   getCurrentUser().then((user) => {
  //     if (user) {
  //       history.push("/home"); // Why does url update, but component does not render?
  //     }
  //   });
  // }, [history]);

  async function handleLogin(e) {
    e.preventDefault();
    const res = await loginUser(email, password);
    if (res.user.email) {
      dispatch({ type: `SET_USER`, payload: res.user.email });
      history.push("/attendance");
    } else {
      alert("Email or Password incorrect. Did you sign up?");
    }
  }

  return (
    <div className="login-container">
      <h1 style={{ WebkitTextStroke: "1px black" }}>Login</h1>
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="input-container">
          <label className="login-label">Email </label>
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="login-label">Password </label>
          <input
            type="text"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-btn" type="submit">
          Login
        </button>
      </form>
      <hr style={{ margin: "1rem" }} />
      <div>
        <button
          className="secondary-btn"
          onClick={() => history.push("/register")}
        >
          register
        </button>
      </div>
    </div>
  );
}

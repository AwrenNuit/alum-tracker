import React from "react";
import { useHistory, Link } from "react-router-dom";
import { logoutUser } from "../../firebase";
import { useDispatch } from "react-redux";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      await logoutUser();
      dispatch({ type: `UNSET_USER` });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <nav>
      <Link className="link" to="/attendance">Attendance</Link>
      <Link className="link" to="/who-was-there">Who Was There?</Link>
      <Link className="link" to="/add-cohort">Add a Cohort</Link>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </nav>
  );
}
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { logoutUser } from '../../firebase';

export default function Header() {
  const history = useHistory();

  async function handleLogout() {
    await logoutUser();
    history.push('/');
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
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import AddCohort from '../AddCohort/AddCohort';
import AlumList from '../AlumList/AlumList';
import Attendance from '../Attendance/Attendance';

export default function App() {
  return (
    <Router>
      <nav>
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/present">Who Was There?</Link>
        <Link className="link" to="/add-cohort">Add a Cohort</Link>
      </nav>
      <Route exact path="/" component={Attendance} />
      <Route exact path="/add-cohort" component={AddCohort} />
      <Route exact path="/present" component={AlumList} />
    </Router>
  );
}
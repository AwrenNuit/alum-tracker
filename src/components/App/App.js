import React from 'react';
import './App.css';
import AddCohort from '../AddCohort/AddCohort';
import AlumList from '../AlumList/AlumList';
import Attendance from '../Attendance/Attendance';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <nav>
        <Link class="link" to="/">Home</Link>
        <Link class="link" to="/present">Who Was There?</Link>
        <Link class="link" to="/add-cohort">Add a Cohort</Link>
      </nav>
      <Route exact path="/" component={Attendance} />
      <Route exact path="/add-cohort" component={AddCohort} />
      <Route exact path="/present" component={AlumList} />
    </Router>
  );
}
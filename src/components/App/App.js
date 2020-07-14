import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../firebase";
import "./App.css";
import AddCohort from "../AddCohort/AddCohort";
import AlumList from "../AlumList/AlumList";
import Attendance from "../Attendance/Attendance";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Header from "../Header/Header";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        dispatch({ type: `SET_USER`, payload: user.email });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/attendance" component={Attendance} />
      <Route exact path="/who-was-there" component={AlumList} />
      <Route exact path="/add-cohort" component={AddCohort} />
    </Router>
  );
}

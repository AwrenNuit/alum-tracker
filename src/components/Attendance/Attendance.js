import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase";
import "./Attendance.css";
import AttendanceTally from "../AttendanceTally/AttendanceTally";
import AttendanceNames from "../AttendanceNames/AttendanceNames";
import RadioToggle from "./RadioToggle";

export default function Attendance() {
  const dispatch = useDispatch();
  const allScrumData = useSelector((state) => state.allScrumDataReducer);
  const allStandupData = useSelector((state) => state.allStandupDataReducer);
  const [choice, setChoice] = useState("");
  const [month, setMonth] = useState([]);
  const [scrumTally, setScrumTally] = useState([]);
  const [standupTally, setStandupTally] = useState([]);

  useEffect(() => {
    dispatch({ type: `CLEAR_TALLY_LIST` });
    db.ref("scrum").once(`value`, (snap) => {
      snap.forEach((child) => {
        dispatch({
          type: `SET_SCRUM_LIST`,
          payload: { [child.key]: child.val() },
        });
      });
    });
    db.ref("standup").once(`value`, (snap) => {
      snap.forEach((child) => {
        dispatch({
          type: `SET_STANDUP_LIST`,
          payload: { [child.key]: child.val() },
        });
      });
    });
  }, []);

  useEffect(() => {
    setData(allScrumData, setScrumTally);
    setData(allStandupData, setStandupTally);
  }, [allScrumData, allStandupData]);

  const setData = (data, tally) => {
    let monthKey = "";
    let monthList = [];
    let cohortKey = "";
    let alumTally = [];

    for (let i = 0; i < data.length; i++) {
      monthList.push(Object.keys(data[i]));
      if (!monthKey.includes(data[i])) {
        monthKey = Object.keys(data[i]);
        for (let j = 0; j < Object.keys(data[i][monthKey]).length; j++) {
          cohortKey = Object.keys(data[i][monthKey])[j];
          alumTally.push({ [monthKey]: data[i][monthList[i]][cohortKey] });
        }
      }
    }
    setMonth(monthList.flat(Infinity));
    tally(alumTally);
  };

  return (
    <div className="main-container">
      <h1>Attendance List</h1>
      <RadioToggle setter={setChoice} />

      {choice === "tally" ? (
        <AttendanceTally
          month={month}
          scrumTally={scrumTally}
          standupTally={standupTally}
        />
      ) : (
        ""
      )}
      {choice === "names" ? (
        <AttendanceNames
          month={month}
          scrumNames={allScrumData}
          standupNames={allStandupData}
        />
      ) : (
        ""
      )}
    </div>
  );
}

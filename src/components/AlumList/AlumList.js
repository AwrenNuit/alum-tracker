import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AlumList.css";
import { db } from "../../firebase";

export default function AlumList() {
  const dispatch = useDispatch();
  const cohortList = useSelector((state) => state.cohortListReducer);
  const [cohortSelected, setCohortSelected] = useState("");
  const [month, setMonth] = useState("");
  const [scrum, setScrum] = useState([]);
  const [standup, setStandup] = useState([]);
  const [thisCohort, setThisCohort] = useState([]);
  const [week, setWeek] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    clearCohortList();
    setCohortList();
    setCurrentMonth();
  }, []);

  const clearCohortList = () => dispatch({ type: `CLEAR_COHORT_LIST` });

  const selectedCohort = (e) => {
    setCohortSelected(e.target.value);
    db.ref(`cohorts/${e.target.value}`).once(`value`, (snap) => {
      snap.forEach((child) => {
        setThisCohort(child.val());
      });
    });
  };

  const setCohortList = () => {
    db.ref("cohorts").once(`value`, (snap) => {
      snap.forEach((child) => {
        dispatch({ type: `SET_COHORT_LIST`, payload: child.key });
      });
    });
  };

  const setCurrentMonth = () => {
    setMonth(new Date().toLocaleString("default", { month: "long" }));
  };

  const setMonthOptions = () => {
    const monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let output = [];
    for (let i = 0; i < monthList.length; i++) {
      output.push(
        <option key={i} value={monthList[i]}>
          {monthList[i]}
        </option>
      );
    }
    return output;
  };

  const setWeekOptions = () => {
    let output = [];
    for (let i = 1; i < 6; i++) {
      output.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return output;
  };

  const handleCheckbox = (e, hook, set) => {
    const name = e.target.value;
    if (e.target.checked) {
      set([...hook, e.target.value]);
    } else {
      set(hook.filter((e) => e !== name));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cohortSelected !== "" && week !== "") {
      db.ref(`/scrum/${year}_${month}_week_${week}/${cohortSelected}`).set(
        scrum
      );
      db.ref(`/standup/${year}_${month}_week_${week}/${cohortSelected}`).set(
        standup
      );
      setCohortSelected("");
      setScrum([]);
      setStandup([]);
      setThisCohort([]);
      setWeek("");
    } else {
      alert(`Make sure you selected a cohort and the week`);
    }
  };

  function populateTable() {
    let output = [];
    for (let i = 0; i < thisCohort.length; i++) {
      output.push(
        <tr className="list-tr" key={i}>
          <td>{thisCohort[i]}</td>
          <td>
            <label className="list-label">
              <input
                type="checkbox"
                value={thisCohort[i]}
                onChange={(e) => handleCheckbox(e, standup, setStandup)}
              />
            </label>
          </td>
          <td>
            <label className="list-label">
              <input
                type="checkbox"
                value={thisCohort[i]}
                onChange={(e) => handleCheckbox(e, scrum, setScrum)}
              />
            </label>
          </td>
        </tr>
      );
    }
    return output;
  }

  return (
    <div className="main-container">
      <h1>Who Was Present?</h1>

      <div className="add-directions-container">
        <div className="add-directions">
          <p style={{ fontWeight: "bold" }}>To use:</p>
          <div className="add-directions-list">
            <ul>
              <li>Select a cohort</li>
              <li>Select the week of the month you are logging</li>
              <li>Use checkboxes to choose who was present</li>
              <li>Click "Submit"</li>
              <li>Rinse & repeat for each cohort who had students present</li>
              <li>
                You can re-submit it to overwrite the existing data in case you
                made a mistake
              </li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="list-select-container">
          <div className="list-select-cohort">
            <label>Cohort: </label>
            <select value={cohortSelected} onChange={selectedCohort}>
              <option value="" disabled>
                Select Cohort
              </option>
              {cohortList.map((cohort, i) => (
                <option key={i} value={cohort}>
                  {cohort}
                </option>
              ))}
            </select>
          </div>

          <div className="list-select-month-week">
            <p>
              {year}
              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                {setMonthOptions()}
              </select>
              &nbsp;Week&nbsp;
              <select value={week} onChange={(e) => setWeek(e.target.value)}>
                <option value="" disabled>
                  ?
                </option>
                {setWeekOptions()}
              </select>
            </p>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Alum Standup</th>
                <th>Alum Scrum</th>
              </tr>
            </thead>
            <tbody>{populateTable()}</tbody>
          </table>
        </div>

        <div className="list-form-btn-container">
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

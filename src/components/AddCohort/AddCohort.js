import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import "./AddCohort.css";
import Directions from "./Directions";

export default function AddCohort() {
  const dispatch = useDispatch();
  const cohortList = useSelector((state) => state.cohortListReducer);
  const [count, setCount] = useState(1);
  const [graduationDate, setGraduationDate] = useState("");
  const [newCohort, setNewCohort] = useState("");
  const [newStudent, setNewStudent] = useState("");
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    db.ref("cohorts").once(`value`, (snap) => {
      snap.forEach((child) => {
        dispatch({ type: `SET_COHORT_LIST`, payload: child.key });
      });
    });
  }, []);

  useEffect(() => {
    if (count === 1) {
      return;
    } else {
      if (studentList.length === 0) {
        setStudentList([newStudent.replace(/^\s+|\s+$/g, "")]);
      } else {
        setStudentList([...studentList, newStudent.replace(/^\s+|\s+$/g, "")]);
      }
    }
    setNewStudent("");
  }, [count]);

  const addStudentInput = () => {
    let output = [];
    for (let i = 1; i <= count; i++) {
      output.push(
        <div className="add-student cohort-grid" key={i}>
          <label>Student #{i}: </label>
          <input
            autoFocus
            onChange={(e) => setNewStudent(e.target.value)}
            placeholder="student name"
            type="text"
            value={studentList[i - 1] || newStudent}
          />
        </div>
      );
    }
    return output;
  };

  const addStudentToList = () => {
    document.getElementsByTagName("input")[count + 1].disabled = true;
    setCount(count + 1);
  };

  const checkAgainstList = () => {
    if (cohortList.includes(newCohort)) {
      alert(`That cohort has already been added.`);
      setNewCohort("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCohort !== "" && graduationDate !== "" && studentList.length > 0) {
      db.ref(`/cohorts/${newCohort}`).set({
        graduation: graduationDate,
        studentList,
      });
      // clearReducer();
      setGraduationDate("");
      setNewCohort("");
      setNewStudent("");
      setStudentList("");
      setCount(1);
      document.getElementsByTagName("input")[2].disabled = false;
    } else if (newCohort === "") {
      alert(`Please name the cohort. You have the power...don't abuse it ;)`);
    } else if (graduationDate === "") {
      alert(
        `Please give this cohort a graduation date or else they'll be very sad :(`
      );
    } else if (studentList.length < 1) {
      alert(
        `Please add students or the instructor will have an existential crisis :o`
      );
    }
  };

  return (
    <div className="main-container">
      <h1>Add a Cohort</h1>
      <Directions list={studentList} />

      <form onSubmit={handleSubmit}>
        <div className="add-cohort cohort-grid">
          <label>Cohort Name: </label>
          <input
            type="text"
            value={newCohort}
            onChange={(e) => setNewCohort(e.target.value)}
            onBlur={checkAgainstList}
            placeholder="cohort name"
          />
        </div>
        <div className="add-graduation cohort-grid">
          <label>Graduation Date: </label>
          <input
            type="date"
            value={graduationDate}
            onChange={(e) => setGraduationDate(e.target.value)}
          />
        </div>
        {/* add DELETE button next to input field to remove from hook */}
        {addStudentInput()}
        <button
          className="add-student-btn"
          type="button"
          onClick={() => (newStudent.length > 0 ? addStudentToList() : null)}
        >
          Save & Add Another Student
        </button>
        <div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import './AddCohort.css';

export default function AddCohort() {

  // const dispatch = useDispatch();
  // const cohortList = useSelector(state => state.cohorts); // this reducer holds cohort names from firebase
  const [graduationDate, setGraduationDate] = useState('');
  const [newCohort, setNewCohort] = useState('');
  const [student, setStudent] = useState('');

  useEffect(()=>{
    // set reducer with firebase cohort names
  }, []);

  const handleSubmit = e => {
    // add cohort to firebase list
    e.preventDefault();
    if(newCohort !== '' && graduationDate !== '' && student !== ''){
      db.ref(`/cohorts/${newCohort}`).set({
        graduation: graduationDate
      });
      db.ref(`/cohorts/${newCohort}/students`).set({
        student
      });
      // clearReducer();
      setGraduationDate('');
      setNewCohort('');
      setStudent('');
    }
  }

  return(
    <div className="main-container">
      <h1>Add a Cohort</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-cohort">
          <label>Cohort Name: </label>
          <input 
            type="text" 
            value={newCohort} 
            onChange={(e)=>setNewCohort(e.target.value)} 
            placeholder="cohort name" 
          />
        </div>
        <div className="add-graduation">
          <label>Graduation Date: </label>
          <input 
            type="date" 
            value={graduationDate} 
            onChange={(e)=>setGraduationDate(e.target.value)} 
          />
        </div>
        {/* make number of student inputs dynamically generated with button */}
        <div className="add-student">
          <label>Student Name: </label>
          <input 
            type="text" 
            value={student}
            onChange={(e)=>setStudent(e.target.value)}
            placeholder="student name"
          />
        </div>
        {/* <button type="button" onClick={()=>setCount(count+1)}>+</button> */}
        <div>
          <button className="submit-btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
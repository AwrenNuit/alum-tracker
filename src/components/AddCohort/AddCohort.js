import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import './AddCohort.css';

export default function AddCohort() {

  // const dispatch = useDispatch();
  // const cohortList = useSelector(state => state.cohorts); // this reducer holds cohort names from firebase
  const [count, setCount] = useState(1);
  const [graduationDate, setGraduationDate] = useState('');
  const [newCohort, setNewCohort] = useState('');
  const [newStudent, setNewStudent] = useState('');
  const [studentList, setStudentList] = useState([]);

  useEffect(()=>{
    // set reducer with firebase cohort names
  }, []);

  useEffect(()=>{
    setStudentList([...studentList, newStudent]);
    setNewStudent('');
  }, [count]);

  const addStudentInput = () => {
    let output = [];
    for(let i=1; i<=count; i++){
      output.push(<div className="add-student" key={i}>
                    <label>Student #{i}: </label>
                    <input 
                      type="text" 
                      value={studentList[i] || newStudent}
                      onChange={(e)=>setNewStudent(e.target.value)}
                      placeholder="student name"
                    />
                  </div>);
    }
    return output;
  }

  const handleSubmit = e => {
    // add cohort to firebase list
    e.preventDefault();
    if(newCohort !== '' && graduationDate !== '' && studentList !== ''){
      db.ref(`/cohorts/${newCohort}`).set({
        graduation: graduationDate
      });
      db.ref(`/cohorts/${newCohort}/students`).set({
        studentList
      });
      // clearReducer();
      setGraduationDate('');
      setNewCohort('');
      setNewStudent('');
      setStudentList('');
    }
  }

  return(
    <div className="main-container">
      <h1>Add a Cohort</h1>

      {/* paragraph explaining how buttons and form work */}
      
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

        {/* add DELETE button next to input field to remove from hook */}
        {addStudentInput()}

        {/* display msg that student was saved, disable input field */}
        <button type="button" onClick={()=>setCount(count+1)}>Save & Add Another Student</button>
        <div>
          <button className="submit-btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
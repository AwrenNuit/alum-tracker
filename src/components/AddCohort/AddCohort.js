import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import './AddCohort.css';

export default function AddCohort() {

  const dispatch = useDispatch();
  const cohortList = useSelector(state => state.cohortListReducer);
  const [count, setCount] = useState(1);
  const [graduationDate, setGraduationDate] = useState('');
  const [newCohort, setNewCohort] = useState('');
  const [newStudent, setNewStudent] = useState('');
  const [studentList, setStudentList] = useState([]);

  useEffect(()=>{
    db.ref('cohorts').once(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_COHORT_LIST`, payload: child.key});
        // console.log('db child:', child.key); // For cohort list by key
      });
    });

    // db.ref('cohorts/Trifid').once(`value`, snap => {
    //   snap.forEach(child => {
    //     // dispatch({type: `SET_THIS_COHORT`, payload: child.val()});
    //     console.log('db child:', child.val()); // for data in this document
    //   });
    // });
    
  }, []);

  useEffect(()=>{
    if(studentList[0] === ''){
      setStudentList([newStudent]);
    }
    else {
      setStudentList([...studentList, newStudent]);
    }
    setNewStudent('');
  }, [count]);

  const addStudentInput = () => {
    let output = [];
    for(let i=1; i<=count; i++){
      output.push(<div className="add-student" key={i}>
                    <label>Student #{i}: </label>
                    <input 
                      type="text" 
                      value={studentList[i-1] || newStudent}
                      onChange={(e)=>setNewStudent(e.target.value)}
                      placeholder="student name"
                      autoFocus
                    />
                  </div>);
    }
    return output;
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(newCohort !== '' && graduationDate !== '' && studentList !== ''){
      db.ref(`/cohorts/${newCohort}`).set({
        graduation: graduationDate,
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

      <div className="add-directions-container">
        <div className="add-directions">
          <p style={{fontWeight:'bold'}}>To use:</p>
          <div className="add-directions-list">
            <ul>
              <li>Enter the name of the cohort you wish to add</li>
              <li>Select the date of they graduate</li>
              <li>Enter a student's name, then click the "Save & Add Another Student" button to add it to the list</li>
              <li>Once you have all the students (there will be a blank input at the end) you can hit the "Submit" button</li>
              <li>Rinse & repeat for each cohort you want to add :)</li>
            </ul>
          </div>
          <div style={{marginTop:'20px'}}>
            <p style={{fontWeight:'bold'}}>Current students:&nbsp;</p> 
            {studentList.length !== 0 ? studentList.join(', ') : ''}
          </div>
        </div>
      </div>
      
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
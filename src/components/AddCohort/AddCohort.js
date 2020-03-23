import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AddCohort() {

  // const dispatch = useDispatch();
  // const cohortList = useSelector(state => state.cohorts); // this reducer holds cohort names from firebase
  const [newCohort, setNewCohort] = useState('');
  const [graduationDate, setGraduationDate] = useState('');

  useEffect(()=>{
    // set reducer with firebase cohort names
  })

  const handleSubmit = () => {
    // add cohort to firebase list
  }

  return(
    <>
      <h1>Add a Cohort</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cohort Name: </label>
          <input 
            type="text" 
            value={newCohort} 
            onChange={(e)=>setNewCohort(e.target.value)} 
            placeholder="cohort name" 
          />
        </div>
        <div>
          <label>Graduation Date: </label>
          <input 
            type="date" 
            value={graduationDate} 
            onChange={(e)=>setGraduationDate(e.target.value)} 
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
}
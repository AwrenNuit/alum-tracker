import React, { useState, useEffect } from 'react';
import AttendanceTally from '../AttendanceTally/AttendanceTally';
import AttendanceNames from '../AttendanceNames/AttendanceNames';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';

export default function Attendance() {

  const dispatch = useDispatch();
  const alumPresentList = useSelector(state => state.alumPresentListReducer);
  const cohortPresentList = useSelector(state => state.cohortPresentListReducer);
  const monthList = useSelector(state => state.monthListReducer);
  const weekList = useSelector(state => state.weekListReducer);
  const [choice, setChoice] = useState('');

  useEffect(()=>{
    getMonths();
  }, []);

  async function getMonths() {
    let alums = [];
    let cohorts = [];
    let months = [];
    let weeks = [];

    await db.ref('scrum').once(`value`, snap => {
      snap.forEach(child => {
        months.push(child.key);
        dispatch({type: `SET_MONTH_LIST`, payload: child.key});
      });
    });

    for(let month of months){
      await db.ref(`scrum/${month}`).once(`value`, snap => {
        snap.forEach(child => {
          weeks.push(child.key);
          dispatch({type: `SET_WEEK_LIST`, payload: child.key});
        });
      });
    }

    for(let i=0; i<weeks.length; i++){
      await db.ref(`scrum/${months[i]}/${weeks[i]}`).once(`value`, snap => {
        snap.forEach(child => {
          cohorts.push(child.key);
          dispatch({type: `SET_COHORT_PRESENT_LIST`, payload: child.key});
        });
      });
    }

    for(let i=0; i<cohorts.length; i++){
      await db.ref(`scrum/${months[i]}/${weeks[i]}/${cohorts[i]}`).once(`value`, snap => {
        snap.forEach(child => {
          alums.push(child.val());
          dispatch({type: `SET_ALUM_PRESENT_LIST`, payload: child.val()});
        });
      });
    }
  }

  return(
    <div className="main-container">
      <h1>Attendance List</h1>

      {JSON.stringify(monthList)}
      {JSON.stringify(weekList)}
      {JSON.stringify(cohortPresentList)}
      {JSON.stringify(alumPresentList)}
      
      <div>
        <p>Which would you like to see?</p>
        <div>
          <input type="radio" name="choice" value="tally" onChange={(e)=>setChoice(e.target.value)} />
            <label>Tally</label>
        </div>
        <div>
          <input type="radio" name="choice" value="names" onChange={(e)=>setChoice(e.target.value)} />
            <label>Names</label>
        </div>
      </div>

      {choice === 'tally' ? <AttendanceTally /> : ''}
      {choice === 'names' ? <AttendanceNames /> : ''}

    </div>
  );
}
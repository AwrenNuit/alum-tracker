import React, { useState, useEffect } from 'react';
import AttendanceTally from '../AttendanceTally/AttendanceTally';
import AttendanceNames from '../AttendanceNames/AttendanceNames';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';

export default function Attendance() {

  const dispatch = useDispatch();
  // const alumPresentList = useSelector(state => state.alumPresentListReducer);
  // const cohortPresentList = useSelector(state => state.cohortPresentListReducer);
  // const monthList = useSelector(state => state.monthListReducer);
  // const weekList = useSelector(state => state.weekListReducer);
  const tallyList = useSelector(state => state.tallyListReducer);
  const [choice, setChoice] = useState('');

  useEffect(()=>{
    db.ref('scrum').once(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_TALLY_LIST`, payload: {[child.key]: child.val()}});
      });
    });
  }, []);

  return(
    <div className="main-container">
      <h1>Attendance List</h1>

      {JSON.stringify(tallyList)}
      
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
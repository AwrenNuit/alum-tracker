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
  const allData = useSelector(state => state.allDataReducer);
  const [alum, setAlum] = useState([]);
  const [choice, setChoice] = useState('');
  const [tally, setTally] = useState([]);

  useEffect(()=>{
    db.ref('scrum').once(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_TALLY_LIST`, payload: {[child.key]: child.val()}});
      });
    });
  }, []);

  useEffect(()=>{
    if(allData){
      let monthKey = '';
      let cohortKey = '';
      let present = [];

      for(let i=0; i<allData.length; i++) {
        if(!monthKey.includes(allData[i])){
          monthKey = Object.keys(allData[i]);
          for(let j=0; j<allData.length; j++) {
            cohortKey = Object.keys(allData[i][monthKey])[j];
            present.push({[cohortKey]: allData[i][monthKey][cohortKey]});
          }
        }
      }
      setAlum(present);
    }
  }, [allData]);

  return(
    <div className="main-container">
      <h1>Attendance List</h1>

      {JSON.stringify(allData)}
      <br />
      <br />
      {JSON.stringify(alum)}

      {/* {Object.entries(allData).map((m,i)=>
        <div key={i}>{m}</div>
      )} */}
      {/* {allData && allData[0] ? allData[0].map((m,i)=>
        <div key={i}>{m}</div>
      )
    :
    ''} */}
      
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

      {/* {allData.map((m,i)=>
        <div key={i}>{m}</div>
      )} */}

      {choice === 'tally' ? <AttendanceTally /> : ''}
      {choice === 'names' ? <AttendanceNames /> : ''}

    </div>
  );
}
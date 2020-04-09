import React, { useState, useEffect } from 'react';
import AttendanceTally from '../AttendanceTally/AttendanceTally';
import AttendanceNames from '../AttendanceNames/AttendanceNames';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';

export default function Attendance() {

  const dispatch = useDispatch();
  // const alumalumPresentList = useSelector(state => state.alumalumPresentListReducer);
  // const cohortalumPresentList = useSelector(state => state.cohortalumPresentListReducer);
  // const monthList = useSelector(state => state.monthListReducer);
  // const weekList = useSelector(state => state.weekListReducer);
  const allData = useSelector(state => state.allDataReducer);
  const [alum, setAlum] = useState([]);
  const [choice, setChoice] = useState('');
  const [month, setMonth] = useState([]);
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
      let monthList = [];
      let cohortKey = '';
      let alumPresent = [];
      let alumTally = [];

      for(let i=0; i<allData.length; i++) {
        // push month & week into array
        monthList.push(Object.keys(allData[i]));

        // if next month name is different, update it
        if(!monthKey.includes(allData[i])){
          monthKey = Object.keys(allData[i]);

          // loop through cohorts with students present that month & week
          for(let j=0; j<Object.keys(allData[i][monthKey]).length; j++) {

            // set cohort name to variable
            cohortKey = Object.keys(allData[i][monthKey])[j];

            // push object to array with cohort name as key and student list as value
            alumPresent.push({[cohortKey]: allData[i][monthKey][cohortKey]});

            // push object to array with month as key and student list as value
            alumTally.push({[monthKey]: allData[i][monthList[i]][cohortKey]});
          }
        }
      }
      setMonth(monthList.flat(Infinity));
      // setAlum(alumPresent);
      setTally(alumTally);
    }
  }, [allData]);

  return(
    <div className="main-container">
      <h1>Attendance List</h1>

      {/* {JSON.stringify(allData)} */}
      <br />
      <br />
      {/* {JSON.stringify(alum)} */}
      <br />
      <br />
      {JSON.stringify(tally)}
      
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

      {choice === 'tally' ? <AttendanceTally month={month} tally={tally} /> : ''}
      {choice === 'names' ? <AttendanceNames /> : ''}

    </div>
  );
}
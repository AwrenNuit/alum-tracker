import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase';
import './Attendance.css';
import AttendanceTally from '../AttendanceTally/AttendanceTally';
import AttendanceNames from '../AttendanceNames/AttendanceNames';

export default function Attendance() {

  const dispatch = useDispatch();
  const allScrumData = useSelector(state => state.allScrumDataReducer);
  const allStandupData = useSelector(state => state.allStandupDataReducer);
  const [choice, setChoice] = useState('');
  const [month, setMonth] = useState([]);
  const [scrumTally, setScrumTally] = useState([]);
  const [standupTally, setStandupTally] = useState([]);

  useEffect(()=>{
    db.ref('scrum').once(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_SCRUM_LIST`, payload: {[child.key]: child.val()}});
      });
    });
    db.ref('standup').once(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_STANDUP_LIST`, payload: {[child.key]: child.val()}});
      });
    });
  }, []);

  // For alum scrum events
  useEffect(()=>{
    if(allScrumData){
      let monthKey = '';
      let monthList = [];
      let cohortKey = '';
      let alumScrumTally = [];

      for(let i=0; i<allScrumData.length; i++) {
        // push month & week into array
        monthList.push(Object.keys(allScrumData[i]));
        // if next month name is different, update it
        if(!monthKey.includes(allScrumData[i])){
          monthKey = Object.keys(allScrumData[i]);
          // loop through cohorts with students present that month & week
          for(let j=0; j<Object.keys(allScrumData[i][monthKey]).length; j++) {
            // set cohort name to variable
            cohortKey = Object.keys(allScrumData[i][monthKey])[j];
            // push object to array with month as key and student list as value
            alumScrumTally.push({[monthKey]: allScrumData[i][monthList[i]][cohortKey]});
          }
        }
      }
      setMonth(monthList.flat(Infinity));
      setScrumTally(alumScrumTally);
    }
  }, [allScrumData]);

  // For alum standups
  useEffect(()=>{
    if(allStandupData){
      let monthKey = '';
      let monthList = [];
      let cohortKey = '';
      let alumStandupTally = [];

      for(let i=0; i<allStandupData.length; i++) {
        // push month & week into array
        monthList.push(Object.keys(allStandupData[i]));
        // if next month name is different, update it
        if(!monthKey.includes(allStandupData[i])){
          monthKey = Object.keys(allStandupData[i]);
          // loop through cohorts with students present that month & week
          for(let j=0; j<Object.keys(allStandupData[i][monthKey]).length; j++) {
            // set cohort name to variable
            cohortKey = Object.keys(allStandupData[i][monthKey])[j];
            // push object to array with month as key and student list as value
            alumStandupTally.push({[monthKey]: allStandupData[i][monthList[i]][cohortKey]});
          }
        }
      }
      setStandupTally(alumStandupTally);
    }
  }, [allStandupData]);

  return(
    <div className="main-container">
      <h1>Attendance List</h1>
      <div>
        <p>Which would you like to see?</p>
        <div className="choice-container">
          <div className="choice-sub-container">
            <label style={{cursor:"pointer"}}>
              <input 
                style={{cursor:"pointer", marginRight:"10px"}}
                type="radio" 
                name="choice" 
                value="tally" 
                onChange={(e)=>setChoice(e.target.value)} 
              />
              Tally
            </label>
          </div>
          <br />
          <div className="choice-sub-container">
            <label style={{cursor:"pointer"}}>
              <input 
                style={{cursor:"pointer", marginRight:"10px"}}
                type="radio" 
                name="choice" 
                value="names" 
                onChange={(e)=>setChoice(e.target.value)} 
              />
              Names
            </label>
          </div>
        </div>
      </div>

      {choice === 'tally' ? 
        <AttendanceTally month={month} scrumTally={scrumTally} standupTally={standupTally} /> 
      : 
        ''
      }
      {choice === 'names' ? 
        <AttendanceNames month={month} scrumNames={allScrumData} standupNames={allStandupData} /> 
      : 
        ''
      }

    </div>
  );
}
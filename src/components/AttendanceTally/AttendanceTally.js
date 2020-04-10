import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';

export default function AttendancescrumTally(props) {

  const [scrumTotal, setScrumTotal] = useState('');
  const [standupTotal, setStandupTotal] = useState('');

  // set scrum total
  useEffect(()=>{
    let prevMonth = '';
    let alum = [];
    let output = [];
    let key = '';

    for(let i=0; i<props.scrumTally.length; i++) {
      key = Object.keys(props.scrumTally[i]).toString();
      if(alum.length < 1 || alum.length < 1 && prevMonth !== key){
        alum.push(props.scrumTally[i][key]);
        prevMonth = key;
      }
      else if(i === props.scrumTally.length - 1){
        alum.push(props.scrumTally[i][key]);
        output.push(alum.flat(Infinity).length);
        alum = [];
      }
      else if(prevMonth !== key){
        output.push(alum.flat(Infinity).length);
        alum = [];
        alum.push(props.scrumTally[i][key]);
        prevMonth = key;
      }
      else if(prevMonth === key){
        alum.push(props.scrumTally[i][key]);
      }
    }
    setScrumTotal(output);
  }, []);

  // set standup total
  useEffect(()=>{
    let prevMonth = '';
    let alum = [];
    let output = [];
    let key = '';

    for(let i=0; i<props.standupTally.length; i++) {
      key = Object.keys(props.standupTally[i]).toString();
      if(alum.length < 1 || alum.length < 1 && prevMonth !== key){
        alum.push(props.standupTally[i][key]);
        prevMonth = key;
      }
      else if(i === props.standupTally.length - 1){
        alum.push(props.standupTally[i][key]);
        output.push(alum.flat(Infinity).length);
        alum = [];
      }
      else if(prevMonth !== key){
        output.push(alum.flat(Infinity).length);
        alum = [];
        alum.push(props.standupTally[i][key]);
        prevMonth = key;
      }
      else if(prevMonth === key){
        alum.push(props.standupTally[i][key]);
      }
    }
    setStandupTotal(output);
  }, []);

  return(
    <div>
      <table>
        <thead>
          <tr>
          <th>Month & Week</th>
          <th>Event</th>
          <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {props.month.map((month, i)=>
            <Fragment key={i}>
              <tr>
                <td>{month.replace(/_/g, " ")}</td>
                <td>Standup</td>
                <td>{standupTotal[i]}</td>
              </tr>
              <tr>
                <td>{month.replace(/_/g, " ")}</td>
                <td>Scrum</td>
                <td>{scrumTotal[i]}</td>
              </tr>
            </Fragment>
          )}
        </tbody>
      </table>
    </div>
  );
}
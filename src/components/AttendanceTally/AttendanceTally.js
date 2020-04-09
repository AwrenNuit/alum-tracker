import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';

export default function AttendanceTally(props) {

  const [scrumTotal, setScrumTotal] = useState('');

  useEffect(()=>{
    let prevMonth = '';
    let alum = [];
    let output = [];
    let key = '';

    for(let i=0; i<props.tally.length; i++) {
      key = Object.keys(props.tally[i]).toString();
      if(alum.length < 1 || alum.length < 1 && prevMonth !== key){
        alum.push(props.tally[i][key]);
        prevMonth = key;
      }
      else if(i === props.tally.length - 1){
        alum.push(props.tally[i][key]);
        output.push(alum.flat(Infinity).length);
        alum = [];
      }
      else if(prevMonth !== key){
        output.push(alum.flat(Infinity).length);
        alum = [];
        alum.push(props.tally[i][key]);
        prevMonth = key;
      }
      else if(prevMonth === key){
        alum.push(props.tally[i][key]);
      }
    }
    setScrumTotal(output);
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
                <td># alum present</td>
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
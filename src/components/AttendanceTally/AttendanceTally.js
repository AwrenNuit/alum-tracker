import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import './AttendanceTally.css';

export default function AttendanceTally(props) {

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
          <tr className="tr">
          <th className="th">Month & Week</th>
          <th className="th">Event</th>
          <th className="th">Attendance</th>
          </tr>
        </thead>
        {/* <tbody> */}
          {props.month.map((month, i)=>
            <tbody className="tbody" key={i}>
              <tr className="tr">
                <td className="td">{month.replace(/_/g, " ")}</td>
                <td className="td">Standup</td>
                <td className="td">{standupTotal[i]}</td>
              </tr>
              <tr className="tr">
                <td className="td">{month.replace(/_/g, " ")}</td>
                <td className="td">Scrum</td>
                <td className="td">{scrumTotal[i]}</td>
              </tr>
            </tbody>
          )}
        {/* </tbody> */}
      </table>
    </div>
  );
}
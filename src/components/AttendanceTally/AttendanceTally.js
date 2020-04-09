import React from 'react';
import { Fragment } from 'react';

export default function AttendanceTally(props) {

  const getTallyTotal = () => {
    console.log('in there');
    let prevMonth = '';
    let alum = [];
    let total = 0;
    for(let i=0; i<props.tally.length; i++){
      let key = Object.keys(props.tally[i]).toString();
      console.log(' ');
      console.log(' ');
      console.log(`-------------- loop ${i} --------------`);
      if(alum.length < 1){
        console.log('-------------- in < 1 --------------');
        console.log('object keys:', key);
        alum.push(props.tally[i][key]);
        prevMonth = key;
      }
      else if(prevMonth === key){
        // put loop in here that runs while prevMonth = key
        // once it is NOT equal to key, reset alum & return total
        console.log('-------------- prevMonth --------------');
        console.log('prevMonth:', prevMonth);
        alum.push(props.tally[i][key]);
        console.log('alum:', alum.flat(Infinity));
        total = alum.flat(Infinity).length;
        alum = [];
      }
    }
    console.log('total:', total);
  }

  return(
    <div>
      {JSON.stringify(props.tally)}
      {getTallyTotal()}
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
              <td># alum present</td>
            </tr>
          </Fragment>
          )}
        </tbody>
      </table>
    </div>
  );
}
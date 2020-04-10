import React, { useEffect, useState } from 'react';

export default function AttendanceNames(props) {

  const [scrumTotal, setScrumTotal] = useState('');
  const [standupTotal, setStandupTotal] = useState('');

  useEffect(()=>{
    setTotals(props.scrumNames, setScrumTotal);
    setTotals(props.standupNames, setStandupTotal);
  }, []);

  const setTotals = (incomingNames, total) => {
    const names = incomingNames;
    let prevMonth = '';
    let alum = [];
    let output = [];
    let key = '';
    let cohorts = [];

    for(let i=0; i<names.length; i++) {
      key = Object.keys(names[i]).toString();
      prevMonth = key;
      cohorts = Object.keys(names[i][prevMonth]);

        for(let j=0; j<cohorts.length; j++) {
          alum.push(<b> {cohorts[j]}: </b>, names[i][prevMonth][cohorts[j]].join(', '),);
        }
        output.push(alum.flat(Infinity));
        alum = [];
    }
    total(output);
  }

  return(
    <div>
      <table className="table">
      <thead>
          <tr className="tr">
          <th className="th">Month & Week</th>
          <th className="th">Event</th>
          <th className="th">Attendance</th>
          </tr>
        </thead>
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
      </table>
    </div>
  );
}
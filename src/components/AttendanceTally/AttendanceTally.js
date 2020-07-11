import React, { useState, useEffect } from "react";
import "./AttendanceTally.css";

export default function AttendanceTally(props) {
  const [scrumTotal, setScrumTotal] = useState("");
  const [standupTotal, setStandupTotal] = useState("");

  useEffect(() => {
    setTotals(props.scrumTally, setScrumTotal);
    setTotals(props.standupTally, setStandupTotal);
  }, []);

  const setTotals = (incomingTally, total) => {
    const tally = incomingTally;
    let prevMonth = "";
    let alum = [];
    let output = [];
    let key = "";

    for (let i = 0; i < tally.length; i++) {
      key = Object.keys(tally[i]).toString();
      if (alum.length < 1 || (alum.length < 1 && prevMonth !== key)) {
        alum.push(tally[i][key]);
        prevMonth = key;
      } else if (i === tally.length - 1) {
        alum.push(tally[i][key]);
        output.push(alum.flat(Infinity).length);
        alum = [];
      } else if (prevMonth !== key) {
        output.push(alum.flat(Infinity).length);
        alum = [];
        alum.push(tally[i][key]);
        prevMonth = key;
      } else if (prevMonth === key) {
        alum.push(tally[i][key]);
      }
    }
    total(output);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr className="tr">
            <th className="th">Month & Week</th>
            <th className="th">Event</th>
            <th className="th">Attendance</th>
          </tr>
        </thead>
        {props.month.map((month, i) => (
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
        ))}
      </table>
    </div>
  );
}

import React, { useState } from 'react';
import AttendanceTally from '../AttendanceTally/AttendanceTally';
import AttendanceNames from '../AttendanceNames/AttendanceNames';

export default function Attendance() {

  const [choice, setChoice] = useState('');

  return(
    <div className="main-container">
      <h1>Attendance List</h1>
      
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
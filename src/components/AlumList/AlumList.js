import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AlumList.css';

export default function AlumList() {

  // const dispatch = useDispatch();
  // const alumList = useSelector(state => state.alum); // reducer holds alum list from firebase
  // const cohortList = useSelector(state => state.cohorts); // reducer holds cohort list from firebase
  const [alumPresent, setAlumPresent] = useState([]);
  const [month, setMonth] = useState('');
  const [week, setWeek] = useState('');

  useEffect(()=>{
    let date = new Date().getMonth();
    switch(+date){
      case 0:
        setMonth('January');
        break;
      case 1:
        setMonth('February');
        break;
      case 2:
        setMonth('March');
        break;
      case 3:
        setMonth('April');
        break;
      case 4:
        setMonth('May');
        break;
      case 5:
        setMonth('June');
        break;
      case 6:
        setMonth('July');
        break;
      case 7:
        setMonth('August');
        break;
      case 8:
        setMonth('September');
        break;
      case 9:
        setMonth('October');
        break;
      case 10:
        setMonth('November');
        break;
      case 11:
        setMonth('December');
        break;
    }
  })

  return(
    <>
    <h1>Who Was Present?</h1>

    <form>
      <div className="list-select-container">
        <div className="list-select-cohort">
          <label>Cohort: </label>
          <select>
            <option>cohort1</option>
            <option>cohort2</option>
          </select>
        </div>

        <div className="list-select-month-week">
          <p>
            {month} Week&nbsp;
            <select onChange={(e)=>setWeek(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </p>
        </div>
      </div>

      {/* checkbox list of alum based on selected cohort */}
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Alum Standup</th>
              <th>Alum Scrum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ALUM 1</td>
              <td>
                <input
                  type="checkbox"
                  name="standup"
                  // value={}
                  // onChange={}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="scrum"
                  // value={}
                  // onChange={}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    <hr />
    </>
  );
}
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AlumList.css';
import { db } from '../../firebase';

export default function AlumList() {

  const dispatch = useDispatch();
  const cohortList = useSelector(state => state.cohortListReducer);
  const [cohortSelected, setCohortSelected] = useState('');
  const [month, setMonth] = useState('');
  const [scrum, setScrum] = useState([]);
  const [standup, setStandup] = useState([]);
  const [thisCohort, setThisCohort] = useState([]);
  const [week, setWeek] = useState('');

  useEffect(()=>{
    db.ref('cohorts').once(`value`, snap => {
      snap.forEach(child => {
        dispatch({type: `SET_COHORT_LIST`, payload: child.key});
      });
    });
  }, []);

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
      default:
        break;
    }
  }, []);

  const selectedCohort = e => {
    setCohortSelected(e.target.value);
    db.ref(`cohorts/${e.target.value}`).once(`value`, snap => {
      snap.forEach(child => {
        setThisCohort(child.val());
      });
    });
  }

  const handleCheckbox = (e, hook, set) => {
    const name = e.target.value;
    if(e.target.checked){
      set([...hook, e.target.value]);
    }
    else {
      set(hook.filter((e)=>(e !== name)));
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(cohortSelected !== '' && week !== ''){
      db.ref(`/scrum/${month}_week_${week}/${cohortSelected}`).set(scrum);
      db.ref(`/standup/${month}_week_${week}/${cohortSelected}`).set(standup);
      setCohortSelected('');
      setScrum([]);
      setStandup([]);
      setThisCohort([]);
      setWeek('');
    }
    else {
      alert(`Make sure you selected a cohort and the week`);
    }
  }

  function populateTable(){
    let output = [];
    for(let i=0; i<thisCohort.length; i++){
      output.push(<tr key={i}>
                    <td>{thisCohort[i]}</td>
                    <td>
                      <label class="list-label">
                        <input
                          type="checkbox"
                          value={thisCohort[i]}
                          onChange={(e)=>handleCheckbox(e, standup, setStandup)}
                        />
                      </label>
                    </td>
                    <td>
                      <label class="list-label">
                        <input
                          type="checkbox"
                          value={thisCohort[i]}
                          onChange={(e)=>handleCheckbox(e, scrum, setScrum)}
                        />
                      </label>
                    </td>
                  </tr>);
    }
    return output;
  }

  return(
    <div className="main-container">
      <h1>Who Was Present?</h1>

      <div className="add-directions-container">
        <div className="add-directions">
          <p style={{fontWeight:'bold'}}>To use:</p>
          <div className="add-directions-list">
            <ul>
              <li>Select a cohort</li>
              <li>Select the week of the month this is for</li>
              <li>Use checkboxes to choose who was present</li>
              <li>Click "Submit"</li>
              <li>Rinse & repeat for each cohort who had students present</li>
              <li>You can re-submit it to overwrite the existing data in case you made a mistake</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="list-select-container">
          <div className="list-select-cohort">
            <label>Cohort: </label>
            <select value={cohortSelected} onChange={selectedCohort}>
              <option value='' disabled>Select Cohort</option>
              {cohortList.map((cohort, i) =>
                <option 
                key={i}
                value={cohort}
              >
                {cohort}
              </option>
              )}
            </select>
          </div>

          <div className="list-select-month-week">
            <p>
              {month}: Week&nbsp;
              <select value={week} onChange={(e)=>setWeek(e.target.value)}>
                <option value='' disabled>?</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </p>
          </div>
        </div>

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
              {populateTable()}
            </tbody>
          </table>
        </div>

        <div className="list-form-btn-container">
          <button className="submit-btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AlumList() {

  // const dispatch = useDispatch();
  // const alumList = useSelector(state => state.alum); // reducer holds alum list from firebase
  // const cohortList = useSelector(state => state.cohorts); // reducer holds cohort list from firebase
  const [alumPresent, setAlumPresent] = useState([]);

  useEffect(()=>{
    //
  })

  return(
    <>
    <h1>Who Was Present?</h1>
    <form>
      <select>
        <option>cohort1</option>
        <option>cohort2</option>
      </select>

      {/* checkbox list of alum based on selected cohort */}
      <div>
        <label>
          <input type="checkbox" name="alum" /> 
          alum 1
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="alum" /> 
          alum 2
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="alum" /> 
          alum 3
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="alum" /> 
          alum 4
        </label>
      </div>

      <div>
        <button type="submit">These Alum Were Present</button>
      </div>
    </form>
    <hr />
    </>
  );
}
import React from "react";

export default function Directions(props) {
  return (
    <div className="add-directions-container">
      <div className="add-directions">
        <p style={{ fontWeight: "bold" }}>To use:</p>
        <div className="add-directions-list">
          <ul>
            <li>Enter the name of the cohort you wish to add</li>
            <li>Select the date that they graduate</li>
            <li>
              Enter a student's name, then click the "Save & Add Another
              Student" button to add it to the list
            </li>
            <li>
              Once you have all the students (there will be a blank input at the
              end) you can hit the "Submit" button
            </li>
            <li>Rinse & repeat for each cohort you want to add :)</li>
          </ul>
        </div>
        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold" }}>Current students:&nbsp;</p>
          {props.list.length > 0 ? (
            <span>{props.list.join(", ")}</span>
          ) : (
            <span>None</span>
          )}
        </div>
      </div>
    </div>
  );
}

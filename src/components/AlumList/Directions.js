import React from "react";

export default function Directions() {
  return (
    <div className="add-directions-container">
      <div className="add-directions">
        <p style={{ fontWeight: "bold" }}>To use:</p>
        <div className="add-directions-list">
          <ul>
            <li>Select a cohort</li>
            <li>Select the week of the month you are logging</li>
            <li>Use checkboxes to choose who was present</li>
            <li>Click "Submit"</li>
            <li>Rinse & repeat for each cohort who had students present</li>
            <li>
              You can re-submit it to overwrite the existing data in case you
              made a mistake
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

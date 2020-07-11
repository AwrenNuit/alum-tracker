import React from "react";

export default function RadioToggle(props) {
  return (
    <div>
      <p style={{ fontSize: "0.7em" }}>
        (this will eventually have a month and year dropdown to filter table
        results)
      </p>
      <br />
      <p>Which would you like to see?</p>
      <div className="choice-container">
        <div className="choice-sub-container">
          <label style={{ cursor: "pointer" }}>
            <input
              style={{ cursor: "pointer", marginRight: "10px" }}
              type="radio"
              name="choice"
              value="tally"
              onChange={(e) => props.setter(e.target.value)}
            />
            Tally
          </label>
        </div>
        <br />
        <div className="choice-sub-container">
          <label style={{ cursor: "pointer" }}>
            <input
              style={{ cursor: "pointer", marginRight: "10px" }}
              type="radio"
              name="choice"
              value="names"
              onChange={(e) => props.setter(e.target.value)}
            />
            Names
          </label>
        </div>
      </div>
    </div>
  );
}

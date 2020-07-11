import React from "react";

export default function RadioToggle(props) {
  return (
    <>
      <div className="choice-sub-container">
        <label style={{ cursor: "pointer" }}>
          <input
            style={{ cursor: "pointer", marginRight: "10px" }}
            type="radio"
            name={props.name}
            value={props.val}
            onChange={(e) => props.setter(e.target.value)}
          />
          {props.label}
        </label>
      </div>
      <br />
    </>
  );
}

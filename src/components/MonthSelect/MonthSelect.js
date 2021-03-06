import React from "react";

export default function MonthSelect(props) {
  const setMonthOptions = () => {
    const monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let output = [];
    for (let i = 0; i < monthList.length; i++) {
      output.push(
        <option key={i} value={monthList[i]}>
          {monthList[i]}
        </option>
      );
    }
    return output;
  };

  return (
    <select value={props.val} onChange={(e) => props.setter(e.target.value)}>
      {props.placeholderVal ? (
        <option value="" disabled>
          Month
        </option>
      ) : (
        <option value="all">All Months</option>
      )}
      {setMonthOptions()}
    </select>
  );
}

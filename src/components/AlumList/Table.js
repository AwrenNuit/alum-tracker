import React from 'react';

export default function Table(props) {

  return(
    <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Alum Standup</th>
                <th>Alum Scrum</th>
              </tr>
            </thead>
            <tbody>{props.populateTable()}</tbody>
          </table>
        </div>
  );
}
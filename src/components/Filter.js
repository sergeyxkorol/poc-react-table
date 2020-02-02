import React from 'react';
import './Filter.css';

export default function Filter({ columns }) {
  return (
    <div className="filter">
      <h3>Filter</h3>
      <ul className="filter-list">
        {columns.map(column => (
          <li key={column.id} className="filter-elem">
            <label className="filter-label">
              <input type="checkbox" {...column.getToggleHiddenProps()} /> {column.Header}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from 'react';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import './Filter.scss';

export default function Filter({ columns, toggleAllProps }) {
  return (
    <div className="filter">
      <h3>Filter</h3>
      <ul className="filter-list">
        <li className="filter-elem">
          <label className="filter-label">
            <IndeterminateCheckbox {...toggleAllProps()} /> Toggle All
          </label>
        </li>
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

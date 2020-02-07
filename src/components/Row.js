import React from 'react';
import './Row.scss';

export default function Row({ row, prepareRow, style, onCellMouseEnter, onCellMouseLeave }) {
  prepareRow(row);
  return (
    <div
      {...row.getRowProps({
        style
      })}
      className="tr"
    >
      {row.cells.map(cell => (
        <div
          {...cell.getCellProps()}
          className="td"
          data-column-id={cell.column.id}
          onMouseEnter={() => onCellMouseEnter(cell)}
          onMouseLeave={() => onCellMouseLeave(cell)}
        >
          {cell.render('Cell')}
        </div>
      ))}
    </div>
  );
}

import React, { useMemo } from 'react';
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';
import './Table.css';

export default function Table({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      width: 150,
      minWidth: 50,
      maxWidh: 600
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useBlockLayout,
    useResizeColumns
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
                <div {...column.getResizerProps()} className="resizer"></div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableProps()}>
        {rows.map(row => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

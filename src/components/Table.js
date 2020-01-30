import React, { useMemo } from 'react';
import { useTable, useFlexLayout, useResizeColumns } from 'react-table';
import './Table.css';

export default function Table({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      width: 150,
      minWidth: 50,
      maxWidh: 300
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useFlexLayout,
    useResizeColumns
  );

  return (
    <div {...getTableProps()} className="table">
      <div className="thead">
        {headerGroups.map(headerGroup => (
          <div
            {...headerGroup.getHeaderGroupProps({ style: { paddingRight: '15px' } })}
            className="tr"
          >
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()} className="th">
                {column.render('Header')}
                <div {...column.getResizerProps()} className="resizer"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()} className="tbody">
        {rows.map(row => {
          prepareRow(row);

          return (
            <div {...row.getRowProps()} className="tr">
              {row.cells.map(cell => (
                <div {...cell.getCellProps()} className="td">
                  {cell.render('Cell')}
                  <div className="td-border"></div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

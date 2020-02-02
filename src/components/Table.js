import React, { useMemo, useCallback } from 'react';
import { useTable, useSortBy, useFlexLayout, useResizeColumns } from 'react-table';
import { FixedSizeList } from 'react-window';
import Filter from './Filter';
import './Table.css';

export default function Table({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      width: 150,
      minWidth: 50,
      maxWidth: 300
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    flatColumns,
    state,
    state: { columnResizing, hiddenColumns }
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useSortBy,
    useFlexLayout,
    useResizeColumns
  );

  const bodyProps = { ...getTableBodyProps() };

  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style
          })}
          className="tr"
        >
          {row.cells.map(cell => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </div>
            );
          })}
        </div>
      );
    },
    [rows, columnResizing, hiddenColumns]
  );

  return (
    <div className="table-wrapper">
      <div className="filter-wrapper">
        <Filter columns={flatColumns} />
      </div>

      <div {...getTableProps()} className="table">
        <div className="thead" style={bodyProps.style}>
          {headerGroups.map(headerGroup => (
            <div
              {...headerGroup.getHeaderGroupProps({ style: { paddingRight: '15px' } })}
              className="tr"
            >
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                  {column.render('Header')}
                  {column.canSort && <span> (sortable)</span>}
                  <div {...column.getResizerProps()} className="resizer"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...bodyProps} className="tbody">
          <FixedSizeList height={450} itemCount={rows.length} itemSize={35}>
            {RenderRow}
          </FixedSizeList>
        </div>
      </div>
    </div>
  );
}

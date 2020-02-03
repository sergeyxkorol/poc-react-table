import React, { useMemo, useCallback } from 'react';
import { useTable, useSortBy, useFlexLayout, useResizeColumns, useRowSelect } from 'react-table';
import { FixedSizeList } from 'react-window';
import Filter from './Filter';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import EditableCell from './EditableCell';
import Info from './Info';
import './Table.css';

export default function Table({ columns, data, updateData }) {
  const defaultColumn = useMemo(
    () => ({
      width: 150,
      minWidth: 50,
      maxWidth: 300,
      Cell: EditableCell
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    flatColumns,
    state: { columnResizing, hiddenColumns, selectedRowIds }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateData
    },
    useSortBy,
    useFlexLayout,
    useResizeColumns,
    useRowSelect,
    hooks => {
      hooks.flatColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          )
        },
        ...columns
      ]);
    }
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
          {row.cells.map(cell => (
            <div {...cell.getCellProps()} className="td">
              {cell.render('Cell')}
            </div>
          ))}
        </div>
      );
    },
    [rows, columnResizing, hiddenColumns, selectedRowIds]
  );

  return (
    <div>
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
                  <div {...column.getHeaderProps()} className="th">
                    <div {...column.getSortByToggleProps()} className="th-sortable">
                      {column.render('Header')}
                      {column.canSort && <span> (sortable)</span>}
                    </div>
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
      <Info selectedRowIds={selectedRowIds} selectedFlatRows={selectedFlatRows} />
    </div>
  );
}

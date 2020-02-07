import React, { useRef, useMemo, useCallback } from 'react';
import { useTable, useSortBy, useFlexLayout, useResizeColumns, useRowSelect } from 'react-table';
import { FixedSizeList } from 'react-window';
import Filter from './Filter';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import Row from './Row';
import EditableCell from './EditableCell';
import Info from './Info';
import './Table.scss';

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

  // Used for columns highlighting
  const tableRef = useRef(null);

  const onCellMouseEnter = cell => {
    tableRef.current.classList.add(`active-col-${cell.column.id}`);
  };

  const onCellMouseLeave = cell => {
    tableRef.current.classList.remove(`active-col-${cell.column.id}`);
  };

  // Used for virtualization via react-window
  const RenderRow = useCallback(
    ({ index, style }) => {
      const row = rows[index];

      return (
        <Row
          row={row}
          prepareRow={prepareRow}
          style={style}
          onCellMouseEnter={onCellMouseEnter}
          onCellMouseLeave={onCellMouseLeave}
        />
      );
    },
    [rows, columnResizing, hiddenColumns, selectedRowIds]
  );

  const bodyProps = { ...getTableBodyProps() };

  return (
    <div>
      <div className="table-wrapper">
        <div className="filter-wrapper">
          <Filter columns={flatColumns} />
        </div>

        <div {...getTableProps()} className="table" ref={tableRef}>
          <div className="thead" style={bodyProps.style}>
            {headerGroups.map(headerGroup => (
              <div
                {...headerGroup.getHeaderGroupProps({ style: { paddingRight: '15px' } })}
                className="tr"
              >
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps()} className="th" data-column-id={column.id}>
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

import React from 'react';
import './Info.css';

export default function Info({ selectedRowIds, selectedFlatRows }) {
  return (
    <div className="info">
      <h4>Selected rows:</h4>
      <div className="info-block">
        <pre>
          <code>
            {JSON.stringify(
              {
                'Selected Row Ids': selectedRowIds,
                'Selected Rows': selectedFlatRows.map(row => row.original)
              },
              null,
              2
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

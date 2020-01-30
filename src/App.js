import React, { useState, useEffect, useMemo } from 'react';
import Table from './components/Table';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(false);

  async function fetchData() {
    const res = await fetch('./data.json');
    res
      .json()
      .then(res => setData(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columnsData = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Phone',
            accessor: 'phone'
          },
          {
            Header: 'Email',
            accessor: 'email'
          },
          {
            Header: 'Postal code',
            accessor: 'postal_code'
          },
          {
            Header: 'Country',
            accessor: 'country'
          },
          {
            Header: 'City',
            accessor: 'city'
          }
        ]
      }
    ],
    []
  );
  const rowsData = useMemo(() => data, [data]);

  return (
    <div className="App">
      <Table columns={columnsData} data={rowsData} />
    </div>
  );
}

export default App;

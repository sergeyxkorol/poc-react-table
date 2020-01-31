import React, { useState, useEffect, useMemo } from 'react';
import Table from './components/Table';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(false);

  function fetchData() {
    fetch('./data.json')
      .then(res => res.json())
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
        accessor: 'name',
        sortType: 'basic'
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        disableSortBy: true
      },
      {
        Header: 'Email',
        accessor: 'email',
        disableSortBy: true
      },
      {
        Header: 'Postal code',
        accessor: 'postal_code',
        disableSortBy: true
      },
      {
        Header: 'Country',
        accessor: 'country'
      },
      {
        Header: 'City',
        accessor: 'city'
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

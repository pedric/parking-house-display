import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Monitor from "./components/Monitor";
import Spinner from "./components/common/Spinner";
import styled from "styled-components";

function App() {
  const [filteredData, setFilteredData] = useState({});
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetch(`https://adp.im/api/garage.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setFilteredData(jsonData);
      })
      .catch((error) => setErrors((error) => [...errors, error]))
      .finally(() => setLoading(false));
  }, [errors]);

  const reducer = (filterStatus, filterType) => {
    // console.log(filterStatus, filterType);
    if (filterStatus === true) {
      setFilters([...filters, filterType]);
    } else {
      const filtered = filters.filter((item) => item !== filterType);
      setFilters(filtered);
    }
  };

  return (
    <Main>
      <Filter handleChange={reducer} filters={filters} />
      <Monitor data={filteredData} filters={filters} />
      <Spinner loading={loading} />
      {errors && errors.length > 0
        ? errors.map((error) => <Err>{error}</Err>)
        : null}
    </Main>
  );
}

export default App;

const Main = styled.main`
  width: 90%;
  max-width: 640px;
  margin: 0 auto;
  font-family: sans-serif;
`;

const Err = styled.span`
  color: tomato;
`;

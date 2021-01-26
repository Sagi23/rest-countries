import React, { useEffect, useState } from "react";
import { regionCountries } from "../api/countries";
import styles from "../../styles/Home.module.css";
import CountryList from "../../components/CountryList";
import SearchContainer from "../../components/SearchContainer";

const Region = ({ data }) => {
  const [initialState, setInitialState] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setInitialState(data);
  }, [data]);

  return (
    <div className={styles.container}>
      <SearchContainer
        setSearch={setSearch}
        search={search}
        setSearchedCountries={setSearchedCountries}
        setInitialState={setInitialState}
        data={data}
      />
      <div className={styles.countryContainer}>
        {search === "" ? (
          <CountryList initialStates={initialState} />
        ) : (
          <CountryList initialStates={searchedCountries} />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const regionOfCountries = pageContext.query.rId;
  const { data } = await regionCountries.get(regionOfCountries);
  console.log(data);
  if (!data) {
    return {
      props: {
        data: "",
      },
    };
  }
  return {
    props: {
      data,
    },
  };
};

export default Region;

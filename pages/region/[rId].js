import React, { useEffect, useState } from "react";
import { regionCountries, countries } from "../api/countries";
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

export const getStaticProps = async (pageContext) => {
  const { rId } = pageContext.params;
  const res = await regionCountries.get(rId);
  return { props: { data: res.data } };
};

export const getStaticPaths = async () => {
  const { data } = await countries.get();
  const regionOfCountry = data.map((rName) => rName.region);
  const mySet = new Set(regionOfCountry);
  const myArray = Array.from(mySet);
  const paths = myArray.map((rId) => ({ params: { rId } }));
  return {
    paths,
    fallback: false,
  };
};

export default Region;

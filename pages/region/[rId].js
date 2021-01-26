import React, { useEffect, useState } from "react";
import { regionCountries } from "../api/countries";
import styles from "../../styles/Home.module.css";
import { BsSearch } from "react-icons/bs";
import CountryList from "../../components/CountryList";
import RegionFormSelect from "../../components/RegionFormSelect";

const Region = ({ data }) => {
  const [initialState, setInitialState] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setInitialState(data);
  }, [data]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSearchedCountries(
      data.filter((country) => country.name.toLowerCase().includes(search))
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.selector}>
          <BsSearch className={styles.hide} />
          <input
            type="text"
            className={styles.input}
            value={search}
            onChange={(e) => handleChange(e)}
            placeholder="Search for a country..."
          />
        </div>
        <RegionFormSelect setInitialState={setInitialState} />
      </div>
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

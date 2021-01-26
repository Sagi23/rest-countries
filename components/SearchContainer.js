import React from "react";
import { BsSearch } from "react-icons/bs";
import styles from "../styles/Home.module.css";
import RegionFormSelect from "./RegionFormSelect";

const SearchContainer = ({
  setSearch,
  setSearchedCountries,
  search,
  setInitialState,
  data,
}) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
    setSearchedCountries(
      data.filter((country) => country.name.toLowerCase().includes(search))
    );
  };

  return (
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
  );
};

export default SearchContainer;

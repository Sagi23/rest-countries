import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { regionCountries } from "../api/countries";
import styles from "../../styles/RegionFormSelect.module.css";

const RegionFormSelect = ({ setInitialState }) => {
  const [value, setValue] = useState("");

  console.log(value);

  const changeRegion = async (region) => {
    const { data } = await regionCountries.get(region);
    console.log(data);
    setInitialState(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "select") {
      return alert("please select a region");
    }
    changeRegion(value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <button className={styles.btn}>
        <BsSearch />
      </button>
      <select
        className={styles.selector}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="select">Select Region</option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </form>
  );
};

export default RegionFormSelect;

import React from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import { regionCountries } from "../pages/api/countries";
import styles from "../styles/RegionFormSelect.module.css";

const RegionFormSelect = ({ setInitialState }) => {
  const router = useRouter();
  const changeRegion = async (region) => {
    if (region === "select") {
      return router.push("/");
    }
    const { data } = await regionCountries.get(region);
    setInitialState(data);
  };

  return (
    <div className={styles.selector}>
      <BsSearch className={styles.hide} />
      <select
        className={styles.input}
        onChange={(e) => changeRegion(e.target.value)}
      >
        <option value="select">Select Region</option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </div>
  );
};

export default RegionFormSelect;

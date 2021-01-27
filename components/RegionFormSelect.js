import React from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import styles from "../styles/RegionFormSelect.module.css";

const RegionFormSelect = () => {
  const router = useRouter();
  const changeRegion = async (region) => {
    if (region === "select") {
      return router.push("/");
    }
    router.push(`/region/${region}`);
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

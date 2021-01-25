import React from "react";
import Country from "./Country";
import styles from "../styles/CountryList.module.css";

const CountryList = ({ initialStates }) => {
  const renderdList = initialStates.map((c, i) => <Country data={c} key={i} />);

  return <div className={styles.CountryList}>{renderdList}</div>;
};

export default CountryList;

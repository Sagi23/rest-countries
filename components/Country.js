import React from "react";
import CountUp from "react-countup";
import Link from "next/link";
import styles from "../styles/Country.module.css";

const Country = ({
  data: { name, flag, population, capital, region, alpha3Code },
}) => {
  return (
    <div className={styles.Country}>
      <Link href={`/country/${alpha3Code}`}>
        <img src={flag} />
      </Link>
      <div className={styles.details}>
        <Link href={`/country/${alpha3Code}`}>
          <h3>{name}</h3>
        </Link>
        <ul>
          <li>
            <span>Population: </span>
            <CountUp
              start={0}
              end={population}
              separator=","
              duration={2}
              className={styles.counter}
            />
          </li>
          <li>
            <span>Region:</span> {region}
          </li>
          <li>
            <span>Capital:</span> {capital}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Country;

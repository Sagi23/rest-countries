import React from "react";
import CountUp from "react-countup";
// import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Country.module.css";

const Country = ({
  data: { name, flag, population, capital, region, alpha3Code },
}) => {
  return (
    <div className={styles.Country}>
      <Link href={`/country/${alpha3Code}`}>
        {/* <Image src={flag} alt={name} width={320} height={170} /> */}
        <img src={flag} alt={name} />
      </Link>
      <div className={styles.details}>
        <Link href={`/country/${alpha3Code}`}>
          <p className={styles.title}>{name}</p>
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

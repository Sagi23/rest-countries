import React from "react";
import CountUp from "react-countup";
import { useRouter } from "next/router";
import { countryDet } from "../api/countries";
import styles from "../../styles/CountryDetail.module.css";

const CountryDetail = ({
  name,
  population,
  region,
  subRegion,
  flag,
  capital,
  nativeName,
  currencies,
  languages,
  borders,
}) => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.back()}>Go Back</button>
      <div className={styles.grid}>
        <div className={styles.flag}>
          <img src={flag} alt={name} />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <h1>{name}</h1>
          </div>
          <div className={styles.details}>
            <p>
              <span className={styles.subTitle}>Native Name:</span> {nativeName}
            </p>
            <p>
              <span className={styles.subTitle}>Population: </span>
              <CountUp
                start={0}
                end={population}
                separator=","
                duration={2}
                className={styles.counter}
              />
            </p>
            <p>
              <span className={styles.subTitle}>Region:</span> {region}
            </p>
            <p>
              <span className={styles.subTitle}>Sub Region:</span> {subRegion}
            </p>
            <p>
              <span className={styles.subTitle}>Capital:</span> {capital}
            </p>
            <p>
              <span className={styles.subTitle}>Currencies:</span>{" "}
              {currencies.map((c) => `${c.name} - ${c.symbol}`)}
            </p>
            <p>
              <span className={styles.subTitle}>Languages:</span>{" "}
              {languages.map((l) => l.name)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const nameOfCountry = pageContext.query.cId;
  console.log(nameOfCountry);
  if (!nameOfCountry) {
    return {
      notFound: true,
    };
  }

  const { data } = await countryDet.get(nameOfCountry);
  return {
    props: {
      name: data[0].name,
      population: data[0].population,
      region: data[0].region,
      subRegion: data[0].subregion,
      flag: data[0].flag,
      capital: data[0].capital,
      nativeName: data[0].nativeName,
      currencies: data[0].currencies,
      languages: data[0].languages,
      borders: data[0].borders,
    },
  };
};

export default CountryDetail;

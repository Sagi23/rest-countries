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
              <span className={styles.subTitle}>Currencies:</span>
              {currencies.map((c) => ` ${c.name} - ${c.symbol} `)}
            </p>
            <p>
              <span className={styles.subTitle}>Languages:</span>
              {languages.map((l) => ` ${l.name} `)}
            </p>
            {borders.length !== 0 && (
              <div>
                <span className={styles.subTitle}>Border Countries: </span>
                {borders.map((b) => (
                  <span
                    key={b}
                    className={styles.borderLink}
                    onClick={() => router.push(`/country/${b}`)}
                  >
                    {` ${b} `}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const nameOfCountry = pageContext.query.cId;
  if (!nameOfCountry) {
    return {
      notFound: true,
    };
  }

  const { data } = await countryDet.get(nameOfCountry);
  return {
    props: {
      name: data.name,
      population: data.population,
      region: data.region,
      subRegion: data.subregion,
      flag: data.flag,
      capital: data.capital,
      nativeName: data.nativeName,
      currencies: data.currencies,
      languages: data.languages,
      borders: data.borders,
    },
  };
};

export default CountryDetail;

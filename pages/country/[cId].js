import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
// import Image from "next/image";
import { countryDet, covid } from "../api/countries";
import styles from "../../styles/CountryDetail.module.css";
import BarChart from "../../components/BarChart";

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
  alpha3Code,
}) => {
  const [confirmed, setConfirmed] = useState(null);
  const [recovered, setRecovered] = useState(null);
  const [deaths, setDeaths] = useState(null);

  useEffect(() => {
    const getCovidData = async (codeOfCountry) => {
      try {
        const { data } = await covid.get(`countries/${codeOfCountry}`);
        setConfirmed(data.confirmed.value);
        setRecovered(data.recovered.value);
        setDeaths(data.deaths.value);
      } catch (error) {}
    };
    getCovidData(alpha3Code);
  }, [alpha3Code]);

  const router = useRouter();

  return (
    <div className={styles.CountryDetail}>
      <div className={styles.goBackBtn}>
        <button onClick={() => router.back()}>
          <BiArrowBack /> Go Back
        </button>
      </div>
      <div className={styles.grid}>
        <div className={styles.flag}>
          {/* <Image src={flag} alt={name} width={600} height={400} /> */}
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
                <div className={styles.borderContainer}>
                  {borders.map((b) => (
                    <span
                      key={b}
                      className={styles.borderLink}
                      onClick={() => router.push(`/country/${b}`)}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.barChart}>
        {confirmed ? (
          <BarChart
            confirmed={confirmed}
            recovered={recovered}
            deaths={deaths}
            text={`Current covid-19 stats in ${name}`}
          />
        ) : (
          <h4>
            There is no information about covid-19 cases in {name} in our
            database.
          </h4>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const nameOfCountry = pageContext.query.cId;
  const { data } = await countryDet.get(nameOfCountry);
  if (!data) {
    return {
      props: {
        name: "",
        population: "",
        region: "",
        subRegion: "",
        flag: "",
        capital: "",
        nativeName: "",
        currencies: [],
        languages: [],
        borders: [],
        alpha3Code: "",
      },
    };
  }
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
      alpha3Code: data.alpha3Code,
    },
  };
};

export default CountryDetail;

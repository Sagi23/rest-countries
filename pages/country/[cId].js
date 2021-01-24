import React from "react";
import CountUp from "react-countup";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { countryDet, covid } from "../api/countries";
import { Bar } from "react-chartjs-2";
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
  confirmed,
  recovered,
  deaths,
}) => {
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
                    {`${b}`}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.barChart}>
        {confirmed ? (
          <Bar
            data={{
              labels: ["Infected", "Recovered", "Deaths"],
              datasets: [
                {
                  label: "People",
                  backgroundColor: [
                    "rgba(0, 0, 255, 0.5)",
                    "rgba(0, 128, 0, 0.5)",
                    "rgba(255, 0, 0, 0.5)",
                  ],
                  data: [confirmed, recovered, deaths],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: {
                display: true,
                text: `Current covid-19 stats in ${name}`,
              },
            }}
          />
        ) : (
          ""
        )}
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
  const {
    data: { confirmed, recovered, deaths },
  } = await covid.get(`countries/${nameOfCountry}`);
  console.log(confirmed);
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
      confirmed: confirmed.value,
      recovered: recovered.value,
      deaths: deaths.value,
    },
  };
};

export default CountryDetail;

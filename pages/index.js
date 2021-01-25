import Head from "next/head";
import styles from "../styles/Home.module.css";
import { countries, covid } from "./api/countries";
import { useEffect, useState } from "react";
import CountryList from "../components/CountryList";
import RegionFormSelect from "../components/RegionFormSelect";
import BarChart from "../components/BarChart";

export default function Home({ confirmed, recovered, deaths }) {
  const [initialState, setInitialState] = useState([]);

  let rand = 0;

  const randNum = () => {
    return (rand = Math.floor(Math.random() * 250) + 1);
  };

  const randCountries = (data) => {
    const randomCountry = [];
    while (randomCountry.length < 8) {
      const r = randNum();
      if (randomCountry.includes(data[r]) === false) {
        randomCountry.push(data[r]);
      }
    }
    return setInitialState(randomCountry);
  };

  useEffect(() => {
    const getCountries = async () => {
      const { data } = await countries.get();
      randCountries(data);
    };

    getCountries();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Where In The World</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.searchContainer}>
        <RegionFormSelect setInitialState={setInitialState} />
      </div>
      <div className={styles.countryContainer}>
        <CountryList initialStates={initialState} />
      </div>
      <div className={styles.barChart}>
        <BarChart
          confirmed={confirmed}
          recovered={recovered}
          deaths={deaths}
          text={`Current covid-19 stats in the world`}
        />
      </div>
    </div>
  );
}

export const getStaticProps = async (pageContext) => {
  const {
    data: { confirmed, recovered, deaths },
  } = await covid.get();
  return {
    props: {
      confirmed: confirmed.value,
      recovered: recovered.value,
      deaths: deaths.value,
    },
  };
};

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { countries } from "./api/countries";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import RegionFormSelect from "./components/RegionFormSelect";

export default function Home() {
  const [initialState, setInitialState] = useState([]);

  let rand = 0;

  const randNum = () => {
    return (rand = Math.floor(Math.random() * 250) + 1);
  };

  const randCountries = (data) => {
    const randomCountry = [];
    while (randomCountry.length < 8) {
      const r = randNum();
      randomCountry.push(data[r]);
    }
    return setInitialState(randomCountry);
  };

  useEffect(() => {
    const get = async () => {
      const { data } = await countries.get();
      randCountries(data);
    };

    get();
  }, [setInitialState]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.searchContainer}>
        <RegionFormSelect setInitialState={setInitialState} />
      </div>
      <div className={styles.countryContainer}>
        <CountryList initialStates={initialState} />
      </div>
    </div>
  );
}

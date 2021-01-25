import Head from "next/head";
import styles from "../styles/Home.module.css";
import { countries, covid } from "./api/countries";
import { useEffect, useState } from "react";
import CountryList from "../components/CountryList";
import RegionFormSelect from "../components/RegionFormSelect";
import { Bar } from "react-chartjs-2";

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
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.searchContainer}>
        <RegionFormSelect setInitialState={setInitialState} />
      </div>
      <div className={styles.countryContainer}>
        <CountryList initialStates={initialState} />
      </div>
      <div className={styles.barChart}>
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
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  return tooltipItem.yLabel
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
                },
              },
            },
            legend: { display: false },
            title: {
              display: true,
              text: `Current covid-19 stats in the world`,
            },
          }}
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

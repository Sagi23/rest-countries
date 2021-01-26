import styles from "../styles/Home.module.css";
import { countries, covid } from "./api/countries";
import { useEffect, useState } from "react";
import CountryList from "../components/CountryList";
import Loader from "react-loaders";
import BarChart from "../components/BarChart";
import SearchContainer from "../components/SearchContainer";

export default function Home({ confirmed, recovered, deaths }) {
  const [initialState, setInitialState] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let rand = 0;
  let randomCountry = [];

  const randNum = () => {
    return (rand = Math.floor(Math.random() * 250) + 1);
  };

  const randCountries = (data) => {
    while (randomCountry.length < 4) {
      const r = randNum();
      if (randomCountry.includes(data[r]) === false) {
        randomCountry.push(data[r]);
      }
    }
    return setInitialState(randomCountry);
  };

  useEffect(() => {
    const getCountries = async () => {
      setIsLoading(true);
      const { data } = await countries.get();
      randCountries(data);
      setAllCountries(data);
      setIsLoading(false);
    };

    getCountries();
  }, []);

  if (isLoading) {
    return (
      <div style={{ height: "100vh", placeSelf: "center center" }}>
        <Loader type="line-scale" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <SearchContainer
        setSearch={setSearch}
        search={search}
        setSearchedCountries={setSearchedCountries}
        setInitialState={setInitialState}
        data={allCountries}
      />
      <div className={styles.countryContainer}>
        {search === "" ? (
          <CountryList initialStates={initialState} />
        ) : (
          <CountryList initialStates={searchedCountries} />
        )}
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

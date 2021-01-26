import styles from "../styles/Home.module.css";
import { countries, covid } from "./api/countries";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import CountryList from "../components/CountryList";
import RegionFormSelect from "../components/RegionFormSelect";
import BarChart from "../components/BarChart";

export default function Home({ confirmed, recovered, deaths }) {
  const [initialState, setInitialState] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [search, setSearch] = useState("");

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
      const { data } = await countries.get();
      randCountries(data);
      setAllCountries(data);
    };

    getCountries();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSearchedCountries(
      allCountries.filter((country) =>
        country.name.toLowerCase().includes(search)
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.selector}>
          <BsSearch className={styles.hide} />
          <input
            type="text"
            className={styles.input}
            value={search}
            onChange={(e) => handleChange(e)}
            placeholder="Search for a country..."
          />
        </div>
        <RegionFormSelect setInitialState={setInitialState} />
      </div>
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

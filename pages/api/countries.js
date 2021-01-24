import axios from "axios";

export const countries = axios.create({
  baseURL: `https://restcountries.eu/rest/v2/all`,
});
export const countryDet = axios.create({
  baseURL: `https://restcountries.eu/rest/v2/alpha/`,
});
export const covid = axios.create({
  baseURL: `https://covid19.mathdro.id/api/`,
});
export const regionCountries = axios.create({
  baseURL: `https://restcountries.eu/rest/v2/region/`,
});

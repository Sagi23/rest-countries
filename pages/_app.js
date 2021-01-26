import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Head>
        <title>Where In The World</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="Description"
          content="check your favorite country covid-19 stats daily"
        />
        <html lang="en" />
      </Head> */}
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

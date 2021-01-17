import Head from "next/head";
import { useState } from "react";
import MainSearch from "../components/MainSearch/MainSearch";
import SideDisplay from "../components/SideDisplay/SideDisplay";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [searchHistory, setSearchHistory] = useState([]);
  const [currentCard, setCurrentCard] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Command Centre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <h1 className={[styles.title, styles.center].join(" ")}>
          Command Centre
        </h1>
        <MainSearch
          setSearchHistory={setSearchHistory}
          searchHistory={searchHistory}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
      </div>
      <div className={styles.sideContainer}>
        <SideDisplay
          setSearchHistory={setSearchHistory}
          searchHistory={searchHistory}
          setCurrentCard={setCurrentCard}
          currentCard={currentCard}
        />
      </div>
      <footer className={styles.footer}></footer>
    </div>
  );
}

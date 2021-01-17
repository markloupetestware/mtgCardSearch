import { useState } from "react";

import HistoryTab from "../HistoryTab/HistoryTab.tsx";
import CommanderTab from "../CommanderTab/CommanderTab.tsx";

import styles from "./SideDisplay.module.css";

const SideDisplay = ({
  searchHistory,
  setCurrentCard,
  setSearchHistory,
  currentCard,
}) => {
  const [currentTab, setCurrentTab] = useState({
    HistoryTab: true,
    CommanderTab: false,
  });

  return (
    <div className={styles.tabsMainContainer}>
      <div className={styles.tabTitleContainer}>
        <div className={[styles.historyTabTitle, styles.center,styles.padding].join(" ")} onClick={()=>setCurrentTab({
    HistoryTab: true,
    CommanderTab: false,
  })}>
          HISTORY
        </div>
        <div className={[styles.commanderTabTitle, styles.center, styles.padding].join(" ")} onClick={()=>{
          setCurrentTab({
            HistoryTab: false,
            CommanderTab: true,
          })
        }}>
          COMMANDER
        </div>
      </div>
      <div className={styles.tabsContainer}>
        {currentTab.HistoryTab ? (
          <HistoryTab
            searchHistory={searchHistory}
            setCurrentCard={setCurrentCard}
            setSearchHistory={setSearchHistory}
            currentCard={currentCard}
          />
        ) : null}
        {currentTab.CommanderTab ? <CommanderTab /> : null}
      </div>
    </div>
  );
};

export default SideDisplay;

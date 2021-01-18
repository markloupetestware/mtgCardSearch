import { useState } from "react";

import HistoryTab from "../HistoryTab/HistoryTab";
import CommanderTab from "../CommanderTab/CommanderTab";

import styles from "./SideDisplay.module.css";

interface HistoryTabProps {
  searchHistory: any;
  setCurrentCard: any;
  setSearchHistory: any;
  currentCard: any;
}

const SideDisplay = ({
  searchHistory,
  setCurrentCard,
  setSearchHistory,
  currentCard,
}: HistoryTabProps) => {
  const [currentTab, setCurrentTab] = useState({
    HistoryTab: true,
    CommanderTab: false,
  });

  return (
    <div className={styles.tabsMainContainer}>
      <div className={styles.tabTitleContainer}>
        <div
          className={[
            styles.historyTabTitle,
            styles.center,
            styles.padding,
          ].join(" ")}
          onClick={() =>
            setCurrentTab({
              HistoryTab: true,
              CommanderTab: false,
            })
          }
        >
          HISTORY
        </div>
        <div
          className={[
            styles.commanderTabTitle,
            styles.center,
            styles.padding,
          ].join(" ")}
          onClick={() => {
            setCurrentTab({
              HistoryTab: false,
              CommanderTab: true,
            });
          }}
        >
          COMMANDER
        </div>
      </div>
      <div className={styles.tabsContainer}>
        <div className={styles.historyTab} style={{ display: currentTab.CommanderTab ? "none" : "block" }}>
          <HistoryTab
            searchHistory={searchHistory}
            setCurrentCard={setCurrentCard}
            setSearchHistory={setSearchHistory}
            currentCard={currentCard}
          />
        </div>

        <div className={styles.commanderTab} style={{ display: currentTab.HistoryTab ? "none" : "block" }}>
          <CommanderTab />
        </div>
      </div>
    </div>
  );
};

export default SideDisplay;

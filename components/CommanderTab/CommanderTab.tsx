import { useState } from "react";
import PlayerContainer from "../PlayerContainer/PlayerContainer";

import styles from "./commanderTab.module.css";

const CommanderTab = () => {
  const playerContainers = Array.apply(null, Array(6)).map(function () {});

  return (
    <div className={styles.commanderContainer}>
   
        {playerContainers.map((item, i) => {
          return (
            <div>
              <PlayerContainer index={i} />
            </div>
          );
        })}

    </div>
  );
};

export default CommanderTab;

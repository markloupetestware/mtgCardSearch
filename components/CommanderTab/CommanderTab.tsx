import { useState, useEffect } from "react";
import PlayerContainer from "../PlayerContainer/PlayerContainer";

import styles from "./commanderTab.module.css";

const CommanderTab = () => {
  const [playerData, setPlayerData] = useState([
    {
      name: "",
      lifeTotal: 40,
      commander: "",
    },
  ]);
  const [updateStorage, setUpdateStorage] = useState(true);

  useEffect(() => {
    console.log("initial render");
    //@ts-ignore
    const items = JSON.parse(localStorage.getItem("playerData"));
    if (items) {
      setPlayerData(items);
    }
  }, []);

  useEffect(() => {
    console.log("trigger");

    localStorage.setItem("playerData", JSON.stringify(playerData));
  }, [playerData, updateStorage]);

  function handleClick() {
    if (playerData.length < 8) {
      setPlayerData([
        ...playerData,
        {
          name: "",
          lifeTotal: 40,
          commander: "",
        },
      ]);
    }
  }

  return (
    <>
      <button onClick={handleClick}>Add Player</button>
      <div className={styles.commanderContainer}>
        {playerData.map((item, i) => {
          return (
            <div>
              <PlayerContainer
                updateStorage={updateStorage}
                setUpdateStorage={setUpdateStorage}
                index={i}
                item={item}
                playerData={playerData}
                setPlayerData={setPlayerData}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommanderTab;

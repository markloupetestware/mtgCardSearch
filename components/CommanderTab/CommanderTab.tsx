import { useState, useEffect } from "react";
import PlayerContainer from "../PlayerContainer/PlayerContainer";

import styles from "./commanderTab.module.css";

const CommanderTab = () => {
  const [playerData, setPlayerData] = useState<any>([]);
  const [updateStorage, setUpdateStorage] = useState(true);

  useEffect(() => {
    //@ts-ignore
    const items = JSON.parse(localStorage.getItem("playerData"));
    if (items) {
      setPlayerData(items);
    } else
      setPlayerData([
        {
          name: "",
          lifeTotal: 40,
          commander: "",
        },
      ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("playerData", JSON.stringify(playerData));
  }, [playerData, updateStorage]);

  function handleNewPlayer() {
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

  function handleGameReset() {
    setPlayerData([
      {
        name: "",
        lifeTotal: 40,
        commander: "",
      },
    ]);
  }
  function handleLifeReset() {
    playerData.map((item: any, index: number) => {
      item.lifeTotal = 40;
      let playerObject = playerData;
      playerObject[index].lifeTotal = 40;
      setPlayerData(playerObject);
      setUpdateStorage(!updateStorage);
    });
  }

  return (
    <>
      <button className={styles.button} onClick={handleNewPlayer}>Add Player</button>
      <button className={styles.button} onClick={handleGameReset}>New Game</button>
      <button className={styles.button} onClick={handleLifeReset}>Reset Current Game</button>
      <div className={styles.commanderContainer}>
        {playerData.map((item: any, i: number) => {
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

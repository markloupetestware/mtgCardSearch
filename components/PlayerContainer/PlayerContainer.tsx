import { useState } from "react";

import styles from "./playerContainer.module.css";

interface PlayerContainerProps {
  index: number;
}

const PlayerContainer = ({ index }: PlayerContainerProps) => {
  const [playerInfo, setPlayerInfo] = useState({
    lifeTotal: 40,
    playerName: "",
  });
  const [playerNameInput, setPlayerNameInput] = useState("");

  function handleChange(e: any) {
    setPlayerNameInput(e.target.value);
  }

  function handleKeyDown(e: any) {
    if (e.key == "Enter") {
      setPlayerInfo({ ...playerInfo, playerName: playerNameInput });
    }
  }

  return (
    <div className={styles.playerContainers}>
      
      {playerInfo.playerName ? <div className={styles.playerName} onClick={()=>{setPlayerInfo({ ...playerInfo, playerName: "" })}}>{playerInfo.playerName}</div> :  
      <>
      <input
      placeholder={"set player name"}
        onKeyDown={handleKeyDown}
        value={playerNameInput}
        onChange={handleChange}
        className={styles.playerName}
      />
      <button
        onClick={() =>
          setPlayerInfo({ ...playerInfo, playerName: playerNameInput })
        }
      >
        set
      </button>
      </>
      }
      <div className={styles.lifeTotalsContainer}>
        <button
          onClick={() =>
            setPlayerInfo({
              ...playerInfo,
              lifeTotal: playerInfo.lifeTotal - 1,
            })
          }
        >
          -
        </button>
        {`   ${playerInfo.lifeTotal}   `}
        <button
          onClick={() =>
            setPlayerInfo({
              ...playerInfo,
              lifeTotal: playerInfo.lifeTotal + 1,
            })
          }
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PlayerContainer;

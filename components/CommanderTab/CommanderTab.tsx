import { useState } from "react";
import PlayerContainer from "../PlayerContainer/PlayerContainer";

import styles from "./commanderTab.module.css";

const CommanderTab = ({ currentCard }: any) => {
  // const playerContainers = Array.apply(null, Array(6)).map(function () {});
  const [playerData, setPlayerData] = useState([ {
    name: "",
    lifeTotal: 40,
    commander: "",
  }])

function handleClick(){
if(playerData.length < 8){
  setPlayerData([...playerData, {
    name: "",
    lifeTotal: 40,
    commander: "",
  }])
}
}

  return (
    <>
      <button onClick={handleClick}>Add Player</button>
    <div className={styles.commanderContainer}>
      {playerData.map((item, i) => {
        return (
          <div>
            <PlayerContainer index={i} item={item} playerData={playerData} setPlayerData={setPlayerData}/>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default CommanderTab;

import {useState} from "react"
import PlayerContainer from "../PlayerContainer/PlayerContainer"

import styles from "./commanderTab.module.css";


const CommanderTab = () => {
  const [playerCount, setPlayerCount] = useState(6)
  const playerContainers = Array.apply(null, Array(6)).map(function () {})

  const playerButtonData = [
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    },
    {
      value: 6,
    },
  ];
  function handleClick(playerCount: number){
    setPlayerCount(playerCount)
  }
console.log("render");

  return (
    
    <div className={styles.commanderContainer}>
      <div className={styles.commanderPlayerCountContainer}>
        <h1>How Many Players</h1>
        
        {playerCount === 0 ?
        playerButtonData.map((item, i) => {
          return <button onClick={()=>handleClick(item.value)} value={item.value} key={i}>{item.value}</button>;
        }): 
        playerContainers.map((item, i)=>{
          return <PlayerContainer index={i}/>
        })
        
        }
      </div>
    </div>
  );
};

export default CommanderTab;

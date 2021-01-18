import { useEffect, useState } from "react";

import styles from "./playerContainer.module.css";

const PlayerContainer = ({ currentCard }: any) => {
  const [playerInfo, setPlayerInfo] = useState({
    lifeTotal: 40,
    playerName: "",
  });
  const [playerNameInput, setPlayerNameInput] = useState("");
  const [commanderCard, setCommanderCard] = useState(false);
  const [actual, setActual] = useState("");

  function handleChange(e: any) {
    setPlayerNameInput(e.target.value);
  }

  function handleKeyDown(e: any) {
    if (e.key == "Enter") {
      setPlayerInfo({ ...playerInfo, playerName: playerNameInput });
    }
  }

  function handleSetCommander() {
    if (currentCard) {
      setCommanderCard(!commanderCard);
    }
  }

  useEffect(() => {
    if (currentCard) {
      setActual(currentCard?.image_uris?.small);
    }
  }, [commanderCard]);

  return (
    <div className={styles.playerContainer}>
      <div className={styles.infoContainer}>
        {playerInfo.playerName ? (
          <div
            className={styles.playerName}
            onClick={() => {
              setPlayerInfo({ ...playerInfo, playerName: "" });
            }}
          >
            {playerInfo.playerName}
          </div>
        ) : (
          <>
            <input
              placeholder={"set player name"}
              onKeyDown={handleKeyDown}
              value={playerNameInput}
              onChange={handleChange}
              className={styles.playerNameInput}
            />
            <button
              onClick={() =>
                setPlayerInfo({ ...playerInfo, playerName: playerNameInput })
              }
            >
              set
            </button>
          </>
        )}
        <div className={styles.lifeTotalsContainer}>
          <button
            className={styles.lifeButton}
            onClick={() =>
              setPlayerInfo({
                ...playerInfo,
                lifeTotal: playerInfo.lifeTotal + 1,
              })
            }
          >
            +
          </button>
          <div className={styles.playerLifeNumber}>
            {`   ${playerInfo.lifeTotal}   `}
          </div>
          <button
            className={styles.lifeButton}
            onClick={() =>
              setPlayerInfo({
                ...playerInfo,
                lifeTotal: playerInfo.lifeTotal - 1,
              })
            }
          >
            -
          </button>
        </div>
      </div>
      <div className={styles.commanderCardContainer}>
        <div className={styles.commanderCardImageContainer}>
          {commanderCard ? (
            <img className={styles.setCommanderCard} src={actual} />
          ) : (
            <img className={styles.cardBack} src="cardBack.png" />
          )}
        </div>
        <button
          className={styles.commanderCardButton}
          onClick={handleSetCommander}
        >
          {commanderCard ? "Reset Commander" : "Set Commander"}
        </button>
      </div>
    </div>
  );
};

export default PlayerContainer;

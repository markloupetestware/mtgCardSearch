import { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import getCard from "../../utils/getCard";
import useDebounce from "../../utils/useDebounce";

import styles from "./playerContainer.module.css";

const SearchTextField = withStyles({
  root: {
    backgroundColor: "white",
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

const PlayerContainer = ({ index, playerData, setPlayerData }: any) => {

  const [lifeTotalDisplay, setLifeTotalDisplay] = useState(playerData[index].lifeTotal);
  const [value, setValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [nameDisplay, setNameDisplay] = useState("");
  

  const [suggestions, setSuggestions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  
  function handleNameChange(e: any) {
  setNameValue(e.target.value)
  }

  function handleKeyDown(e:any){
    if(e.key == "Enter"){
      let playerObject = playerData
      playerObject[index].name = e.target.value
      setPlayerData(playerObject)
      setNameDisplay(e.target.value)
    }
  }

  const debouncedSearchTerm = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // setSearchingSuggestions(true);
      if (value.length < 2) {
        setSuggestions([]);
      } else if (value.length > 2) {
        getCard(debouncedSearchTerm)
          .then((data: any) => {
            // setSearchingSuggestions(false);
            const results = data.payload.data.map((item: any) => {
              return item.name;
            });
            console.log(results, "results");
            setSuggestions(results);
          })
          .catch((error: any) => setSuggestions(["No cards found"]));
      }
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  function handleChange(e: any) {
    setValue(e.target.value);
  }

  function handleEnterPress(e: any) {
    if (e.key == "Enter") {
      setSuggestions([]);
      setLoading(true);
      getCard(value)
        .then((data: any) => {
          let playerObject = playerData
          playerObject[index].commander = data.payload.data[0]
          setPlayerData(playerObject)
        })
        .then(() => {
          setValue("");
          setLoading(false);
        })
        .catch((error: any) => {
          console.log(error);
          setLoading(false);
        });
    }
  }

  function handleClick(e: any) {
    setSuggestions([]);
    setLoading(true);
    getCard(e.target.value)
      .then((data: any) => {
        let playerObject = playerData
        playerObject[index].commander = data.payload.data[0]
        setPlayerData(playerObject)
      })
      .then(() => {
        setValue("");
        setLoading(false);
      });
  }

  return (
    <div className={styles.playerContainer}>
      <div className={styles.infoContainer}>
        {nameDisplay ? (
          <div
            className={styles.playerName}
            onClick={() => {
              let playerObject = playerData
              playerObject[index].name = ""
              setPlayerData(playerObject)
              setNameDisplay("")
            }}
          >
            {nameDisplay}
          </div>
        ) : (
          <>
            <input
              placeholder={"set player name"}
              onKeyDown={handleKeyDown}
              value={nameValue}
              onChange={handleNameChange}
              className={styles.playerNameInput}
            />
            <button
              onClick={() =>{
                let playerObject = playerData
                playerObject[index].name = nameValue
                setPlayerData(playerObject)
                setNameDisplay(nameValue)
              }
              }
            >
              set
            </button>
          </>
        )}
        <div className={styles.lifeTotalsContainer}>
          <button
            className={styles.lifeButton}
            onClick={() =>{
              let playerObject = playerData
              playerObject[index].lifeTotal++
              setPlayerData(playerObject)
              setLifeTotalDisplay(playerData[index].lifeTotal)
            }
            }
          >
            +
          </button>
          <div className={styles.playerLifeNumber}>
            {`   ${lifeTotalDisplay}   `}
          </div>
          <button
            className={styles.lifeButton}
            onClick={() =>{
              let playerObject = playerData
              playerObject[index].lifeTotal--
              setPlayerData(playerObject)
              setLifeTotalDisplay(playerData[index].lifeTotal)
            }
            }
          >
            -
          </button>
        </div>
      </div>
      <div className={styles.commanderCardContainer}>
        <div className={styles.commanderCardImageContainer}>
          {playerData[index].commander ? (
            <img className={styles.setCommanderCard} src={playerData[index].commander.image_uris.small} />
          ) : (
            <img className={styles.cardBack} src="cardBack.png" />
          )}
        </div>
        <div
        className={[
          styles.searchInputContainer,
          styles.padding,
          styles.center,
        ].join(" ")}
      >
        <form
          className={styles.searchInputForm}
          autoComplete="off"
          onSubmit={(event) => event.preventDefault()}
        >
          <SearchTextField
            onKeyDown={handleEnterPress}
            fullWidth
            value={value}
            onChange={handleChange}
            id="filled-basic"
            label="Search"
            variant="filled"
          />
        </form>
        <div className={[styles.suggestionsContainer, styles.center].join(" ")}>
        {suggestions.map((item: any, i: number) => {
          return (
            <button
              value={item}
              key={i}
              className={styles.suggestionItem}
              onClick={handleClick}
            >
              {item}
            </button>
          );
        })}
      </div>
      </div>
      </div>
    </div>
  );
};

export default PlayerContainer;

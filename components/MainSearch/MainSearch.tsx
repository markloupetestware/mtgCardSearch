import { useState, useEffect } from "react";

import React from "react";

import TextField from "@material-ui/core/TextField";
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

import getCard from "../../utils/getCard";
import useDebounce from "../../utils/useDebounce";

import styles from "./mainSearch.module.css";

interface HistoryTabProps {
  searchHistory: any,
  setCurrentCard: any,
  setSearchHistory: any,
  currentCard: any,
}

const SearchTextField = withStyles({
  root: {
    backgroundColor: "white",
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const MainSearch = ({
  setSearchHistory,
  searchHistory,
  currentCard,
  setCurrentCard,
}:HistoryTabProps) => {
  const [value, setValue] = useState("");
  const [searchingSuggestions, setSearchingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchingSuggestions(true);
      if (value.length < 2) {
        setSuggestions([]);
      } else if (value.length > 2) {
        getCard(debouncedSearchTerm)
          .then((data: any) => {
            setSearchingSuggestions(false);
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
          setCurrentCard(data.payload.data[0]);
        })
        .then(() => {
          const results = searchHistory.map((item: any) => {
            return item.name;
          });
          if (!results.includes(currentCard.name)) {
            setSearchHistory([currentCard, ...searchHistory]);
          }
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

  function handleClick(e:any) {
    setSuggestions([]);
    setLoading(true);
    getCard(e.target.value)
      .then((data:any) => {
        setCurrentCard(data.payload.data[0]);
      })
      .then(() => {
        const results = searchHistory.map((item:any) => {
          return item.name;
        });
        if (!results.includes(currentCard.name)) {
          setSearchHistory([...searchHistory, currentCard].reverse());
        }
      })
      .then(() => {
        setValue("");
        setLoading(false);
      });
  }
  return (
    <div className={[styles.mainContainer].join(" ")}>
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
      </div>
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
      {currentCard ? (
        <div className={[styles.cardContainer, styles.center].join(" ")}>
          {loading ? (
            <>
              <img height="680px" src="cardBack.png" />
              <div className={styles.loadingContainer}>
                <>
                  <h1 className={styles.loadingTitle}>LOADING CARD...</h1>
                  <div className={styles.ldsRing}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </>
              </div>
            </>
          ) : (
            <img className={styles.currentCardImage} src={currentCard.image_uris.normal} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MainSearch;

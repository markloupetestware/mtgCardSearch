import { useState, useEffect } from "react";

import React from "react";

import TextField from "@material-ui/core/TextField";

import getCard from "../../utils/getCard.tsx";
import useDebounce from "../../utils/useDebounce.tsx";

import styles from "./mainSearch.module.css";

const MainSearch = ({
  setSearchHistory,
  searchHistory,
  currentCard,
  setCurrentCard,
}) => {
  const [value, setValue] = useState("");
  const [searchingSuggestions, setSearchingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchingSuggestions(true);
      if (value.length < 2) {
        setSuggestions([]);
      } else if (value.length > 2) {
        getCard(debouncedSearchTerm)
          .then((data) => {
            setSearchingSuggestions(false);
            const results = data.payload.data.map((item, i) => {
              return item.name;
            });
            console.log(results, "results");
            setSuggestions(results);
          })
          .catch((error) => setSuggestions(["No cards found"]));
      }
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleEnterPress(e) {
    if (e.key == "Enter") {
      setSuggestions([]);
      setLoading(true);
      getCard(value)
        .then((data) => {
          setCurrentCard(data.payload.data[0]);
        })
        .then(() => {
          const results = searchHistory.map((item, i) => {
            return item.name;
          });
          if (!results.includes(currentCard.name)) {
              setSearchHistory([currentCard, ...searchHistory])
          }
        })
        .then(() => {
          setValue("");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }

  function handleClick(e) {
    setSuggestions([]);
    setLoading(true);
    getCard(e.target.value)
      .then((data) => {
        setCurrentCard(data.payload.data[0]);
      })
      .then(() => {
        const results = searchHistory.map((item, i) => {
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
          <TextField
            onKeyDown={handleEnterPress}
            fullWidth
            value={value}
            onChange={handleChange}
            id="filled-basic"
            label="Search"
            variant="outlined"
          />
        </form>
      </div>
      <div className={[styles.suggestionsContainer, styles.center].join(" ")}>
        {suggestions.map((item, i) => {
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
            <img src={currentCard.image_uris.normal} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MainSearch;

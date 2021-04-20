//hooks
import { useEffect } from 'react'
//styles
import styles from "./historyTab.module.css";

interface HistoryTabProps {
  searchHistory: any;
  setCurrentCard: any;
  setSearchHistory: any;
  currentCard: any;
}

const HistoryTab = ({
  searchHistory,
  setCurrentCard,
  setSearchHistory,
  currentCard,
}: HistoryTabProps) => {

  //retrieve search history if exists from local storage
useEffect(()=>{
  //@ts-ignore
  const savedHistory = JSON.parse(localStorage.getItem("searchHistory"))
  if (savedHistory) {
    setSearchHistory(savedHistory)
  }
},[])

// Whenever search history is changed save it to local storage
useEffect(()=>{
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
},[searchHistory])

//function to repopulate the main card slot with one from the history when clicked
  function handleClick(i: number) {
    const results = searchHistory.map((item: any) => {
      return item.name;
    });
    //populate the history array with the current card if it doesnt exist in the history array
    if (!results.includes(currentCard.name)) {
      setSearchHistory([currentCard, ...searchHistory]);
    }
    //set the current card as the card clicked in the history array
    setCurrentCard(searchHistory[i]);
  }
//function to clear search history
  function clearHistory(){
    setSearchHistory([])
  }

  return (
    <>
      <div className={styles.historySettings}><button onClick={clearHistory} className={styles.clearHistoryButton}>Clear History</button></div>
        <div className={styles.historyContainer}>
          {searchHistory.length > 0
            ? searchHistory.map((item: any, i: number) => {
              //check the layout of the card from the scryfall API and render the relevant component
                return item.layout === "modal_dfc" || item.layout === "transform" ? (
                  <>
                    <img
                      className={styles.smallImage}
                      key={i}
                      src={[
                        item.card_faces[0].image_uris.small,
                        styles.padding,
                      ].join(" ")}
                      onClick={() => handleClick(i)}
                    />

                    <div className={[styles.doubleSideHover, styles.padding].join(" ")}>
                      <img
                        className={styles.firstHoverImage}
                        src={item.card_faces[0].image_uris.normal}
                      />
                      <img
                        className={styles.secondHoverImage}
                        src={item.card_faces[1].image_uris.normal}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {item.image_uris?.small ? (
                      <>
                        <img
                          className={styles.smallImage}
                          key={i}
                          src={[item.image_uris.small, styles.padding].join(" ")}
                          onClick={() => handleClick(i)}
                        />
                        <img
                          className={[styles.hoverImage, styles.padding].join(" ")}
                          key={i + "big"}
                          src={item.image_uris.normal}
                        />
                      </>
                    ) : null}
                  </>
                );
              })
            : null}
       </div>
    </>
  );
};

export default HistoryTab;

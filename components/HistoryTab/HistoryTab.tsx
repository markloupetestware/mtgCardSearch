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

  function handleClick(i: number) {
    const results = searchHistory.map((item: any) => {
      return item.name;
    });
    if (!results.includes(currentCard.name)) {
      setSearchHistory([currentCard, ...searchHistory]);
    }
    setCurrentCard(searchHistory[i]);
  }

  function clearHistory(){
    setSearchHistory([])
  }
  return (
    <>
      <div className={styles.historySettings}><button onClick={clearHistory} className={styles.clearHistoryButton}>Clear History</button></div>
    <div className={styles.historyContainer}>
      {searchHistory.length > 1
        ? searchHistory.map((item: any, i: number) => {
          
            return item.layout === "modal_dfc" ? (
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
    </div></>
  );
};

export default HistoryTab;

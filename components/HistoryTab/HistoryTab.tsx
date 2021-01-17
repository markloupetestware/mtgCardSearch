import styles from "./historyTab.module.css";

const HistoryTab = ({
  searchHistory,
  setCurrentCard,
  setSearchHistory,
  currentCard,
}) => {
  function handleClick(i) {
    const results = searchHistory.map((item) => {
      return item.name;
    });
    if (!results.includes(currentCard.name)) {
      setSearchHistory([currentCard, ...searchHistory]);
    }
    setCurrentCard(searchHistory[i]);
  }
  return (
    <div className={[styles.historyContainer].join(" ")}>
      {searchHistory.length > 1
        ? searchHistory.map((item, i) => {
            return (
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
  );
};

export default HistoryTab;

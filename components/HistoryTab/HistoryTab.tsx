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
  return (
    <div className={[styles.historyContainer].join(" ")}>
      {searchHistory.length > 1
        ? searchHistory.map((item: any, i: number) => {
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

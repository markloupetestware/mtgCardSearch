import { StylesProvider } from "@material-ui/core";

import styles from "./commanderTab.module.css";

const CommanderTab = () => {
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

  return (
    <div className={styles.commanderContainer}>
      <div className={styles.commanderPlayerCountContainer}>
        <h1>How Many Players</h1>
        {playerButtonData.map((item, i) => {
          return <button key={i}>{item.value}</button>;
        })}
      </div>
    </div>
  );
};

export default CommanderTab;

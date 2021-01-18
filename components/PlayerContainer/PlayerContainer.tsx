import { useState } from "react";

interface PlayerContainerProps {
  index: number;
}

const PlayerContainer = ({ index }: PlayerContainerProps) => {
  const [lifeTotal, setLifeTotal] = useState(40);

  return (
    <div>
      <h1>Player {index + 1}</h1>
      <button
        onClick={() => {
          setLifeTotal(lifeTotal + 1);
        }}
      >
        {lifeTotal}
      </button>
    </div>
  );
};

export default PlayerContainer;

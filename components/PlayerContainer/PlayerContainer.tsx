

interface PlayerContainerProps {
    index: number
}

const PlayerContainer = ({index}: PlayerContainerProps) => {
    return(
<div>
    <h1>Player {index+1}</h1>

</div>
    )
}

export default PlayerContainer
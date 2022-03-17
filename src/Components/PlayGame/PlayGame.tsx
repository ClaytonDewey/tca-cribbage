import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "../../App";

interface PlayerInGame extends Player {
    currentScore: number;
}

export const PlayGame = ({ currentGame }) => {
    const nav = useNavigate();
    const { players } = currentGame;
    const [currentPlayer, setCurrentPlayer] = useState<PlayerInGame | undefined>(undefined);
    const [playerOrder, setPlayerOrder] = useState<PlayerInGame[]>([]);
    
    const orderPlayers = (player: string) => {
        const nextPlayer = {
            name: player
            , order: playerOrder.length + 1
            , currentScore: 0
        }

        setCurrentPlayer(nextPlayer);

        setPlayerOrder([
            ...playerOrder
            , nextPlayer
        ]);
    }

    const nextTurn = (player: PlayerInGame) => {
        if(playerOrder.length < players.length) {
            setCurrentPlayer(undefined);
        } else {
            const indexOfCurrentPlayer = playerOrder.findIndex(x => x === player);
            setCurrentPlayer(indexOfCurrentPlayer + 1 < playerOrder.length ? playerOrder[indexOfCurrentPlayer] : playerOrder[0]);
        }
    }

    const endGame = () => {
        nav(-2);
    };

    return (
        <>
            <div className={`players-container ${!currentPlayer && playerOrder.length < currentGame.players.length ? "open" : ""}`}>
                <h2 className="text-center my-2">{`Choose Player ${playerOrder.length + 1}`}</h2>
                {
                    players.filter(x => playerOrder.findIndex(y => y.name === x.name) === -1)
                    .map(x => (
                        <button
                            key={x.name} id={x.name}
                            className="btn btn-success mb-2"
                            onClick={() => orderPlayers(x.name)}
                        >
                            {x.name}
                        </button>
                    ))
                }
            </div>
            <div className="container container-play">
                <h1 className="text-center my-2">Play Game</h1>
                {/* <h2 className="text-center my-2">{currentPlayer}</h2> */}
                <div className="container-points">
                    <div className="form-control">
                        <input id="points-hand" type="number" autoFocus required />
                        <label><span>Hand Points</span></label>
                    </div>

                    <div id="crib" className="form-control">
                        <input id="points-crib" type="number" required />
                        <label><span>Crib Points</span></label>
                    </div>
                </div>

                <button className="btn btn-info mt-2" onClick={() => nextTurn({ name: currentPlayer?.name, order: currentPlayer?.order, currentScore: 2})}>
                    Next Turn <i className="fa-solid fa-circle-chevron-right"></i>
                </button>

                <button className="btn btn-success mt-2" onClick={endGame}>
                    Done <i className="fa-solid fa-circle-stop"></i>
                </button>
            </div>
        </>
    );
};

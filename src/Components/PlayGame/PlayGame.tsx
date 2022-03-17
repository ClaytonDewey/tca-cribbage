import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "../../App";

interface PlayerInGame extends Player {
    currentScore: number;
}

export const PlayGame = ({ currentGame }) => {
    const nav = useNavigate();
    const { players } = currentGame;
    const user = players.filter(x => x.name === "Me");
    const [cribHand, setCribHand] = useState(false);
    const [activePlayer, setActivePlayer] = useState<PlayerInGame | undefined>(undefined);
    const [playersInOrder, setPlayersInOrder] = useState<PlayerInGame[]>([]);
    
    const orderPlayers = (player: string) => {
            const newPlayer = {
                name: player
                , order: playersInOrder.length + 1
                , currentScore: 0
            }

            setActivePlayer(newPlayer);

            setPlayersInOrder([
                ...playersInOrder
                , newPlayer
            ]);
    }
    
    const nextTurn = () => {
        console.log(cribHand);

        // Trigger choose player number if not all chosen.
        if (playersInOrder.length < players.length) {
            setActivePlayer(undefined);
        }

        // Otherwise, next player until game ends.
        else {
            const indexOfActivePlayer = playersInOrder.findIndex(x => x !== user);
            cribHand ? setCribHand(false) : setCribHand(true)
            setActivePlayer(indexOfActivePlayer + 1 < playersInOrder.length ? playersInOrder[indexOfActivePlayer + 1] : playersInOrder[0]);
        }
    }

    const endGame = () => {
        nav(-2);
    };

    return (
        <>
            <div className={`players-container ${!activePlayer && playersInOrder.length < currentGame.players.length ? "open" : ""}`}>
                <h2 className="text-center my-2">Who Won the Crib?</h2>
                {
                    players.filter(x => playersInOrder.findIndex(y => y.name === x.name) === -1)
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

                <div className="container-points">
                    <div className="form-control">
                        <input id="points-hand" type="number" autoFocus required />
                        <label><span>Hand Points</span></label>
                    </div>

                    { cribHand && (
                        <div id="crib" className="form-control">
                            <input id="points-crib" type="number" required />
                            <label><span>Crib Points</span></label>
                        </div>
                    )}
                </div>

                <button className="btn btn-info mt-2" onClick={nextTurn}>
                    Next Turn <i className="fa-solid fa-circle-chevron-right"></i>
                </button>
                <button className="btn btn-success mt-2" onClick={endGame}>
                    Done <i className="fa-solid fa-circle-stop"></i>
                </button>
            </div>
        </>
    );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../App";

export const PlayGame = ({ currentGame }) => {
    const nav = useNavigate();
    const { players } = currentGame;
    const [cut, setCut] = useState(false)
    const [cribHand, setCribHand] = useState(false);
    
    const orderPlayers = (player: string) => {
        setCut(true);
        player === User ? setCribHand(false) : setCribHand(true);
    }
    
    const nextTurn = () => {
        cribHand ? setCribHand(false) : setCribHand(true);
        console.log(cribHand)
    }

    const endGame = () => {
        nav(-2);
    };

    return (
        <>
            <div className={`players-container ${!cut ? "open" : ""}`}>
                <h2 className="text-center my-2">Who Won the Crib?</h2>
                {
                    players.map(x => (
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

                    { !cribHand && (
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

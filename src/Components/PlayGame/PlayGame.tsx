import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameResult, User } from "../../App";

export const PlayGame = ({ currentGame }) => {
    const nav = useNavigate();
    const { players } = currentGame;
    const [cut, setCut] = useState(false)
    const [isCrib, setIsCrib] = useState(false);
    const [hand, setHand] = useState(0);
    const [crib, setCrib] = useState(0);
    const [highHand, setHighHand] = useState(0);
    const [highCrib, setHighCrib] = useState(0);
    const [score, setScore] = useState(0);
    
    const orderPlayers = (player: string) => {
        setCut(true);
        player === User ? setIsCrib(false) : setIsCrib(true);
    }
        
    const nextTurn = () => {
        setScore(score + hand + crib);
        if (hand > highHand) setHighHand(hand);
        if (crib > highCrib) setHighCrib(crib);
        isCrib ? setIsCrib(false) : setIsCrib(true);
    }

    const endGame = () => {
        setScore(score + hand + crib);
        if (hand > highHand) setHighHand(hand);
        if (crib > highCrib) setHighCrib(crib);
        console.log(`Current Score: ${score}`);
        console.log(`High Hand: ${highHand}`);
        console.log(`High Crib: ${highCrib}`);
        nav(-2);
    };

    return (
        <>
            <div className={`players-container ${!cut ? "open" : ""}`}>
                <h2 className="text-center my-2">Who Won the Cut?</h2>
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
                        <input id="points-hand" type="text" autoFocus required onChange={e => setHand(+e.target.value)} />
                        <label><span>Hand Points</span></label>
                    </div>

                    { !isCrib && (
                        <div id="crib" className="form-control">
                            <input id="points-crib" type="number" required onChange={e => setCrib(+e.target.value)} />
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameResult, User } from "../../App";

export const PlayGame = ({ currentGame, gameResults }) => {

    const nav = useNavigate();
    const { players, start } = currentGame;
    const [gameResult, setGameResult] = useState<GameResult>({
        start: start,
        end: "",
        winner: "",
        players: [],
        skunk: false,
        dblSkunk: false,
        skunked: false,
        dblSkunked: false,
        highHand: 0,
        highCrib: 0
    });
    const [cut, setCut] = useState(false)
    const [isCrib, setIsCrib] = useState(false);
    const [hand, setHand] = useState(0);
    const [crib, setCrib] = useState(0);
    const [highHand, setHighHand] = useState(0);
    const [highCrib, setHighCrib] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState("");
    const [skunk, setSkunk] = useState(false);
    const [dblSkunk, setDblSkunk] = useState(false);
    const [skunked, setSkunked] = useState(false);
    const [dblSkunked, setDblSkunked] = useState(false);
    const [skunkSettings, setSkunkSettings] = useState(false);

    const orderPlayers = (player: string) => {
        setCut(true);
        player === User ? setIsCrib(true) : setIsCrib(false);
    }

    const nextTurn = () => {
        if (isCrib) {
            const s = score + hand + crib;
            setScore(s);
            if (hand > highHand) setHighHand(hand);
            if (crib > highCrib) setHighCrib(crib);

            // Reset state values
            setHand(0);
            setCrib(0);
            setIsCrib(false);
        } else {
            const s = score + hand;
            setScore(s);
            if (hand > highHand) setHighHand(hand);

            // Reset state values
            setHand(0);
            setIsCrib(true);
        }
    }

    const lastTurn = () => {
        if (isCrib) {
            const s = score + hand + crib;
            setScore(s);
            if (hand > highHand) setHighHand(hand);
            if (crib > highCrib) setHighCrib(crib);
            setGameOver(true);
        } else {
            const s = score + hand;
            setScore(s);
            if (hand > highHand) setHighHand(hand);
            setGameOver(true);
        }
    };

    const whoWon = (player: string) => {
        setWinner(player);
        player === User ? setSkunkSettings(true) : setSkunkSettings(false);
    }

    const endGame = () => {
        setGameResult({
            start: start,
            end: (new Date()).toISOString(),
            winner: winner,
            players: players,
            skunk: skunk,
            dblSkunk: dblSkunk,
            skunked: skunked,
            dblSkunked: dblSkunked,
            highHand: highHand,
            highCrib: highCrib
        });

        gameResults = [
            ...gameResults
            , gameResult
        ]
        // nav(-2);
    }

    return (
        <>
            <div className={`players-container-overlay ${!cut ? "open" : ""}`}></div>
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
                <p className="text-center">Score: {score}</p>
                <p className="text-center">High Hand: {highHand}</p>
                <p className="text-center">High Crib: {highCrib}</p>
                <div className="container-points">
                    <div className="form-control">
                        <input id="points-hand" type="number" value={hand} autoFocus required onChange={e => setHand(+e.target.value)} />
                        <label><span>Hand Points</span></label>
                    </div>

                    {isCrib && (
                        <div id="crib" className="form-control">
                            <input id="points-crib" type="number" value={crib} required onChange={e => setCrib(+e.target.value)} />
                            <label><span>Crib Points</span></label>
                        </div>
                    )}
                </div>

                {!gameOver && (
                    <>
                        <button className="btn btn-info mt-2" onClick={nextTurn}>
                            Next Turn <i className="fa-solid fa-circle-chevron-right"></i>
                        </button>
                        <button className="btn btn-success mt-2" onClick={lastTurn}>
                            Game Over <i className="fa-solid fa-circle-stop"></i>
                        </button>
                    </>
                )}

                {gameOver && (
                    <>
                        {
                            players.map(x => (
                                <button
                                    key={x.name} id={x.name}
                                    className="btn btn-info mb-2"
                                    onClick={() => whoWon(x.name)}
                                >
                                    {x.name}
                                </button>
                            ))
                        }

                        {skunkSettings && (
                            <p>You Won!</p>
                        )}

                        {!skunkSettings && (
                            <p>You lost</p>
                        )}

                        {
                            JSON.stringify(gameResults)
                        }
                        <button className="btn btn-success mt-2" onClick={endGame}>
                            Done <i className="fa-solid fa-circle-stop"></i>
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

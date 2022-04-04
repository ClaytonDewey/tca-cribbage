import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameResult, User } from "../../App";

export const PlayGame = ({ currentGame, gameResults, addGameResult }) => {

    const nav = useNavigate();
    const [message, setMessage] = useState({ type: "", msg: "", show: false });
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
    const [opponents, setOpponents] = useState({ name: "", order: 0 });
    const [hand, setHand] = useState(0);
    const [crib, setCrib] = useState(0);
    const [highHand, setHighHand] = useState(0);
    const [highCrib, setHighCrib] = useState(0);
    const [score, setScore] = useState(0);
    const [endGame, setEndGame] = useState(false);
    const [winner, setWinner] = useState("");
    const [skunk, setSkunk] = useState(false);
    const [dblSkunk, setDblSkunk] = useState(false);
    const [skunked, setSkunked] = useState(false);
    const [dblSkunked, setDblSkunked] = useState(false);
    const [won, setWon] = useState(false);
    const [over, setOver] = useState(false);
    const [gameOver, setGameOver] = useState(gameResults)

    const orderPlayers = (player: string) => {
        setCut(true);
        player === User ? setIsCrib(true) : setIsCrib(false);
        const opponent = players.find(x => x.name !== User);
        setOpponents(opponent);
    }

    const hideMsg = () => {
        setTimeout(() => {
            setMessage({ type: "", msg: "", show: false });
        }, 2500)
    };

    const scoreIsValid = (type, num) => {
        if (num === 19 || num >= 30 || num < 0) {
            setMessage({ type: "danger", msg: "Invalid score entered.", show: true });
            hideMsg();
        } else {
            switch(type) {
                case "crib":
                    setCrib(num);
                    break;
                default:
                    setHand(num)
                    break;
            }
        }
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
            setEndGame(true);
        } else {
            const s = score + hand;
            setScore(s);
            if (hand > highHand) setHighHand(hand);
            setEndGame(true);
        }
    };

    const selectWinner = (player: string) => {
        setWinner(player);
        player === User ? setWon(true) : setWon(false);
        setOver(true);
    }

    const finishGame = () => {
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

        setGameOver(addGameResult(gameResult));
        nav(-2);
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
            {message.show && (<div className={`alert alert-${message.type}`}>{message.msg}</div>)}
            <div className="container container-play">
                <h1 className="text-center my-2">Play Game</h1>
                <p className="text-center">Opponent: {opponents.name}</p>
                <p className="text-center">Score: {score}</p>
                {/* <p className="text-center">High Hand: {highHand}</p>
                <p className="text-center">High Crib: {highCrib}</p> */}
                

                {!endGame && (
                    <>
                        <div className="container-points">
                            <div className="form-control">
                                <input id="points-hand" type="number" value={hand} ref={(element) => element?.focus?.()} required onChange={e => scoreIsValid("hand", +e.target.value)} />
                                <label><span>Hand Points</span></label>
                            </div>

                            {isCrib && (
                                <div id="crib" className="form-control">
                                    <input id="points-crib" type="number" value={crib} required onChange={e => scoreIsValid("crib", +e.target.value)} />
                                    <label><span>Crib Points</span></label>
                                </div>
                            )}
                        </div>
                        <button className="btn btn-info mt-2" onClick={nextTurn}>
                            Next Turn <i className="fa-solid fa-circle-chevron-right"></i>
                        </button>
                        <button className="btn btn-success mt-2" onClick={lastTurn}>
                            End Game <i className="fa-solid fa-circle-stop"></i>
                        </button>
                    </>
                )}

                {endGame && (
                    <>
                        <h2 className="text-center mb-2">Who Won?</h2>
                        {
                            players.map(x => (
                                <button
                                    key={x.name} id={x.name}
                                    className="btn btn-info mb-2"
                                    onClick={() => selectWinner(x.name)}
                                >
                                    {x.name}
                                </button>
                            ))
                        }

                        {over && (
                            <>
                                {won && (
                                    <>
                                        <h2 className="text-center">YOU WON! 🏆</h2>
                                        <p className="text-center my-2">Did you skunk your opponent?</p>
                                        <ul className="form-check-control">
                                            <li>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="skunk"
                                                        onChange={() => skunk || dblSkunk ? setSkunk(false) : setSkunk(false)}
                                                    />
                                                    No
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="skunk"
                                                        onChange={() => !skunk ? setSkunk(true) : setSkunk(false)}
                                                    />
                                                    Skunk
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="skunk"
                                                        onChange={() => !dblSkunk ? setDblSkunk(true) : setDblSkunk(false)}
                                                    />
                                                    Double Skunk
                                                </label>
                                            </li>
                                        </ul>
                                    </>
                                )}

                                {!won && (
                                    <>
                                        <h2 className="text-center">You lost. 😢</h2>
                                        <p className="text-center my-2">Were you skunked?</p>
                                        <ul className="form-check-control">
                                            <li>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="skunked"
                                                        onChange={() => skunked || dblSkunked ? setSkunked(false) : setSkunked(false)}
                                                    />
                                                    No
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="skunked"
                                                        onChange={() => !skunked ? setSkunked(true) : setSkunked(false)}
                                                    />
                                                    Skunked
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="skunked"
                                                        onChange={() => !dblSkunked ? setDblSkunked(true) : setDblSkunked(true)}
                                                    />
                                                    Double Skunked
                                                </label>
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </>
                        )}

                        <button className="btn btn-success mt-2" onClick={finishGame}>
                            Done <i className="fa-solid fa-circle-stop"></i>
                        </button>

                        {/* <button className="btn btn-primary my-2" onClick={() => nav(-2)}>
                            HOME
                        </button> */}
                    </>
                )}
            </div>
        </>
    );
};

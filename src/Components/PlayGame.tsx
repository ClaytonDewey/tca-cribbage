import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../App";

export const PlayGame = ({ 
    addGameResult,
    currentGame
}) => {

    const nav = useNavigate();
    // Error message state handler
    const [message, setMessage] = useState({ type: "", msg: "", show: false });

    const { players, start } = currentGame;
    const [cut, setCut] = useState(false);
    const [isCrib, setIsCrib] = useState(false);
    const [opponents, setOpponents] = useState({ name: "", order: 0 });

    const [hand, setHand] = useState(0);
    const [crib, setCrib] = useState(0);
    const [highPegg, setHighPegg] = useState(0);
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
    const [gameOver, setGameOver] = useState(false);
    const [pegging, setPegging] = useState(true);

    const [pegs, setPegs] = useState(0);

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

    const increment = () => {
        setPegs(pegs + 1);
        setScore(score + 1);
        if (score >= 120) {
                setOver(true)
                setGameOver(true);
                setEndGame(true);
                setWon(true);
                setWinner(User)
        }
    }

    const decrement = () => {
        if (pegs === 0) return;
        setPegs(pegs - 1)
        setScore(score - 1);
    }

    const countHand = () => {
        setPegs(0);
        setPegging(false);
        if (pegs > highPegg) setHighPegg(pegs);

        if (score >= 121) {
                setOver(true)
                setGameOver(true);
                setEndGame(true);
                setWon(true);
                setWinner(User)
        }
    }

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

            if (score + hand + crib >= 121) {
                setOver(true)
                setGameOver(true);
                setEndGame(true);
                setWon(true);
                setWinner(User);
            } else {
                // Reset state values
                setHand(0);
                setCrib(0);
                setIsCrib(false);
                setPegging(true);
            }

        } else {
            const s = score + hand;
            setScore(s);
            if (hand > highHand) setHighHand(hand);

            if (score >= 121) {
                setOver(true)
                setGameOver(true);
                setEndGame(true);
                setWon(true);
                setWinner(User)
            } else {
                // Reset state values
                setHand(0);
                setIsCrib(true);
                setPegging(true);
            }
        }
    }

    const lastTurn = () => {
        setOver(true)
        setGameOver(true);

        if (score <= 60) {
            setEndGame(true);
            setDblSkunked(true);
            setWon(false);
            setWinner(opponents.name);
        } else if (score <= 90) {
            setEndGame(true);
            setSkunked(true);
            setWon(false);
            setWinner(opponents.name);
        } else if (score <= 120) {
            setEndGame(true);
            setWon(false);
            setWinner(opponents.name);
        } else {
            setEndGame(true);
            setWon(true);
            setWinner(User)
        }
    };

    const finishGame = () => {

        addGameResult({
            start: start,
            end: (new Date()).toISOString(),
            winner: winner,
            players: players,
            skunk: skunk,
            dblSkunk: dblSkunk,
            skunked: skunked,
            dblSkunked: dblSkunked,
            highPegg: highPegg,
            highHand: highHand,
            highCrib: highCrib
        })

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
                <p className="text-center">Pegged Points: {pegs}</p>
                
                {!endGame && (
                    <>
                        {
                            pegging && (
                                <>
                                    <div className="container-points">
                                        <div className="number">
                                            <button className="minus" onClick={() => decrement()}><i className="fa-solid fa-minus"></i></button>
                                            <span className="peg-points">{pegs}</span>
                                            <button className="plus" onClick={() => increment()}><i className="fa-solid fa-plus"></i></button>
                                        </div>
                                    </div>
                                    <button className="btn btn-info mt-2" onClick={() => countHand()}>
                                        Count Hand/Crib
                                    </button>
                                </>
                            )
                        }
                        {
                            !pegging && (
                                <>
                                    <div className="container-points">
                                        <div className="form-control">
                                            <input id="points-hand" type="number" value={hand} required onChange={e => scoreIsValid("hand", +e.target.value)} />
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
                                </>
                            )
                        }
                        <button className="btn btn-success mt-2" onClick={lastTurn}>
                            End Game <i className="fa-solid fa-circle-stop"></i>
                        </button>
                    </>
                )}

                {endGame && (
                    <>

                        {over && (
                            <>
                                {won && (
                                    <>
                                        <h2 className="text-center mt-3">YOU WON! 🏆</h2>
                                        <p className="text-center my-2">Did you skunk your opponent?</p>
                                        <ul className="form-check-control">
                                            <li>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="skunk"
                                                        onChange={() => {
                                                            skunk || dblSkunk ? setSkunk(false) : setSkunk(false);
                                                            setGameOver(true);
                                                        }}
                                                    />
                                                    No
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="skunk"
                                                        onChange={() => {
                                                            !skunk ? setSkunk(true) : setSkunk(false);
                                                            setGameOver(true);
                                                        }}
                                                    />
                                                    Skunk
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="skunk"
                                                        onChange={() => {
                                                            !dblSkunk ? setDblSkunk(true) : setDblSkunk(false);
                                                            setGameOver(true);
                                                        }}
                                                    />
                                                    Double Skunk
                                                </label>
                                            </li>
                                        </ul>
                                    </>
                                )}

                                {!won && (
                                    <>
                                        <h2 className="text-center mt-3">You lost. 😢</h2>
                                        {
                                            skunked && (
                                                <p className="text-center my-2">You were skunked!</p>
                                            )
                                        }
                                        {
                                            dblSkunked && (
                                                <p className="text-center my-2">You were double skunked!</p>
                                            )
                                        }
                                    </>
                                )}
                            </>
                        )}

                        {
                            gameOver && (
                                <button className="btn btn-success mt-2" onClick={() => finishGame()}>
                                    Done <i className="fa-solid fa-circle-stop"></i>
                                </button>
                            )
                        }

                    </>
                )}
            </div>
        </>
    );
};

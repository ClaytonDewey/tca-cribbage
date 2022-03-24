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
    const [opponents, setOpponents] = useState({name: "", order: 0});
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

    const orderPlayers = (player: string) => {
        setCut(true);
        player === User ? setIsCrib(true) : setIsCrib(false);
        const opponent = players.find(x => x.name !== User);
        setOpponents(opponent);
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
                <p className="text-center">Opponent: {opponents.name}</p>
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

                {!endGame && (
                    <>
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

                        {won && (
                            <p>You Won!</p>
                        )}

                        {!won && (
                            <p>You lost</p>
                        )}

                        {
                            JSON.stringify(gameResults)
                        }
                        <button className="btn btn-success mt-2" onClick={finishGame}>
                            Done <i className="fa-solid fa-circle-stop"></i>
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

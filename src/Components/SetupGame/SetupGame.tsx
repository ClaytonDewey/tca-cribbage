import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentGame } from "../../App";
// import { Message } from "../Messages/Messages";

interface SetupGameProps {
    getUniquePlayers: string[];
    setCurrentGame: (g: CurrentGame) => void;
}

export const SetupGame: React.FC<SetupGameProps> = ({ getUniquePlayers, setCurrentGame }) => {
    const nav = useNavigate();
    const [players, setPlayers] = useState([...getUniquePlayers].sort().map(x => ({ name: x, checked: false })));
    const [newOpponent, setNewOpponent] = useState("");
    const [message, setMessage] = useState({ type: "", msg: "" });
    

    const hideMsg = () => {
        setTimeout(() => {
            setMessage({ type: "", msg: "" });
        }, 2500)
    };

    const addPlayer = () => {
        if (newOpponent === "") {
            setMessage({ type: "alert alert-danger", msg: "Please enter an opponent name." });
            hideMsg();
            return;
        }
        if (players.some(x => x.name.toUpperCase().localeCompare(newOpponent.toUpperCase()) === 0)) {
            setMessage({ type: "alert alert-danger", msg: "There is already an opponent with that name." });
            setNewOpponent("");
            hideMsg();
            return;
        }

        setPlayers(
            [
                ...players
                , {
                    name: newOpponent
                    , checked: true
                }
            ].sort((a, b) => a.name.localeCompare(b.name))
        )
        setNewOpponent("");
    }

    const toggleOpponents = (key) => {
        setPlayers(players.map(x => ({
            ...x
            , checked: x.name === key.name ? !x.checked : x.checked
        })));
    }

    const startGame = () => {
        if (players.filter(x => x.checked).length === 0) {
            setMessage({ type: "alert alert-danger", msg: "Please add an opponent." });
            hideMsg();
            return;
        }
        if (players.filter(x => x.checked).length > 3) {
            setMessage({ type: "alert alert-danger", msg: "You may not have more than three opponents.Please remove one, or more oppenents." });
            hideMsg();
            return;
        }
        
        setCurrentGame(
            {
                players: [
                    ...players.filter(x => x.checked).map((x, i) => ({
                        name: x.name
                        , order: i
                    }))
                    , {
                        name: "Me"
                        , order: 3
                    }
                ]
                ,start: (new Date()).toISOString()
            }
        )
        nav("/play");
    }

    return (
        <div className="container container-setup">
            {message && (<div className={message.type}>{message.msg}</div>)}
            <h1 className="text-center my-2">Setup Game</h1>
            <h2 className="text-center my-2">Add New Oppenent</h2>
            <div className="form-control">
                <input
                    id="new-opp"
                    type="text"
                    value={newOpponent}
                    onChange={(e) => setNewOpponent((e.target as any).value)}
                />
                <label>
                    <span>Opponent Name</span>
                </label>
                <button id="addOpp" onClick={addPlayer}>Add</button>
            </div>

            <h2 className="text-center mt-4 mb-2">Select Oppenent</h2>
            <ul className="form-check-control">
                {players.map(x => (
                    <li key={x.name}>
                        <label>
                            <input
                                name={x.name}
                                type="checkbox"
                                checked={x.checked}
                                onChange={() => toggleOpponents(x)}
                            />
                            {x.name}
                        </label>
                    </li>
                ))}
            </ul>

            <button className="btn btn-success mt-4" onClick={startGame}>
                Start Game <i className="fa-solid fa-circle-play"></i>
            </button>

        </div>
    );
};

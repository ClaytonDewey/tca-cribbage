import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Message } from "../Messages/Messages";

interface SetupGameProps {
    getUniquePlayers: string[];
}

export const SetupGame: React.FC<SetupGameProps> = ({ getUniquePlayers }) => {
    const nav = useNavigate();
    const [opponents, setOpponents] = useState([...getUniquePlayers].sort().map(x => ({ name: x, checked: false })));
    const [newOpponent, setNewOpponent] = useState("");
    const [message, setMessage] = useState({ type: "", msg: "" });

    const addPlayer = () => {
        if (opponents.some(x => x.name.toUpperCase().localeCompare(newOpponent.toUpperCase()) === 0)) {
            setMessage({ type: "alert alert-danger", msg: "There is already an opponent with that name."});
            setNewOpponent("");
            return;
        }

        setOpponents(
            [
                ...opponents
                , {
                    name: newOpponent
                    , checked: true
                }
            ].sort((a, b) => a.name.localeCompare(b.name))
        )
        setNewOpponent("");
    }

    const toggleOpponents = (key) => {
        if (opponents.filter(x => x.checked).length > 2 && key.checked) {
            setOpponents(opponents.map(x => ({
                ...x
                , checked: x.name === key.name ? !x.checked : x.checked
            })))
            setMessage({ type: "", msg: "" });
        } else if (opponents.filter(x => x.checked).length > 2) {
            setMessage({ type: "alert alert-danger", msg: "You can't have more than 3 opponents."});
        } else {
            setOpponents(opponents.map(x => ({
                ...x
            , checked: x.name === key.name ? !x.checked : x.checked
            })))
        }
    }

    // const showMessage = (msg) => {
    //     alert(msg);
    // }

    const startGame = () => {
        nav("/play")
    }

    return (
        <div className="container container-setup">
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
            { message && (<div className={message.type}>{message.msg}</div>)}
            <ul className="form-check-control">
                {opponents.map(x => (
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

            <h2 className="text-center mt-4 mb-2">Who Won the Cut?</h2>
            <ul className="form-check-control">
                <li>
                    <label>
                        <input type="radio" name="cut" />
                        Me
                    </label>
                </li>
                <li>
                    <label>
                        <input type="radio" name="cut" />
                        Opponent
                    </label>
                </li>
            </ul>

            <button className="btn btn-success mt-4" onClick={startGame}>
                Start Game
            </button>
        </div>
    );
};

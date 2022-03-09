import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SetupGameProps {
    getUniquePlayers: string[];
}

export const SetupGame: React.FC<SetupGameProps> = ({ getUniquePlayers }) => {
    const nav = useNavigate();
    const [opponents, setOpponents] = useState([...getUniquePlayers].sort().map(x => ({name: x, checked: false})));
    const [newOpponent, setNewOpponent] = useState("");

    const addPlayer = () => {
        if(opponents.some(x => x.name.toUpperCase().localeCompare(newOpponent.toUpperCase()) === 0)) {
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
    const toggleOpponents = (key: string) => {
        setOpponents(opponents.map(x => ({
            ...x
            , checked: x.name === key ? !x.checked : x.checked
        })));
        
        console.log(opponents.filter(x => x.checked).length);
        if(opponents.filter(x => x.checked).length > 2) {
            showMessage("You can't have more than 3 opponents.");
            return;
        }
    }

    const showMessage = (msg) => {
        alert(msg);
    }

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
            <ul className="form-check-control">
                {opponents.map(x => (
                    <li key={x.name}>
                        <label>
                            <input
                                name={x.name} 
                                type="checkbox" 
                                checked={x.checked} 
                                onChange={() => toggleOpponents(x.name)} 
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

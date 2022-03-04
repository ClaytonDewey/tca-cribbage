import "./SetupGame.scss";
import { useNavigate } from "react-router-dom";

export const SetupGame = () => {
    const nav = useNavigate();

    return (
        <div className="container container-setup">
            <h1 className="text-center my-2">Setup Game</h1>
            <h2 className="text-center my-2">Add New Oppenent</h2>
            <div className="form-control">
                <input id="new-opp" type="text" required />
                <label>
                    <span>Oppenent Name</span>
                </label>
                <button>Add</button>
            </div>

            <h2 className="text-center mt-4 mb-2">Select Oppenent</h2>
            <ul className="form-check-control">
                <li>
                    <label>
                        <input name="opponent" type="radio" />
                        Dad
                    </label>
                </li>
                <li>
                    <label>
                        <input name="opponent" type="radio" />
                        Michael
                    </label>
                </li>
                <li>
                    <label>
                        <input name="opponent" type="radio" />
                        William
                    </label>
                </li>
                <li>
                    <label>
                        <input name="opponent" type="radio" />
                        Mary
                    </label>
                </li>
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

            <button className="btn btn-success mt-4" onClick={() => nav("/play")}>
                Start Game
            </button>
        </div>
    );
};

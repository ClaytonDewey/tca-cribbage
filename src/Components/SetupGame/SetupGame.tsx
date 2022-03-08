import { useNavigate } from "react-router-dom";

const addOpponent = () => {
    // opponent = this?.target.value
    console.log("Add new opponent...");
}


export const SetupGame = ({ getUniquePlayers }) => {
    const nav = useNavigate();
    
    const startGame = () => {
        console.clear();
        nav("/play")
    }

    return (
        <div className="container container-setup">
            <h1 className="text-center my-2">Setup Game</h1>
            <h2 className="text-center my-2">Add New Oppenent</h2>
            <div className="form-control">
                <input id="new-opp" type="text" required />
                <label>
                    <span>Oppenent Name</span>
                </label>
                <button id="addOpp" onClick={addOpponent}>Add</button>
            </div>

            <h2 className="text-center mt-4 mb-2">Select Oppenent</h2>
            <ul className="form-check-control">
                {/* <li>
                    <label>
                        <input name="dad" type="checkbox" />
                        Dad
                    </label>
                </li> */}
                {
                    getUniquePlayers.map(x => 
                        <li>
                            <label>
                                <input name={x} key={x} type="checkbox" />
                                {x}
                            </label>
                        </li>
                    )
                }
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

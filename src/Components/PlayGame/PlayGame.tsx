import "./PlayGame.scss";
import { useNavigate } from "react-router-dom";

export const PlayGame = () => {
    const nav = useNavigate();

    const endGame = () => {
        nav(-2);
    };

    const nextTurn = () => {
        alert("Next move...")
    }

    return (
        <div className="container container-play">
            <h1 className="text-center my-2">Play Game</h1>
            <div className="container-points">
                <div className="form-control">
                    <input id="points-hand" type="number" required />
                    <label><span>Hand Points</span></label>
                </div>

                <div className="form-control">
                    <input id="points-crib" type="number" required />
                    <label><span>Crib Points</span></label>
                </div>
            </div>

            <button className="btn btn-info mt-2" onClick={nextTurn}>
                Next Turn
            </button>

            <button className="btn btn-success mt-2" onClick={endGame}>
                Done
            </button>
        </div>
    );
};

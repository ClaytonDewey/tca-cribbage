import "./SetupGame.scss";
import { useNavigate } from "react-router-dom";

export const SetupGame = () => {
    const nav = useNavigate();
    return (
        <div className="container container-setup">
            <h1 className="text-center my-2">Setup Game</h1>

            <button className="btn btn-success mt-2" onClick={() => nav("/play")}>
                Start Game
            </button>
        </div>
    );
};

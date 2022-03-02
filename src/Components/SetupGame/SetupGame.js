import "./SetupGame.css";
import { useNavigate } from "react-router-dom";

export const SetupGame = () => {
    const nav = useNavigate();
    return (
        <>
            <h1>Setup Game</h1>
            <button className="btn btn-primary mt-2" onClick={() => nav("/play")}>
                Start Playing
            </button>
        </>
    );
};

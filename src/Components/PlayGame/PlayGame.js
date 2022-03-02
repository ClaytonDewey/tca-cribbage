import "./PlayGame.scss";
import { useNavigate } from "react-router-dom";

export const PlayGame = () => {
    const nav = useNavigate();

    const endGame = () => {
        nav("/");
    };

    return (
        <>
            <h1>Play Game</h1>
            <button className="btn btn-success mt-2" onClick={endGame}>
                Done
            </button>
        </>
    );
};

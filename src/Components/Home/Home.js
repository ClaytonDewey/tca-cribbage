import "./Home.scss";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const nav = useNavigate();

    return (
        <>
            <h1>Home Page</h1>
            <h2>tca-cribbage-app</h2>
            <button className="btn btn-success mt-2" onClick={() => nav("/setup")}>
                New Game
            </button>
            <button className="btn btn-primary-outline mt-2" onClick={() => nav("/stats")}>
                Stats
            </button>
        </>
    );
};

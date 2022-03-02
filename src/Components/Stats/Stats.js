import "./Stats.scss";
import { useNavigate } from "react-router-dom";

export const Stats = () => {
    const nav = useNavigate();

    return (
        <>
            <h1>Game Stats</h1>
            <button className="btn btn-success mt-2" onClick={() => nav("/")}>
                Home
            </button>
        </>
    );
};

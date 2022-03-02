import "./Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const nav = useNavigate();

    return (
        <>
            <h1>Home Page</h1>
            <h2>tca-cribbage-app</h2>
            <button className="btn mt-2" onClick={() => nav("/stats")}>
                Stats
            </button>
        </>
    );
};

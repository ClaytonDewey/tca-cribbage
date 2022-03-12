import { useNavigate } from "react-router-dom";

export const Home = () => {
    const nav = useNavigate();

    return (
        <div className="container container-home">
            <h1 className="text-center my-2">Home Page</h1>
            <h2 className="text-center">tca-cribbage-app</h2>
            <button className="btn btn-success mt-2" onClick={() => nav("/setup")}>
                New Game
            </button>
            <button className="btn btn-info mt-2" onClick={() => nav("/stats")}>
                Stats <i className="fa-solid fa-chart-line"></i>
            </button>
        </div>
    );
};

import { useNavigate } from "react-router-dom";
import { cardsIcon } from "./Icons";

export const Home = ({ gameResults }) => {
    const nav = useNavigate();

    return (
        <>
                <div className="container container-home">
                    <h1 className="text-center my-2">Cribbage {cardsIcon()}</h1>
                    <button className="btn btn-success mt-2" onClick={() => nav("/setup")}>
                        New Game <i className="fa-solid fa-circle-play"></i>
                    </button>

                    <button className="btn btn-info mt-2" onClick={() => nav("/stats")}>
                        Stats <i className="fa-solid fa-chart-line"></i>
                    </button>
                    <button className="btn btn-warning mt-2" onClick={() => nav("/leaderboard")}>
                        Leaderboard <i className="fa-solid fa-medal"></i>
                    </button>
                </div>
        </>
    );
};

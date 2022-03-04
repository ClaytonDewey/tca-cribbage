import "./Stats.scss";
import { useNavigate } from "react-router-dom";

export const Stats = () => {
    const nav = useNavigate();

    return (
        <div className="container">
            <h1 className="text-center my-2">Game Stats</h1>
            {/* <h2>Total Game Stats</h2> */}
            <div className="container-stats">
                <div className="stat">
                    Games Played: <span>2162</span>
                </div>
                <div className="stat">
                    Win Percentage: <span>97%</span>
                </div>
                <div className="stat">
                    Wins: <span>2099</span>
                </div>
                <div className="stat">
                    Losses: <span>63</span>
                </div>
                <div className="stat">
                    Skunks: <span>1175</span>
                </div>
                <div className="stat">
                    Dbl Skunks: <span>115</span>
                </div>
                <div className="stat">
                    Skunked: <span>2</span>
                </div>
                <div className="stat">
                    Dbl Skunked: <span>0</span>
                </div>
                <div className="stat">
                    High Hand: <span>28</span>
                </div>
                <div className="stat">
                    High Pegg.: <span>20</span>
                </div>
                <div className="stat">
                    28 Hands: <span>2</span>
                </div>
                <div className="stat">
                    29 Hands: <span>0</span>
                </div>
                <div className="stat">
                    Toughest Opp.: <span>Dad</span>
                </div>
                <div className="stat">
                    Easiest Opp.: <span>William</span>
                </div>
            </div>
            <button className="btn btn-success mt-2" onClick={() => nav(-1)}>
                Home
            </button>
        </div>
    );
};

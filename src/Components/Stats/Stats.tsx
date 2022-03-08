import { useNavigate } from "react-router-dom";

export const Stats = ({ gameResults, calcPercentage, calcWins }) => {
    const nav = useNavigate();

    return (
        <div className="container">
            <h1 className="text-center my-2">Game Stats</h1>
            {/* <h2>Total Game Stats</h2> */}
            <div className="container-stats">
                <div className="stat">
                    <span>{gameResults.length}</span>
                    Games Played
                </div>
                <div className="stat">
                    <span>
                        {calcPercentage}%
                    </span>
                    Win Percentage
                </div>
                <div className="stat">
                    <span>{calcWins}</span>
                    Wins
                </div>
                <div className="stat">
                    <span>{gameResults.length - calcWins}</span>
                    Losses
                </div>
                <div className="stat">
                    <span>?</span>
                    Skunks
                </div>
                <div className="stat">
                    <span>115</span>
                    Dbl Skunks
                </div>
                <div className="stat">
                    <span>2</span>
                    Skunked
                </div>
                <div className="stat">
                    <span>0</span>
                    Dbl Skunked
                </div>
                <div className="stat">
                    <span>28</span>
                    High Hand
                </div>
                <div className="stat">
                    <span>20</span>
                    High Pegg.
                </div>
                <div className="stat">
                    <span>2</span>
                    28 Hands
                </div>
                <div className="stat">
                    <span>0</span>
                    29 Hands
                </div>
                <div className="stat">
                    <span>Dad</span>
                    Toughest Opp.
                </div>
                <div className="stat">
                    <span>William</span>
                    Easiest Opp.
                </div>
            </div>
            <button className="btn btn-success mt-2" onClick={() => nav(-1)}>
                Home
            </button>
        </div>
    );
};

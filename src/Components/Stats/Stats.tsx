import { useNavigate } from "react-router-dom";

const calcPercentage = (results, who: string): number => {
    const percentage: number = results.filter(x => x.winner === who).length / results.length;
    return percentage < 1 ? +percentage.toFixed(2) * 100 : percentage * 100;
};

const calculateTotalWins = (results, who: string): number => (results.filter(x => x.winner === who).length);

const calcSkunks = (results, what: string): number => {
    let count = 0;
    results.map(x => x[what] ? count++ : count)
    return count;
}

const highPoints = (results, what: string): number => {
    const highPoint = results.map(x => x[what]);
    return Math.max(...highPoint);
}

export const Stats = ({ gameResults }) => {
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
                        {calcPercentage(gameResults, "Me")}%
                    </span>
                    Win Percentage
                </div>
                <div className="stat">
                    <span>{calculateTotalWins(gameResults, "Me")}</span>
                    Wins
                </div>
                <div className="stat">
                    <span>{gameResults.length - calculateTotalWins(gameResults, "Me")}</span>
                    Losses
                </div>
                <div className="stat">
                    <span>{calcSkunks(gameResults, "skunk")}</span>
                    Skunks
                </div>
                <div className="stat">
                    <span>{calcSkunks(gameResults, "dblSkunk")}</span>
                    Dbl Skunks
                </div>
                <div className="stat">
                    <span>{calcSkunks(gameResults, "skunked")}</span>
                    Skunked
                </div>
                <div className="stat">
                    <span>{calcSkunks(gameResults, "dblSkunked")}</span>
                    Dbl Skunked
                </div>
                <div className="stat">
                    <span>{highPoints(gameResults, "highHand")}</span>
                    High Hand
                </div>
                <div className="stat">
                    <span>{highPoints(gameResults, "highPegg")}</span>
                    High Pegg.
                </div>
                <div className="stat">
                    <span>?</span>
                    28 Hands
                </div>
                <div className="stat">
                    <span>?</span>
                    29 Hands
                </div>
                <div className="stat">
                    <span>?</span>
                    Toughest Opp.
                </div>
                <div className="stat">
                    <span>?</span>
                    Easiest Opp.
                </div>
            </div>
            <button className="btn btn-success mt-2" onClick={() => nav(-1)}>
                Home <i className="fa-solid fa-house"></i>
            </button>
        </div>
    );
};

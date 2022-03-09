import { useNavigate } from "react-router-dom";

export const Stats = ({ gameResults }) => {
    const nav = useNavigate();

    const calcPercentage = (results, who: string): number => {
        const percentage: number = results.filter(x => x.winner === who).length / results.length;
        
        return percentage < 1 ? +percentage.toFixed(2) * 100 : percentage * 100;
    };

    const calculateTotalWins = (results, who: string): number => (results.filter(x => x.winner === who).length);

    const calcSkunks = (results, who: string):number => {
        let skunks = 0;
        results.map(x => x.skunk ? skunks++ : skunks)
        return skunks;
    }

    const calcDblSkunks = (results, who: string):number => {
        let dblSkunks = 0;
        results.map(x => x.dblSkunk ? dblSkunks++ : dblSkunks)
        return dblSkunks;
    }

    const calcSkunked = (results, who: string):number => {
        let skunked = 0;
        results.map(x => x.skunked ? skunked++ : skunked);
        return skunked;
    }

    const calcDblSkunked = (results):number => {
        let dblSkunked = 0;
        results.map(x => x.dblSkunked ? dblSkunked++ : dblSkunked);
        return dblSkunked;
    }
    const highestHand = (results):number => {
        const highHand = results.map(x => x.highHand);
        return Math.max(...highHand);
    }

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
                    <span>{calcSkunks(gameResults, "Me")}</span>
                    Skunks
                </div>
                <div className="stat">
                    <span>{calcDblSkunks(gameResults, "Me")}</span>
                    Dbl Skunks
                </div>
                <div className="stat">
                    <span>{calcSkunked(gameResults, "Me")}</span>
                    Skunked
                </div>
                <div className="stat">
                    <span>{calcDblSkunked(gameResults)}</span>
                    Dbl Skunked
                </div>
                <div className="stat">
                    <span>{highestHand(gameResults)}</span>
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

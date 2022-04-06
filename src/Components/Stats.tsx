import { useNavigate } from "react-router-dom";

export const Stats = ({ gameResults }) => {
    const nav = useNavigate();
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

    const countHighHand = (results, what: number) => {
        let count = 0;
        results.map(x => x["highHand"] === what ? count++ : count);
        results.map(x => x["highCrib"] === what ? count++ : count);
        return count;
    }

    const highPoints = (results, what: string): number => {
        const highPoint = results.map(x => x[what]);
        return Math.max(...highPoint);
    }

    const calculateShortestGame = (results) => (
        Math.min(...results.map(x => Date.parse(x.end) - Date.parse(x.start)))
    )

    const calculateLongestGame = (results) => (
        Math.max(...results.map(x => Date.parse(x.end) - Date.parse(x.start)))
    )


    return (
                <div className="container">
                    <h2 className="text-center my-2">Game Stats <i className="fa-solid fa-chart-line"></i></h2>
                    {
                        gameResults.length === 0 && (
                            <>
                                <p>You haven't played any games yet. Why not start a new one?</p>
                                <button className="btn btn-success my-2" onClick={() => nav("/setup")}>
                                    New Game <i className="fa-solid fa-circle-play"></i>
                                </button>
                            </>
                        )
                    }
                    <div className="container-stats">
                        <div className="stat">
                            <span>{gameResults.length}</span>
                            Games Played
                        </div>
                        <div className="stat">
                            <span>
                                {
                                    gameResults.length && (
                                        <>
                                            {calcPercentage(gameResults, "Me")}%
                                        </>
                                    )
                                }
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
                            <span>
                                {
                                    gameResults.length && (
                                        <>
                                            {highPoints(gameResults, "highHand")}
                                        </>
                                    )
                                }
                            </span>
                            Highest Hand
                        </div>
                        <div className="stat">
                            <span>
                                {
                                    gameResults.length && (
                                        <>
                                            {highPoints(gameResults, "highCrib")}
                                        </>
                                    )
                                }
                            </span>
                            Highest Crib
                        </div>
                        <div className="stat">
                            <span>{countHighHand(gameResults, 28)}</span>
                            28 Hands
                        </div>
                        <div className="stat">
                            <span>{countHighHand(gameResults, 29)}</span>
                            29 Hands
                        </div>
                        <div className="stat">
                            <span>
                                {
                                    gameResults.length && (
                                        <>
                                            {Math.round(calculateLongestGame(gameResults) / 1000 / 60)}m
                                        </>
                                    )
                                }
                            </span>
                            Longest Game
                        </div>
                        <div className="stat">
                            <span>
                                {
                                    gameResults.length && (
                                        <>
                                            {Math.round(calculateShortestGame(gameResults) / 1000 / 60)}m
                                        </>
                                    )
                                }
                            </span>
                            Shortest Game
                        </div>
                    </div>
                    <button className="btn btn-info mt-2" onClick={() => nav(-1)}>
                        Home <i className="fa-solid fa-house"></i>
                    </button>
                </div>
    )
}
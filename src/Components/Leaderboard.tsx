// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const calculateLeaderboard = (uniquePlayers, results) => {
    return uniquePlayers.map(x => {
        
        const userGamesPlayed = results.filter(y => y.players.some(z => z.name === x));
        const userGamesWon = userGamesPlayed.filter(y => y.winner === x);

        return {
            name: x
            , wins: userGamesWon.length
            , losses: userGamesPlayed.length - userGamesWon.length
            , winningPercent: (userGamesWon.length / userGamesPlayed.length).toFixed(3)
        };
    });
};

export const Leaderboard = ({ gameResults, uniquePreviousPlayers }) => {
    const nav = useNavigate();

    const lb = calculateLeaderboard(uniquePreviousPlayers, gameResults);

    return (
        <div className="container">
            <h2 className="text-center my-2">Leaderboard <i className="fa-solid fa-medal"></i></h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Player</th>
                        <th scope="col">Wins</th>
                        <th scope="col">Losses</th>
                        <th scope="col">Avg.</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lb.map(x => (
                            <tr key={x.name}>
                                <td>{x.name}</td>
                                <td>{x.wins}</td>
                                <td>{x.losses}</td>
                                <td>{x.winningPercent}%</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button className="btn btn-success mt-2" onClick={() => nav(-1)}>
                Home <i className="fa-solid fa-house"></i>
            </button>
        </div>
    )
};
import "./App.scss";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
import { Home } from "./Components/Home/Home";
import { PlayGame } from "./Components/PlayGame/PlayGame";
import { SetupGame } from "./Components/SetupGame/SetupGame";
import { Stats } from "./Components/Stats/Stats";

interface player {
    name: string;
    order: number;
}

interface gameResult {
    start: string;
    end: string;
    winner: string;
    players: player[];
    skunk?: boolean,
    dblSkunk?: boolean
}

const game1: gameResult = {
    start: "2022-02-14T15:14:30",
    end: "2022-02-14T15:20:00",
    winner: "Me",
    players: [{ 
        name: "Me", 
        order: 1 }, 
        { 
            name: "Dad", 
            order: 2 }
        ],
    skunk: true
}

const game2: gameResult = {
     start: "2022-02-14T21:00:30"
    , end: "2022-02-14T21:30:30"
    , winner: "Dad"
    , players: [{ name: "Me", order: 2}, { name: "Dad", order: 1}]
    , dblSkunk: true
}

const game3: gameResult = {
     start: "2022-02-14T22:00:30"
    , end: "2022-02-14T22:30:30"
    , winner: "Me"
    , players: [{ name: "Me", order: 2}, { name: "Dad", order: 1}]
}

let gameResults = [
    game1,
    game2,
    game3
]

const calculateWinningPercentage = (results: gameResult[], who: string): number => {
    const percentage: number = results.filter(x => x.winner === who).length / results.filter(x => x.winner !== "None" && x.players.some(y => y.name === who)).length;
    return +percentage.toFixed(2);
};

const toggleMode = () => {
    const html = document.querySelector("html");
    const toggleTxt = document.querySelector(".toggle-container span")
    if (html?.classList.contains("dark")) {
        html.classList.remove("dark");
        toggleTxt!.innerHTML = "Light Mode";
    } else {
        html?.classList.add("dark");
        toggleTxt!.innerHTML = "Dark Mode";
    }
}


const App = () => {
    return (
        <>
            <div className="toggle-container">
                <input type="checkbox" id="mode" className="toggle" />
                <label htmlFor="mode" className="label" onClick={toggleMode}>
                    <div className="ball"></div>
                </label>
                <span>Light Mode</span>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="setup" element={<SetupGame />} />
                <Route path="play" element={<PlayGame />} />
                <Route path="stats" element={
                    <Stats gameResults={gameResults} calcPercentage={calculateWinningPercentage(gameResults, "Me")} />
                } />
            </Routes>
        </>
    );
}

export default App;

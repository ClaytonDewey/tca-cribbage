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
    opponents: player[];
    skunk?: boolean;
    dblSkunk?: boolean;
    skunked?: boolean;
    dblSkunked?: boolean;
    highHand: number
}

const game1: gameResult = {
    start: "2022-02-14T15:14:30",
    end: "2022-02-14T15:20:00",
    winner: "Me",
    opponents: [{ name: "Dad", order: 2 } ],
    skunk: true
    , highHand: 16
}

const game2: gameResult = {
     start: "2022-02-14T21:00:30"
    , end: "2022-02-14T21:30:30"
    , winner: "Dad"
    , opponents: [{ name: "William", order: 1}]
    , dblSkunked: true
    , highHand: 6
}

const game3: gameResult = {
     start: "2022-02-14T22:00:30"
    , end: "2022-02-14T22:30:30"
    , winner: "Me"
    , opponents: [{ name: "Michael", order: 1}]
    , skunk: true
    , highHand: 24
}

const game4: gameResult = {
     start: "2022-02-15T22:00:30"
    , end: "2022-02-15T22:30:30"
    , winner: "Me"
    , opponents: [{ name: "Dad", order: 1}]
    , highHand: 16
}

const game5: gameResult = {
     start: "2022-02-15T22:00:30"
    , end: "2022-02-15T22:30:30"
    , winner: "Mary"
    , opponents: [{ name: "Mary", order: 1}]
    , highHand: 16
}

let gameResults = [
    game1
    , game2
    , game3
    , game4
    , game5
]

const calculateWinningPercentage = (results: gameResult[], who: string): number => {
    const percentage: number = results.filter(x => x.winner === who).length / results.length;
    
    return percentage < 1 ? +percentage.toFixed(2) * 100 : percentage * 100;
};

const calculateTotalWins = (results: gameResult[], who: string): number => (results.filter(x => x.winner === who).length);

const calcSkunks = (results: gameResult[], who: string):number => {
    let skunks = 0;
    results.map(x => x.skunk ? skunks++ : skunks)
    return skunks;
}

const calcDblSkunks = (results: gameResult[], who: string):number => {
    let dblSkunks = 0;
    results.map(x => x.dblSkunk ? dblSkunks++ : dblSkunks)
    return dblSkunks;
}

const calcSkunked = (results: gameResult[], who: string):number => {
    let skunked = 0;
    results.map(x => x.skunked ? skunked++ : skunked);
    return skunked;
}

const calcDblSkunked = (results: gameResult[]):number => {
    let dblSkunked = 0;
    results.map(x => x.dblSkunked ? dblSkunked++ : dblSkunked);
    return dblSkunked;
}

const highestHand = (results: gameResult[]):number => {
    let highHand = results.map(x => x.highHand);
    return Math.max(...highHand);
}

const getUniquePlayers = (results) => (
    [... new Set(results.flatMap(x => x.opponents.map(y => y.name)))]
)

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
                <Route path="setup" element={
                    <SetupGame 
                        getUniquePlayers={getUniquePlayers(gameResults)}
                    />
                } />
                <Route path="play" element={<PlayGame />} />
                <Route path="stats" element={
                    <Stats
                        gameResults={gameResults} 
                        calcPercentage={calculateWinningPercentage(gameResults, "Me")}
                        calcWins={calculateTotalWins(gameResults, "Me")}
                        calcSkunks={calcSkunks(gameResults, "Me")}
                        calcDblSkunks={calcDblSkunks(gameResults, "Me")}
                        calcSkunked={calcSkunked(gameResults, "Me")}
                        calcDblSkunked={calcDblSkunked(gameResults)}
                        highestHand={highestHand(gameResults)}
                    />
                } />
            </Routes>
        </>
    );
}

export default App;

import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
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
    highHand: number;
    highPegg: number;
}

const game1: gameResult = {
    start: "2022-02-14T15:14:30",
    end: "2022-02-14T15:20:00",
    winner: "Me",
    opponents: [{ name: "Dad", order: 2 }],
    skunk: true
    , highHand: 16
    , highPegg: 12
}

const game2: gameResult = {
    start: "2022-02-14T21:00:30"
    , end: "2022-02-14T21:30:30"
    , winner: "Dad"
    , opponents: [{ name: "William", order: 1 }]
    , dblSkunked: true
    , highHand: 6
    , highPegg: 4
}

const game3: gameResult = {
    start: "2022-02-14T22:00:30"
    , end: "2022-02-14T22:30:30"
    , winner: "Me"
    , opponents: [{ name: "Michael", order: 1 }]
    , dblSkunk: true
    , highHand: 24
    , highPegg: 5
}

const game4: gameResult = {
    start: "2022-02-15T22:00:30"
    , end: "2022-02-15T22:30:30"
    , winner: "Me"
    , opponents: [{ name: "Dad", order: 1 }]
    , highHand: 16
    , highPegg: 3
}

const game5: gameResult = {
    start: "2022-02-15T22:00:30"
    , end: "2022-02-15T22:30:30"
    , winner: "Mary"
    , opponents: [{ name: "Mary", order: 1 }]
    , highHand: 16
    , skunked: true
    , highPegg: 12
}

let gameResults = [
    game1
    , game2
    , game3
    , game4
    , game5
]

const getUniquePlayers = (results: gameResult[]) => (
    [... new Set(results.flatMap(x => x.opponents.map(y => y.name)))]
)



const App = () => {
    const [theme, setTheme] = useState({ mode: "Light", checked: false });

    const html = document.querySelector("html");

    if (localStorage.getItem("mode") === "dark") {
        html?.classList.add("dark");
    } else {
        html?.classList.remove("dark");
    }

    const toggleMode = () => {
        if (theme.mode === "Light") {
            setTheme({ mode: "Dark", checked: true });
            html?.classList.add("dark");
            localStorage.setItem("mode", "dark");
        } else if (theme.mode === "Dark") {
            setTheme({ mode: "Light", checked: false });
            html?.classList.remove("dark");
            localStorage.setItem("mode", "light");
        }
    }

    return (
        <>
            <div className="toggle-container">
                <input type="checkbox" id="mode" className="toggle" checked={theme.checked} onChange={toggleMode} />
                <label htmlFor="mode" className="label">
                    <div className="ball"></div>
                </label>
                <span>{theme.mode} Mode</span>
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
                    />
                } />
            </Routes>
        </>
    );
}

export default App;

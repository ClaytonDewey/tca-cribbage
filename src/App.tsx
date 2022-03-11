import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./Components/useDarkMode"
import { GlobalStyles } from "./Components/GlobalStyles"
import { lightTheme, darkTheme } from "./components/Themes"
import Toggle from "./components/Toggler"
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
    const [theme, themeToggler] = useDarkMode();

    const themeMode = theme === "light" ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={themeMode}>
            <>
                <GlobalStyles />
                <Toggle theme={theme} toggleTheme={themeToggler} />
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
        </ThemeProvider>
    );
}

export default App;

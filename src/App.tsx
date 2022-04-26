import "./App.scss";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./Components/Theme/useDarkMode"
import { GlobalStyles } from "./Components/Theme/GlobalStyles"
import { lightTheme, darkTheme } from "./Components/Theme/Themes"
import Toggle from "./Components/Theme/Toggler"
import { Home } from "./Components/Home";
import { PlayGame } from "./Components/PlayGame";
import { SetupGame } from "./Components/SetupGame";
import { Stats } from "./Components/Stats";
import { Leaderboard } from "./Components/Leaderboard";
import { saveGameToCloud, loadGamesFromCloud } from './TcaCloudApi';
import localforage from "localforage";

export interface Player {
    name: string;
    order: number;
}

export interface CurrentGame {
    players: Player[];
    start: string;
}

export interface GameResult {
    start: string;
    end: string;
    winner: string;
    players: Player[];
    skunk?: boolean;
    dblSkunk?: boolean;
    skunked?: boolean;
    dblSkunked?: boolean;
    highPegg: number;
    highHand: number;
    highCrib: number;
}

export const User = "Me"


const getUniquePlayers = (results) => (
    [...new Set(results.flatMap(x => x.players.map(y => y.name)))]
);

const App = () => {

    const [results, setResults] = useState<GameResult[]>([]);
    const [currentGame, setCurrentGame] = useState<CurrentGame>({
        players: []
        , start: ""
    });

    const [emailAddress, setEmailAddress] = useState("");

    const updateEmailAddress = async (newEmailAddress) => {

        // Update the state, after saving the email in local storage.
        setEmailAddress(await localforage.setItem('email', newEmailAddress));
    }

    useEffect(() => {
        
        const loadGameResults = async () => {

            // Update the emailAddress state, after loading the email from local storage.
            setEmailAddress(await localforage.getItem("email") ?? "");

            // Then, if we have an email, load the game results.
            if (emailAddress.length > 0) {
                setResults(await loadGamesFromCloud(emailAddress, "tca-cribbage") ?? []);
            }
        };
        
        loadGameResults();

    }, [emailAddress]);

    const addGameResult = async (gameResult) => {

        const newResults = [
            ...results
            , gameResult
        ]

        setResults(newResults);

        // await localforage.setItem("gameResults", newResults);
        await saveGameToCloud(
            emailAddress
            , 'tca-cribbage'
            , gameResult.end   // new Date().toISOString()
            , gameResult
            );
    };

    const [theme, themeToggler] = useDarkMode();
    const themeMode = theme === "light" ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <div className="toggle__btn-container">
                <Toggle theme={theme} toggleTheme={themeToggler} />
            </div>
            <main>
                <Routes>
                    <Route path="/" element={
                        <Home
                            emailAddress={emailAddress}
                            updateEmailAddress={updateEmailAddress}
                         />
                    } />
                    <Route path="setup" element={
                        <SetupGame
                            uniquePreviousPlayers={getUniquePlayers(results)}
                            setCurrentGame={setCurrentGame}
                        />
                    } />
                    <Route path="play" element={<PlayGame
                            currentGame={currentGame}
                            addGameResult={addGameResult}
                     />} />
                    <Route path="stats" element={
                        <Stats
                            gameResults={results}
                        /> } />
                    <Route path="leaderboard" element={
                        <Leaderboard
                            uniquePreviousPlayers={getUniquePlayers(results)}
                            gameResults={results}
                        /> } />
                </Routes>
            </main>
        </ThemeProvider>
    );
}

export default App;

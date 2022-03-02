import "./App.css";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
import { Home } from "./Components/Home/Home";
import { PlayGame } from "./Components/PlayGame/PlayGame";
import { SetupGame } from "./Components/SetupGame/SetupGame";
import { Stats } from "./Components/Stats/Stats";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="setup" element={<SetupGame />} />
                <Route path="play" element={<PlayGame />} />
                <Route path="stats" element={<Stats />} />
            </Routes>
        </>
    );
}

export default App;

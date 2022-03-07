import "./App.scss";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
import { Home } from "./Components/Home/Home";
import { PlayGame } from "./Components/PlayGame/PlayGame";
import { SetupGame } from "./Components/SetupGame/SetupGame";
import { Stats } from "./Components/Stats/Stats";

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


function App() {
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
                <Route path="stats" element={<Stats />} />
            </Routes>
        </>
    );
}

export default App;

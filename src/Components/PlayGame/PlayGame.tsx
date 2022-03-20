import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameResult, User } from "../../App";

export const PlayGame = ({ currentGame }) => {
    // const nav = useNavigate();

    return (
        <>
            <div className="players-container">
                <h2 className="text-center my-2">Who Won the Cut?</h2>
                {/*
                    players.map(x => (
                        <button
                            key={x.name} id={x.name}
                            className="btn btn-success mb-2"
                            onClick={() => orderPlayers(x.name)}
                        >
                            {x.name}
                        </button>
                    ))
                    */}
            </div>
            <div className="container container-play">
                <h1 className="text-center my-2">Play Game</h1>

                <div className="container-points">
                    <div className="form-control">
                        <input id="points-hand" type="text" autoFocus required />
                        <label><span>Hand Points</span></label>
                    </div>

                    <div id="crib" className="form-control">
                        <input id="points-crib" type="number" required />
                        <label><span>Crib Points</span></label>
                    </div>
                </div>

                <button className="btn btn-info mt-2">
                    Next Turn <i className="fa-solid fa-circle-chevron-right"></i>
                </button>
                <button className="btn btn-success mt-2">
                    Done <i className="fa-solid fa-circle-stop"></i>
                </button>


            </div>
        </>
    );
};

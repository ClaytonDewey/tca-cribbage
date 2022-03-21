import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { gameResult, User } from "../../App";

const initialState = {
    cut: false
    , isCrib: false
    , handPoints: 0
    , cribPoints: 0
    , highHand: 0
    , highCrib: 0
    , score: 0
    , gameOver: false
    , gameResult: {
        start: ""
        , end: ""
        , winner: ""
        , players: ""
        , skunk: false
        , dblSkunk: false
        , skunked: false
        , dblSkunked: false
        , highHand: 0
        , highPegg: 0
    }
}


const reducer = (state, action) => {
    switch (action.type) {
        case "setCut":
            return {
                ...state
                , cut: action.cut
            };
        case "isCrib":
            return {
                ...state
                , isCrib: action.isCrib
            }
    }
}

export const PlayGame = ({ currentGame }) => {
    // const nav = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { players } = currentGame;

    const orderPlayers = (player: string) => {
        dispatch({
            type: "setCut"
            , cut: true
        })
        if (player === User) {
            dispatch({
                type: "isCrib"
                , isCrib: true
            })
        }
    }

    return (
        <>
            <div className={`players-container ${!state.cut ? "open" : ""}`}>
                <h2 className="text-center my-2">Who Won the Cut?</h2>
                {
                    players.map(x => (
                        <button
                            key={x.name} id={x.name}
                            className="btn btn-success mb-2"
                            onClick={() => orderPlayers(x.name)}
                        >
                            {x.name}
                        </button>
                    ))
                }
            </div>
            <div className="container container-play">
                <h1 className="text-center my-2">Play Game</h1>

                <div className="container-points">
                    <div className="form-control">
                        <input id="points-hand" type="text" autoFocus required />
                        <label><span>Hand Points</span></label>
                    </div>

                    {
                        state.isCrib && (
                            <div id="crib" className="form-control">
                                <input id="points-crib" type="number" required />
                                <label><span>Crib Points</span></label>
                            </div>
                        )
                    }
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

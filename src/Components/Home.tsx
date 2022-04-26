import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cardsIcon } from "./Icons";

export const Home = ({ emailAddress, updateEmailAddress }) => {
    const nav = useNavigate();
    const [emailForEditing, setEmailForEditing] = useState(emailAddress);

    return (
        <>
                <div className="container container-home">
                    <h1 className="text-center my-2">Cribbage {cardsIcon()}</h1>

                    { emailAddress.length > 0 ?
                        <>
                            <h3>{emailAddress}</h3>
                            <button className="btn btn-success mt-2" onClick={() => nav("/setup")}>
                                New Game <i className="fa-solid fa-circle-play"></i>
                            </button>

                            <button className="btn btn-info mt-2" onClick={() => nav("/stats")}>
                                Stats <i className="fa-solid fa-chart-line"></i>
                            </button>
                            
                            <button className="btn btn-warning mt-2" onClick={() => nav("/leaderboard")}>
                                Leaderboard <i className="fa-solid fa-medal"></i>
                            </button>

                            <button
                                className="btn btn-danger mt-2"
                                onClick={() => updateEmailAddress("")}
                            >
                                Sign Out <i className="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </>
                        :
                        <>
                            <div className="form-control">
                                <input
                                    required
                                    value={emailForEditing}
                                    onChange={(e) => setEmailForEditing(e.target.value)}
                                />
                                <label>
                                    <span>Email Address</span>
                                </label>
                            </div>
                            <button
                                className="btn btn-success"
                                onClick={() => updateEmailAddress(emailForEditing)}
                            >
                                Sign In <i className="fa-solid fa-right-to-bracket"></i>
                            </button>
                        </>
                    }
                </div>
        </>
    );
};

import React from "react";
import { func, string } from "prop-types";

const Toggle = ({theme, toggleTheme }) => {
    return (
        <div className="toggle-container">
            <input type="checkbox" id="mode" className="toggle" onChange={toggleTheme} />
            <label htmlFor="mode" className="label">
                <div className="ball"></div>
            </label>
            <span>{ theme } Mode</span>
        </div>
    );
};

Toggle.protoTypes = {
    theme: string.isRequired
    , toggleTheme: func.isRequired
}
export default Toggle;
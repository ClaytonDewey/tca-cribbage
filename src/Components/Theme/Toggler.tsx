import { func, string } from "prop-types";

const Toggle = ({ theme, toggleTheme }) => {
    return (
        <>
            <i className="fa-solid fa-sun"></i>
            <div className="toggle-container">
                <input type="checkbox" id="mode" className={`toggle ${theme}`} onChange={toggleTheme} />
                <label htmlFor="mode" className="label">
                    <div className="ball"></div>
                </label>
                {/* <span>{theme} Mode </span> */}
            </div>
            <i className="fa-solid fa-moon"></i>
        </>
    )
}

Toggle.protoTypes = {
    theme: string.isRequired
    , toggleTheme: func.isRequired
}
export default Toggle;
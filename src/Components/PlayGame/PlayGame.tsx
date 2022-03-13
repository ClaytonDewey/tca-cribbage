import { useNavigate } from "react-router-dom";

const nextTurn = () => {
    const crib = document.getElementById("crib");
    const points_hand = document.getElementById("points-hand") as HTMLInputElement;
    const points_crib = document.getElementById("points-crib") as HTMLInputElement;
    crib?.classList.toggle("display-n");
    points_hand?.focus();
    points_hand.value = "";
    points_crib.value = "";
}

export const PlayGame = () => {
    const nav = useNavigate();

    const endGame = () => {
        nav(-2);
    };


    return (
        <div className="container container-play">
            <h1 className="text-center my-2">Play Game</h1>
            <div className="container-points">
                <div className="form-control">
                    <input id="points-hand" type="number" autoFocus required />
                    <label><span>Hand Points</span></label>
                </div>

                <div id="crib" className="form-control">
                    <input id="points-crib" type="number" required />
                    <label><span>Crib Points</span></label>
                </div>
            </div>

            <button className="btn btn-info mt-2" onClick={nextTurn}>
                Next Turn <i className="fa-solid fa-circle-chevron-right"></i>
            </button>

            <button className="btn btn-success mt-2" onClick={endGame}>
                Done <i className="fa-solid fa-circle-stop"></i>
            </button>
        </div>
    );
};

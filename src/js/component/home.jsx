import React from "react";
import CountdownTimer from "./count"; // Asegúrate de que el nombre del archivo sea correcto

const Home = () => {
    return (
        <div className="text-center">
            <CountdownTimer initialSeconds={0} />
        </div>
    );
};

export default Home;

import React, { useState, useEffect, useRef } from "react";
import "../../styles/index.css"; // Importa el archivo CSS

const CountdownTimer = ({ initialSeconds }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [alertAt, setAlertAt] = useState(0); // Estado para el valor de alerta
    const [countdownStart, setCountdownStart] = useState(initialSeconds); // Estado para el valor de inicio de la cuenta regresiva
    const [isRunning, setIsRunning] = useState(true);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (seconds === alertAt) {
            alert(`¡Has alcanzado ${alertAt} segundos!`);
        }

        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, seconds, alertAt]);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    const pauseTimer = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    };

    const resetTimer = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
        setSeconds(countdownStart);
    };

    const resumeTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    const formatTime = (time) => {
        return String(time).padStart(5, '0').split('');
    };

    const handleAlertChange = (e) => {
        setAlertAt(Number(e.target.value));
    };

    const handleCountdownChange = (e) => {
        const value = Number(e.target.value);
        setCountdownStart(value);
        setSeconds(value);
    };

    return (
        <div className="timer-container">
            <h1>My Counter</h1>
            <div className="display">
                <div className="digit-box">🕒</div>
                {formatTime(seconds).map((digit, index) => (
                    <div key={index} className="digit-box">{digit}</div>
                ))}
            </div>
            <div className="controls">
                <button onClick={startTimer}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resumeTimer}>Resume</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
            <div className="inputs">
                <div className="alert-input">
                    <label htmlFor="alertAt">Alerta en segundos:</label>
                    <input
                        type="number"
                        id="alertAt"
                        value={alertAt}
                        onChange={handleAlertChange}
                    />
                </div>
                <div className="countdown-input">
                    <label htmlFor="countdownStart">Inicio de cuenta regresiva:</label>
                    <input
                        type="number"
                        id="countdownStart"
                        value={countdownStart}
                        onChange={handleCountdownChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;

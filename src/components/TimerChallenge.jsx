import { useState, useRef } from "react";

import './ResultModal';
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {

    const dialog = useRef();
    const timer = useRef(); // timer is component insant specific
    // ref vs state vs variable

    // ref: for component instance specific data, that doesn't trigger re-render.
    // refs should not display on the UI
    // state: for component instance specific data, that triggers re-render
    // variable: gets re-created on every re-render

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        setTimeRemaining(targetTime * 1000);
        dialog.current.open();
    }


    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
            // dialog.current.open(); // showModal is a method of dialog element. It is related to html dialog element
        }, 10);

        setTimerStarted(true);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }

    return (
        <>
            {<ResultModal ref={dialog} targetTime={targetTime} result="lost" />}
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challange
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>)
}
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

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);


    function handleStart() {
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.open(); // showModal is a method of dialog element. It is related to html dialog element
        }, targetTime * 1000);

        setTimerStarted(true);
    }

    function handleStop() {
        clearTimeout(timer.current);
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
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Challange
                    </button>
                </p>
                <p className={timerStarted ? 'active' : undefined}>
                    {timerStarted ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>)
}
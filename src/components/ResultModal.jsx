import { forwardRef } from 'react';


const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
    // by default dialog is hidden, open attribute makes it visible
    return (<dialog ref={ref} className="result-modal">
        <h2>You {result}</h2>
        <p>The target time was:
            <strong>{targetTime} seconds.</strong>
        </p>
        <p>You stopped the timer with
            <strong>X seconds left.</strong>
        </p>
        {/* method="dialog" is part of modern HTML */}
        <form method="dialog">
            <button>Close</button>
        </form>
    </dialog>)
})

export default ResultModal;
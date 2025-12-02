import { useDispatch } from "react-redux";
import { tick } from "../features/pomodoro-session/sessionSlice";
import { useEffect, useState } from "react";

export const useTimer = () => {
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const dispatch = useDispatch();
    const startTimer = () => {
        const intervalId = setInterval(() => {
            dispatch(tick());
        }, 1000);
        setIntervalId(intervalId);
    }

    useEffect(() => {
        return () => {
            stopTimer();
        }
    }, []);

    const stopTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }

    return { startTimer, stopTimer }
}

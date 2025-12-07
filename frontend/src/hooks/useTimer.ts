import { useDispatch } from "react-redux";
import { useEffect, useRef, useCallback } from "react";
import type { ActionCreator, UnknownAction } from "@reduxjs/toolkit";

export const useTimer = (actionCreator: ActionCreator<UnknownAction>) => {
    const intervalRef = useRef<number | null>(null);
    const dispatch = useDispatch();
    
    const stopTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            console.log('interval already exists');
            return;
        }

        intervalRef.current = setInterval(() => {
            dispatch(actionCreator());
        }, 1000);
    }, [dispatch, actionCreator]);

    useEffect(() => {
        return () => {
            stopTimer();
        };
    }, [stopTimer]);

    return { startTimer, stopTimer }
}

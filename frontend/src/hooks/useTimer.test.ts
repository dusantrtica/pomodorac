import { afterEach, beforeEach, describe, expect, it, vi, type Mock} from "vitest";
import { renderHook, act} from "@testing-library/react";
import { useTimer } from "./useTimer";
import { createAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

vi.mock('react-redux', () => ({
    useDispatch: vi.fn()
}));

const createTestTickAction = createAction<void, 'TEST_TICK'>('TEST_TICK');

describe('useTimer', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should dispatch the action every second', async () => {
        const mockDispatch = vi.fn();
        (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
        const { result } = renderHook(() => useTimer(createTestTickAction));
        const { startTimer } = result.current;
        startTimer();
        await act(async () => {
            vi.advanceTimersByTime(5000);
        });
        expect(mockDispatch).toHaveBeenCalledTimes(5);
        expect(mockDispatch).toHaveBeenCalledWith(createTestTickAction());   
    });

    it('should stop the timer when the stopTimer is called', async () => {
        const mockDispatch = vi.fn();
        (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
        const { result } = renderHook(() => useTimer(createTestTickAction));
        
        await act(async () => {
            result.current.startTimer();
        });

        await act(async () => {
            result.current.startTimer();
        });
        await act(async () => {
            result.current.stopTimer();
        });
        await act(async () => {
            vi.advanceTimersByTime(5000);
        });
        expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
})

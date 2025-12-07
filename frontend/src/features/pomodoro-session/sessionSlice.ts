import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SESSION_LENGTHS, SHORT_BREAK_COUNT, type SessionType } from "./constants";
import { tickAction } from "./action-creators";

export type InitialState = {
    currentSession: SessionType;
    pastSessions: SessionType[];
    remainingTime: number;
    isRunning: boolean;
}

export const initialState: InitialState = {
    currentSession: 'focus',
    pastSessions: [] as SessionType[],
    remainingTime: SESSION_LENGTHS['focus'],
    isRunning: false,
}

export const getNextSession = (state: InitialState): InitialState => {
    state.isRunning = false;
    state.pastSessions.push(state.currentSession);

    if (state.currentSession === 'short_break' || state.currentSession === 'long_break') {
        state.currentSession = 'focus';
    } else {
        const shortBreakCount = state.pastSessions.filter(session => session === 'short_break').length;
        if (shortBreakCount < SHORT_BREAK_COUNT) {
            state.currentSession = 'short_break';
        } else {
            state.currentSession = 'long_break';
        }
    }
    state.remainingTime = SESSION_LENGTHS[state.currentSession];
    return state;
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setCurrentSessionType: (state, action: PayloadAction<SessionType>) => {
            state.currentSession = action.payload;
            state.remainingTime = SESSION_LENGTHS[action.payload];
            state.isRunning = false;
        },
        startSession: (state) => {
            state.isRunning = true;
        },
        stopSession: (state) => {
            state.isRunning = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(tickAction, (state) => {
            if (state.isRunning) {
                if (state.remainingTime > 0) {
                    state.remainingTime -= 1;
                } else {
                    state = getNextSession(state);
                }
            }
        });
    },
});

export const { setCurrentSessionType, startSession, stopSession } = sessionSlice.actions;
export default sessionSlice.reducer;

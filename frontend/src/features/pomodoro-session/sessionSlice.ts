import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SESSION_LENGTHS, type SessionType } from "./constants";

type InitialState = {
    currentSession: SessionType;
    pastSessions: SessionType[];
    remainingTime: number;
}

const initialState: InitialState = {
    currentSession: 'focus',
    pastSessions: [] as SessionType[],
    remainingTime: SESSION_LENGTHS['focus']
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setCurrentSessionType: (state, action: PayloadAction<SessionType>) => {
            state.currentSession = action.payload;
        },
        tick: (state) => {
            state.remainingTime -= 1;
        },
    },
});

export const { setCurrentSessionType, tick } = sessionSlice.actions;
export default sessionSlice.reducer;
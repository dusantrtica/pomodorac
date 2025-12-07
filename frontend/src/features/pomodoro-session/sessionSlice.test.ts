import { expect, describe, it } from "vitest";
import sessionSlice, { getNextSession, initialState, startSession, stopSession } from "./sessionSlice";
import { setCurrentSessionType } from "./sessionSlice";
import { SESSION_LENGTHS, type SessionType } from "./constants";
import {  type InitialState } from "./sessionSlice";
import { tickAction } from "./action-creators";

describe('sessionSlice', () => {
    it('should decrement the remaining time when the tick action is dispatched and the session is running', () => {
        const initialState: InitialState = {
            currentSession: 'focus',
            pastSessions: [] as SessionType[],
            remainingTime: 100,
            isRunning: true,
        }
        const state = sessionSlice(initialState, tickAction());
        expect(state.remainingTime).toBe(99);
    });

    it('should not decrement the remaining time when the tick action is dispatched and the session is not running', () => {
        const initialState: InitialState = {
            currentSession: 'focus',
            pastSessions: [] as SessionType[],
            remainingTime: 100,
            isRunning: false,
        }
        const state = sessionSlice(initialState, tickAction());
        expect(state.remainingTime).toBe(100);
    });

    it('should set the session to the next session when the remaining time is 0, reset the remaining time to the new session length, and stop the session', () => {
        const initialState: InitialState = {
            currentSession: 'focus',
            pastSessions: [] as SessionType[],
            remainingTime: 0,
            isRunning: true,
        }
        const state = sessionSlice(initialState, tickAction());
        
        expect(state.currentSession).toBe('short_break');
        expect(state.remainingTime).toBe(SESSION_LENGTHS['short_break']);
        expect(state.pastSessions).toEqual(['focus']);
        expect(state.isRunning).toBe(false);
    });

    it('should set isRunning to true when the startSession action is dispatched', () => {
        const initialState: InitialState = {
            currentSession: 'focus',
            pastSessions: [] as SessionType[],
            remainingTime: 0,
            isRunning: false,
        }
        const state = sessionSlice(initialState, startSession());
        expect(state.isRunning).toBe(true);
    });

    it('should set isRunning to false when the stopSession action is dispatched', () => {
        const initialState: InitialState = {
            currentSession: 'focus',
            pastSessions: [] as SessionType[],
            remainingTime: 0,
            isRunning: true,
        }
        const state = sessionSlice(initialState, stopSession());
        expect(state.isRunning).toBe(false);
    });

    it('should set the current session to the next session when the setCurrentSessionType action is dispatched', () => {
        const initialState: InitialState = {
            currentSession: 'focus',
            pastSessions: [] as SessionType[],
            remainingTime: 0,
            isRunning: true,
        }
        const state = sessionSlice(initialState, setCurrentSessionType('short_break'));
        expect(state.currentSession).toBe('short_break');
        expect(state.remainingTime).toBe(SESSION_LENGTHS['short_break']);
        expect(state.isRunning).toBe(false);
    });

    describe('getNextSession', () => {
        it('should return the next session when the current session is focus', () => {
            const initialState: InitialState = {
                currentSession: 'focus',
                pastSessions: [] as SessionType[],
                remainingTime: 2,
                isRunning: true,
            }
            const nextState = getNextSession(initialState);
            expect(nextState.currentSession).toBe('short_break');
            expect(nextState.remainingTime).toBe(SESSION_LENGTHS['short_break']);
            expect(nextState.isRunning).toBe(false);
            expect(nextState.pastSessions).toEqual(['focus']);
        });
    });
});
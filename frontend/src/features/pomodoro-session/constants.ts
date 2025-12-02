export type SessionType = 'focus' | 'short_break' | 'long_break';

export const FOCUS_SESSION_LENGTH = 25 * 60;
export const SHORT_BREAK_SESSION_LENGTH = 5 * 60;
export const LONG_BREAK_SESSION_LENGTH = 15 * 60;

export const SESSION_LENGTHS: Record<SessionType, number> = {
    focus: FOCUS_SESSION_LENGTH,
    short_break: SHORT_BREAK_SESSION_LENGTH,
    long_break: LONG_BREAK_SESSION_LENGTH,
} as const;
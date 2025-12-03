import { describe, it, expect } from 'vitest';
import { formatTime } from "./utils";

describe('formatTime', () => {
    it('should format time correctly', () => {
        expect(formatTime(0)).toBe('00:00');
    });

    it('should format time correctly', () => {
        expect(formatTime(60)).toBe('01:00');
    });

    it('should format time correctly', () => {
        expect(formatTime(120)).toBe('02:00');
    });

    it('should format time correctly', () => {
        expect(formatTime(189)).toBe('03:09');
    });
});
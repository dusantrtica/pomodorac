import { render, screen } from "@testing-library/react";
import { Counter } from "./Counter";
import { describe, it, expect } from "vitest";

describe('Counter', () => {
    it('should render the counter', () => {
        render(<Counter value={0} />);
        expect(screen.getByTestId('counter').textContent).toBe('00:00');
    });

    it('should render the counter with the correct time', () => {
        render(<Counter value={60} />);
        expect(screen.getByTestId('counter').textContent).toBe('01:00');
    });

    it('should render the counter with the correct time', () => {
        render(<Counter value={120} />);
        expect(screen.getByTestId('counter').textContent).toBe('02:00');
    });
});

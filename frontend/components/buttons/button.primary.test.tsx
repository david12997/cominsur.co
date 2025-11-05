import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonPrimary from "./button.primary";

/**
 * button.primary.test.tsx
 *
 * Basic tests for components/buttons/button.primary.tsx
 */


const push = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({ push }),
}));

afterEach(() => {
    jest.clearAllMocks();
    cleanup();
});

describe("ButtonPrimary", () => {
    it("renders string children", () => {
        const { getByText } = render(<ButtonPrimary>Click me</ButtonPrimary>);
        expect(getByText("Click me")).toBeInTheDocument();
    });

    it("renders JSX children", () => {
        const { getByText } = render(
            <ButtonPrimary>
                <span>Inner element</span>
            </ButtonPrimary>
        );
        expect(getByText("Inner element")).toBeInTheDocument();
    });


    it("calls onClick when clicked and no redirectTo is provided", () => {
        const onClick = jest.fn();
        const { getByText } = render(<ButtonPrimary onClick={onClick}>Press</ButtonPrimary>);
        const btn = getByText("Press");
        fireEvent.click(btn);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(push).not.toHaveBeenCalled();
    });

    it("calls router.push with redirectTo when provided and does not call onClick", () => {
        const onClick = jest.fn();
        const { getByText } = render(
            <ButtonPrimary onClick={onClick} redirectTo="/target">
                Go
            </ButtonPrimary>
        );
        const btn = getByText("Go");
        fireEvent.click(btn);
        expect(push).toHaveBeenCalledWith("/target");
        expect(onClick).not.toHaveBeenCalled();
    });

    it("is disabled when disabled prop is true", () => {
        const { getByText } = render(<ButtonPrimary disabled>Disabled</ButtonPrimary>);
        const btn = getByText("Disabled") as HTMLButtonElement;
        expect(btn).toBeDisabled();
    });
});
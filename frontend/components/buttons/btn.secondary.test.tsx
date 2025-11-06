import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        pathname: "/",
    }),
    usePathname: () => "/",
    useSearchParams: () => ({
        get: () => null,
        toString: () => "",
    }),
}));

import BtnSecondary from "./btn.secondary";

describe("BtnSecondary component", () => {
    test("renders with provided text and default inline styles", () => {
        render(<BtnSecondary text="Click me" />);

        const btn = screen.getByRole("button", { name: /click me/i });
        // presence is guaranteed by getByRole; assert content and default inline styles
        expect(btn.textContent).toBe("Click me");
        expect(btn.style.width).toBe("100%");
        expect(btn.style.height).toBe("50px");
        expect(btn.style.fontSize).toBe("18px");
    });

    test("calls onClick when clicked", () => {
        const handleClick = jest.fn();
        render(<BtnSecondary text="Press" onClick={handleClick} />);

        const btn = screen.getByRole("button", { name: /press/i });
        fireEvent.click(btn);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("applies custom width, height and fontSize props to inline styles", () => {
        render(<BtnSecondary text="Custom" width={200} height="60px" fontSize={14} />);

        const btn = screen.getByRole("button", { name: /custom/i });
        // numeric width/fontSize become px when applied as React inline styles
        expect(btn.style.width).toBe("200px");
        expect(btn.style.height).toBe("60px");
        expect(btn.style.fontSize).toBe("14px");
    });
});
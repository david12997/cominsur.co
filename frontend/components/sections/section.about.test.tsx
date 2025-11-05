import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import SectionAbout from "./section.about";

jest.mock("next/image", () => {
    return ({ src, alt, width, height, ...props }: any) => {
        const srcStr = typeof src === "string" ? src : src?.src ?? "";
        return <img src={srcStr} alt={alt} width={width} height={height} {...props} />;
    };
});

jest.mock("../buttons/button.primary", () => {
    return {
        __esModule: true,
        default: ({ children, redirectTo, color, backgroundColor, border }: any) => (
            <button
                data-testid="button-primary"
                data-redirect={redirectTo}
                data-color={color}
                data-bg={backgroundColor}
                data-border={border}
            >
                {children}
            </button>
        ),
    };
});

describe("SectionAbout component - basic tests", () => {
    test("renders section title", () => {
        render(<SectionAbout />);
        // getByText throws if not found, so asserting truthy is sufficient without jest-dom matchers
        expect(screen.getByText(/SOBRE COMINSUR/i)).toBeTruthy();
    });

    test("renders company description text", () => {
        render(<SectionAbout />);
        expect(screen.getByText(/Empresa importadora de aluminio/i)).toBeTruthy();
    });

    test("renders the Next Image with correct alt", () => {
        render(<SectionAbout />);
        const img = screen.getByAltText("Cominsur Logo") as HTMLImageElement;
        expect(img).toBeTruthy();
        expect(img.src).toContain("cms.cominsur.com.co");
    });

    test("renders primary button with expected label and redirect prop", () => {
        render(<SectionAbout />);
        const btn = screen.getByTestId("button-primary");
        expect(btn).toBeTruthy();
        // use DOM properties/methods instead of jest-dom matchers
        expect(btn.textContent).toMatch(/Ver Catalogo/i);
        expect(btn.getAttribute("data-redirect")).toBe("/catalogo");
        expect(btn.getAttribute("data-bg")).toBe("#FDC809");
        expect(btn.getAttribute("data-color")).toBe("#000032");
    });
});
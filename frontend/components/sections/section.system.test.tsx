import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SectionSystem from "./section.system";

// Mock next/image to render a regular img for testing
jest.mock("next/image", () => {
    return {
        __esModule: true,
        default: ({ src, alt, ...props }: any) => {
            // handle either string src or object (next/future image)
            const resolvedSrc = typeof src === "string" ? src : src?.src ?? "";
            // eslint-disable-next-line jsx-a11y/alt-text
            return <img src={resolvedSrc} alt={alt} {...props} />;
        },
    };
});

// Mock next/link to simply render children
jest.mock("next/link", () => {
    return {
        __esModule: true,
        default: ({ children }: any) => {
            return <span>{children}</span>;
        },
    };
});

// Mock next/navigation to avoid "invariant expected app router to be mounted" in tests
jest.mock("next/navigation", () => {
    return {
        __esModule: true,
        useRouter: () => ({
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn().mockResolvedValue(undefined),
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
        }),
        usePathname: () => "/",
        useSearchParams: () => new URLSearchParams(),
    };
});

// Mock the button wrapper used inside the component so tests do not depend on its implementation
jest.mock(
    "../wrappers/btn.system.wrapper",
    () => {
        return {
            __esModule: true,
            default: ({ text }: { text?: string }) => {
                return <button data-testid="mock-btn-wrapper">{text}</button>;
            },
        };
    }
);

describe("SectionSystem component - basic rendering", () => {
    test("renders defaults when no props are provided", () => {
        render(<SectionSystem />);


        // top title includes the literal "SISTEMA " plus the default title ("SISTEMA 3831")
        const titles = screen.getAllByText(/SISTEMA 3831/i);
        expect(titles.length).toBeGreaterThan(0);

        // description default text should be present
        expect(
            screen.getByText(/El sistema 3831 es un conjunto de perfiles de aluminio/i)
        ).toBeInTheDocument();

        // image should render with the default src (from component default)
        const img = screen.getByAltText("Sistema 3831 Cominsur") as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain("https://cms.cominsur.com.co/cominsur/assets/nsnucnko4tckcgsg");

        // mocked wrapper button should render with expected label
        expect(screen.getByTestId("mock-btn-wrapper")).toHaveTextContent("VER REFERENCIAS");
    });

    test("renders custom title, description and image when props are provided", () => {
        const customTitle = "CUSTOM";
        const customDescription = "This is a custom description for testing.";
        const customImg = "http://example.com/custom.jpg";

        render(
            <SectionSystem title={customTitle} description={customDescription} imgUrl={customImg} />
        );

        // Title should reflect provided title (multiple elements may contain the title text)
        const titleMatches = screen.getAllByText(new RegExp(`SISTEMA ${customTitle}`, "i"));
        expect(titleMatches.length).toBeGreaterThan(0);

        // Custom description should be present
        expect(screen.getByText(customDescription)).toBeInTheDocument();

        // Image should have the provided src
        const img = screen.getByAltText("Sistema 3831 Cominsur") as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain(customImg);
    });
});
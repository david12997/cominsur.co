import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import MapContact from "./map";

const ref = React.createRef<HTMLDivElement>();

jest.mock("../../hooks/useGoogleMap", () => {
    return {
        __esModule: true,
        default: () => ({ htmlRef: ref }),
    };
});


afterEach(() => {
    cleanup();
    // reset ref.current between tests
    (ref as React.MutableRefObject<HTMLDivElement | null>).current = null;
});

describe("MapContact component", () => {
    it("renders a div with id 'map' and correct class", () => {
        const { container } = render(<MapContact />);
        const mapEl = container.querySelector("#map") as HTMLDivElement | null;
        expect(mapEl).toBeInTheDocument();
        expect(mapEl).toHaveClass("rounded-md");
    });

    it("attaches the ref to the map element and has inline height/width 100%", () => {
        const { container } = render(<MapContact />);
        const mapEl = container.querySelector("#map") as HTMLDivElement | null;
        expect(mapEl).not.toBeNull();
        // ref.current should point to the rendered DOM node
        expect(ref.current).toBe(mapEl);
        // inline styles
        expect(mapEl?.style.height).toBe("100%");
        expect(mapEl?.style.width).toBe("100%");
    });
});
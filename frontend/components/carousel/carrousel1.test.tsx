import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock next/navigation to provide a router with push()
jest.mock('next/navigation', () => ({
    __esModule: true,
    useRouter: () => ({ push: jest.fn() }),
}));

// Mock next/image to render a plain img so tests can assert without Next's image optimizations
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, width, height }: any) => <img src={src} alt={alt} width={width} height={height} />,
}));

import Carousel1 from "./carousel1";


describe("Carrousel1 component", () => {
    it("renders without crashing", () => {
        const { container } = render(<Carousel1 
            bannersDesktop={['/images/banner1.jpg', '/images/banner2.jpg']} 
            bannersMobile={['/images/banner1_mobile.jpg', '/images/banner2_mobile.jpg']}
        />);
        expect(container).toBeTruthy();
    });

    it("matches snapshot", () => {
        const { asFragment } = render(<Carousel1
            bannersDesktop={['/images/banner1.jpg', '/images/banner2.jpg']}
            bannersMobile={['/images/banner1_mobile.jpg', '/images/banner2_mobile.jpg']}
        />);
        expect(asFragment()).toMatchSnapshot();
    });
});
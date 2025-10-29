import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nav1 from './nav1';

// Mock next/image to render a plain img so we can assert on alt/src
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt }: any) => {
        // eslint-disable-next-line jsx-a11y/alt-text
        return <img src={src} alt={alt} />;
    },
}));

// Mock next/link to render a plain <a> so hrefs are present in DOM
jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

describe('Nav1 component', () => {
    test('renders without crashing', () => {
        const { container } = render(<Nav1 />);
        expect(container).toBeInTheDocument();
    });

    test('renders logo image when provided (src + alt)', () => {
        const logoSrc = 'https://example.com/logo.png';
        const logoAlt = 'Acme Co.';
        render(<Nav1 logoSrc={logoSrc} logoAlt={logoAlt} />);

        const img = screen.getByAltText(logoAlt);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', logoSrc);
    });

    test('renders provided navigation items as links with correct hrefs', () => {
        const items = [
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
        ];
        render(<Nav1 links={items} />);

        items.forEach((it) => {
            const link = screen.getByRole('link', { name: it.label });
            expect(link).toBeInTheDocument();
            // link should have the provided href
            expect(link).toHaveAttribute('href', it.href);
        });

        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(items.length);
    });

    test('renders get-quote link with provided label and href', () => {
        const label = 'Get Quote';
        const href = '/cotizar-now';
        render(<Nav1 btnGetQuoteLabel={label} btnGetQuoteHref={href} />);

        const quoteLink = screen.getByRole('link', { name: label });
        expect(quoteLink).toBeInTheDocument();
        expect(quoteLink).toHaveAttribute('href', href);
    });

    test('links are keyboard focusable', () => {
        const items = [{ label: 'One', href: '/one' }];
        render(<Nav1 links={items} />);

        const link = screen.getByRole('link', { name: 'One' });
        link.focus();
        expect(link).toHaveFocus();

        // pressing Enter should not throw; ensure link exists and is actionable
        fireEvent.keyDown(link, { key: 'Enter', code: 'Enter' });
        expect(link).toBeTruthy();
    });
});
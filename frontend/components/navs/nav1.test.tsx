import { JSX } from 'react';
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

// Mock NewRequests so tests don't perform real network calls. Return a sensible shape.
jest.mock('../../../helpers/request.data', () => ({
    __esModule: true,
    NewRequests: jest.fn().mockResolvedValue([
        {
            // adapt to whatever your API returns; Nav1 only logs brandData so any value is fine
            id: 'brand-1',
            data: [{ image: 'https://example.com/logo.png' }],
        },
    ]),
}));

describe('Nav1 component', () => {
    test('renders without crashing (server component)', async () => {
        // Server components are async; call the component function and render its returned element
        const element = await (Nav1 as unknown as (props: any) => Promise<JSX.Element>)({});
        const { container } = render(element);
        expect(container).toBeInTheDocument();
    });

    test('renders logo image when provided (src + alt)', async() => {
        const logoSrc = 'https://example.com/logo.png';
        const logoAlt = 'Acme Co.';
        const element = await (Nav1 as unknown as (props: any) => Promise<JSX.Element>)({ logoSrc, logoAlt });
        render(element);

        const img = await screen.findByAltText(logoAlt);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', logoSrc);
    });

    test('renders provided navigation items as links with correct hrefs', async() => {
        const items = [
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
        ];
        const element = await (Nav1 as unknown as (props: any) => Promise<JSX.Element>)({ links: items });
        render(element);

        for (const it of items) {
            const link = screen.getByRole('link', { name: it.label });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', it.href);
        }

        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(items.length + 1); // includes brand link
    });

    test('renders get-quote link with provided label and href', async() => {
        const label = 'Get Quote';
        const href = '/cotizar-now';
        const element = await (Nav1 as unknown as (props: any) => Promise<JSX.Element>)({ btnGetQuoteLabel: label, btnGetQuoteHref: href });
        render(element);

        const quoteLink = screen.getByRole('link', { name: label });
        expect(quoteLink).toBeInTheDocument();
        expect(quoteLink).toHaveAttribute('href', href);
    });

    test('links are keyboard focusable', async() => {
        const items = [{ label: 'One', href: '/one' }];
        const element = await (Nav1 as unknown as (props: any) => Promise<JSX.Element>)({ links: items });
        render(element);

        const link = screen.getByRole('link', { name: 'One' });
        link.focus();
        expect(link).toHaveFocus();

        fireEvent.keyDown(link, { key: 'Enter', code: 'Enter' });
        expect(link).toBeTruthy();
    });
});
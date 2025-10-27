
import { render, screen } from '@testing-library/react';
import BtnQuote from './button.quote';

// We recommend installing an extension to run jest tests.


describe('BtnQuote component', () => {
    it('renders a button with the class "cominsur-btn-quote"', () => {
        render(<BtnQuote text="Request" />);
        const button = screen.getByRole('button', { name: /Request/i });
        expect(button).toBeDefined();
        expect(button.className).toContain('cominsur-btn-quote');
    });

    it('renders the provided button text', () => {
        render(<BtnQuote text="Get Quote" />);
        const el = screen.getByText('Get Quote');
        expect(el).toBeDefined();
    });
});
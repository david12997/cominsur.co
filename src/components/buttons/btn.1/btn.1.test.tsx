import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Btn1 from './btn.1';

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));

describe('Btn1 tests', () => {
    it('should render', () => {
        expect(render(<Btn1 bg='red'text='hola btn' color='white' />)).toBeTruthy();
    });
    it('should have text', () => {
        render(<Btn1 bg='red'text='hola btn' color='white' />);
        expect(screen.getByText('hola btn')).toBeInTheDocument();
    });

});
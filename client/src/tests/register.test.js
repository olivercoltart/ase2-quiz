import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './register'; // use lowercase if that's your actual file name
import '@testing-library/jest-dom';

global.fetch = jest.fn(); // mock fetch

describe('Register Component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('renders all input fields and register button', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/register/i)).toBeInTheDocument();
    });

    test('displays error message on failed registration', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Email already exists' }),
        });

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/name/i), {
            target: { value: 'Luna' },
        });
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'luna@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByText(/register/i));

        await waitFor(() =>
            expect(screen.getByText(/email already exists/i)).toBeInTheDocument()
        );
    });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

global.fetch = jest.fn(); // mock fetch

describe('Login Component', () => {
    beforeEach(() => {
        fetch.mockClear(); // reset mock between tests
    });

    test('renders email and password inputs and login button', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    test('displays error message on failed login', async () => {
        // mock a failed response
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Invalid credentials' }),
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Fill out form
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: 'wrong@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: 'wrongpassword' },
        });

        fireEvent.click(screen.getByText(/login/i));

        await waitFor(() =>
            expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
        );
    });
});

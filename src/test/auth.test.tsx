import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { LoginCard } from '../components/auth/LoginCard';
import ForgotPasswordPage from '../pages/ForgotPassword';

const mockedLogin = vi.fn();
const mockedResetPassword = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockedLogin,
    resetPassword: mockedResetPassword,
    error: null,
    loading: false,
  }),
}));

describe('LoginCard', () => {
  it('renders the login form and submit button', () => {
    render(
      <MemoryRouter>
        <LoginCard />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits valid credentials', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginCard />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/email/i), 'gamer@example.com');
    await user.type(screen.getByLabelText(/password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockedLogin).toHaveBeenCalledTimes(1);
    expect(mockedLogin).toHaveBeenCalledWith({
      email: 'gamer@example.com',
      password: 'secret123',
    });
  });
});

describe('ForgotPasswordPage', () => {
  it('renders the forgot password form', () => {
    render(
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /forgot password\?/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
  });

  it('submits a valid email address', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/email address/i), 'player@example.com');
    await user.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(mockedResetPassword).toHaveBeenCalledWith('player@example.com');
  });
});

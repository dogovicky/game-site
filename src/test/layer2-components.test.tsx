import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { LoginCard } from '../components/auth/LoginCard';
import ForgotPasswordPage from '../pages/ForgotPassword';
import { SignupCard } from '../components/auth/SignupCard';

const mockedLogin = vi.fn();
const mockedSignup = vi.fn();
const mockedResetPassword = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockedLogin,
    signup: mockedSignup,
    resetPassword: mockedResetPassword,
    error: null,
    loading: false,
  }),
}));

describe('Layer 2: component behavior', () => {
  it('renders login card essentials', () => {
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

  it('submits valid login form values', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginCard />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/email/i), 'player@example.com');
    await user.type(screen.getByLabelText(/password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockedLogin).toHaveBeenCalledWith({
      email: 'player@example.com',
      password: 'secret123',
    });
  });

  it('renders the signup form and submit action', () => {
    render(
      <MemoryRouter>
        <SignupCard />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('submits valid signup form values', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SignupCard />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/full name/i), 'Alex Carter');
    await user.type(screen.getAllByLabelText(/email/i)[0], 'alex@example.com');
    await user.type(screen.getAllByLabelText(/password/i)[0], 'superSecret123');
    await user.type(screen.getAllByLabelText(/password/i)[1], 'superSecret123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(mockedSignup).toHaveBeenCalledWith({
      name: 'Alex Carter',
      email: 'alex@example.com',
      password: 'superSecret123',
      confirmPassword: 'superSecret123',
    });
  });

  it('renders forgot password form and handles valid submit', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ForgotPasswordPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /forgot password\?/i })).toBeInTheDocument();

    await user.type(screen.getByLabelText(/email address/i), 'recover@example.com');
    await user.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(mockedResetPassword).toHaveBeenCalledWith('recover@example.com');
  });
});

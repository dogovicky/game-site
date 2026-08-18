import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import ForgotPasswordPage from '../pages/ForgotPassword';

const mockResetPassword = vi.fn();
const mockLogin = vi.fn();
const mockSignup = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    login: mockLogin,
    signup: mockSignup,
    resetPassword: mockResetPassword,
    error: null,
    loading: false,
  }),
}));

describe('Layer 3: router and auth flow integration', () => {
  it('shows the login page with navigation to signup and forgot password', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /create an account/i })).toHaveAttribute('href', '/signup');
    expect(screen.getByRole('link', { name: /forgot password\?/i })).toHaveAttribute('href', '/forgot-password');
  });

  it('routes from login to forgot password and submits recovery', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /forgot password\?/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /forgot password\?/i })).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText(/email address/i), 'recover@example.com');
    await user.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(mockResetPassword).toHaveBeenCalledWith('recover@example.com');
  });

  it('routes from login to signup and submits a valid signup form', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /create an account/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /create your account/i })).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText(/full name/i), 'Jamie Lee');
    await user.type(screen.getAllByLabelText(/email/i)[0], 'jamie@example.com');
    await user.type(screen.getAllByLabelText(/password/i)[0], 'superSecret123');
    await user.type(screen.getAllByLabelText(/password/i)[1], 'superSecret123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(mockSignup).toHaveBeenCalledWith({
      name: 'Jamie Lee',
      email: 'jamie@example.com',
      password: 'superSecret123',
      confirmPassword: 'superSecret123',
    });
  });
});

import { describe, expect, it } from 'vitest';
import { loginSchema, signupSchema, resetPasswordSchema } from '../lib/authValidation';

describe('Layer 1: auth validation schemas', () => {
  it('accepts a valid login payload', () => {
    const result = loginSchema.safeParse({
      email: 'player@example.com',
      password: 'secret123',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an invalid email for login', () => {
    const result = loginSchema.safeParse({
      email: 'bad-email',
      password: 'secret123',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid email address');
    }
  });

  it('accepts a valid signup payload', () => {
    const result = signupSchema.safeParse({
      name: 'Alex Carter',
      email: 'alex@example.com',
      password: 'superSecret123',
      confirmPassword: 'superSecret123',
    });

    expect(result.success).toBe(true);
  });

  it('rejects mismatched signup passwords', () => {
    const result = signupSchema.safeParse({
      name: 'Alex Carter',
      email: 'alex@example.com',
      password: 'superSecret123',
      confirmPassword: 'differentPassword',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Passwords do not match');
    }
  });

  it('accepts a valid password reset email', () => {
    const result = resetPasswordSchema.safeParse({
      email: 'reset@example.com',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an invalid reset email', () => {
    const result = resetPasswordSchema.safeParse({
      email: 'invalid',
    });

    expect(result.success).toBe(false);
  });
});

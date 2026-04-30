"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthInput from '../../../components/auth/AuthInput';
import AuthButton from '../../../components/auth/AuthButton';
import GoogleAuthButton from '../../../components/auth/GoogleAuthButton';
import { signUp } from '../../../lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    const { data, error: authError } = await signUp.email({
      email,
      password,
      name: username,
      callbackURL: '/',
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || 'Registration failed. Please try again.');
      return;
    }

    if (data) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <AuthLayout title="Hello! Register to get started" showBack={true}>
      <form onSubmit={handleRegister} className="auth-form">
        <div className="auth-inputs-group">
          <AuthInput
            placeholder="Username"
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <AuthInput
            placeholder="Email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            placeholder="Password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthInput
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <AuthButton type="submit" loading={loading}>Agree and Register</AuthButton>

        <div className="auth-divider">
          <div className="auth-divider-line" />
          <span className="auth-divider-text">Or Register with</span>
          <div className="auth-divider-line" />
        </div>

        <GoogleAuthButton />

        <div className="auth-bottom-link">
          Already have an account?{' '}
          <Link href="/login">Login Now</Link>
        </div>
      </form>
    </AuthLayout>
  );
}

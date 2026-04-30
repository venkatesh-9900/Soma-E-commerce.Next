"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthInput from '../../../components/auth/AuthInput';
import AuthButton from '../../../components/auth/AuthButton';
import GoogleAuthButton from '../../../components/auth/GoogleAuthButton';
import { signIn } from '../../../lib/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: authError } = await signIn.email({
      email,
      password,
      callbackURL: '/',
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || 'Login failed. Please check your credentials.');
      return;
    }

    if (data) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <AuthLayout title="Welcome back! Glad to see you, Again!" showBack={true}>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="auth-inputs-group">
          <AuthInput
            placeholder="Enter your email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <AuthInput
              placeholder="Enter your password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="auth-forgot-link-row">
              <Link href="/forgot-password" className="auth-forgot-link">
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <AuthButton type="submit" loading={loading}>Login</AuthButton>

        <div className="auth-divider">
          <div className="auth-divider-line" />
          <span className="auth-divider-text">Or Login with</span>
          <div className="auth-divider-line" />
        </div>

        <GoogleAuthButton />

        <div className="auth-bottom-link">
          Don&apos;t have an account?{' '}
          <Link href="/register">Register Now</Link>
        </div>
      </form>
    </AuthLayout>
  );
}

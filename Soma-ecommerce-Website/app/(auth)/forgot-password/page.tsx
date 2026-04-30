"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthInput from '../../../components/auth/AuthInput';
import AuthButton from '../../../components/auth/AuthButton';
import { authClient } from '../../../lib/auth-client';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please provide your email');
      return;
    }

    setLoading(true);

    const { data, error: authError } = await authClient.requestPasswordReset({
      email,
      redirectTo: '/new-password',
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || 'Failed to send reset link. Please try again.');
      return;
    }

    // Success — show confirmation and bridge to OTP page for UX continuity
    setSent(true);
    setMessage('A password reset link has been sent to your email.');
    // After 2s, advance to the OTP UI screen (informational bridge)
    setTimeout(() => {
      router.push(`/otp-verification?email=${encodeURIComponent(email)}`);
    }, 2000);
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Don't worry! It occurs. Please enter the email address linked with your account."
      showBack={true}
    >
      <form onSubmit={handleSendCode} className="flex flex-col flex-1 w-full mt-8">

        <AuthInput
          placeholder="Enter your email"
          type="email"
          value={email}
          required
          disabled={sent}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="auth-error">{error}</p>}

        {message && (
          <p className="text-green-600 text-sm mt-2 mb-2 font-medium text-center">
            {message}
          </p>
        )}

        <div className="mt-8 mb-auto">
          <AuthButton type="submit" loading={loading} disabled={sent}>
            {sent ? 'Link Sent ✓' : 'Send Code'}
          </AuthButton>
        </div>

        <div className="text-center mt-12 pb-6">
          <span className="text-[15px] font-medium text-gray-500">Remember Password? </span>
          <Link href="/login" className="text-[15px] font-semibold text-[#38c4c4] hover:text-[#289999] transition-colors">
            Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

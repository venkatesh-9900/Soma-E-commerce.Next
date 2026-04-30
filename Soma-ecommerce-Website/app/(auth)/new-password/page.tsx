"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthInput from '../../../components/auth/AuthInput';
import AuthButton from '../../../components/auth/AuthButton';
import { authClient } from '../../../lib/auth-client';

function NewPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // better-auth injects the reset token into the URL when user clicks the email link
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!token) {
      setError('Invalid or expired reset link. Please request a new one.');
      return;
    }

    setLoading(true);

    const { data, error: authError } = await authClient.resetPassword({
      newPassword,
      token,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || 'Failed to reset password. The link may have expired.');
      return;
    }

    router.push('/success');
  };

  // If no token in URL, user navigated here directly (not from email link)
  const noToken = !token;

  return (
    <form onSubmit={handleReset} className="flex flex-col flex-1 w-full mt-8">

      {noToken && (
        <div style={{
          background: '#fef3c7',
          border: '1px solid #fcd34d',
          borderRadius: '12px',
          padding: '14px 16px',
          marginBottom: '20px',
          fontSize: '13px',
          color: '#92400e',
          lineHeight: 1.5,
        }}>
          ⚠️ No reset token found. Please use the link sent to your email to reset your password.
        </div>
      )}

      <div className="flex flex-col gap-4">
        <AuthInput
          placeholder="New Password (min 8 chars)"
          type="password"
          value={newPassword}
          required
          disabled={noToken}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <AuthInput
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          required
          disabled={noToken}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-4 font-medium text-center">{error}</p>}

      <div className="mt-10 mb-auto">
        <AuthButton type="submit" loading={loading} disabled={noToken}>
          Reset Password
        </AuthButton>
      </div>

    </form>
  );
}

export default function NewPasswordPage() {
  return (
    <AuthLayout
      title="Create new password"
      subtitle="Your new password must be unique from those previously used."
      showBack={true}
    >
      <Suspense fallback={<div className="flex-1 flex justify-center mt-10"><p>Loading...</p></div>}>
        <NewPasswordContent />
      </Suspense>
    </AuthLayout>
  );
}

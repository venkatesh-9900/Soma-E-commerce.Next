"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthButton from '../../../components/auth/AuthButton';

/**
 * OTP Verification Page — UX Bridge
 *
 * Better-auth uses token-based email links (not 4-digit OTP codes).
 * This page serves as an informational UX step after forgot-password sends
 * the reset email. It shows the "check your email" message and provides
 * a resend option via the back button.
 *
 * When the user clicks the link in their email, better-auth will redirect
 * them to /new-password?token=<token> where the actual reset happens.
 */
function OTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    // Advance to new-password — the token will come via browser redirect from email
    router.push('/new-password');
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + '*'.repeat(Math.min(b.length, 6)) + c)
    : 'your email';

  return (
    <div className="flex flex-col flex-1 w-full">

      {/* Email icon visual */}
      <div className="flex justify-center mt-6 mb-6">
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #e0f2fe, #bfdbfe)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="22,6 12,13 2,6" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <p className="text-center text-[15px] text-gray-600 leading-relaxed mb-8 px-2">
        We&apos;ve sent a secure password reset link to{' '}
        <span className="font-semibold text-gray-900">{maskedEmail}</span>.
        <br />
        <span className="text-sm text-gray-400 mt-1 block">
          Please click the link in your email to set a new password.
        </span>
      </p>

      <div className="mt-2">
        <AuthButton type="button" onClick={handleContinue} loading={loading}>
          I&apos;ve Clicked the Link →
        </AuthButton>
      </div>

      <div className="mt-auto pt-8 pb-2 text-center">
        <span className="text-[15px] font-medium text-gray-500">Didn&apos;t receive the email? </span>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-[15px] font-semibold text-[#38c4c4] hover:text-[#289999] transition-colors bg-transparent border-none p-0 cursor-pointer ml-1"
        >
          Go Back & Resend
        </button>
      </div>
    </div>
  );
}

export default function OTPPage() {
  return (
    <AuthLayout
      title="Check Your Email"
      subtitle="A reset link has been sent to your inbox."
      showBack={true}
    >
      <Suspense fallback={<div className="flex-1 flex justify-center mt-10"><p>Loading...</p></div>}>
        <OTPContent />
      </Suspense>
    </AuthLayout>
  );
}

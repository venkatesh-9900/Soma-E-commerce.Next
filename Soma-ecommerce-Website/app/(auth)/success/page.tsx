"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthButton from '../../../components/auth/AuthButton';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <AuthLayout showBack={false}>
      <div className="flex flex-col flex-1 w-full items-center justify-center -mt-10">
        
        {/* Animated Checkmark SVG matching reference */}
        <div className="w-24 h-24 mb-8 text-[#1fd27e]">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M50 0C61.43 0 72.16 3.76 80.89 10.38L86.62 4.65C88.58 2.69 91.75 4.08 91.75 6.85V24.5C91.75 25.88 90.63 27 89.25 27H71.6C68.83 27 67.44 23.83 69.4 21.87L75.69 15.58C68.64 9.92 59.62 6.5 50 6.5C25.98 6.5 6.5 25.98 6.5 50C6.5 74.02 25.98 93.5 50 93.5C74.02 93.5 93.5 74.02 93.5 50C93.5 48.21 94.95 46.75 96.75 46.75C98.55 46.75 100 48.21 100 50C100 77.61 77.61 100 50 100C22.39 100 0 77.61 0 50C0 22.39 22.39 0 50 0Z" fill="currentColor" fillOpacity="0.1"/>
            <circle cx="50" cy="50" r="50" fill="#1fd27e"/>
            <path d="M30 50L45 65L70 35" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="text-[28px] font-bold text-gray-900 mb-3 tracking-tight">
          Password Changed!
        </h2>
        
        <p className="text-[15px] text-gray-500 text-center mb-10 max-w-[280px]">
          Your password has been changed successfully.
        </p>

        <AuthButton onClick={() => router.push('/login')} className="mt-auto md:mt-0">
          Back to Login
        </AuthButton>

      </div>
    </AuthLayout>
  );
}

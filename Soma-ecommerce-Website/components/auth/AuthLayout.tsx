"use client";

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import '../../app/(auth)/auth.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string | React.ReactNode;
  showBack?: boolean;
}

export default function AuthLayout({ children, title, subtitle, showBack = true }: AuthLayoutProps) {
  const router = useRouter();

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="auth-back-btn"
            aria-label="Go back"
          >
            <ChevronLeft size={20} color="#374151" />
          </button>
        )}

        {title && <h1 className="auth-title">{title}</h1>}
        {subtitle && <div className="auth-subtitle">{subtitle}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

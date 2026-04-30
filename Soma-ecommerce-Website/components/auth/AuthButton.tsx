"use client";

import React from 'react';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function AuthButton({ children, loading = false, ...props }: AuthButtonProps) {
  return (
    <button
      className="auth-btn"
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className="auth-spinner" /> : children}
    </button>
  );
}

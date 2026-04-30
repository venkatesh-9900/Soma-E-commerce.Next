"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import { signIn } from '../../lib/auth-client';

export default function GoogleAuthButton() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    const { data, error: authError } = await signIn.social({
      provider: 'google',
      callbackURL: '/',
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || 'Google sign-in failed. Please try again.');
    }
    // On success, better-auth handles the redirect automatically
  };

  return (
    <div className="auth-google-row">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="auth-google-btn"
        aria-label="Continue with Google"
      >
        {loading ? (
          <Loader2 size={24} color="#9ca3af" className="animate-spin" />
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.15C1.44 8.5 1 10.19 1 12s.44 3.5 1.15 4.93l3.69-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.15 7.07l3.69 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        )}
      </button>
      {error && (
        <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>
          {error}
        </p>
      )}
    </div>
  );
}

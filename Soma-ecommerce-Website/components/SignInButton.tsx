"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './SignInButton.module.css';
import { useSession, signOut } from '../lib/auth-client';

const SignInButton = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Loading skeleton
  if (isPending) {
    return <div className={styles.skeleton} aria-hidden="true" />;
  }

  // Signed-in state: show user initial + sign-out button
  if (session?.user) {
    const displayName = session.user.name || session.user.email || 'User';
    const initial = displayName.charAt(0).toUpperCase();

    return (
      <div className={styles.userRow}>
        <div className={styles.avatar} title={displayName}>
          {initial}
        </div>
        <button
          className={styles.signOutBtn}
          onClick={() =>
            signOut().then(() => {
              router.push('/login');
              router.refresh();
            })
          }
          aria-label="Sign out"
        >
          Sign out
        </button>
      </div>
    );
  }

  // Signed-out state: original animated Sign in button
  return (
    <button
      id="sign-in-btn"
      onClick={() => router.push('/login')}
      className={styles.button}
      aria-label="Sign in"
    >
      Sign in
      <div className={styles.arrowWrapper}>
        <div className={styles.arrow} />
      </div>
    </button>
  );
};

export default SignInButton;

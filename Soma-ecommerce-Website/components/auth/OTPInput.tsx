"use client";

import React, { useRef, useState } from 'react';

interface OTPInputProps {
  length?: number;
  onOtpSubmit: (otp: string) => void;
}

export default function OTPInput({ length = 4, onOtpSubmit }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, length).split('');
    if (paste.length === 0 || paste.some(val => isNaN(Number(val)))) return;

    const newOtp = [...otp];
    paste.forEach((char, idx) => { newOtp[idx] = char; });
    setOtp(newOtp);

    const focusIndex = Math.min(paste.length, length - 1);
    inputRefs.current[focusIndex]?.focus();

    if (paste.length === length) onOtpSubmit(newOtp.join(''));
  };

  return (
    <div className="auth-otp-row">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="auth-otp-cell"
          aria-label={`Digit ${index + 1} of OTP code`}
        />
      ))}
    </div>
  );
}

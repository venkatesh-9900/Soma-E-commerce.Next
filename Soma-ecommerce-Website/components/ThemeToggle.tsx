"use client";

import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDark]);

  return (
    <div className="bb8-wrapper">
      <label className="bb8-toggle">
        <input 
          className="bb8-toggle__checkbox" 
          type="checkbox" 
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        <div className="bb8-toggle__container">
          <div className="bb8-toggle__scenery">
            <div className="bb8-toggle__star" />
            <div className="bb8-toggle__star" />
            <div className="bb8-toggle__star" />
            <div className="bb8-toggle__star" />
            <div className="bb8-toggle__star" />
            <div className="bb8-toggle__star" />
            <div className="bb8-toggle__star" />
            <div className="tatto-1" />
            <div className="tatto-2" />
            <div className="gomrassen" />
            <div className="hermes" />
            <div className="chenini" />
            <div className="bb8-toggle__cloud" />
            <div className="bb8-toggle__cloud" />
            <div className="bb8-toggle__cloud" />
          </div>
          <div className="bb8">
            <div className="bb8__head-container">
              <div className="bb8__antenna" />
              <div className="bb8__antenna" />
              <div className="bb8__head" />
            </div>
            <div className="bb8__body" />
          </div>
          <div className="artificial__hidden">
            <div className="bb8__shadow" />
          </div>
        </div>
      </label>
    </div>
  );
}

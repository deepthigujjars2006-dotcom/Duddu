"use client";

import React, { useState, useEffect } from "react";
import { UserStats } from "@/data/skills";

interface NavbarProps {
  userStats: UserStats;
}

export default function Navbar({ userStats }: NavbarProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);

  // Sync scroll class for thin navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle theme toggling
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <header className={scrolled ? "nav-scrolled" : ""}>
      <div className="container nav-container">
        <div className="nav-logo">
          <svg
            className="logo-icon"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="logo-text">
            Skill<span className="text-gradient">Spark</span>
          </span>
        </div>

        <nav className="nav-links">
          <a href="#skills" className="nav-link active">
            Skills Path
          </a>
          <a href="#challenge" className="nav-link">
            Daily Challenge
          </a>
          <a href="#leaderboard" className="nav-link">
            Leaderboard
          </a>
        </nav>

        <div className="nav-actions">
          {/* User Level and XP chip */}
          <div className="xp-chip">
            <span className="level-badge">Lvl {userStats.level}</span>
            <div className="xp-progress-bar-container">
              <div 
                className="xp-progress-fill" 
                style={{ width: `${(userStats.xp / userStats.xpToNextLevel) * 100}%` }}
              ></div>
            </div>
            <span className="xp-text">
              <strong>{userStats.xp.toLocaleString()}</strong> / {userStats.xpToNextLevel.toLocaleString()} XP
            </span>
          </div>

          {/* Theme Toggle Button */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? (
              // Sun Icon
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // Moon Icon
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

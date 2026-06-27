"use client";

import React, { useState, useEffect } from "react";

interface LoginProps {
  onLogin: (user: { id: string; username: string; avatar: string; stats: any }) => void;
}

const AVATARS = [
  { id: "spark", emoji: "⚡", label: "Spark" },
  { id: "hacker", emoji: "💻", label: "Coder" },
  { id: "fire", emoji: "🔥", label: "Achiever" },
  { id: "shield", emoji: "🛡️", label: "Architect" },
];

export default function Login({ onLogin }: LoginProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("⚡");
  const [error, setError] = useState("");
  
  // Loading flow state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing code environment...");
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  // Handles progress bar increase
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          
          // Rotate status text based on progress thresholds
          if (prev > 75) {
            setLoadingText("Configuring leaderboard standings...");
          } else if (prev > 45) {
            setLoadingText("Fetching daily concept challenges...");
          } else if (prev > 20) {
            setLoadingText("Compiling developer syllabus...");
          }
          
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Handle final callback once loading hits 100%
  useEffect(() => {
    if (loadingProgress >= 100 && loggedInUser) {
      const timer = setTimeout(() => {
        onLogin(loggedInUser);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress, onLogin, loggedInUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (password.trim().length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    try {
      const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login";
      const payload = isRegistering 
        ? { username, password, avatar: selectedAvatar } 
        : { username, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      // Trigger loading sequence and store logged-in user
      setLoggedInUser(data);
      setIsLoading(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  if (isLoading) {
    return (
      <div className="login-loading-screen">
        <div className="glass-card loading-card text-center slide-in-up">
          <div className="loading-spinner-wrap">
            <svg
              className="spinning-logo"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.5"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <h3 className="loading-title">Syncing Profile</h3>
          <p className="loading-status-text">{loadingText}</p>
          <div className="loading-bar-container">
            <div 
              className="loading-bar-fill" 
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            ></div>
          </div>
          <span className="loading-percentage">{Math.min(loadingProgress, 100)}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page-wrapper">
      <div className="glass-card login-card-inner slide-in-up">
        {/* Branding header */}
        <div className="login-brand">
          <svg
            className="logo-icon"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <h2 className="login-logo-text">
            Skill<span className="text-gradient">Spark</span>
          </h2>
          <p className="login-subtitle">
            {isRegistering 
              ? "Create your coding index to start competing" 
              : "Master development paths & gamify your coding index"}
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error-msg">{error}</div>}

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="e.g. SparkCoder"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Avatar selection - only show on registration */}
          {isRegistering && (
            <div className="avatar-selection-group">
              <span className="avatar-group-label">Choose Avatar Badge</span>
              <div className="avatar-grid-select">
                {AVATARS.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    className={`avatar-select-btn ${
                      selectedAvatar === avatar.emoji ? "avatar-selected" : ""
                    }`}
                    onClick={() => setSelectedAvatar(avatar.emoji)}
                    aria-label={avatar.label}
                  >
                    <span className="aselect-emoji">{avatar.emoji}</span>
                    <span className="aselect-label">{avatar.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary btn-login-submit">
            {isRegistering ? "Create Account & Start" : "Launch Dashboard"}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "0.85rem" }}>
          {isRegistering ? (
            <p>
              Already have an account?{" "}
              <button 
                type="button" 
                onClick={() => { setIsRegistering(false); setError(""); }}
                style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: "600", cursor: "pointer", padding: "0 4px" }}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New to SkillSpark?{" "}
              <button 
                type="button" 
                onClick={() => { setIsRegistering(true); setError(""); }}
                style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: "600", cursor: "pointer", padding: "0 4px" }}
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

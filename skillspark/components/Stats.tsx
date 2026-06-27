"use client";

import React from "react";
import { UserStats } from "@/data/skills";

interface StatsProps {
  userStats: UserStats;
}

export default function Stats({ userStats }: StatsProps) {
  const xpPercentage = (userStats.xp / userStats.xpToNextLevel) * 100;

  return (
    <section className="stats-section">
      <div className="container stats-container">
        <div className="stats-grid">
          
          {/* Card 1: Streak */}
          <div className="glass-card stat-card">
            <div className="stat-icon-wrapper streak-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-label">Daily Streak</span>
              <h3 className="stat-value">{userStats.streak} Days</h3>
              <p className="stat-meta">Active streak. Level up daily!</p>
            </div>
            <div className="streak-indicator">
              {[...Array(7)].map((_, i) => (
                <span 
                  key={i} 
                  className={`streak-dot ${i < userStats.streak % 8 ? "active" : ""}`}
                  title={`Day ${i + 1}`}
                ></span>
              ))}
            </div>
          </div>

          {/* Card 2: XP */}
          <div className="glass-card stat-card">
            <div className="stat-icon-wrapper xp-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Progress</span>
              <h3 className="stat-value">{userStats.xp.toLocaleString()} XP</h3>
              <p className="stat-meta">Level {userStats.level} Learner</p>
            </div>
            <div className="stat-progress-bar-wrapper">
              <div className="stat-progress-label">
                <span>Next Lvl: {(userStats.xpToNextLevel - userStats.xp).toLocaleString()} XP to go</span>
                <span>{Math.round(xpPercentage)}%</span>
              </div>
              <div className="stat-progress-bar-container">
                <div className="stat-progress-fill" style={{ width: `${xpPercentage}%` }}></div>
              </div>
            </div>
          </div>

          {/* Card 3: Lessons Completed */}
          <div className="glass-card stat-card">
            <div className="stat-icon-wrapper lessons-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-label">Bite-sized Lessons</span>
              <h3 className="stat-value">{userStats.completedLessons} Completed</h3>
              <p className="stat-meta">Mastery courses and modules</p>
            </div>
            <div className="lessons-badge-list">
              <span className="l-badge">React</span>
              <span className="l-badge">Design</span>
              <span className="l-badge">TS</span>
            </div>
          </div>

          {/* Card 4: Global Rank */}
          <div className="glass-card stat-card">
            <div className="stat-icon-wrapper rank-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-label">Leaderboard Rank</span>
              <h3 className="stat-value">#{userStats.rank}</h3>
              <p className="stat-meta">Climbing global programmer pool</p>
            </div>
            <div className="rank-indicator">
              <span className="rank-pill">Top 8%</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

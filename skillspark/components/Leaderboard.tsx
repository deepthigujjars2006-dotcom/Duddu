"use client";

import React, { useState } from "react";
import { LeaderboardUser } from "@/data/skills";

interface LeaderboardProps {
  users: LeaderboardUser[];
}

export default function Leaderboard({ users }: LeaderboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"xp" | "skills">("xp");

  // Sort and filter the users
  const sortedUsers = [...users]
    .filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "xp") {
        return b.xp - a.xp;
      } else {
        return b.completedSkillsCount - a.completedSkillsCount;
      }
    });

  // Render rank badge (1st gold, 2nd silver, 3rd bronze)
  const renderRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="rank-badge gold-medal">🥇</span>;
      case 2:
        return <span className="rank-badge silver-medal">🥈</span>;
      case 3:
        return <span className="rank-badge bronze-medal">🥉</span>;
      default:
        return <span className="rank-number">{rank}</span>;
    }
  };

  return (
    <section className="leaderboard-section" id="leaderboard">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-title-wrap">
            <span className="section-subtitle">COMPETITIVE POOL</span>
            <h2 className="section-title">Global Leaderboard</h2>
          </div>

          <div className="leaderboard-controls">
            {/* Search */}
            <div className="search-box">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input 
                type="text" 
                placeholder="Search players..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort options */}
            <div className="sort-tabs">
              <button 
                className={`sort-tab ${sortBy === "xp" ? "active" : ""}`}
                onClick={() => setSortBy("xp")}
              >
                XP Points
              </button>
              <button 
                className={`sort-tab ${sortBy === "skills" ? "active" : ""}`}
                onClick={() => setSortBy("skills")}
              >
                Skills Mastered
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="glass-card leaderboard-card">
          <div className="leaderboard-header">
            <div className="lh-rank">Rank</div>
            <div className="lh-player">Learner</div>
            <div className="lh-level">Level</div>
            <div className="lh-skills">Skills</div>
            <div className="lh-xp">Score</div>
          </div>

          <div className="leaderboard-rows">
            {sortedUsers.map((user) => {
              const isCurrentUser = user.name.includes("You");

              return (
                <div 
                  key={user.name} 
                  className={`leaderboard-row ${isCurrentUser ? "row-highlight" : ""}`}
                >
                  <div className="cell-rank">
                    {renderRankBadge(user.rank)}
                  </div>
                  
                  <div className="cell-player">
                    <span className="player-avatar">{user.avatar}</span>
                    <span className="player-name">
                      {user.name}
                      {isCurrentUser && <span className="you-tag">YOU</span>}
                    </span>
                  </div>

                  <div className="cell-level">
                    <span className="user-level-badge">Lvl {user.level}</span>
                  </div>

                  <div className="cell-skills">
                    <span className="skills-count">{user.completedSkillsCount} mastered</span>
                  </div>

                  <div className="cell-xp">
                    <span className="xp-score">{user.xp.toLocaleString()} XP</span>
                  </div>
                </div>
              );
            })}

            {sortedUsers.length === 0 && (
              <div className="empty-leaderboard">
                <p>No players found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Top level disclaimer */}
        <div className="leaderboard-footer-hint">
          <p>🏆 Leaderboards are synchronized live. Master modules and daily quizzes to increase your rank!</p>
        </div>

      </div>
    </section>
  );
}

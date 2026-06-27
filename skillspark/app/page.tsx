"use client";

import React, { useState } from "react";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SkillsGrid from "@/components/SkillsGrid";
import DailyChallenge from "@/components/DailyChallenge";
import Leaderboard from "@/components/Leaderboard";
import Footer from "@/components/Footer";

import {
  initialUserStats,
  dailyChallengeQuestion,
  UserStats,
  Skill,
  LeaderboardUser,
} from "@/data/skills";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{ username: string; avatar: string }>({
    username: "Guest",
    avatar: "🎯",
  });

  const [userStats, setUserStats] = useState<UserStats>(initialUserStats);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  // Fetch updated leaderboard
  const fetchLeaderboard = async (uid: string) => {
    try {
      const res = await fetch(`/api/leaderboard?userId=${uid}`);
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data);
      }
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  // Fetch updated skills
  const fetchSkills = async (uid: string) => {
    try {
      const res = await fetch(`/api/skills?userId=${uid}`);
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    } catch (err) {
      console.error("Failed to fetch skills:", err);
    }
  };

  // Fetch all dashboard data
  const fetchDashboardData = async (uid: string) => {
    await Promise.all([fetchSkills(uid), fetchLeaderboard(uid)]);
  };

  // Handle successful login or register
  const handleLogin = (user: { id: string; username: string; avatar: string; stats: UserStats }) => {
    setUserId(user.id);
    setUserProfile({ username: user.username, avatar: user.avatar });
    setUserStats(user.stats);
    setIsLoggedIn(true);
    fetchDashboardData(user.id);
  };

  // Toggle syllabus module progress via backend API
  const handleToggleModule = async (skillId: string, moduleId: string, completed: boolean) => {
    if (!userId) return;

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          type: "module",
          skillId,
          moduleId,
          completed,
        }),
      });

      if (!res.ok) throw new Error("Failed to sync progress");

      const data = await res.json();
      setUserStats(data.stats);
      setSkills(data.skills);
      
      // Refresh leaderboard for ranking updates
      await fetchLeaderboard(userId);
    } catch (err) {
      console.error("Failed to toggle module progress:", err);
    }
  };

  // Claim Daily Trivia XP via backend API
  const handleClaimXp = async (xpReward: number) => {
    if (!userId) return;

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          type: "trivia",
          xpReward,
        }),
      });

      if (!res.ok) throw new Error("Failed to sync trivia progress");

      const data = await res.json();
      setUserStats(data.stats);
      
      // Refresh leaderboard for ranking updates
      await fetchLeaderboard(userId);
    } catch (err) {
      console.error("Failed to claim daily challenge XP:", err);
    }
  };

  // If not logged in, render the login page
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="dashboard-fade-in">
      <Navbar userStats={userStats} />
      
      <main>
        {/* Intro Hero banner */}
        <Hero />
        
        {/* Dashboard Metrics grid */}
        <Stats userStats={userStats} />
        
        {/* Interactive Skills syllabus */}
        <SkillsGrid
          skills={skills}
          userStats={userStats}
          onToggleModule={handleToggleModule}
        />
        
        {/* Daily trivia challenge */}
        <DailyChallenge
          questionData={dailyChallengeQuestion}
          userStats={userStats}
          onClaimXp={handleClaimXp}
        />
        
        {/* Active competitive leaderboard */}
        <Leaderboard users={leaderboard} />
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Skill, SkillModule, UserStats } from "@/data/skills";

interface SkillsGridProps {
  skills: Skill[];
  userStats: UserStats;
  onToggleModule: (skillId: string, moduleId: string, completed: boolean) => Promise<void>;
}

export default function SkillsGrid({
  skills,
  userStats,
  onToggleModule,
}: SkillsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  // Categories list
  const categories = ["All", "Frontend", "Backend", "Design", "General"];

  // Filter skills based on category, search, and active locks
  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    const matchesSearch =
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeSkill = skills.find((s) => s.id === activeSkillId);

  // Toggle completion of a module
  const handleToggleModule = async (skillId: string, moduleId: string) => {
    const oldSkill = skills.find((s) => s.id === skillId);
    const oldMod = oldSkill?.modules.find((m) => m.id === moduleId);
    if (!oldMod) return;

    try {
      await onToggleModule(skillId, moduleId, !oldMod.completed);
    } catch (error) {
      console.error("Failed to toggle progress:", error);
    }
  };

  // Get difficulty badge color class
  const getDifficultyClass = (diff: string) => {
    switch (diff) {
      case "Beginner":
        return "diff-beginner";
      case "Intermediate":
        return "diff-intermediate";
      case "Advanced":
        return "diff-advanced";
      default:
        return "";
    }
  };

  // Get Skill SVG Icon based on type
  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "react":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="2">
            <circle cx="12" cy="12" r="2" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" strokeOpacity="0.2"/>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
          </svg>
        );
      case "nextjs":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M17.5 17.5L9.25 8m0 0v8.5m0-8.5h8.5" strokeLinecap="round" />
          </svg>
        );
      case "typescript":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3178c6" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 8h5M9.5 8v8M14 10.5c.5-.5 1-.5 1.5-.5s1 .2 1 .7c0 1-1.5 1-1.5 2.3 0 .7.3 1.5 1.5 1.5s1.5-1 1.5-1.5" />
          </svg>
        );
      case "design":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff7262" strokeWidth="2">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
            <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      case "nodejs":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#339933" strokeWidth="2">
            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
            <path d="M12 22V12M3 7l9 5 9-5" />
          </svg>
        );
      case "docker":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2496ed" strokeWidth="2">
            <path d="M22 10h-4M2 10h16v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6Z" />
            <path d="M8 6h3v3H8zm4 0h3v3h-3zm-8 3h3v3H4zm8 0h3v3h-3zm-4 0h3v3H8zm8 0h3v3h-3z" />
            <path d="M12 19c4 0 6.5-2.5 8-4.5" />
          </svg>
        );
      default:
        return <span>📚</span>;
    }
  };

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-title-wrap">
            <span className="section-subtitle">YOUR SYLLABUS</span>
            <h2 className="section-title">Developer Skill Journeys</h2>
          </div>
          
          {/* Search and Filters */}
          <div className="skills-controls">
            <div className="search-box">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input 
                type="text" 
                placeholder="Search skills..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`cat-tab ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-main-layout">
          {/* Skills Grid */}
          <div className="skills-grid-inner">
            {filteredSkills.map((skill) => {
              const isLocked = userStats.level < skill.levelRequired;
              const isActive = activeSkillId === skill.id;

              return (
                <div 
                  key={skill.id} 
                  className={`glass-card skill-card ${isLocked ? "skill-card-locked" : ""} ${isActive ? "skill-card-active" : ""}`}
                >
                  {isLocked && (
                    <div className="locked-overlay">
                      <div className="lock-icon-wrap">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </div>
                      <span className="lock-text">Requires Level {skill.levelRequired}</span>
                      <span className="lock-desc">Earn XP to unlock this course</span>
                    </div>
                  )}

                  <div className="skill-card-header">
                    <div className="skill-icon-box">
                      {getSkillIcon(skill.icon)}
                    </div>
                    <div className="skill-badges">
                      <span className="category-badge">{skill.category}</span>
                      <span className={`diff-badge ${getDifficultyClass(skill.difficulty)}`}>
                        {skill.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="skill-card-title">{skill.title}</h3>
                  <p className="skill-card-desc">{skill.description}</p>

                  <div className="skill-card-progress">
                    <div className="progress-text">
                      <span>Progress</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <div className="progress-track">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="skill-card-footer">
                    <span className="xp-reward-text">+{skill.xp} XP reward</span>
                    <button 
                      className={`btn-learn ${isLocked ? "btn-disabled" : ""}`}
                      onClick={() => !isLocked && setActiveSkillId(isActive ? null : skill.id)}
                      disabled={isLocked}
                    >
                      {isActive ? "Closing..." : skill.progress === 100 ? "Review Syllabus" : skill.progress > 0 ? "Continue Path" : "Start Path"}
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredSkills.length === 0 && (
              <div className="glass-card empty-search-card">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <h3>No skills match your query</h3>
                <p>Try resetting the category filter or search keywords.</p>
              </div>
            )}
          </div>

          {/* Side Drawer Syllabus Explorer */}
          {activeSkill && (
            <div className="glass-card active-syllabus-drawer slide-in-right">
              <div className="drawer-header">
                <div className="dh-title-wrap">
                  <span className="dh-tag">{activeSkill.category}</span>
                  <h3 className="dh-title">{activeSkill.title}</h3>
                </div>
                <button 
                  className="btn-close-drawer"
                  onClick={() => setActiveSkillId(null)}
                  aria-label="Close details"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              <p className="drawer-desc">{activeSkill.description}</p>
              
              <div className="drawer-progress">
                <div className="dp-label">
                  <span>Modules Completed</span>
                  <span>{activeSkill.modules.filter(m => m.completed).length} / {activeSkill.modules.length}</span>
                </div>
                <div className="dp-track">
                  <div 
                    className="dp-fill" 
                    style={{ width: `${activeSkill.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="modules-list">
                <h4 className="modules-list-heading">Course Modules</h4>
                {activeSkill.modules.map((mod) => (
                  <div 
                    key={mod.id} 
                    className={`module-item ${mod.completed ? "module-completed" : ""}`}
                  >
                    <div className="module-item-checkbox-wrapper">
                      <input 
                        type="checkbox"
                        id={mod.id}
                        checked={mod.completed}
                        onChange={() => handleToggleModule(activeSkill.id, mod.id)}
                      />
                      <label htmlFor={mod.id} className="module-item-info">
                        <span className="module-title">{mod.title}</span>
                        <span className="module-meta">
                          ⏱️ {mod.duration} • 📚 {mod.lessonsCount} lessons
                        </span>
                      </label>
                    </div>
                    <span className="module-xp-tag">+75 XP</span>
                  </div>
                ))}
              </div>

              <div className="drawer-actions">
                <p className="drawer-hint-text">
                  * Checking/unchecking modules updates your Level & XP dynamically. Try completing a course!
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

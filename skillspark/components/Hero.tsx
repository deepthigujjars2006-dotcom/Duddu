"use client";

import React from "react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content slide-in-up">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Season 1: Code Quest is Live!
          </div>
          <h1 className="hero-title">
            Spark Your Tech Journey, <br />
            One <span className="text-gradient">Skill</span> at a Time
          </h1>
          <p className="hero-description">
            Master React architecture, advanced TypeScript, system APIs, and modern design principles. Solve bite-sized daily challenges, earn XP, and level up your coding index.
          </p>
          <div className="hero-actions">
            <button 
              className="btn-primary" 
              onClick={() => scrollToSection("skills")}
            >
              Explore Skills Grid
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button 
              className="btn-secondary"
              onClick={() => scrollToSection("challenge")}
            >
              Solve Daily Challenge
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </button>
          </div>
        </div>

        <div className="hero-visual floating-anim">
          <div className="visual-container">
            {/* Styled Glass Card inside Hero Visual representation */}
            <div className="visual-glass-preview">
              <div className="visual-header">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
                <span className="terminal-title">skillspark_core.tsx</span>
              </div>
              <div className="visual-body">
                <pre className="code-block">
                  <code>
                    <span className="code-keyword">const</span> <span className="code-function">unlockSkill</span> = (id) =&gt; &#123;<br />
                    &nbsp;&nbsp;<span className="code-keyword">const</span> skill = db.find(id);<br />
                    &nbsp;&nbsp;<span className="code-keyword">if</span> (user.xp &gt;= skill.req) &#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;skill.unlocked = <span className="code-boolean">true</span>;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;user.addBadge(skill.badge);<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;sparkConfetti();<br />
                    &nbsp;&nbsp;&#125;<br />
                    &#125;
                  </code>
                </pre>
                
                {/* Floating XP badge inside visual */}
                <div className="floating-badge-xp">
                  <div className="fb-icon">⚡</div>
                  <div className="fb-text">
                    <span className="fb-title">Challenge Clear!</span>
                    <span className="fb-desc">+100 XP Sparked</span>
                  </div>
                </div>

                {/* Micro chart preview inside visual */}
                <div className="floating-badge-chart">
                  <div className="chart-header">
                    <span>Performance Index</span>
                    <span className="chart-perc">▲ 12%</span>
                  </div>
                  <div className="chart-bars">
                    <span className="chart-bar" style={{ height: "40%" }}></span>
                    <span className="chart-bar" style={{ height: "60%" }}></span>
                    <span className="chart-bar" style={{ height: "50%" }}></span>
                    <span className="chart-bar" style={{ height: "80%" }}></span>
                    <span className="chart-bar active" style={{ height: "95%" }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

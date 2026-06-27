"use client";

import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer>
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg
              className="logo-icon"
              width="24"
              height="24"
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
          <p className="footer-desc">
            Spark your developer potential. Level up your coding, system design, and UI mastery through structured daily pathways.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Twitter" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a href="#" aria-label="GitHub" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="#" aria-label="Discord" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Platform</h4>
          <ul className="footer-links">
            <li><a href="#skills">Skills Catalog</a></li>
            <li><a href="#challenge">Daily Quizzes</a></li>
            <li><a href="#leaderboard">Leaderboard</a></li>
            <li><a href="#">Skill Journeys</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Community</h4>
          <ul className="footer-links">
            <li><a href="#">Discord Server</a></li>
            <li><a href="#">Developer Blog</a></li>
            <li><a href="#">Contributors</a></li>
            <li><a href="#">Code of Conduct</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4 className="footer-heading">Spark Newsletter</h4>
          <p className="newsletter-text">Weekly coding digests, challenges, and core platform updates directly in your inbox.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p className="newsletter-success">
              🎉 Sparked! You're subscribed successfully.
            </p>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} SkillSpark. Built for developers worldwide.</p>
          <div className="footer-legal">
            <a href="#">Terms of Service</a>
            <span className="dot-divider"></span>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

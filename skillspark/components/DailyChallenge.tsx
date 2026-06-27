"use client";

import React, { useState } from "react";
import { TriviaQuestion, UserStats } from "@/data/skills";

interface DailyChallengeProps {
  questionData: TriviaQuestion;
  userStats: UserStats;
  onClaimXp: (xpReward: number) => Promise<void>;
}

export default function DailyChallenge({
  questionData,
  userStats,
  onClaimXp,
}: DailyChallengeProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shakeOption, setShakeOption] = useState<number | null>(null);
  const [claimed, setClaimed] = useState<boolean>(false);

  const handleSelectOption = (index: number) => {
    if (isSubmitted && claimed) return;
    setSelectedOption(index);
    setShakeOption(null);
  };

  const handleSubmit = async () => {
    if (selectedOption === null || isSubmitted) return;

    const correct = selectedOption === questionData.correctIndex;
    setIsSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      // Sync XP reward to DB via api call
      try {
        await onClaimXp(questionData.xpReward);
        setClaimed(true);
      } catch (error) {
        console.error("Failed to claim trivia XP:", error);
        setIsSubmitted(false);
        setIsCorrect(null);
      }
    } else {
      // Trigger shake animation for the incorrect option
      setShakeOption(selectedOption);
      // Reset submission after short delay so user can try again
      setTimeout(() => {
        setIsSubmitted(false);
        setIsCorrect(null);
        setShakeOption(null);
      }, 1000);
    }
  };

  return (
    <section className="challenge-section" id="challenge">
      <div className="container">
        <div className="challenge-box-grid">
          
          {/* Card Left: Question Widget */}
          <div className="glass-card challenge-card pulse-glow">
            <div className="challenge-card-header">
              <span className="challenge-badge">🎯 DAILY CHALLENGE</span>
              <span className="xp-badge-claim">+{questionData.xpReward} XP</span>
            </div>

            <h3 className="challenge-question">{questionData.question}</h3>

            <div className="options-container">
              {questionData.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isIncorrectAnswer = isSubmitted && isCorrect === false && isSelected;
                const isCorrectAnswer = isSubmitted && isCorrect === true && idx === questionData.correctIndex;
                const isAlreadyClaimed = claimed && idx === questionData.correctIndex;

                let optionClass = "";
                if (isSelected) optionClass += " option-selected";
                if (shakeOption === idx) optionClass += " shake-anim option-wrong";
                if (isCorrectAnswer || isAlreadyClaimed) optionClass += " option-right";
                if (isIncorrectAnswer) optionClass += " option-wrong";

                return (
                  <button
                    key={idx}
                    className={`option-btn ${optionClass}`}
                    onClick={() => handleSelectOption(idx)}
                    disabled={claimed}
                  >
                    <span className="option-indicator">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="option-text">{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="challenge-card-footer">
              {!claimed ? (
                <button
                  className="btn-primary btn-submit-quiz"
                  disabled={selectedOption === null || isSubmitted}
                  onClick={handleSubmit}
                >
                  {isSubmitted ? "Verifying Answer..." : "Submit Answer"}
                </button>
              ) : (
                <div className="success-claimed-wrap">
                  <span className="claimed-check">✔ Correct Answer!</span>
                  <span className="claimed-xp">+{questionData.xpReward} XP added & Streak extended!</span>
                </div>
              )}
            </div>
          </div>

          {/* Card Right: Trivia & Explanation (Appears after submission or correct check) */}
          <div className="glass-card explanation-card">
            <div className="exp-icon-wrap">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <h4 className="exp-title">Skill Insights</h4>
            
            {claimed ? (
              <div className="exp-content slide-in-up">
                <p className="exp-text-success">
                  <strong>Spot on!</strong> Here is why your answer is correct:
                </p>
                <p className="exp-explanation">{questionData.explanation}</p>
                <div className="exp-tip">
                  💡 <em>RSC tip: Keep components as server-rendered by default, and only introduce client boundary markers ('use client') when user events (like onClick) or state hooks are required.</em>
                </div>
              </div>
            ) : (
              <div className="exp-placeholder">
                <p>Submit the correct answer to unlock learning explanations and review architectural details.</p>
                <div className="exp-hint">
                  💡 Hint: Look closely at where the execution boundary lies and what bundle size overhead is generated.
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

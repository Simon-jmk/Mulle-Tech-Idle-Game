import { useState, useCallback } from 'react';
import { ClickerButton } from './ClickerButton';
import { useStreak } from './useStreak';

export const MainPage = () => {
  const [score, setScore] = useState(0);
  const { streakCount, streakBonus, simulateNextDay, simulateMissedDay } = useStreak();

  const baseScore = 1;
  const multiplier = 1.5 + streakBonus;

  const scorePerClick = baseScore * multiplier;

  const handleButtonClick = useCallback(() => {
    setScore((prev) => prev + scorePerClick);
  }, [scorePerClick]);

  return (
    <div className="main-container">
      <div className="streak-container">
        <div className="streak-icon">🔥</div>
        <div className="streak-info">
          <span className="streak-days">{streakCount} Day Streak</span>
          {streakBonus > 0 && <span className="streak-bonus">+{streakBonus.toFixed(1)}x Bonus</span>}
        </div>
      </div>

      <div className="score-display">
        <div className="score-main">
          <span className="score-value">{Math.floor(score)}</span>
        </div>
        <div className="multiplier-display">
          <span className="multiplier-value">{scorePerClick.toFixed(1)}x</span>
          <span className="multiplier-label">Score Multiplier</span>
        </div>
      </div>
      <ClickerButton onProgress={handleButtonClick} cooldown={200} />

      {/* Developer Tools for Testing Streak */}
      <div className="dev-tools" style={{ position: 'fixed', bottom: '80px', right: '20px', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '8px', zIndex: 1000}}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>Dev Tools</h4>
        <button onClick={simulateNextDay} style={{ background: '#4CAF50', border: 'none', padding: '0.5rem', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Simulate Next Day</button>
        <button onClick={simulateMissedDay} style={{ background: '#f44336', border: 'none', padding: '0.5rem', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Simulate Missed Day</button>
      </div>
    </div>
  );
};

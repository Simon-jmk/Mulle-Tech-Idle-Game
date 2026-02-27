import { useState, useCallback, useEffect } from 'react';
import { ClickerButton } from './ClickerButton';
import { useStreak } from './useStreak';
import { HandIndexThumbFill } from 'react-bootstrap-icons';

export const MainPage = () => {
  const [score, setScore] = useState(0);
  const [isAutoClicking, setIsAutoClicking] = useState(false);
  const [isAutoPressed, setIsAutoPressed] = useState(false);
  const { streakCount, streakBonus, simulateNextDay, simulateMissedDay } = useStreak();

  const [goalBonus, setGoalBonus] = useState(0);

  useEffect(() => {
    const savedBonus = localStorage.getItem('mulle_goal_multiplier_bonus');
    if (savedBonus) {
      setGoalBonus(Number(savedBonus));
    }

    const handleReset = () => setGoalBonus(0);
    window.addEventListener('mulle_goal_bonus_reset', handleReset);
    return () => window.removeEventListener('mulle_goal_bonus_reset', handleReset);
  }, []);

  const baseScore = 1;
  const multiplier = 1.5 + streakBonus + goalBonus;

  const scorePerClick = baseScore * multiplier;
  const clickCooldown = 200;
  const autoClickDelay = 600; // Slower auto-click pace

  useEffect(() => {
    const autoClickExpiry = localStorage.getItem('autoClickExpiry');
    if (!autoClickExpiry) {
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('autoClickExpiry', expiry.toString());
      setIsAutoClicking(true);
    } else {
      setIsAutoClicking(Date.now() < parseInt(autoClickExpiry, 10));
    }
  }, []);

  useEffect(() => {
    let intervalId: number;
    if (isAutoClicking) {
      intervalId = window.setInterval(() => {
        const autoClickExpiry = localStorage.getItem('autoClickExpiry');
        if (autoClickExpiry && Date.now() < parseInt(autoClickExpiry, 10)) {
          setScore((prev) => prev + scorePerClick);
          setIsAutoPressed(true);
          setTimeout(() => setIsAutoPressed(false), 300);
        } else {
          setIsAutoClicking(false);
          window.clearInterval(intervalId);
        }
      }, autoClickDelay);
    }
    return () => window.clearInterval(intervalId);
  }, [isAutoClicking, scorePerClick, autoClickDelay]);

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
          <div className="multiplier-details">
            <span className="multiplier-label">Score Multiplier</span>
            {goalBonus > 0 && <span className="goal-bonus-label">+{goalBonus} from Goals</span>}
          </div>
        </div>
      </div>
      <div className="clicker-wrapper">
        <ClickerButton 
          onProgress={handleButtonClick} 
          cooldown={clickCooldown} 
          isPressed={isAutoPressed} 
        />
        {isAutoClicking && (
          <div className={`auto-clicker-hand ${isAutoPressed ? 'pressing' : ''}`}>
            <HandIndexThumbFill size={80} />
          </div>
        )}
      </div>

      {/* Developer Tools for Testing Streak */}
      <div className="dev-tools" style={{ position: 'fixed', bottom: '80px', right: '20px', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '8px', zIndex: 1000}}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>Dev Tools</h4>
        <button onClick={simulateNextDay} style={{ background: '#4CAF50', border: 'none', padding: '0.5rem', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Simulate Next Day</button>
        <button onClick={simulateMissedDay} style={{ background: '#f44336', border: 'none', padding: '0.5rem', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>Simulate Missed Day</button>
      </div>
    </div>
  );
};

import { useState, useCallback } from 'react';
import { ClickerButton } from './ClickerButton';

export const MainPage = () => {
  const [score, setScore] = useState(0);
  const baseScore = 1;
  const multiplier = 1.5;

  const scorePerClick = baseScore * multiplier;

  const handleButtonClick = useCallback(() => {
    setScore((prev) => prev + scorePerClick);
  }, [scorePerClick]);

  return (
    <div className="main-container">
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
    </div>
  );
};

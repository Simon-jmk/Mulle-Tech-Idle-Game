import { useState, useCallback, useRef } from 'react';

interface ClickerButtonProps {
  onProgress?: () => void;
  cooldown?: number; // in milliseconds
}

const ButtonSVG = ({ isPressed, style }: { isPressed: boolean, style?: React.CSSProperties }) => {
  const topY = isPressed ? 67.8 : 41.92;
  const rectHeight = isPressed ? 8.624 : 34.505;
  const rectY = isPressed ? 67.8 : 41.92;

  const transitionStyle: React.CSSProperties = {
    transition: 'all 0.1s ease-in-out',
  };

  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 168 136" 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ ...style, fillRule: 'evenodd', clipRule: 'evenodd', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 1.5 }}
    >
      <g id="Layer1">
        <g>
          <ellipse cx="84" cy="90.676" rx="84" ry="44.924" style={{ fill: 'var(--button-rim-color)' }} />
          <rect x="0" y="78.62" width="168" height="12.056" style={{ fill: 'var(--button-rim-color)' }} />
          <ellipse cx="84" cy="78.62" rx="84" ry="44.924" style={{ fill: 'var(--button-rim-light)' }} />
        </g>
        <g>
          <ellipse cx="84" cy="76.424" rx="79.894" ry="42.728" style={{ ...transitionStyle, fill: 'var(--button-shade-color)' }} />
          <rect x="4.106" y={rectY} width="159.789" height={rectHeight} style={{ ...transitionStyle, fill: 'var(--button-shade-color)' }} />
        </g>
        <g>
          <ellipse cx="84" cy={topY} rx="79.894" ry="42.728" style={{ ...transitionStyle, fill: 'var(--button-color)'}} />
        </g>
      </g>
    </svg>
  );
};

export const ClickerButton = ({ onProgress, cooldown = 100 }: ClickerButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const lastClickTime = useRef<number>(0);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTime.current < cooldown) return;

    lastClickTime.current = now;
    setIsPressed(true);
    setIsOnCooldown(true);
    
    if (onProgress) onProgress();
    
    // Switch back to "up" state after a short delay
    setTimeout(() => {
      setIsPressed(false);
    }, 100);

    // Remove cooldown state after specified time
    setTimeout(() => {
      setIsOnCooldown(false);
    }, cooldown);
  }, [onProgress, cooldown]);

  return (
    <div className="clicker-container">
      <button 
        className={`clicker-button ${isOnCooldown ? 'cooldown' : ''}`} 
        onMouseDown={() => !isOnCooldown && setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onClick={handleClick}
        disabled={isOnCooldown}
        aria-label="Action Button"
      >
        <ButtonSVG 
          isPressed={isPressed} 
        />
      </button>
    </div>
  );
};

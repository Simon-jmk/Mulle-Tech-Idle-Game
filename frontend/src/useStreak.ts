import { useState, useEffect, useCallback } from 'react';

const MILESTONES = {
  2: 0.1,
  7: 0.5,
  14: 1.0,
  21: 1.5,
  30: 2.5,
  180: 10.0,
  365: 25.0,
};

export const useStreak = () => {
  const [streakCount, setStreakCount] = useState(1);
  const [lastLoginDate, setLastLoginDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [streakBonus, setStreakBonus] = useState(0);

  // Update bonus when streakCount changes
  useEffect(() => {
    let highestBonus = 0;
    const milestoneDays = Object.keys(MILESTONES).map(Number).sort((a, b) => b - a);
    
    for (const days of milestoneDays) {
      if (streakCount >= days) {
        highestBonus = MILESTONES[days as keyof typeof MILESTONES];
        break;
      }
    }
    
    setStreakBonus(highestBonus);
  }, [streakCount]);

  const checkStreak = useCallback((currentDateStr: string) => {
    setLastLoginDate((prevDate) => {
      const lastDate = new Date(prevDate);
      const currentDate = new Date(currentDateStr);
      
      const lastDateMidnight = Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
      const currentDateMidnight = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      
      const diffTime = currentDateMidnight - lastDateMidnight;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        setStreakCount(prev => prev + 1);
      } else if (diffDays > 1) {
        setStreakCount(1);
      }
      
      return diffDays > 0 ? currentDateStr : prevDate;
    });
  }, []);

  // Run initial check on mount
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    checkStreak(todayStr);
  }, [checkStreak]);

  const simulateNextDay = () => {
    setLastLoginDate((prev) => {
      const current = new Date(prev);
      current.setDate(current.getDate() + 1);
      const nextDayStr = current.toISOString().split('T')[0];
      // Use setTimeout to run checkStreak on next tick so state has updated slightly, or just call it directly.
      // But checkStreak updates lastLoginDate too, so we can just call it and return prev here to avoid double update.
      setTimeout(() => checkStreak(nextDayStr), 0);
      return prev; 
    });
  };

  const simulateMissedDay = () => {
    setLastLoginDate((prev) => {
      const current = new Date(prev);
      current.setDate(current.getDate() + 2);
      const missedDayStr = current.toISOString().split('T')[0];
      setTimeout(() => checkStreak(missedDayStr), 0);
      return prev;
    });
  };

  return {
    streakCount,
    streakBonus,
    lastLoginDate,
    simulateNextDay,
    simulateMissedDay
  };
};

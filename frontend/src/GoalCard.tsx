import React from 'react';

export interface Goal {
  id: string;
  title: string;
  category: 'Nutrition' | 'Sleep';
  target: string;
  value: number;
  completed: boolean;
  completedAt?: string;
  endDate?: string;
}

interface GoalCardProps {
  goal: Goal;
  onComplete?: (id: string) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onComplete }) => {
  const getUnit = () => {
    if (goal.category === 'Nutrition') {
      return goal.target === 'calories' ? 'kcal' : 'g';
    } else {
      return goal.target === 'Hours' ? 'h' : '/5';
    }
  };

  return (
    <div className={`goal-card ${goal.completed ? 'completed' : ''}`}>
      <div className="card-header">
        <h3 className="card-title">{goal.title}</h3>
        <span className={`category-tag tag-${goal.category.toLowerCase()}`}>
          {goal.category}
        </span>
      </div>
      <div className="card-details">
        <div className="detail-item">
          <span className="detail-label">Target</span>
          <span className="detail-value">{goal.target}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Value</span>
          <span className="detail-value">
            {goal.value}{getUnit()}
          </span>
        </div>
      </div>
      {!goal.completed && onComplete && (
        <button 
          className="btn btn-complete" 
          onClick={() => onComplete(goal.id)}
        >
          Complete goal
        </button>
      )}
    </div>
  );
};

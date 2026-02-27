import React, { useState } from 'react';
import type { Goal } from './GoalCard';
import { GoalCard } from './GoalCard';
import { GoalForm } from './GoalForm';

export const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveGoal = (goalData: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: crypto.randomUUID(),
    };
    setGoals([...goals, newGoal]);
    setIsFormOpen(false);
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <h1>My Goals</h1>
        {!isFormOpen && (
          <button 
            className="btn btn-primary" 
            onClick={() => setIsFormOpen(true)}
          >
            Create goal
          </button>
        )}
      </div>

      {isFormOpen && (
        <GoalForm 
          onSave={handleSaveGoal} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}

      {goals.length === 0 ? (
        <div className="empty-state">
          <p>You haven't added any goals yet. Click "Create goal" to get started.</p>
        </div>
      ) : (
        <div className="goals-grid">
          {goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  );
};

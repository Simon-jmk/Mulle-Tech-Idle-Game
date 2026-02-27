import React, { useState, useEffect } from 'react';
import type { Goal } from './GoalCard';
import { GoalCard } from './GoalCard';
import { GoalForm } from './GoalForm';

export const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('mulle_goals');
    return saved ? JSON.parse(saved) : [];
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    localStorage.setItem('mulle_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    // Midnight deletion logic
    const checkMidnightDeletion = () => {
      const now = new Date();
      const lastMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      
      setGoals(prevGoals => {
        const lastMidnightTime = lastMidnight;
        
        return prevGoals.map(goal => {
          // If goal is completed and was completed before last midnight
          if (goal.completed && goal.completedAt) {
            const completedTime = new Date(goal.completedAt).getTime();
            
            if (completedTime < lastMidnightTime) {
              // Check if it should recur
              if (goal.endDate) {
                const endDateTime = new Date(goal.endDate);
                // Set to end of the day for the end date
                endDateTime.setHours(23, 59, 59, 999);
                
                if (endDateTime.getTime() >= lastMidnightTime) {
                  // Recreate/Reset the goal for the new day
                  return {
                    ...goal,
                    completed: false,
                    completedAt: undefined
                  };
                }
              }
              // If it shouldn't recur or end date passed, it would normally be filtered out
              // But here we need to return something or filter later.
              // To match original logic (delete completed from yesterday), 
              // we'll return a special mark or filter the result.
              return null as any; 
            }
          }
          return goal;
        }).filter(Boolean);
      });
    };

    checkMidnightDeletion();
    
    // Check every hour
    const interval = setInterval(checkMidnightDeletion, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  const handleSaveGoal = (goalData: Omit<Goal, 'id' | 'completed' | 'completedAt'>) => {
    if (editingGoal) {
      setGoals(goals.map(g => 
        g.id === editingGoal.id 
          ? { ...editingGoal, ...goalData } 
          : g
      ));
      setEditingGoal(null);
    } else {
      const newGoal: Goal = {
        ...goalData,
        id: crypto.randomUUID(),
        completed: false,
      };
      setGoals([...goals, newGoal]);
    }
    setIsFormOpen(false);
  };

  const handleCompleteGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, completed: true, completedAt: new Date().toISOString() } 
        : goal
    ));
  };

  const handleDeleteGoal = (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(goal => goal.id !== id));
    }
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingGoal(null);
  };

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

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
          onCancel={handleCancelForm}
          initialData={editingGoal || undefined}
        />
      )}

      {goals.length === 0 ? (
        <div className="empty-state">
          <p>You haven't added any goals yet. Click "Create goal" to get started.</p>
        </div>
      ) : (
        <>
          <section className="goals-section">
            <h2>Active Goals</h2>
            {activeGoals.length === 0 ? (
              <p className="no-goals-msg">No active goals. Time to set one!</p>
            ) : (
              <div className="goals-grid">
                {activeGoals.map(goal => (
                  <GoalCard 
                    key={goal.id} 
                    goal={goal} 
                    onComplete={handleCompleteGoal}
                    onEdit={handleEditGoal}
                    onDelete={handleDeleteGoal}
                  />
                ))}
              </div>
            )}
          </section>

          {completedGoals.length > 0 && (
            <section className="goals-section completed-section">
              <h2>Completed Goals</h2>
              <div className="goals-grid">
                {completedGoals.map(goal => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

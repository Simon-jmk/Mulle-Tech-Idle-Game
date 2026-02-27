import React, { useState } from 'react';
import type { Goal } from './GoalCard';

interface GoalFormProps {
  onSave: (goal: Omit<Goal, 'id' | 'completed' | 'completedAt'>) => void;
  onCancel: () => void;
}

export const GoalForm: React.FC<GoalFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Nutrition' | 'Sleep' | ''>('');
  const [target, setTarget] = useState('');
  const [value, setValue] = useState<number | string>('');
  const [endDate, setEndDate] = useState('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as 'Nutrition' | 'Sleep';
    setCategory(newCategory);
    setTarget('');
    setValue('');
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTarget(e.target.value);
    setValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !target || value === '') return;

    onSave({
      title,
      category: category as 'Nutrition' | 'Sleep',
      target,
      value: Number(value),
      endDate: endDate || undefined,
    });
  };

  const getUnitSuffix = () => {
    if (category === 'Nutrition') {
      return target === 'calories' ? 'kcal' : 'g';
    }
    return '';
  };

  return (
    <div className="modal-overlay">
      <form className="goal-form" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '1.5rem' }}>Create New Goal</h2>
        
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g., Drink 8 cups of water"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select 
            className="form-control" 
            value={category} 
            onChange={handleCategoryChange}
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Sleep">Sleep</option>
          </select>
        </div>

        {category === 'Nutrition' && (
          <div className="category-extra-form">
            <div className="form-group">
              <label>Target</label>
              <select 
                className="form-control" 
                value={target} 
                onChange={handleTargetChange}
                required
              >
                <option value="" disabled>Select target</option>
                <option value="calories">Calories</option>
                <option value="protein">Protein</option>
                <option value="fat">Fat</option>
                <option value="carbs">Carbs</option>
              </select>
            </div>
            <div className="form-group">
              <label>Value {getUnitSuffix() && `(${getUnitSuffix()})`}</label>
              <input
                type="number"
                className="form-control"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {category === 'Sleep' && (
          <div className="category-extra-form">
            <div className="form-group">
              <label>Target</label>
              <select 
                className="form-control" 
                value={target} 
                onChange={handleTargetChange}
                required
              >
                <option value="" disabled>Select target</option>
                <option value="Hours">Hours</option>
                <option value="Sleep quality">Sleep quality</option>
              </select>
            </div>
            <div className="form-group">
              <label>Value {target === 'Sleep quality' ? '(1-5)' : ''}</label>
              <input
                type="number"
                className="form-control"
                min={target === 'Sleep quality' ? 1 : undefined}
                max={target === 'Sleep quality' ? 5 : undefined}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label>End Date (Optional)</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <small style={{ color: '#666', marginTop: '0.25rem', display: 'block' }}>
            If set, this goal will recreate itself daily until this date.
          </small>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={!category || !target}>
            Create Goal
          </button>
        </div>
      </form>
    </div>
  );
};

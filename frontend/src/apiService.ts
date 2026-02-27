import type { Goal } from './GoalCard';

const API_BASE_URL = 'http://localhost:5000/api'; // Or whatever the actual port is

// The backend enum types
export type BackendGoalType = 'sleep_hours' | 'sleep_quality' | 'calories' | 'carbs_g' | 'fat_g' | 'protein_g';

// Helper to map frontend target to backend enum
export const mapFrontendTargetToBackendType = (target: string): BackendGoalType => {
  switch (target) {
    case 'Hours': return 'sleep_hours';
    case 'Sleep quality': return 'sleep_quality';
    case 'calories': return 'calories';
    case 'protein': return 'protein_g';
    case 'fat': return 'fat_g';
    case 'carbs': return 'carbs_g';
    default:
      console.warn(`Unknown target "${target}", defaulting to calories`);
      return 'calories';
  }
};

export const mapBackendTypeToFrontendTarget = (type: BackendGoalType): string => {
  switch (type) {
    case 'sleep_hours': return 'Hours';
    case 'sleep_quality': return 'Sleep quality';
    case 'calories': return 'calories';
    case 'protein_g': return 'protein';
    case 'fat_g': return 'fat';
    case 'carbs_g': return 'carbs';
    default: return 'calories';
  }
}

export const mapBackendTypeToCategory = (type: BackendGoalType): 'Nutrition' | 'Sleep' => {
   if (type === 'sleep_hours' || type === 'sleep_quality') return 'Sleep';
   return 'Nutrition';
}

export interface BackendGoalPayload {
  userId: number; // Assuming we need a userId, hardcoded to 1 for now if needed, or backend extracts from auth
  type: BackendGoalType;
  targetValue: number;
  currentValue: number;
  completedAt?: string | null;
  createdAt?: string;
}

export const apiService = {
  getGoals: async (): Promise<Goal[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/goals`);
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      
      // Map backend goal structure back to frontend Goal interface
      // Assuming backend returns an array of objects matching the UserGoal model
      return data.map((bg: any) => ({
        id: bg.id.toString(),
        title: `Goal: ${bg.type}`, // Or however title is handled if not stored in DB
        category: mapBackendTypeToCategory(bg.type),
        target: mapBackendTypeToFrontendTarget(bg.type),
        value: bg.targetValue,
        completed: bg.completedAt != null,
        completedAt: bg.completedAt,
        // endDate mapping if available
      }));
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw error;
    }
  },

  createGoal: async (goal: Omit<Goal, 'id' | 'completed' | 'completedAt'>): Promise<Goal> => {
    try {
      const backendType = mapFrontendTargetToBackendType(goal.target);
      
      const payload = {
        userId: 1, // Placeholder
        type: backendType,
        targetValue: goal.value,
        currentValue: 0,
      };

      const response = await fetch(`${API_BASE_URL}/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create goal');
      const createdGoal = await response.json();
      
      return {
          ...goal,
          id: createdGoal.id?.toString() || crypto.randomUUID(),
          completed: false
      };
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  },

  updateGoal: async (id: string, goal: Partial<Goal>): Promise<void> => {
     try {
       // Only mapping what we might update. Usually checking off a goal or changing target
       const updates: any = {};
       if (goal.target) updates.type = mapFrontendTargetToBackendType(goal.target);
       if (goal.value !== undefined) updates.targetValue = goal.value;
       if (goal.completed) updates.completedAt = new Date().toISOString();
       
       const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(updates),
       });

       if (!response.ok) throw new Error('Failed to update goal');
     } catch (error) {
       console.error('Error updating goal:', error);
       throw error;
     }
  },

  deleteGoal: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete goal');
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  },

  logSleep: async (hours: number, quality: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/logs/sleep`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ userId: 1, hours, quality })
      });
      if (!response.ok) throw new Error('Failed to log sleep');
    } catch (error) {
       console.error('Error logging sleep:', error);
       throw error;
    }
  },

  logNutrition: async (calories: number, protein: number, carbs: number, fat: number): Promise<void> => {
     try {
      const response = await fetch(`${API_BASE_URL}/logs/nutrition`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ userId: 1, calories, proteinGrams: protein, carbsGrams: carbs, fatGrams: fat })
      });
      if (!response.ok) throw new Error('Failed to log nutrition');
    } catch (error) {
       console.error('Error logging nutrition:', error);
       throw error;
    }
  }
};

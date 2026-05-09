export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  ai_credits: number;
  household_id: string;
}

export interface Household {
  id: string;
  name: string;
  subscription_tier: string;
}

export interface InventoryItem {
  id: string;
  household_id: string;
  item_name: string;
  quantity: number;
  unit: string;
  category: string | null;
  last_restocked: Date | string;
}

export interface Expense {
  id: string;
  household_id: string;
  user_id: string;
  amount: number;
  category: string;
  description: string | null;
  timestamp: Date | string;
  user?: Partial<User>;
}

export interface DietLog {
  id: string;
  user_id: string;
  meal_name: string;
  calories: number | null;
  macros: string | null; // JSON string
  timestamp: Date | string;
}

export interface AiParsedIntent {
  category: 'Inventory' | 'Expense' | 'Consumption' | 'Unknown';
  extracted_data: any;
}

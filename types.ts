
export enum Category {
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  HOUSING = 'Housing',
  UTILITIES = 'Utilities',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health',
  SHOPPING = 'Shopping',
  OTHER = 'Other',
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
}

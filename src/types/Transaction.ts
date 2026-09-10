type TransactionType = "Income" | "Expense";

type TransactionCategory =
  | "food"
  | "transportation"
  | "shopping"
  | "bills"
  | "entertainment"
  | "health"
  | "education"
  | "housing"
  | "travel"
  | "salary"
  | "other";

type TransactionForm = {
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: Date;
};

type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: Date;
};

export type {
  TransactionType,
  TransactionCategory,
  Transaction,
  TransactionForm,
};

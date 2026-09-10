type TransactionType = "Income" | "Expense";

type TransactionCategory =
  | "Food"
  | "Transportation"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "Health"
  | "Education"
  | "Housing"
  | "Travel"
  | "Salary"
  | "Other";

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

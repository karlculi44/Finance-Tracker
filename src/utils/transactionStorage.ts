import type { Transaction } from "../types/Transaction";

const TRANSACTIONS_STORAGE_KEY: string = "expense-tracker-transactions";

export function getTransactionsFromStorage(): Transaction[] {
  const storedTransactions: string | null = localStorage.getItem(
    TRANSACTIONS_STORAGE_KEY,
  );

  localStorage.removeItem("transactions");

  if (!storedTransactions) return [];

  try {
    return JSON.parse(storedTransactions).map(
      (transaction: Omit<Transaction, "date"> & { date: string }) => ({
        ...transaction,
        date: new Date(transaction.date),
      }),
    );
  } catch {
    return [];
  }
}

export function saveTransactionsToStorage(transactions: Transaction[]) {
  localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
}

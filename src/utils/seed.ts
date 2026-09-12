import { sampleTransactions } from "../data/sampleTransactions";
import { saveTransactionsToStorage } from "./transactionStorage";

const TRANSACTIONS_STORAGE_KEY = "expense-tracker-transactions";

export function seedTransactions() {
  if (localStorage.getItem(TRANSACTIONS_STORAGE_KEY) !== null) return;

  saveTransactionsToStorage(sampleTransactions);
}

import type { TransactionForm } from "../types/Transaction";

function validateTransactionForm(form: TransactionForm): string | null {
  if (!form.description.trim()) {
    return "Please enter a description.";
  }

  if (!Number.isFinite(form.amount) || form.amount <= 0) {
    return "Please enter an amount greater than zero.";
  }

  if (Number.isNaN(form.date.getTime())) {
    return "Please select a valid date.";
  }

  return null;
}

export default validateTransactionForm;

import { useState, type ChangeEvent, type FormEvent } from "react";
import { X } from "lucide-react";
import type {
  TransactionCategory,
  TransactionForm,
  Transaction,
  TransactionFilterType,
} from "../types/Transaction";
import validateTransactionForm from "../utils/validateTransactionForm";

type TransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: TransactionForm) => void;
  transactionToEdit: Transaction | null;
};

const createEmptyTransactionForm = (): TransactionForm => ({
  description: "",
  amount: 0,
  type: "Expense",
  category: "Other",
  date: new Date(),
});

const getInitialForm = (
  transactionToEdit: Transaction | null,
): TransactionForm =>
  transactionToEdit
    ? {
        description: transactionToEdit.description,
        amount: transactionToEdit.amount,
        type: transactionToEdit.type,
        category: transactionToEdit.category,
        date: new Date(transactionToEdit.date),
      }
    : createEmptyTransactionForm();

function TransactionModal({
  isOpen,
  onClose,
  onSubmit,
  transactionToEdit,
}: TransactionModalProps) {
  const [form, setForm] = useState<TransactionForm>(() =>
    getInitialForm(transactionToEdit),
  );
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const updatedForm = { ...form };

    if (name === "description") updatedForm.description = value;
    if (name === "amount") updatedForm.amount = Number(value);
    if (name === "type") updatedForm.type = value as TransactionFilterType;
    if (name === "category")
      updatedForm.category = value as TransactionCategory;
    if (name === "date") updatedForm.date = new Date(`${value}T00:00:00`);

    setForm(updatedForm);
    setError(null);
  };

  const handleAddTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateTransactionForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit(form);
    onClose();
    setError(null);
    setForm(createEmptyTransactionForm());
  };

  const handleClose = () => {
    onClose();
    setError(null);
    setForm(createEmptyTransactionForm());
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#07120f]/70 p-0 sm:items-center sm:p-4">
      <div className="app-surface max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border p-5 sm:rounded-2xl sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold app-text">
              {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <p className="mt-1 text-sm app-muted">
              Record a new financial activity.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            className="rounded-lg p-2 app-faint hover:bg-(--app-surface-muted)"
            onClick={handleClose}
          >
            <X size={18} />
          </button>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={handleAddTransaction}>
          <label className="grid gap-2 text-sm font-semibold app-text">
            Description
            <input
              name="description"
              value={form.description}
              onChange={handleInputChange}
              aria-invalid={Boolean(error && !form.description.trim())}
              className="app-input rounded-xl border px-3.5 py-2.5 font-normal outline-none"
              placeholder="e.g. Grocery shopping"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold app-text">
            Amount
            <input
              name="amount"
              type="number"
              value={form.amount || ""}
              onChange={handleInputChange}
              aria-invalid={Boolean(
                error && (!Number.isFinite(form.amount) || form.amount <= 0),
              )}
              className="app-input rounded-xl border px-3.5 py-2.5 font-normal outline-none"
              placeholder="₱0.00"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold app-text">
              Type
              <select
                name="type"
                value={form.type}
                onChange={handleInputChange}
                className="app-input appearance-none rounded-xl border px-3.5 py-2.5 font-normal outline-none"
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold app-text">
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="app-input appearance-none rounded-xl border px-3.5 py-2.5 font-normal outline-none"
              >
                <option value="Other">Select category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Housing">Housing</option>
                <option value="Travel">Travel</option>
                <option value="Salary">Salary</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold">
            Date
            <div className="relative">
              <input
                name="date"
                type="date"
                value={form.date.toISOString().slice(0, 10)}
                onChange={handleInputChange}
                aria-invalid={Boolean(
                  error && Number.isNaN(form.date.getTime()),
                )}
                className="app-input w-full rounded-xl border px-3.5 py-2.5 font-normal outline-none"
              />
            </div>
          </label>
          {error && (
            <p className="mt-4 text-sm font-medium text-rose-600" role="alert">
              {error}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold app-muted hover:bg-(--app-surface-muted)"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="app-primary-bg rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
            >
              {transactionToEdit ? "Save Changes" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default TransactionModal;

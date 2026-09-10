import { useState, type ChangeEvent } from "react";
import { CalendarDays, X } from "lucide-react";
import type {
  TransactionCategory,
  TransactionForm,
  TransactionType,
} from "../types/Transaction";

type TransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (form: TransactionForm) => void;
};

function TransactionModal({
  isOpen,
  onClose,
  onChange,
  onSubmit,
}: TransactionModalProps) {
  const [form, setForm] = useState<TransactionForm>({
    description: "",
    amount: 0,
    type: "Expense",
    category: "other",
    date: new Date(),
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const updatedForm = { ...form };

    if (name === "description") updatedForm.description = value;
    if (name === "amount") updatedForm.amount = Number(value);
    if (name === "type") updatedForm.type = value as TransactionType;
    if (name === "category")
      updatedForm.category = value as TransactionCategory;
    if (name === "date") updatedForm.date = new Date(`${value}T00:00:00`);

    setForm(updatedForm);
    onChange(updatedForm);
  };

  const handleAddTransaction = () => {
    onSubmit();
    onClose();
    setForm({
      description: "",
      amount: 0,
      type: "Expense",
      category: "other",
      date: new Date(),
    });
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Add Transaction
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Record a new financial activity.
            </p>
          </div>
          <button
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Description
            <input
              name="description"
              value={form.description}
              onChange={handleInputChange}
              className="rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal outline-none placeholder:text-slate-400"
              placeholder="e.g. Grocery shopping"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Amount
            <input
              name="amount"
              type="number"
              value={form.amount || ""}
              onChange={handleInputChange}
              className="rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal outline-none placeholder:text-slate-400"
              placeholder="₱0.00"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Type
              <select
                name="type"
                value={form.type}
                onChange={handleInputChange}
                className="appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal outline-none"
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal outline-none"
              >
                <option value="other">Select category</option>
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="shopping">Shopping</option>
                <option value="bills">Bills</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="housing">Housing</option>
                <option value="travel">Travel</option>
                <option value="salary">Salary</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Date
            <div className="relative">
              <CalendarDays
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="date"
                type="date"
                value={form.date.toISOString().slice(0, 10)}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal outline-none"
              />
            </div>
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white"
            onClick={handleAddTransaction}
          >
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
export default TransactionModal;

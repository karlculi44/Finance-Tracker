import { CalendarDays, X } from "lucide-react";

type TransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
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
              className="rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal outline-none placeholder:text-slate-400"
              placeholder="e.g. Grocery shopping"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Amount
            <input
              className="rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal outline-none placeholder:text-slate-400"
              placeholder="₱0.00"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Type
              <select className="appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal outline-none">
                <option>Expense</option>
                <option>Income</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Category
              <select className="appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-normal outline-none">
                <option>Select category</option>
                <option>Food</option>
                <option>Transportation</option>
                <option>Bills</option>
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
                type="text"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-normal outline-none"
                placeholder="September 9, 2026"
              />
            </div>
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100">
            Cancel
          </button>
          <button className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
export default TransactionModal;

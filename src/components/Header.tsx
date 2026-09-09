import { Plus } from "lucide-react";

type HeaderProps = {
  onAddTransaction: () => void;
};

function Header({ onAddTransaction }: HeaderProps) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Personal finance
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Expense Tracker
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Keep track of your income and expenses.
        </p>
      </div>
      <button
        onClick={onAddTransaction}
        className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
      >
        <Plus size={18} strokeWidth={2.5} />
        Add Transaction
      </button>
    </header>
  );
}
export default Header;

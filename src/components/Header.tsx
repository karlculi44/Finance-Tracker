import { Moon, Plus, Sun } from "lucide-react";

type HeaderProps = {
  onAddTransaction: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

function Header({ onAddTransaction, isDarkMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] app-primary">
          Personal finance dashboard
        </p>
        <h1 className="text-3xl font-bold tracking-tight app-text sm:text-4xl">
          Your money, in focus.
        </h1>
        <p className="mt-2 max-w-md text-sm leading-6 app-muted">
          Make clearer decisions with a calm view of your cash flow.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="app-surface app-text rounded-xl border p-3 transition hover:-translate-y-0.5"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={onAddTransaction}
          className="app-primary-bg inline-flex w-fit items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Transaction
        </button>
      </div>
    </header>
  );
}
export default Header;

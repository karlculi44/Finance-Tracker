import { Search } from "lucide-react";
import TransactionFilters from "./TransactionFilters";
import TransactionList from "./TransactionList";

function Transactions() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Transactions</h2>
          <p className="mt-1 text-sm text-slate-500">
            Your recent financial activity
          </p>
        </div>
        <TransactionFilters />
      </div>
      <div className="p-5 sm:p-6">
        <label className="relative block">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-slate-400"
            placeholder="Search transactions..."
          />
        </label>
        <TransactionList />
      </div>
    </section>
  );
}

export default Transactions;

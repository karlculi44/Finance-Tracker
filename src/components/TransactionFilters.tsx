function TransactionFilters() {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-xs font-semibold">
      <button className="rounded-md bg-white px-3 py-1.5 text-slate-900 shadow-sm">
        All
      </button>
      <button className="rounded-md px-3 py-1.5 text-slate-500 transition hover:text-slate-900">
        Income
      </button>
      <button className="rounded-md px-3 py-1.5 text-slate-500 transition hover:text-slate-900">
        Expenses
      </button>
    </div>
  );
}

export default TransactionFilters;

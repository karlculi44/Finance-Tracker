import {
  Banknote,
  CalendarDays,
  Car,
  CreditCard,
  FileText,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  Utensils,
  Wifi,
  X,
} from "lucide-react";
import SummaryCards from "./components/SummaryCards";

function Header() {
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
      <button className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
        <Plus size={18} strokeWidth={2.5} />
        Add Transaction
      </button>
    </header>
  );
}

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

function TransactionItem(
  props = {
    icon: <Utensils size={18} />,
    iconTone: "",
    title: "",
    category: "",
    date: "",
    amount: "",
    positive: false,
  },
) {
  const { icon, iconTone, title, category, date, amount, positive } = props;
  return (
    <div className="group flex items-center gap-3 border-b border-slate-100 py-4 last:border-0 sm:gap-4">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconTone}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 truncate text-xs text-slate-400">
          {category} <span className="mx-1 text-slate-300">•</span> {date}
        </p>
      </div>
      <p
        className={`whitespace-nowrap text-sm font-bold ${positive ? "text-emerald-600" : "text-slate-800"}`}
      >
        {amount}
      </p>
      <div className="hidden items-center gap-1 sm:flex">
        <button
          aria-label={`Edit ${title}`}
          className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <Pencil size={15} />
        </button>
        <button
          aria-label={`Delete ${title}`}
          className="rounded-lg p-2 text-slate-300 transition hover:bg-rose-50 hover:text-rose-500"
        >
          <Trash2 size={15} />
        </button>
      </div>
      <button
        aria-label={`More options for ${title}`}
        className="rounded-lg p-2 text-slate-300 sm:hidden"
      >
        <MoreHorizontal size={17} />
      </button>
    </div>
  );
}

function TransactionList() {
  return (
    <div className="mt-2">
      <TransactionItem
        icon={<Utensils size={18} />}
        iconTone="bg-orange-50 text-orange-500"
        title="Lunch"
        category="Food"
        date="September 9, 2026"
        amount="-₱250.00"
        positive={false}
      />
      <TransactionItem
        icon={<Car size={18} />}
        iconTone="bg-sky-50 text-sky-600"
        title="Grab"
        category="Transportation"
        date="September 8, 2026"
        amount="-₱180.00"
        positive={false}
      />
      <TransactionItem
        icon={<Banknote size={18} />}
        iconTone="bg-emerald-50 text-emerald-600"
        title="Monthly Salary"
        category="Income"
        date="September 1, 2026"
        amount="+₱25,000.00"
        positive
      />
      <TransactionItem
        icon={<ShoppingBag size={18} />}
        iconTone="bg-violet-50 text-violet-500"
        title="New Clothes"
        category="Shopping"
        date="September 3, 2026"
        amount="-₱1,200.00"
        positive={false}
      />
      <TransactionItem
        icon={<Wifi size={18} />}
        iconTone="bg-amber-50 text-amber-600"
        title="Internet Bill"
        category="Bills"
        date="September 2, 2026"
        amount="-₱1,500.00"
        positive={false}
      />
    </div>
  );
}

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

function EmptyState() {
  return (
    <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="rounded-2xl bg-slate-100 p-4 text-slate-500">
        <FileText size={25} />
      </div>
      <h2 className="mt-5 text-lg font-bold text-slate-950">
        No transactions yet
      </h2>
      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
        Add your first transaction to start tracking your finances.
      </p>
      <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white">
        <Plus size={17} />
        Add Transaction
      </button>
    </section>
  );
}

function TransactionModal() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Add Transaction</h2>
          <p className="mt-1 text-sm text-slate-500">
            Record a new financial activity.
          </p>
        </div>
        <button
          aria-label="Close modal"
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
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
  );
}

function App() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Header />
        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            <SummaryCards />
            <Transactions />
          </div>
          <aside className="hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-5 lg:block">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <CreditCard size={17} className="text-slate-400" />
              Quick insight
            </div>
            <p className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
              50.2%
            </p>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              of your monthly income remains after expenses.
            </p>
            <div className="mt-6 h-2 rounded-full bg-slate-200">
              <div className="h-2 w-1/2 rounded-full bg-emerald-500" />
            </div>
            <div className="mt-3 flex justify-between text-xs font-medium text-slate-400">
              <span>Spent</span>
              <span>Remaining</span>
            </div>
          </aside>
        </div>
        <div className="hidden" aria-hidden="true">
          <EmptyState />
          <TransactionModal />
        </div>
      </div>
    </main>
  );
}

export default App;

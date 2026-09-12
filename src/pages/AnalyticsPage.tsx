import { useOutletContext } from "react-router-dom";
import { ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import Analytics from "../components/Analytics";
import ExpenseDistribution from "../components/ExpenseDistribution";

import SummaryCard from "../components/SummaryCard";
import { dateRangeOptions } from "../types/FinanceSummary";
import type { AppOutletContext } from "../layout/MainLayout";

function AnalyticsPage() {
  const {
    dateRange,
    filteredExpenses,
    filteredIncome,
    filteredTransactions,

    onDateRangeChange,
  } = useOutletContext<AppOutletContext>();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] app-primary">
            Detailed view
          </p>
          <h2 className="mt-2 text-2xl font-bold app-text">Analytics</h2>
          <p className="mt-1 text-sm app-muted">
            Understand how your money moves over time.
          </p>
        </div>
        <label className="grid gap-1 text-xs font-semibold app-muted">
          Date range
          <select
            value={dateRange}
            onChange={(event) =>
              onDateRangeChange(event.target.value as typeof dateRange)
            }
            className="app-input min-h-11 rounded-lg border px-3 py-2 font-medium outline-none transition"
          >
            {dateRangeOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <Analytics
        transactions={filteredTransactions}
        dateRange={dateRange}
        title="Income vs Expenses"
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Income"
          value={filteredIncome}
          detail={dateRange}
          icon={<ArrowDownLeft size={20} />}
          tone="bg-emerald-50 text-emerald-600"
          accent="app-accent-emerald"
        />
        <SummaryCard
          label="Expenses"
          value={filteredExpenses}
          detail={dateRange}
          icon={<ArrowUpRight size={20} />}
          tone="bg-amber-50 text-amber-600"
          accent="app-accent-amber"
        />
        <SummaryCard
          label="Net Change"
          value={filteredIncome - filteredExpenses}
          detail={dateRange}
          icon={<TrendingUp size={20} />}
          tone="bg-indigo-50 text-indigo-600"
          accent="app-accent-indigo"
        />
      </div>
      <div>
        <div className="min-w-0">
          <ExpenseDistribution transactions={filteredTransactions} />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;

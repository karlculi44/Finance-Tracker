import { useOutletContext } from "react-router-dom";
import { ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import Analytics from "../components/Analytics";
import QuickInsight from "../components/QuickInsight";
import SummaryCard from "../components/SummaryCard";
import { dateRangeOptions } from "../types/FinanceSummary";
import type { AppOutletContext } from "../layout/MainLayout";
import formatCurrency from "../utils/formatCurrency";

function AnalyticsPage() {
  const {
    dateRange,
    filteredExpenses,
    filteredIncome,
    filteredTransactions,
    remainingBarWidth,
    remainingPercentage,
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
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <QuickInsight
          remainingPercentage={remainingPercentage}
          remainingBarWidth={remainingBarWidth}
        />
        <section className="app-surface rounded-2xl border p-5 sm:p-6">
          <h2 className="text-lg font-bold app-text">Expense Breakdown</h2>
          <div className="mt-4 space-y-3">
            {Object.entries(
              filteredTransactions.reduce<Record<string, number>>(
                (totals, transaction) => {
                  if (transaction.type === "Expense") {
                    totals[transaction.category] =
                      (totals[transaction.category] ?? 0) + transaction.amount;
                  }
                  return totals;
                },
                {},
              ),
            )
              .sort(([, first], [, second]) => second - first)
              .map(([category, amount]) => (
                <div
                  key={category}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="app-muted">{category}</span>
                  <span className="font-semibold app-text">
                    {formatCurrency(amount)}
                  </span>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AnalyticsPage;

import { X } from "lucide-react";
import type { DateRangeType } from "../types/FinanceSummary";
import type { Transaction } from "../types/Transaction";
import formatCurrency from "../utils/formatCurrency";

type FinancialReportModalProps = {
  isOpen: boolean;
  dateRange: DateRangeType;
  periodStart: Date | null;
  periodEnd: Date;
  transactions: Transaction[];
  currentBalance: number;
  onClose: () => void;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function FinancialReportModal({
  isOpen,
  dateRange,
  periodStart,
  periodEnd,
  transactions,
  currentBalance,
  onClose,
}: FinancialReportModalProps) {
  if (!isOpen) return null;

  const totalIncome = transactions.reduce(
    (total, transaction) =>
      transaction.type === "Income" ? total + transaction.amount : total,
    0,
  );
  const totalExpenses = transactions.reduce(
    (total, transaction) =>
      transaction.type === "Expense" ? total + transaction.amount : total,
    0,
  );
  const netChange = totalIncome - totalExpenses;
  const remainingPercentage =
    totalIncome > 0 ? (netChange / totalIncome) * 100 : null;
  const expensesByCategory = transactions.reduce<Record<string, number>>(
    (totals, transaction) => {
      if (transaction.type === "Expense") {
        totals[transaction.category] =
          (totals[transaction.category] ?? 0) + transaction.amount;
      }
      return totals;
    },
    {},
  );
  const expenseBreakdown = Object.entries(expensesByCategory).sort(
    ([, firstAmount], [, secondAmount]) => secondAmount - firstAmount,
  );

  const periodDetail =
    periodStart === null
      ? "All Time"
      : `${formatDate(periodStart)} - ${formatDate(periodEnd)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07120f]/70 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="financial-report-title"
        className="app-surface max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4 border-b app-border pb-5">
          <div>
            <h2
              id="financial-report-title"
              className="text-xl font-bold app-text"
            >
              Financial Report
            </h2>
            <p className="mt-1 text-sm app-muted">
              Period:{" "}
              <span className="font-semibold app-text">{dateRange}</span>
            </p>
            <p className="mt-1 text-xs app-faint">{periodDetail}</p>
          </div>
          <button
            type="button"
            aria-label="Close financial report"
            className="rounded-lg p-2 app-faint transition hover:bg-(--app-surface-muted) hover:text-(--app-text)"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {transactions.length === 0 ? (
          <div className="py-14 text-center">
            <h3 className="text-lg font-bold app-text">
              No transactions for this period
            </h3>
            <p className="mt-2 text-sm app-muted">
              There is no financial activity to include in this report.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["Income", formatCurrency(totalIncome)],
                ["Expenses", formatCurrency(totalExpenses)],
                ["Net Change", formatCurrency(netChange)],
                [
                  "Remaining",
                  remainingPercentage === null
                    ? "No income recorded"
                    : `${remainingPercentage.toFixed(1)}%`,
                ],
                ["Current Balance", formatCurrency(currentBalance)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="app-surface-raised rounded-xl border p-4"
                >
                  <p className="text-xs font-semibold app-muted">{label}</p>
                  <p className="mt-2 text-lg font-bold app-text">{value}</p>
                </div>
              ))}
            </div>

            <section className="border-t app-border pt-5">
              <h3 className="text-base font-bold app-text">
                Expense Breakdown
              </h3>
              {expenseBreakdown.length === 0 ? (
                <p className="mt-4 text-sm app-muted">No expenses recorded.</p>
              ) : (
                <div className="mt-3 space-y-3">
                  {expenseBreakdown.map(([category, amount]) => (
                    <div
                      key={category}
                      className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 text-sm"
                    >
                      <span className="truncate font-medium app-text">
                        {category}
                      </span>
                      <span className="font-semibold app-text">
                        {formatCurrency(amount)}
                      </span>
                      <span className="w-12 text-right app-muted">
                        {totalExpenses > 0
                          ? `${((amount / totalExpenses) * 100).toFixed(1)}%`
                          : "0%"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="mt-6 border-t app-border pt-5">
              <h3 className="text-base font-bold app-text">Transactions</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-155 text-left text-sm">
                  <thead className="border-b app-border text-xs uppercase tracking-wide app-faint">
                    <tr>
                      <th className="app-sticky sticky left-0 z-20 px-3 py-3 font-semibold">
                        Description
                      </th>
                      <th className="px-3 py-3 font-semibold">Category</th>
                      <th className="px-3 py-3 font-semibold">Type</th>
                      <th className="px-3 py-3 font-semibold">Date</th>
                      <th className="px-3 py-3 text-right font-semibold">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="app-sticky sticky left-0 z-10 max-w-48 truncate px-3 py-3 font-medium app-text">
                          {transaction.description}
                        </td>
                        <td className="px-3 py-3 app-muted">
                          {transaction.category}
                        </td>
                        <td
                          className={`px-3 py-3 font-medium ${transaction.type === "Income" ? "app-primary" : "app-muted"}`}
                        >
                          {transaction.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 app-muted">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-right font-semibold app-text">
                          {transaction.type === "Income" ? "+" : "-"}{" "}
                          {formatCurrency(transaction.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        <div className="mt-6 flex justify-end border-t app-border pt-5">
          <button
            type="button"
            className="app-primary-bg rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinancialReportModal;

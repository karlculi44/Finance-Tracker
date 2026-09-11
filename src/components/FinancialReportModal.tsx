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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="financial-report-title"
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2
              id="financial-report-title"
              className="text-xl font-bold text-slate-950"
            >
              Financial Report
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Period: <span className="font-semibold text-slate-700">{dateRange}</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">{periodDetail}</p>
          </div>
          <button
            type="button"
            aria-label="Close financial report"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {transactions.length === 0 ? (
          <div className="py-14 text-center">
            <h3 className="text-lg font-bold text-slate-950">
              No transactions for this period
            </h3>
            <p className="mt-2 text-sm text-slate-500">
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
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs font-semibold text-slate-500">{label}</p>
                  <p className="mt-2 text-lg font-bold text-slate-950">{value}</p>
                </div>
              ))}
            </div>

            <section className="border-t border-slate-100 pt-5">
              <h3 className="text-base font-bold text-slate-950">
                Expense Breakdown
              </h3>
              {expenseBreakdown.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">No expenses recorded.</p>
              ) : (
                <div className="mt-3 space-y-3">
                  {expenseBreakdown.map(([category, amount]) => (
                    <div
                      key={category}
                      className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 text-sm"
                    >
                      <span className="truncate font-medium text-slate-700">
                        {category}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {formatCurrency(amount)}
                      </span>
                      <span className="w-12 text-right text-slate-500">
                        {totalExpenses > 0
                          ? `${((amount / totalExpenses) * 100).toFixed(1)}%`
                          : "0%"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="mt-6 border-t border-slate-100 pt-5">
              <h3 className="text-base font-bold text-slate-950">Transactions</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-155 text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="sticky left-0 z-20 bg-white px-3 py-3 font-semibold">
                        Description
                      </th>
                      <th className="px-3 py-3 font-semibold">Category</th>
                      <th className="px-3 py-3 font-semibold">Type</th>
                      <th className="px-3 py-3 font-semibold">Date</th>
                      <th className="px-3 py-3 text-right font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="sticky left-0 z-10 max-w-48 truncate bg-white px-3 py-3 font-medium text-slate-700">
                          {transaction.description}
                        </td>
                        <td className="px-3 py-3 text-slate-500">
                          {transaction.category}
                        </td>
                        <td
                          className={`px-3 py-3 font-medium ${transaction.type === "Income" ? "text-emerald-600" : "text-slate-600"}`}
                        >
                          {transaction.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-slate-500">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-slate-800">
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

        <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
          <button
            type="button"
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
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

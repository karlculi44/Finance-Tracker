import { ArrowDownLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Transaction } from "../types/Transaction";
import formatCurrency from "../utils/formatCurrency";

function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  const recentTransactions = [...transactions]
    .sort(
      (firstTransaction, secondTransaction) =>
        secondTransaction.date.getTime() - firstTransaction.date.getTime(),
    )
    .slice(0, 5);

  return (
    <section className="app-surface rounded-2xl border p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold app-text">Recent Transactions</h2>
          <p className="mt-1 text-sm app-muted">
            Your latest financial activity
          </p>
        </div>
        <Link
          to="/transactions"
          className="inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm font-semibold app-primary transition hover:bg-(--app-surface-muted)"
        >
          View all <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      {recentTransactions.length > 0 ? (
        <div className="mt-3">
          {recentTransactions.map((transaction) => {
            const isIncome = transaction.type === "Income";

            return (
              <div
                key={transaction.id}
                className="flex items-center gap-3 border-b app-border py-3 last:border-0"
              >
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${isIncome ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                >
                  {isIncome ? (
                    <ArrowDownLeft size={17} aria-hidden="true" />
                  ) : (
                    <ArrowUpRight size={17} aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold app-text">
                    {transaction.description}
                  </p>
                  <p className="truncate text-xs app-muted">
                    {transaction.category} ·{" "}
                    {transaction.date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <p
                  className={`whitespace-nowrap text-sm font-bold ${isIncome ? "text-emerald-600" : "app-danger"}`}
                >
                  {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-5 rounded-xl border border-dashed app-border px-4 py-8 text-center text-sm app-muted">
          No transactions yet.
        </p>
      )}
    </section>
  );
}

export default RecentTransactions;

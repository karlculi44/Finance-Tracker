import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import AnimatedNumber from "./AnimatedNumber";
import type { Transaction, TransactionCategory } from "../types/Transaction";
import formatCurrency from "../utils/formatCurrency";

type ExpenseCategoryTotal = {
  category: TransactionCategory;
  amount: number;
};

function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`;
}

function formatWholePercentage(value: number) {
  return `${value.toFixed(0)}%`;
}

const categoryColors: Record<TransactionCategory, string> = {
  Food: "#f97316",
  Transportation: "#0ea5e9",
  Shopping: "#8b5cf6",
  Bills: "#f59e0b",
  Entertainment: "#d946ef",
  Health: "#f43f5e",
  Education: "#6366f1",
  Housing: "#84cc16",
  Travel: "#06b6d4",
  Salary: "#10b981",
  Other: "#64748b",
};

function ExpenseDistribution({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const expenseTotals = transactions.reduce<Record<string, number>>(
    (totals, transaction) => {
      if (transaction.type === "Expense") {
        totals[transaction.category] =
          (totals[transaction.category] ?? 0) + transaction.amount;
      }
      return totals;
    },
    {},
  );
  const data: ExpenseCategoryTotal[] = Object.entries(expenseTotals)
    .map(([category, amount]) => ({
      category: category as TransactionCategory,
      amount,
    }))
    .sort((first, second) => second.amount - first.amount);
  const totalExpenses = data.reduce((total, item) => total + item.amount, 0);
  const highestCategory = data[0];
  const highestPercentage = highestCategory
    ? (highestCategory.amount / totalExpenses) * 100
    : 0;

  return (
    <section
      className="app-surface rounded-2xl border p-5 sm:p-6"
      aria-labelledby="expense-distribution-title"
    >
      <div>
        <h2
          id="expense-distribution-title"
          className="text-lg font-bold app-text"
        >
          Expense Distribution
        </h2>
        <p className="mt-1 text-sm app-muted">Where your expenses are going</p>
      </div>

      {data.length === 0 ? (
        <p className="mt-5 rounded-xl border border-dashed app-border px-4 py-8 text-center text-sm app-muted">
          No expenses recorded for this period.
        </p>
      ) : (
        <div className="mt-5 grid min-w-0 items-center gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="relative h-56 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius="58%"
                  outerRadius="82%"
                  paddingAngle={2}
                  stroke="var(--app-surface)"
                  strokeWidth={2}
                >
                  {data.map((item) => (
                    <Cell
                      key={item.category}
                      fill={categoryColors[item.category]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  position={{ x: 4, y: 4 }}
                  allowEscapeViewBox={{ x: false, y: false }}
                  wrapperClassName="app-chart-tooltip"
                  contentStyle={{
                    backgroundColor: "var(--app-surface)",
                    border: "1px solid var(--app-border)",
                    borderRadius: "12px",
                    color: "var(--app-text)",
                  }}
                  formatter={(value, name) => [
                    formatCurrency(Number(value)),
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold app-text">
                <AnimatedNumber
                  value={highestPercentage}
                  formatter={formatWholePercentage}
                />
              </span>
              <span className="max-w-20 truncate text-xs app-muted">
                {highestCategory.category}
              </span>
            </div>
          </div>
          <div className="min-w-0 space-y-3">
            {data.map((item) => (
              <div
                key={item.category}
                className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-2 text-sm"
              >
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: categoryColors[item.category] }}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate app-muted">
                  {item.category}
                </span>
                <span className="whitespace-nowrap font-semibold app-text">
                  <AnimatedNumber
                    value={item.amount}
                    formatter={formatCurrency}
                  />
                </span>
                <span className="w-12 text-right text-xs font-medium app-muted">
                  <AnimatedNumber
                    value={(item.amount / totalExpenses) * 100}
                    formatter={formatPercentage}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ExpenseDistribution;

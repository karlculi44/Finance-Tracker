import { ArrowRight } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import type { DateRangeType } from "../types/FinanceSummary";
import type { Transaction } from "../types/Transaction";
import createAnalyticsData from "../utils/analyticsData";
import formatCurrency from "../utils/formatCurrency";

function FinancialOverview({
  transactions,
  dateRange,
}: {
  transactions: Transaction[];
  dateRange: DateRangeType;
}) {
  const data = createAnalyticsData(transactions, dateRange);

  return (
    <Link
      to="/analytics"
      aria-label="View detailed financial analytics"
      className="app-surface block rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-(--app-primary) sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold app-text">Financial Overview</h2>
          <p className="mt-1 text-sm app-muted">{dateRange}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold app-primary">
          View Analytics <ArrowRight size={16} aria-hidden="true" />
        </span>
      </div>
      {data.length > 0 ? (
        <div className="mt-5 h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 4, left: -22, bottom: 0 }}
            >
              <CartesianGrid
                stroke="var(--app-border)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis dataKey="period" hide />
              <YAxis hide />
              <Tooltip
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
              <Legend
                wrapperStyle={{ color: "var(--app-text)", fontSize: "12px" }}
              />
              <Line
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="var(--app-income)"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="var(--app-expense)"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="mt-5 rounded-xl border border-dashed app-border px-4 py-8 text-center text-sm app-muted">
          Add transactions to see your cash flow.
        </p>
      )}
    </Link>
  );
}

export default FinancialOverview;

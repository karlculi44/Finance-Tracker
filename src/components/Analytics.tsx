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
import type { DateRangeType } from "../types/FinanceSummary";
import type { Transaction } from "../types/Transaction";
import createAnalyticsData from "../utils/analyticsData";
import formatCurrency from "../utils/formatCurrency";

function Analytics({
  transactions,
  dateRange,
  title = "Income vs Expenses",
  description = "Income and expenses over time",
}: {
  transactions: Transaction[];
  dateRange: DateRangeType;
  title?: string;
  description?: string;
}) {
  const data = createAnalyticsData(transactions, dateRange);

  return (
    <section
      className="app-surface rounded-2xl border p-5 sm:p-6"
      aria-label="Analytics"
    >
      <div>
        <h2 className="text-lg font-bold app-text">{title}</h2>
        <p className="mt-1 text-sm app-muted">{description}</p>
      </div>
      {data.length > 0 ? (
        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
            >
              <CartesianGrid
                stroke="var(--app-border)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--app-muted)", fontSize: 12 }}
                minTickGap={24}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--app-muted)", fontSize: 12 }}
                tickFormatter={(value: number) => formatCurrency(value)}
                width={78}
              />
              <Tooltip
                wrapperClassName="app-chart-tooltip"
                contentStyle={{
                  backgroundColor: "var(--app-surface)",
                  border: "1px solid var(--app-border)",
                  borderRadius: "12px",
                  color: "var(--app-text)",
                }}
                labelStyle={{ color: "var(--app-muted)" }}
                formatter={(value, name) => [
                  formatCurrency(Number(value)),
                  name,
                ]}
              />
              <Legend
                wrapperStyle={{ color: "var(--app-text)", fontSize: "13px" }}
              />
              <Line
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="var(--app-income)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="var(--app-expense)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed app-border px-4 py-10 text-center text-sm app-muted">
          No transactions to display for this period.
        </p>
      )}
    </section>
  );
}

export default Analytics;

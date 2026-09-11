import type { DateRangeType } from "../types/FinanceSummary";
import type { AnalyticsData } from "../types/Analytics";
import type { Transaction } from "../types/Transaction";

type AnalyticsGrouping = "hour" | "day" | "month";

function getGrouping(dateRange: DateRangeType): AnalyticsGrouping {
  return dateRange === "Today"
    ? "hour"
    : ["Last 3 Months", "All Time"].includes(dateRange)
      ? "month"
      : "day";
}

function startOfPeriod(date: Date, grouping: AnalyticsGrouping) {
  const periodStart = new Date(date);

  if (grouping === "month") {
    periodStart.setDate(1);
    periodStart.setHours(0, 0, 0, 0);
  } else if (grouping === "day") {
    periodStart.setHours(0, 0, 0, 0);
  } else {
    periodStart.setMinutes(0, 0, 0);
  }

  return periodStart;
}

function getNextPeriod(date: Date, grouping: AnalyticsGrouping) {
  const nextPeriod = new Date(date);

  if (grouping === "month") nextPeriod.setMonth(nextPeriod.getMonth() + 1);
  else if (grouping === "day") nextPeriod.setDate(nextPeriod.getDate() + 1);
  else nextPeriod.setHours(nextPeriod.getHours() + 1);

  return nextPeriod;
}

function getPeriodKey(date: Date, grouping: AnalyticsGrouping) {
  const periodStart = startOfPeriod(date, grouping);
  return periodStart.getTime();
}

function formatPeriod(date: Date, grouping: AnalyticsGrouping) {
  if (grouping === "hour") {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
    }).format(date);
  }

  if (grouping === "month") {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function getRangeStart(
  dateRange: DateRangeType,
  currentDate: Date,
  transactions: Transaction[],
) {
  const rangeStart = new Date(currentDate);
  rangeStart.setHours(0, 0, 0, 0);

  switch (dateRange) {
    case "Today":
      return rangeStart;
    case "Last 3 Days":
      rangeStart.setDate(rangeStart.getDate() - 2);
      return rangeStart;
    case "This Week":
      rangeStart.setDate(rangeStart.getDate() - rangeStart.getDay());
      return rangeStart;
    case "Last 2 Weeks":
      rangeStart.setDate(rangeStart.getDate() - 13);
      return rangeStart;
    case "This Month":
      rangeStart.setDate(1);
      return rangeStart;
    case "Last 3 Months":
      rangeStart.setDate(1);
      rangeStart.setMonth(rangeStart.getMonth() - 2);
      return rangeStart;
    case "All Time":
      return transactions.reduce(
        (earliest, transaction) =>
          transaction.date < earliest ? transaction.date : earliest,
        currentDate,
      );
  }
}

function createAnalyticsData(
  transactions: Transaction[],
  dateRange: DateRangeType,
  currentDate = new Date(),
): AnalyticsData[] {
  if (transactions.length === 0) return [];

  const grouping = getGrouping(dateRange);
  const rangeStart = startOfPeriod(
    getRangeStart(dateRange, currentDate, transactions),
    grouping,
  );
  const rangeEnd = startOfPeriod(currentDate, grouping);
  const dataByPeriod = new Map<number, AnalyticsData>();

  for (
    let period = rangeStart;
    period <= rangeEnd;
    period = getNextPeriod(period, grouping)
  ) {
    dataByPeriod.set(period.getTime(), {
      period: formatPeriod(period, grouping),
      income: 0,
      expenses: 0,
    });
  }

  transactions.forEach((transaction) => {
    const periodKey = getPeriodKey(transaction.date, grouping);
    const periodData = dataByPeriod.get(periodKey);

    if (!periodData) return;

    if (transaction.type === "Income") periodData.income += transaction.amount;
    if (transaction.type === "Expense")
      periodData.expenses += transaction.amount;
  });

  return Array.from(dataByPeriod.values());
}

export default createAnalyticsData;

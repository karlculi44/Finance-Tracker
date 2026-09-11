import type {
  TransactionCategory,
  TransactionFilterType,
} from "../types/Transaction";
import type { DateRangeType } from "../types/FinanceSummary";

type CategoryFilter = "All" | TransactionCategory;

function TransactionFilters({
  selectedFilter,
  onFilterChange,
  selectedCategory,
  onCategoryChange,
  selectedDateRange,
  onDateRangeChange,
}: {
  selectedFilter: TransactionFilterType;
  onFilterChange: (filter: TransactionFilterType) => void;
  selectedCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  selectedDateRange: DateRangeType;
  onDateRangeChange: (dateRange: DateRangeType) => void;
}) {
  const filters: { label: string; value: TransactionFilterType }[] = [
    { label: "All", value: "All" },
    { label: "Income", value: "Income" },
    { label: "Expenses", value: "Expense" },
  ];

  const categories: TransactionCategory[] = [
    "Food",
    "Transportation",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Housing",
    "Travel",
    "Salary",
    "Other",
  ];
  const dateRanges: DateRangeType[] = [
    "All Time",
    "Today",
    "Last 3 Days",
    "This Week",
    "Last 2 Weeks",
    "This Month",
    "Last 3 Months",
  ];

  return (
    <div className="flex flex-wrap items-end gap-2 text-xs font-semibold">
      <label className="grid gap-1 app-muted">
        <select
          value={selectedDateRange}
          onChange={(event) =>
            onDateRangeChange(event.target.value as DateRangeType)
          }
          className="app-input rounded-lg border px-3 py-2 font-medium outline-none transition"
        >
          {dateRanges.map((dateRange) => (
            <option key={dateRange} value={dateRange}>
              {dateRange}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1 app-muted">
        <select
          value={selectedCategory}
          onChange={(event) =>
            onCategoryChange(event.target.value as CategoryFilter)
          }
          className="app-input rounded-lg border px-3 py-2 font-medium outline-none transition"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <div className="app-surface-muted flex items-center gap-1 rounded-lg border p-1">
        {filters.map(({ label, value }) => {
          const isSelected = selectedFilter === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => onFilterChange(value)}
              className={`rounded-md px-3 py-1.5 transition ${
                isSelected
                  ? "app-surface app-primary shadow-sm"
                  : "app-muted hover:text-(--app-text)"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TransactionFilters;

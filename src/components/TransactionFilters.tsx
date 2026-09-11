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
      <label className="grid gap-1 text-slate-500">
        <select
          value={selectedDateRange}
          onChange={(event) =>
            onDateRangeChange(event.target.value as DateRangeType)
          }
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-700 outline-none transition focus:border-slate-400"
        >
          {dateRanges.map((dateRange) => (
            <option key={dateRange} value={dateRange}>
              {dateRange}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1 text-slate-500">
        <select
          value={selectedCategory}
          onChange={(event) =>
            onCategoryChange(event.target.value as CategoryFilter)
          }
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-700 outline-none transition focus:border-slate-400"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
        {filters.map(({ label, value }) => {
          const isSelected = selectedFilter === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => onFilterChange(value)}
              className={`rounded-md px-3 py-1.5 transition ${
                isSelected
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
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

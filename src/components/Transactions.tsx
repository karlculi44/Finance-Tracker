import { Search } from "lucide-react";
import { useState } from "react";
import type {
  Transaction,
  TransactionCategory,
  TransactionFilterType,
} from "../types/Transaction";
import type { DateRangeType } from "../types/FinanceSummary";
import TransactionFilters from "./TransactionFilters";
import TransactionList from "./TransactionList";
import EmptyState from "./EmptyState";
import NoResults from "./NoResults";

function Transactions({
  transactions,
  onEdit,
  onDelete,
  dateRange,
  onDateRangeChange,
  onViewReport,
}: {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transationId: string) => void;
  dateRange: DateRangeType;
  onDateRangeChange: (dateRange: DateRangeType) => void;
  onViewReport: () => void;
}) {
  const [selectedFilter, setSelectedFilter] =
    useState<TransactionFilterType>("All");
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | TransactionCategory
  >("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  const handleFilterChange = (filter: TransactionFilterType) => {
    setSelectedFilter(filter);
    setVisibleCount(10);
  };

  const handleCategoryChange = (category: "All" | TransactionCategory) => {
    setSelectedCategory(category);
    setVisibleCount(10);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setVisibleCount(10);
  };

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesType =
        selectedFilter === "All" || transaction.type === selectedFilter;
      const matchesCategory =
        selectedCategory === "All" || transaction.category === selectedCategory;
      const matchesSearch =
        normalizedSearchTerm === "" ||
        transaction.description.toLowerCase().includes(normalizedSearchTerm) ||
        transaction.category.toLowerCase().includes(normalizedSearchTerm);

      return matchesType && matchesCategory && matchesSearch;
    })
    .sort(
      (firstTransaction, secondTransaction) =>
        secondTransaction.date.getTime() - firstTransaction.date.getTime(),
    );
  const visibleTransactions = filteredTransactions.slice(0, visibleCount);
  const hasMoreThanTenTransactions = filteredTransactions.length > 10;
  const allTransactionsVisible = visibleCount >= filteredTransactions.length;

  const handleViewMoreOrLess = () => {
    if (allTransactionsVisible) {
      setVisibleCount(10);
      return;
    }

    setVisibleCount((currentCount) =>
      Math.min(currentCount + 10, filteredTransactions.length),
    );
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Transactions</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your recent financial activity
            </p>
          </div>
        </div>
        <TransactionFilters
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedDateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
        />
      </div>
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            onClick={onViewReport}
            className="shrink-0 rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            View Report
          </button>
        </div>
        <label className="relative block">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={searchTerm}
            onChange={(event) => handleSearchChange(event.target.value)}
            aria-label="Search transactions"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-slate-400"
            placeholder="Search transactions..."
          />
        </label>
        {filteredTransactions.length > 0 ? (
          <>
            <TransactionList
              transactions={visibleTransactions}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            {hasMoreThanTenTransactions && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleViewMoreOrLess}
                  className="rounded-xl  px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                >
                  {allTransactionsVisible ? "View Less" : "View More"}
                </button>
              </div>
            )}
          </>
        ) : normalizedSearchTerm ? (
          <NoResults />
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

export default Transactions;

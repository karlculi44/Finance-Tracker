import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

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

  const handleTransactionScroll = () => {
    setIsScrolling(true);

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 700);
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
    <section className="app-surface rounded-2xl border">
      <div className="flex flex-col gap-4 border-b app-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold app-text">Transactions</h2>
            <p className="mt-1 text-sm app-muted">
              Your recent financial activity
            </p>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:items-end">
          <button
            type="button"
            onClick={onViewReport}
            className="app-primary-bg self-end rounded-xl px-3 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5"
          >
            View Report
          </button>
          <TransactionFilters
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            selectedDateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
          />
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <label className="relative block">
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={searchTerm}
            onChange={(event) => handleSearchChange(event.target.value)}
            aria-label="Search transactions"
            className="app-input w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none"
            placeholder="Search transactions..."
          />
        </label>
        {filteredTransactions.length > 0 ? (
          <div
            onScroll={handleTransactionScroll}
            className={`max-h-136 overflow-y-auto pr-1 ${isScrolling ? "scrollbar-visible" : "scrollbar-hidden"}`}
          >
            <TransactionList
              transactions={visibleTransactions}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            {hasMoreThanTenTransactions && (
              <div className="mt-4 flex justify-center pb-1">
                <button
                  type="button"
                  onClick={handleViewMoreOrLess}
                  className="app-surface-raised app-text rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:border-(--app-primary) hover:text-(--app-primary)"
                >
                  {allTransactionsVisible ? "View Less" : "View More"}
                </button>
              </div>
            )}
          </div>
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

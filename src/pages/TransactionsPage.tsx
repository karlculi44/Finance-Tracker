import { useOutletContext } from "react-router-dom";
import Transactions from "../components/Transactions";
import type { AppOutletContext } from "../layout/MainLayout";

function TransactionsPage() {
  const {
    dateRange,
    filteredTransactions,
    onDateRangeChange,
    onDelete,
    onEdit,
    onViewReport,
  } = useOutletContext<AppOutletContext>();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] app-primary">
          Manage your activity
        </p>
        <h2 className="mt-2 text-2xl font-bold app-text">Transactions</h2>
        <p className="mt-1 text-sm app-muted">
          Browse, filter, and manage your complete transaction history.
        </p>
      </div>
      <Transactions
        transactions={filteredTransactions}
        onEdit={onEdit}
        onDelete={onDelete}
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
        onViewReport={onViewReport}
      />
    </div>
  );
}

export default TransactionsPage;

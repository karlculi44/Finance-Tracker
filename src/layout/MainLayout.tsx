import { CreditCard } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { TransactionForm, Transaction } from "../types/Transaction";
import type { DateRangeType } from "../types/FinanceSummary";
import { v4 as uuidv4 } from "uuid";
import {
  getTransactionsFromStorage,
  saveTransactionsToStorage,
} from "../utils/transactionStorage";
import SummaryCards from "../components/SummaryCards";
import Header from "../components/Header";
import Transactions from "../components/Transactions";
import TransactionModal from "../components/TransactionModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import FinancialReportModal from "../components/FinancialReportModal";

function getDateRangeStart(dateRange: DateRangeType, currentDate: Date) {
  const startDate = new Date(currentDate);
  startDate.setHours(0, 0, 0, 0);

  switch (dateRange) {
    case "Today":
      return startDate;
    case "Last 3 Days":
      startDate.setDate(startDate.getDate() - 2);
      return startDate;
    case "This Week":
      startDate.setDate(startDate.getDate() - startDate.getDay());
      return startDate;
    case "Last 2 Weeks":
      startDate.setDate(startDate.getDate() - 13);
      return startDate;
    case "This Month":
      startDate.setDate(1);
      return startDate;
    case "Last 3 Months":
      startDate.setDate(1);
      startDate.setMonth(startDate.getMonth() - 2);
      return startDate;
    case "All Time":
      return null;
  }
}

function MainLayout() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(
    getTransactionsFromStorage,
  );
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeType>("All Time");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const totalIncome = transactions.reduce(
    (total, transaction) =>
      transaction.type === "Income" ? total + transaction.amount : total,
    0,
  );
  const totalExpenses = transactions.reduce(
    (total, transaction) =>
      transaction.type === "Expense" ? total + transaction.amount : total,
    0,
  );
  const dateRangeStart = getDateRangeStart(dateRange, new Date());
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      dateRangeStart === null ||
      (transaction.date >= dateRangeStart && transaction.date <= new Date())
    );
  });
  const filteredIncome = filteredTransactions.reduce(
    (total, transaction) =>
      transaction.type === "Income" ? total + transaction.amount : total,
    0,
  );
  const filteredExpenses = filteredTransactions.reduce(
    (total, transaction) =>
      transaction.type === "Expense" ? total + transaction.amount : total,
    0,
  );
  const balance = totalIncome - totalExpenses;
  const remainingPercentage =
    filteredIncome > 0
      ? ((filteredIncome - filteredExpenses) / filteredIncome) * 100
      : null;
  const remainingBarWidth = Math.max(
    0,
    Math.min(100, remainingPercentage ?? 0),
  );

  const handleFormSubmit = (form: TransactionForm) => {
    const newTransactions = transactionToEdit
      ? transactions.map((transaction) =>
          transaction.id === transactionToEdit.id
            ? { ...form, id: transaction.id }
            : transaction,
        )
      : [...transactions, { ...form, id: uuidv4() }];

    setTransactions(newTransactions);
    saveTransactionsToStorage(newTransactions);
    if (!transactionToEdit) toast.success("Transaction added successfully.");
    if (transactionToEdit) toast.success("Transaction updated successfully.");
  };

  const handleOpenTransactionModal = () => {
    setTransactionToEdit(null);
    setIsTransactionModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setIsTransactionModalOpen(true);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    const transaction = transactions.find(
      (currentTransaction) => currentTransaction.id === transactionId,
    );

    if (!transaction) return;

    setTransactionToDelete(transaction);
    setIsConfirmDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!transactionToDelete) return;

    const newTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionToDelete.id,
    );
    setTransactions(newTransactions);
    saveTransactionsToStorage(newTransactions);
    setTransactionToDelete(null);
    setIsConfirmDeleteModalOpen(false);
    toast.success("Transaction deleted successfully.");
  };

  const handleCloseConfirmDeleteModal = () => {
    setTransactionToDelete(null);
    setIsConfirmDeleteModalOpen(false);
  };

  const handleCloseTransactionModal = () => {
    setIsTransactionModalOpen(false);
    setTransactionToEdit(null);
  };

  return (
    <main className={`app-shell ${isDarkMode ? "dark-mode" : ""}`}>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Header
          onAddTransaction={handleOpenTransactionModal}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((current) => !current)}
        />
        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="order-2 space-y-6 lg:order-1 lg:col-start-1 lg:row-start-1">
            <SummaryCards
              balance={balance}
              totalIncome={filteredIncome}
              totalExpenses={filteredExpenses}
              dateRange={dateRange}
            />
            <Transactions
              transactions={filteredTransactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              onViewReport={() => setIsReportOpen(true)}
            />
          </div>
          <aside className=" order-1 rounded-2xl  p-5 lg:order-2 lg:col-start-2 lg:row-start-1">
            <div className="flex items-center gap-2 text-sm font-bold app-text">
              <CreditCard size={17} className="app-primary" />
              Quick insight
            </div>
            <p className="mt-5 text-3xl font-bold tracking-tight app-text">
              {remainingPercentage === null
                ? "No income recorded"
                : `${remainingPercentage.toFixed(1)}%`}
            </p>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              of your total income remains after expenses.
            </p>
            <div className="mt-6 h-2 rounded-full bg-slate-200">
              <div
                className="app-primary-bg h-2 rounded-full transition-[width]"
                style={{ width: `${remainingBarWidth}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-xs font-medium app-faint">
              <span>Remaining</span>
              <span>Spent</span>
            </div>
          </aside>
        </div>

        <TransactionModal
          key={`${isTransactionModalOpen}-${transactionToEdit?.id ?? "new"}`}
          isOpen={isTransactionModalOpen}
          onClose={handleCloseTransactionModal}
          onSubmit={handleFormSubmit}
          transactionToEdit={transactionToEdit}
        />

        <ConfirmDeleteModal
          isOpen={isConfirmDeleteModalOpen}
          description={transactionToDelete?.description}
          onClose={handleCloseConfirmDeleteModal}
          onConfirm={handleConfirmDelete}
        />

        <FinancialReportModal
          isOpen={isReportOpen}
          dateRange={dateRange}
          periodStart={dateRangeStart}
          periodEnd={new Date()}
          transactions={filteredTransactions}
          currentBalance={balance}
          onClose={() => setIsReportOpen(false)}
        />
      </div>
    </main>
  );
}

export default MainLayout;

import { CreditCard } from "lucide-react";
import { useState } from "react";
import type { TransactionForm, Transaction } from "../types/Transaction";
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
    <main className="min-h-screen bg-[#f7f8fa] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Header onAddTransaction={handleOpenTransactionModal} />
        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            <SummaryCards />
            <Transactions
              transactions={transactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </div>
          <aside className="hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-5 lg:block">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <CreditCard size={17} className="text-slate-400" />
              Quick insight
            </div>
            <p className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
              50.2%
            </p>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              of your monthly income remains after expenses.
            </p>
            <div className="mt-6 h-2 rounded-full bg-slate-200">
              <div className="h-2 w-1/2 rounded-full bg-emerald-500" />
            </div>
            <div className="mt-3 flex justify-between text-xs font-medium text-slate-400">
              <span>Spent</span>
              <span>Remaining</span>
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
      </div>
    </main>
  );
}

export default MainLayout;

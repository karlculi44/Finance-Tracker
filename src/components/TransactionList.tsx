import type { Transaction } from "../types/Transaction";
import TransactionItem from "./TransactionItem";

function TransactionList({
  transactions,
  onEdit,
}: {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
}) {
  return (
    <div className="mt-2">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          {...transaction}
          isPositive={transaction.type === "Income"}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TransactionList;

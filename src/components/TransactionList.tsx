import type { Transaction } from "../types/Transaction";
import TransactionItem from "./TransactionItem";

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="mt-2">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          {...transaction}
          isPositive={transaction.type === "Income"}
        />
      ))}
    </div>
  );
}

export default TransactionList;

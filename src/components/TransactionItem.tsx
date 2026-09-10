import { Pencil, Trash2, MoreHorizontal, CircleDollarSign } from "lucide-react";
import type { Transaction } from "../types/Transaction";
import formatCurrency from "../utils/formatCurrency";

interface TransactionItemProps extends Transaction {
  isPositive: boolean;
}

// type TransactionItemProps = {
//   icon: ReactNode;
//   iconTone: string;
//   title: string;
//   category: string;
//   date: string;
//   amount: number;
//   positive: boolean;
// };

function TransactionItem({
  description,
  category,
  amount,
  date,
  isPositive,
}: TransactionItemProps) {
  const iconTone: string = isPositive
    ? "bg-emerald-50 text-emerald-600"
    : "bg-rose-50 text-rose-500";

  return (
    <div className="group flex items-center gap-3 border-b border-slate-100 py-4 last:border-0 sm:gap-4">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconTone}`}
      >
        <CircleDollarSign size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">
          {description}
        </p>
        <p className="mt-1 truncate text-xs text-slate-400">
          {category} <span className="mx-1 text-slate-300">•</span>{" "}
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <p
        className={`whitespace-nowrap text-sm font-bold ${isPositive ? "text-emerald-600" : "text-slate-800"}`}
      >
        {formatCurrency(amount)}
      </p>
      <div className="hidden items-center gap-1 sm:flex">
        <button
          aria-label={`Edit ${description}`}
          className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <Pencil size={15} />
        </button>
        <button
          aria-label={`Delete ${description}`}
          className="rounded-lg p-2 text-slate-300 transition hover:bg-rose-50 hover:text-rose-500"
        >
          <Trash2 size={15} />
        </button>
      </div>
      <button
        aria-label={`More options for ${description}`}
        className="rounded-lg p-2 text-slate-300 sm:hidden"
      >
        <MoreHorizontal size={17} />
      </button>
    </div>
  );
}
export default TransactionItem;

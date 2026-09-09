import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import formatCurrency from "../utils/formatCurrency";

type TransactionItemProps = {
  icon: ReactNode;
  iconTone: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  positive: boolean;
};

function TransactionItem({
  icon,
  iconTone,
  title,
  category,
  date,
  amount,
  positive,
}: TransactionItemProps) {
  return (
    <div className="group flex items-center gap-3 border-b border-slate-100 py-4 last:border-0 sm:gap-4">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconTone}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 truncate text-xs text-slate-400">
          {category} <span className="mx-1 text-slate-300">•</span> {date}
        </p>
      </div>
      <p
        className={`whitespace-nowrap text-sm font-bold ${positive ? "text-emerald-600" : "text-slate-800"}`}
      >
        {formatCurrency(amount)}
      </p>
      <div className="hidden items-center gap-1 sm:flex">
        <button
          aria-label={`Edit ${title}`}
          className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <Pencil size={15} />
        </button>
        <button
          aria-label={`Delete ${title}`}
          className="rounded-lg p-2 text-slate-300 transition hover:bg-rose-50 hover:text-rose-500"
        >
          <Trash2 size={15} />
        </button>
      </div>
      <button
        aria-label={`More options for ${title}`}
        className="rounded-lg p-2 text-slate-300 sm:hidden"
      >
        <MoreHorizontal size={17} />
      </button>
    </div>
  );
}
export default TransactionItem;

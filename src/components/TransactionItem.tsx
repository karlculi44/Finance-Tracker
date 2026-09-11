import {
  Banknote,
  Car,
  CircleDollarSign,
  FileText,
  GraduationCap,
  HeartPulse,
  House,
  MoreHorizontal,
  Pencil,
  Plane,
  Receipt,
  ShoppingBag,
  Trash2,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { Transaction, TransactionCategory } from "../types/Transaction";
import formatCurrency from "../utils/formatCurrency";

interface TransactionItemProps extends Transaction {
  isPositive: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transactionId: string) => void;
}

const categoryIcon: Record<
  TransactionCategory,
  { icon: LucideIcon; tone: string }
> = {
  Food: { icon: Utensils, tone: "bg-orange-50 text-orange-500" },
  Transportation: { icon: Car, tone: "bg-sky-50 text-sky-600" },
  Shopping: { icon: ShoppingBag, tone: "bg-violet-50 text-violet-500" },
  Bills: { icon: Receipt, tone: "bg-amber-50 text-amber-600" },
  Entertainment: { icon: FileText, tone: "bg-fuchsia-50 text-fuchsia-500" },
  Health: { icon: HeartPulse, tone: "bg-rose-50 text-rose-500" },
  Education: { icon: GraduationCap, tone: "bg-indigo-50 text-indigo-600" },
  Housing: { icon: House, tone: "bg-lime-50 text-lime-600" },
  Travel: { icon: Plane, tone: "bg-cyan-50 text-cyan-600" },
  Salary: { icon: Banknote, tone: "bg-emerald-50 text-emerald-600" },
  Other: { icon: CircleDollarSign, tone: "bg-slate-100 text-slate-600" },
};

function TransactionItem({
  id,
  description,
  category,
  amount,
  date,
  type,
  isPositive,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  const { icon: CategoryIcon, tone: iconTone } = categoryIcon[category];

  return (
    <div className="group flex items-center gap-3 border-b app-border py-4 last:border-0 sm:gap-4">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconTone}`}
      >
        <CategoryIcon size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold app-text">{description}</p>
        <p className="truncate text-xs app-muted">{category}</p>
        <p className="truncate text-xs app-faint">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <p
          className={`whitespace-nowrap text-sm font-bold ${isPositive ? "app-primary" : "app-danger"}`}
        >
          {isPositive ? "+" : "-"} {formatCurrency(amount)}
        </p>
      </div>
      <div className="hidden items-center gap-1 sm:flex">
        <button
          onClick={() =>
            onEdit({ id, description, category, amount, date, type })
          }
          aria-label={`Edit ${description}`}
          className="rounded-lg p-2 app-faint transition hover:bg-(--app-surface-muted) hover:text-(--app-text)"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(id)}
          aria-label={`Delete ${description}`}
          className="rounded-lg p-2 app-faint transition hover:bg-(--app-danger-soft)] hover:app-danger"
        >
          <Trash2 size={15} />
        </button>
        <time className="text-xs app-faint">
          {date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </time>
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

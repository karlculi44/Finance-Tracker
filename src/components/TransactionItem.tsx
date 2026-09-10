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
  description,
  category,
  amount,
  date,
  isPositive,
}: TransactionItemProps) {
  const { icon: CategoryIcon, tone: iconTone } = categoryIcon[category];

  return (
    <div className="group flex items-center gap-3 border-b border-slate-100 py-4 last:border-0 sm:gap-4">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconTone}`}
      >
        <CategoryIcon size={18} />
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
        {isPositive ? "+" : "-"} {formatCurrency(amount)}
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

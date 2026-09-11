import { CreditCard } from "lucide-react";

function QuickInsight({
  remainingPercentage,
  remainingBarWidth,
}: {
  remainingPercentage: number | null;
  remainingBarWidth: number;
}) {
  return (
    <div className="app-surface rounded-2xl border p-5">
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
    </div>
  );
}

export default QuickInsight;

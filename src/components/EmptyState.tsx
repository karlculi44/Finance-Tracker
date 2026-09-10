import { FileText } from "lucide-react";

function EmptyState() {
  return (
    <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white my-2 px-6 py-16 text-center">
      <div className="rounded-2xl bg-slate-100 p-4 text-slate-500">
        <FileText size={25} />
      </div>
      <h2 className="mt-5 text-lg font-bold text-slate-950">
        No transactions yet
      </h2>
      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
        Add your first transaction to start tracking your finances.
      </p>
    </section>
  );
}

export default EmptyState;

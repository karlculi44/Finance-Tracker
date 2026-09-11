import { SearchX } from "lucide-react";

function NoResults() {
  return (
    <section className="my-2 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="rounded-2xl bg-slate-100 p-4 text-slate-500">
        <SearchX size={25} />
      </div>
      <h2 className="mt-5 text-lg font-bold text-slate-950">
        No results found
      </h2>
      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
        Try searching for a different transaction or category.
      </p>
    </section>
  );
}

export default NoResults;

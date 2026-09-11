import { SearchX } from "lucide-react";

function NoResults() {
  return (
    <section className="app-surface-raised app-border my-2 flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-16 text-center">
      <div className="app-surface-muted app-muted rounded-2xl p-4">
        <SearchX size={25} />
      </div>
      <h2 className="mt-5 text-lg font-bold app-text">No results found</h2>
      <p className="mt-2 max-w-xs text-sm leading-6 app-muted">
        Try searching for a different transaction or category.
      </p>
    </section>
  );
}

export default NoResults;

import { Plus } from "lucide-react";

function AddTransactionAction({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Add transaction"
      className="app-primary-bg fixed bottom-20 right-4 z-50 inline-flex size-14 items-center justify-center rounded-full text-white shadow-lg transition hover:-translate-y-0.5 lg:hidden"
    >
      <Plus size={26} strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}

export default AddTransactionAction;

import { AlertTriangle, X } from "lucide-react";

function ConfirmDeleteModal({
  isOpen,
  description,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07120f]/70 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        className="app-surface w-full max-w-md rounded-2xl border p-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="app-danger-soft rounded-xl p-2">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2
                id="delete-dialog-title"
                className="text-lg font-bold app-text"
              >
                Delete transaction?
              </h2>
              <p className="mt-1 text-sm leading-5 app-muted">
                {description
                  ? `Are you sure you want to delete ${description}? This action cannot be undone.`
                  : "This action cannot be undone."}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close delete confirmation"
            className="rounded-lg p-2 app-faint hover:bg-[var(--app-surface-muted)]"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold app-muted hover:bg-[var(--app-surface-muted)]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl bg-[var(--app-danger)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;

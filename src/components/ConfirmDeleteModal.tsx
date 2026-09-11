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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-rose-50 p-2 text-rose-500">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2
                id="delete-dialog-title"
                className="text-lg font-bold text-slate-950"
              >
                Delete transaction?
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                {description
                  ? `Are you sure you want to delete ${description}? This action cannot be undone.`
                  : "This action cannot be undone."}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close delete confirmation"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
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

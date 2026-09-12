import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

const CONFIRMATION_TEXT = "confirm delete data";

function ResetDataModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [confirmation, setConfirmation] = useState("");

  if (!isOpen) return null;

  const canConfirm = confirmation.trim() === CONFIRMATION_TEXT;

  const handleClose = () => {
    setConfirmation("");
    onClose();
  };

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07120f]/70 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="reset-data-dialog-title"
        className="app-surface w-full max-w-md rounded-2xl border p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="app-danger-soft rounded-xl p-2">
              <AlertTriangle size={20} aria-hidden="true" />
            </div>
            <div>
              <h2
                id="reset-data-dialog-title"
                className="text-lg font-bold app-text"
              >
                Reset all application data?
              </h2>
              <p className="mt-1 text-sm leading-5 app-muted">
                This permanently deletes your transactions, profile, theme, and
                setup state. This action cannot be undone.
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close reset data confirmation"
            className="rounded-lg p-2 app-faint hover:bg-[var(--app-surface-muted)]"
            onClick={handleClose}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <label className="mt-6 grid gap-2 text-sm font-semibold app-text">
          Type <span className="font-mono text-xs">{CONFIRMATION_TEXT}</span> to
          continue
          <input
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            placeholder={CONFIRMATION_TEXT}
            autoFocus
            className="app-input min-h-12 rounded-xl border px-3.5 py-2.5 font-mono text-sm font-normal outline-none"
          />
        </label>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold app-muted hover:bg-[var(--app-surface-muted)]"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canConfirm}
            className="rounded-xl bg-[var(--app-danger)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleConfirm}
          >
            Delete all data
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetDataModal;

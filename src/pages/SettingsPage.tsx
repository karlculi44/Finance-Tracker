import { Moon, Save, Sun, Trash2 } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { AppOutletContext } from "../layout/MainLayout";
import { saveUserName } from "../utils/onboardingStorage";
import ResetDataModal from "../components/ResetDataModal";

function SettingsPage() {
  const {
    isDarkMode,
    onResetApplication,
    onToggleTheme,
    onUserNameChange,
    userName,
  } = useOutletContext<AppOutletContext>();
  const [name, setName] = useState(userName);
  const [message, setMessage] = useState("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleSaveName = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setMessage("Please enter a name.");
      return;
    }

    saveUserName(trimmedName);
    onUserNameChange(trimmedName);
    setName(trimmedName);
    setMessage("Profile name updated.");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] app-primary">
          Preferences
        </p>
        <h2 className="mt-2 text-2xl font-bold app-text">Settings</h2>
        <p className="mt-1 text-sm app-muted">
          Keep your tracker personal and simple.
        </p>
      </div>

      <section className="app-surface rounded-2xl border p-5 sm:p-6">
        <h3 className="text-lg font-bold app-text">Profile name</h3>
        <p className="mt-1 text-sm app-muted">
          Used in your dashboard greeting.
        </p>
        <label className="mt-5 grid gap-2 text-sm font-semibold app-text">
          Name
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setMessage("");
            }}
            className="app-input min-h-12 rounded-xl border px-3.5 py-2.5 font-normal outline-none"
          />
        </label>
        <button
          type="button"
          onClick={handleSaveName}
          className="app-primary-bg mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Save size={16} aria-hidden="true" />
          Save name
        </button>
        {message && (
          <p className="mt-3 text-sm app-primary" role="status">
            {message}
          </p>
        )}
      </section>

      <section className="app-surface rounded-2xl border p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold app-text">Appearance</h3>
            <p className="mt-1 text-sm app-muted">Choose light or dark mode.</p>
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            className="app-surface-raised app-text inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold"
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            {isDarkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-[color-mix(in_srgb,var(--app-danger)_45%,transparent)] bg-[color-mix(in_srgb,var(--app-danger)_7%,var(--app-surface))] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="app-danger-soft rounded-xl p-2">
            <Trash2 size={18} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] app-danger">
              Danger zone
            </p>
            <h3 className="mt-1 text-lg font-bold app-text">
              Reset application data
            </h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-5 app-muted">
          Delete your transactions, profile, theme, and setup state from this
          browser.
        </p>
        <button
          type="button"
          onClick={() => setIsResetModalOpen(true)}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-(--app-danger) px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Trash2 size={16} aria-hidden="true" />
          Reset all data
        </button>
      </section>

      <ResetDataModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={onResetApplication}
      />
    </div>
  );
}

export default SettingsPage;

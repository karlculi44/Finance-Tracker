import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { completeSetup } from "../utils/onboardingStorage";

type OnboardingStep = "welcome" | "name" | "complete";

function GettingStarted({ onComplete }: { onComplete: () => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleNameSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name to continue.");
      return;
    }

    setName(trimmedName);
    setError("");
    setStep("complete");
  };

  const handleFinish = () => {
    completeSetup(name);
    onComplete();
    navigate("/", { replace: true });
  };

  return (
    <main className="app-shell app-page-enter flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
      <section className="app-surface w-full max-w-md rounded-2xl border p-6 text-center shadow-xl sm:p-8">
        <div key={step} className="onboarding-step">
          {step === "welcome" && (
            <>
              <div className="app-primary-soft mx-auto flex size-14 items-center justify-center rounded-2xl">
                <Sparkles size={26} aria-hidden="true" />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] app-primary">
                Expense Tracker
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight app-text">
                Let&apos;s get started
              </h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 app-muted">
                Set up your dashboard in just a few quick steps.
              </p>
              <button
                type="button"
                onClick={() => setStep("name")}
                className="app-primary-bg mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
              >
                Get Started <ArrowRight size={17} aria-hidden="true" />
              </button>
            </>
          )}

          {step === "name" && (
            <form onSubmit={handleNameSubmit} className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] app-primary">
                Personalize your dashboard
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight app-text">
                What&apos;s your name?
              </h1>
              <p className="mt-3 text-sm leading-6 app-muted">
                We&apos;ll use this to personalize your dashboard.
              </p>
              <label className="mt-6 grid gap-2 text-sm font-semibold app-text">
                Your name
                <input
                  autoFocus
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "name-error" : undefined}
                  className="app-input min-h-12 rounded-xl border px-3.5 py-2.5 font-normal outline-none"
                  placeholder="Enter your name"
                />
              </label>
              {error && (
                <p
                  id="name-error"
                  className="mt-2 text-sm text-rose-600"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="app-primary-bg mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
              >
                Continue <ArrowRight size={17} aria-hidden="true" />
              </button>
            </form>
          )}

          {step === "complete" && (
            <>
              <div className="app-primary-bg mx-auto flex size-14 items-center justify-center rounded-full text-white">
                <Check size={28} aria-hidden="true" />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] app-primary">
                All set
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight app-text">
                Welcome, {name}!
              </h1>
              <p className="mt-3 text-sm leading-6 app-muted">
                Your dashboard is ready.
              </p>
              <button
                type="button"
                onClick={handleFinish}
                className="app-primary-bg mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
              >
                Go to Dashboard <ArrowRight size={17} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default GettingStarted;

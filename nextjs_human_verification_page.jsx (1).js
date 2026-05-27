"use client";

import { useMemo, useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export default function HumanVerificationPage() {
  const generateChallenge = () => {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;

    return {
      a,
      b,
      answer: a + b,
    };
  };

  const [challenge, setChallenge] = useState(generateChallenge);
  const [input, setInput] = useState("");
  const [turnstileVerified, setTurnstileVerified] = useState(false);
  const [focused, setFocused] = useState(false);

  const isCorrect = useMemo(() => {
    return Number(input) === challenge.answer;
  }, [input, challenge.answer]);

  const isReady = isCorrect && turnstileVerified;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060816] px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_45%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_40%)]" />

      <div className="relative w-full max-w-md rounded-3xl border border-blue-500/20 bg-white/5 p-8 shadow-[0_0_60px_rgba(37,99,235,0.14)] backdrop-blur-xl">
        <div className="absolute inset-0 rounded-3xl border border-white/5" />

        <div className="relative z-10">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/20 to-amber-600/10 shadow-[0_0_30px_rgba(250,204,21,0.25)]">
            <LockKeyhole className="h-10 w-10 text-yellow-300" strokeWidth={2.1} />
          </div>

          <div className="space-y-2 text-center">
            <div className="mb-3 text-center">
              <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1 text-xs font-extrabold uppercase tracking-[0.35em] text-blue-300 shadow-[0_0_18px_rgba(59,130,246,0.25)]">
                AS OFFICIAL
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white">
              One quick check...
            </h1>

            <p className="text-sm leading-relaxed text-slate-400">
              We just need to verify you&apos;re human before continuing.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-blue-500/20 bg-[#0b1023]/90 p-5 shadow-inner shadow-blue-500/5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[0.25em] text-blue-300/80">
                SOLVE THIS
              </span>

              {isCorrect && (
                <div className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </div>
              )}
            </div>

            <div className="rounded-xl border border-white/5 bg-black/30 px-4 py-5 text-center text-3xl font-bold tracking-wide text-white shadow-inner shadow-black/40">
              {challenge.a} + {challenge.b} = ?
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
                Your Answer
              </label>

              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter answer"
                className={`w-full rounded-xl border bg-[#080c1d] px-4 py-3 text-base text-white outline-none transition-all duration-300 placeholder:text-slate-600 ${
                  focused
                    ? "border-blue-400 shadow-[0_0_0_4px_rgba(59,130,246,0.15),0_0_20px_rgba(59,130,246,0.25)]"
                    : "border-white/10"
                } ${
                  input.length > 0 && !isCorrect
                    ? "border-red-500/40"
                    : ""
                }`}
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0b1023]/80 p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-200">
                  Cloudflare Turnstile
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Widget placeholder for verification
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTurnstileVerified((prev) => !prev)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 transition-all duration-300 ${
                turnstileVerified
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-white/10 bg-black/20 hover:border-blue-500/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded border transition-all ${
                    turnstileVerified
                      ? "border-emerald-400 bg-emerald-400"
                      : "border-slate-500 bg-transparent"
                  }`}
                >
                  {turnstileVerified && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="h-3 w-3 text-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                <span className="text-sm text-slate-200">
                  Verify you are human
                </span>
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Turnstile
              </div>
            </button>
          </div>

          <button
            disabled={!isReady}
            className={`mt-8 flex w-full items-center justify-center rounded-2xl px-4 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${
              isReady
                ? "bg-blue-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.55)] hover:scale-[1.01] hover:bg-blue-400"
                : "cursor-not-allowed border border-white/10 bg-white/5 text-slate-500"
            }`}
          >
            {isReady ? "Ready" : "Wait..."}
          </button>
        </div>
      </div>
    </main>
  );
}

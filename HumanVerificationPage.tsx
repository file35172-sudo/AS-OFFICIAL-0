"use client";

import { useMemo, useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";

function generateChallenge() {
  const first = Math.floor(Math.random() * 20) + 1;
  const second = Math.floor(Math.random() * 20) + 1;

  return {
    first,
    second,
    answer: first + second,
  };
}

export default function HumanVerificationPage() {
  const [challenge] = useState(generateChallenge);
  const [answer, setAnswer] = useState("");
  const [verified, setVerified] = useState(false);

  const isCorrect = useMemo(() => {
    return Number(answer) === challenge.answer;
  }, [answer, challenge.answer]);

  const isReady = verified && isCorrect;

  return (
    <main className="min-h-screen bg-[#060816] flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-blue-500/20 bg-white/5 p-8 backdrop-blur-xl">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-2xl flex items-center justify-center border border-yellow-400/20 bg-yellow-500/10">
            <LockKeyhole className="h-10 w-10 text-yellow-300" />
          </div>
        </div>

        <div className="text-center mb-4">
          <span className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-[0.3em]">
            AS OFFICIAL
          </span>
        </div>

        <h1 className="text-3xl text-center font-semibold">
          One quick check...
        </h1>

        <p className="text-center text-slate-400 mt-2 text-sm">
          We just need to verify you&apos;re human before continuing.
        </p>

        <div className="mt-8 p-5 rounded-2xl border border-blue-500/20 bg-[#0b1023]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs tracking-[0.25em] text-blue-300">
              SOLVE THIS
            </span>

            {isCorrect && (
              <div className="flex items-center gap-1 text-emerald-300 text-xs">
                <ShieldCheck className="h-4 w-4" />
                Verified
              </div>
            )}
          </div>

          <div className="text-center text-3xl font-bold py-5 rounded-xl bg-black/30">
            {challenge.first} + {challenge.second} = ?
          </div>

          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter answer"
            className="mt-5 w-full rounded-xl border border-white/10 bg-[#080c1d] px-4 py-3 outline-none focus:border-blue-400"
          />
        </div>

        <button
          type="button"
          onClick={() => setVerified(!verified)}
          className="mt-6 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3"
        >
          Verify you are human
        </button>

        <button
          disabled={!isReady}
          className={`mt-6 w-full rounded-2xl py-4 font-semibold ${
            isReady
              ? "bg-blue-500"
              : "bg-white/5 text-slate-500 cursor-not-allowed"
          }`}
        >
          {isReady ? "Ready" : "Wait..."}
        </button>
      </div>
    </main>
  );
}

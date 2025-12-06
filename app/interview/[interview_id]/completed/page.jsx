"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";


export default function InterviewCompletedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-blue from-slate-50 via-slate-100 to-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Main card */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200 border border-slate-100">
          {/* subtle top gradient bar */}
          <div className="h-2 w-full bg-gradient-to-red from-blue-500 via-indigo-500 to-sky-400" />


          <div className="p-6 sm:p-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-4">
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-4 py-1 text-lg font-medium text-emerald-700 border border-emerald-100">
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                Interview Completed
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Thank you for completing your interview!
              </h1>

              <p className="max-w-xl text-sm sm:text-base text-slate-500">
                Your responses have been submitted successfully. Our AI
                recruiter has recorded your answers and the hiring team will
                review your performance soon.
              </p>
            </div>

            {/* Illustration */}
            <div className="mt-8 flex justify-center">
              <div className="relative w-full max-w-md aspect-4/3 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                {/* 🔁 Replace the src below with your image inside /public */}
                <Image
                  src="/completed.png"
                  alt="Interview complete illustration"
                  fill
                  className="object-contain p-6"
                />
              </div>
            </div>

            {/* What's next */}
            <div className="mt-10 grid gap-6 md:grid-cols-[1.4fr,1fr] items-center">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-6 py-5">
                <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                    !
                  </span>
                  What happens next?
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• The recruiter will review your interview responses.</li>
                  <li>• You may receive follow-up questions or a next-round invite.</li>
                  <li>• Typical response time is within 2–3 business days.</li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 md:items-end">
                <Link
                  href="/dashboard"
                  className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
                >
                  <Home className="h-4 w-4" />
                  Return to dashboard
                </Link>

                
              </div>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Talkcruiter. All rights reserved.
        </p>
      </div>
    </div>
  );
}

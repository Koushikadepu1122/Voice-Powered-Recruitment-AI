"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  Clock,
  BarChart3,
  Users,
  ArrowRight,
  PlayCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

export default function Home() {
  const videoRef = useRef(null);
  const router = useRouter();

  const handleWatchSample = async () => {
    if (!videoRef.current) return;

    videoRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    try {
      if (videoRef.current.requestFullscreen) {
        await videoRef.current.requestFullscreen();
      }
      await videoRef.current.play();
    } catch (err) {
      console.error("Error opening/playing video:", err);
    }
  };

  // Go to Dashboard (or Auth)
  const handleGoToDashboard = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push("/dashboard"); // logged in
      } else {
        router.push("/auth"); // not logged in
      }
    } catch (err) {
      console.error("Auth check failed, routing to /auth", err);
      router.push("/auth");
    }
  };

  // Create Interview (or Auth)
  const handleCreateInterview = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push("/dashboard/create-interview"); // logged in
      } else {
        router.push("/auth"); // not logged in
      }
    } catch (err) {
      console.error("Auth check failed, routing to /auth", err);
      router.push("/auth");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Nav */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          {/* Logo + app name */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos.png"
              alt="TalkCruiter Logo"
              width={140}
              height={38}
              className="h-[41px] w-[140px]"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
            <a href="#flow" className="hover:text-slate-900">
              Interview Flow
            </a>
            <a href="#cta" className="hover:text-slate-900">
              Get Started
            </a>
          </nav>

          {/* Go to Dashboard button (uses auth check) */}
          <Button
            size="sm"
            variant="outline"
            className="hidden md:inline-flex"
            onClick={handleGoToDashboard}
          >
            Go to Dashboard
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-12 md:flex-row md:py-16">
        {/* Left side content */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm font-medium text-blue-700">
            <Sparkles className="h-3 w-3" />
            Voice-powered AI interview assistant
          </div>

          <h1 className="text-3xl md:text-[2.6rem] font-bold leading-tight tracking-tight">
            Hire faster with{" "}
            <span className="text-blue-600">AI-driven interviews</span>
          </h1>

          <p className="max-w-xl text-sm md:text-base text-slate-600">
            TalkCruiter screens candidates for you using natural, voice-based
            interviews. Focus on the best profiles while our AI handles the
            repetitive questions, scoring and summaries.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {/* Create First Interview → /dashboard/create-interview OR /auth */}
            <Button size="lg" className="gap-2" onClick={handleCreateInterview}>
              <ArrowRight className="h-4 w-4" />
              Create First Interview
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-slate-300 bg-white"
              onClick={handleWatchSample}
            >
              <PlayCircle className="h-4 w-4" />
              Watch sample interview
            </Button>
          </div>
        </div>

        {/* Right side - video preview */}
        <div className="flex-1 flex justify-center" id="video-preview">
          <video
            ref={videoRef}
            src="/sample.mp4"
            controls
            className="rounded-xl shadow-lg h-[280px] w-full max-w-[480px]"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-t bg-white py-12 md:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              Built for busy recruiters
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-600">
              Automate repetitive calls and get clear, comparable insights on
              every candidate.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="border-0 bg-slate-50 shadow-sm">
              <CardContent className="pt-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold">Automated screening</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Let the AI handle first-round interviews so you can focus on
                  the top profiles only.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-slate-50 shadow-sm">
              <CardContent className="pt-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold">Actionable analytics</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Scores, summaries and strengths/risks for each candidate in a
                  single view.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-slate-50 shadow-sm">
              <CardContent className="pt-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold">Fair & consistent</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Every candidate gets the same questions and evaluation
                  criteria, reducing bias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SIMPLE FLOW SECTION */}
      <section id="flow" className="bg-slate-50 py-12 md:py-14">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Simple 3-step interview flow
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-600">
            Launch interviews in minutes and review AI-generated insights
            instead of raw notes.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3 text-left">
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold mx-auto">
                1
              </div>
              <h3 className="mt-4 text-base font-semibold text-center">
                Create interview
              </h3>
              <p className="mt-1 text-sm text-slate-600 text-center">
                Choose a role, set questions and scoring criteria once.
              </p>
            </div>
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold mx-auto">
                2
              </div>
              <h3 className="mt-4 text-base font-semibold text-center">
                Share link
              </h3>
              <p className="mt-1 text-sm text-slate-600 text-center">
                Send candidates a link. The AI voice agent takes the interview.
              </p>
            </div>
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold mx-auto">
                3
              </div>
              <h3 className="mt-4 text-base font-semibold text-center">
                Review results
              </h3>
              <p className="mt-1 text-sm text-slate-600 text-center">
                Read summaries, compare scores and move the best to the next
                round.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" className="border-t bg-white py-10 md:py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-xl md:text-2xl font-semibold">
            Ready to try TalkCruiter with real candidates?
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-600">
            Start by creating your first AI-powered interview and invite a few
            candidates to test the flow.
          </p>

          <div className="mt-5 flex justify-center gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={handleGoToDashboard}
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

import CreateOptions from "./_components/CreateOptions";
import LatestInterviewsList from "./_components/LatestInterviewList";
// import WelcomeContainer from "./_components/WelcomeContainer";

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth");
      }
    }

    checkAuth();
  }, [router]);

  return (
    <div>
      {/* <WelcomeContainer /> */}
      <h2 className="my-3 font-bold text-2xl">Dashboard</h2>

      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
}

export default Dashboard;

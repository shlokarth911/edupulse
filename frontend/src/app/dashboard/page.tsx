"use client";

import { DashboardCards } from "@/components/Card";
import CountUp from "@/components/CountUp";
import { AppSidebar } from "@/components/Sidebar";
import { StudyHoursChart } from "@/components/StudyHoursChat";
import { SyllabusProgressRadialChat } from "@/components/SyllabusProgressRadialChat";
import { api } from "@/lib/api";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MHQCard from "@/components/MHQCard";
import TalktoAICard from "@/components/TalktoAICard";
import DailyAffermitiveCard from "@/components/DailyAffermitiveCard";
import WeeklyGoalCard from "@/components/WeeklyGoalCard";

const page = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    api.get("api/users/profile").then((res) => {
      setUser(res.data);
    });
  }, []);

  if (!user) return <p>Loading…</p>;

  return (
    <div
      className=""
      style={{
        backgroundImage:
          "https://i.pinimg.com/736x/89/b7/b5/89b7b5da553719634ea0673f08e8eedc.jpg",
      }}
    >
      <div className="p-2 w-full  ">
        <p className="text-muted-foreground">Welcome</p>
        <h3 className="font-bold text-4xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {user.username}
        </h3>
      </div>
      <h1 className="py-4  text-3xl">DashBoard</h1>

      <div className="grid grid-cols-1">
        <DashboardCards />
        <div className="grid grid-cols-2 gap-4 p-4 py-7 px-6">
          <StudyHoursChart />
          <div className="grid grid-cols-2 gap-4">
            <SyllabusProgressRadialChat />
            <div className="grid gap-4">
              <MHQCard />
              <TalktoAICard />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 px-6">
          <DailyAffermitiveCard />
          <WeeklyGoalCard />
        </div>
      </div>
    </div>
  );
};

export default page;

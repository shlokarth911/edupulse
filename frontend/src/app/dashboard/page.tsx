"use client";

import { DashboardCards } from "@/components/Card";
import { AppSidebar } from "@/components/Sidebar";
import { StudyHoursChart } from "@/components/StudyHoursChat";
import { api } from "@/lib/api";
import React, { useEffect, useState } from "react";

const page = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    api.get("api/users/profile").then((res) => {
      setUser(res.data);
    });
  }, []);

  if (!user) return <p>Loading…</p>;

  return (
    <div className="">
      <div className="p-2 w-full  ">
        <p className="text-muted-foreground">Welcome</p>
        <h3 className="font-bold text-4xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {user.username}
        </h3>
      </div>

      <div className="">
        <DashboardCards />
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 px-6">
        <StudyHoursChart />
      </div>
      <AppSidebar />
    </div>
  );
};

export default page;

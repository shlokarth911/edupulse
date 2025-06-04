"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function HomePage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    api
      .get("api/users/profile")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        router.push("/");
      });
  }, []);

  if (!user) return <p>Loading…</p>;
  return <h1>Welcome, {user.username}!</h1>;
}

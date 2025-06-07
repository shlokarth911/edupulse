"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CircularProgress } from "@/components/circular-progress";
import Dock from "@/components/Dock";
import { ActivityIcon, Bubbles, Focus, Settings } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Mode = "work" | "shortBreak" | "longBreak";

interface DockItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export default function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<Mode>("work");
  const [workDuration, setWorkDuration] = useState<number>(25 * 60);
  const [shortBreakDuration, setShortBreakDuration] = useState<number>(5 * 60);
  const [longBreakDuration, setLongBreakDuration] = useState<number>(10 * 60);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const dockItems: DockItem[] = [
    {
      icon: <Focus size={18} />,
      label: "Focus Session",
      onClick: () => {
        setCurrentMode("work");
        setTimeLeft(workDuration);
        setIsActive(true);
      },
    },
    {
      icon: <Bubbles size={18} />,
      label: "Short Break",
      onClick: () => {
        setCurrentMode("shortBreak");
        setTimeLeft(shortBreakDuration);
        setIsActive(true);
      },
    },
    {
      icon: <ActivityIcon size={18} />,
      label: "Long Break",
      onClick: () => {
        setCurrentMode("longBreak");
        setTimeLeft(longBreakDuration);
        setIsActive(true);
      },
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      onClick: () => setIsDrawerOpen(true),
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerEnd();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimerEnd = (): void => {
    setIsActive(false);
    alert(
      currentMode === "work"
        ? "Work session ended! Take a break!"
        : currentMode === "shortBreak"
        ? "Short break ended! Back to work!"
        : "Long break ended! Back to work!"
    );
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = (): void => {
    setIsActive(false);
    setTimeLeft(
      currentMode === "work"
        ? workDuration
        : currentMode === "shortBreak"
        ? shortBreakDuration
        : longBreakDuration
    );
  };

  const totalDuration =
    currentMode === "work"
      ? workDuration
      : currentMode === "shortBreak"
      ? shortBreakDuration
      : longBreakDuration;

  const progressValue = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <>
      <div className="w-100 absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-index-10">
        <Card
          style={{
            backdropFilter: "blur(0px)",
            boxShadow: "none",
            maxWidth: "400px",
            background: "transparent",
            border: "none",
          }}
        >
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {currentMode === "work"
                ? "⏳ Focus Session"
                : currentMode === "shortBreak"
                ? "☕ Short Break"
                : "🏖️ Long Break"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="relative">
              <CircularProgress
                value={progressValue}
                size={480}
                strokeWidth={10}
                className="text-primary"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl font-bold text-foreground">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button
              variant={isActive ? "destructive" : "default"}
              onClick={() => setIsActive(!isActive)}
              className="px-8 py-4 text-lg"
            >
              {isActive ? "Pause" : "Start"}
            </Button>
            <Button
              variant="outline"
              onClick={resetTimer}
              className="px-8 py-4 text-lg"
            >
              Reset
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="absolute bottom-0 left-[50%] transform -translate-x-[50%]">
        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your timer durations.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 w-full">
            <div className="flex w-full justify-center gap-8">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="work-duration">
                  Focus Session Duration (minutes):
                </Label>
                <Input
                  id="work-duration"
                  type="number"
                  min="1"
                  step="1"
                  value={workDuration / 60}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== "") {
                      setWorkDuration(Number(value) * 60);
                    }
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="short-break-duration">
                  Short Break Duration (minutes):
                </Label>
                <Input
                  id="short-break-duration"
                  type="number"
                  min="1"
                  step="1"
                  value={shortBreakDuration / 60}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== "") {
                      setShortBreakDuration(Number(value) * 60);
                    }
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="long-break-duration">
                  Long Break Duration (minutes):
                </Label>
                <Input
                  id="long-break-duration"
                  type="number"
                  min="1"
                  step="1"
                  value={longBreakDuration / 60}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== "") {
                      setLongBreakDuration(Number(value) * 60);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

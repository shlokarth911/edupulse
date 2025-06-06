"use client";

import { GalleryVerticalEnd } from "lucide-react";

import { RegisterForm } from "@/components/register-form";
import Silk from "@/components/SilkBackground";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            EduPulse
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="z-index-1 absolute top-0 left-0 h-full w-full">
          <Silk
            speed={5}
            scale={1}
            color="#818181"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
      </div>
    </div>
  );
}

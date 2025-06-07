"use client";

import React, { useState } from "react";
import MetaBalls from "./MetalFluidSimulation.tsx";
import { ArrowUpRight } from "lucide-react";

const TalktoAICard = () => {
  const [particleSpeed, setParticleSpeed] = useState(0);

  const navigateToAiChat = () => {
    window.location.href = "/ai-chat";
  };

  return (
    <div
      className="flex h-[100%] w-full items-center cursor-pointer justify-center overflow-hidden backdrop-blur-xl border-1 relative border-zinc-800 rounded-2xl"
      onMouseEnter={() => setParticleSpeed(0.5)}
      onMouseLeave={() => setParticleSpeed(0)}
      onClick={navigateToAiChat}
    >
      <div className="z-index-9 flex items-center gap-2 pointer-events-none ">
        <h1 className="text-3xl  font-bold mix-blend-difference">Talk to AI</h1>
        <ArrowUpRight className="mix-blend-difference size-9" />
      </div>
      <MetaBalls
        color="#ffffff"
        cursorBallColor="#ffffff"
        cursorBallSize={2}
        ballCount={15}
        animationSize={8}
        enableMouseInteraction={true}
        enableTransparency={true}
        hoverSmoothness={0.05}
        clumpFactor={1}
        speed={0.3}
      />
    </div>
  );
};

export default TalktoAICard;

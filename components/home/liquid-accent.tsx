"use client";

import { useEffect, useState } from "react";
import { Liquid } from "@/components/canvasui/Liquid";

const ACCENT_RGB: [number, number, number] = [201 / 255, 162 / 255, 74 / 255];

export function LiquidAccent({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!enabled) return null;

  return (
    <div className={className}>
      <Liquid
        className="h-full w-full"
        color={ACCENT_RGB}
        intensity={0.8}
        blend={1.4}
        distortion={0.12}
        rainbow={false}
      >
        <div className="h-full w-full bg-surface" />
      </Liquid>
    </div>
  );
}

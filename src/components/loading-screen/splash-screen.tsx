"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimateLogo1 } from "./animate-logo";

type SplashScreenProps = {
  portal?: boolean;
  className?: string;
};

export function SplashScreen({ portal = true, className = "", ...other }: SplashScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <div
      className={`fixed inset-0 z-[9998] flex items-center justify-center bg-background ${className}`}
      {...other}
    >
      <AnimateLogo1 />
    </div>
  );

  if (portal) {
    return mounted ? createPortal(content, document.body) : null;
  }

  return content;
}

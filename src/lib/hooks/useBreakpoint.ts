"use client";
import { useEffect, useState } from "react";

export function useBreakpoint(breakpoint = 768): boolean {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSmall(window.innerWidth < breakpoint);
    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isSmall;
}

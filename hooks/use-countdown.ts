"use client";

import { useEffect, useState } from "react";
import { getCountdownParts } from "@/utils/date";

export function useCountdown(targetDate: string) {
  const [parts, setParts] = useState(() => getCountdownParts(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => setParts(getCountdownParts(targetDate)), 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return parts;
}

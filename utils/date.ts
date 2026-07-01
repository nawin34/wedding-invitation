export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getCountdownParts(targetDate: string): CountdownParts {
  const distance = Math.max(0, new Date(targetDate).getTime() - Date.now());

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
}

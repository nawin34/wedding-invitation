import type { LucideIcon } from "lucide-react";

export interface StoryChapter {
  title: string;
  date: string;
  copy: string;
  image: string;
}

export interface WeddingEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  palette: string;
  icon: LucideIcon;
  description: string;
}

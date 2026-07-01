import { CalendarHeart, Flower2, GlassWater } from "lucide-react";
import type { StoryChapter, WeddingEvent } from "@/types/wedding";

export const wedding = {
  bride: "Akhila",
  groom: "Naveen",
  date: "2026-07-09T11:20:00+05:30",
  displayDate: "9 July 2026",
  venue: "SVR Gardens, Karimnagar",
  hashtag: "#AkhilaWedsNaveen",
  phone: "+91 6302930252",
  mapUrl: "https://www.google.com/maps?q=SVR%20Gardens%20Satavahana%20University%20Road%20Malkapur%20Karimnagar&output=embed"
};

export const story: StoryChapter[] = [
  {
    title: "When Our Eyes Found Each Other",
    date: "The Beginning",
    copy:
      "Every beautiful story starts with a single moment. Ours began with two hearts finding comfort in each other's presence—a simple meeting that quietly grew into a love meant to last forever.",
    image: "url('/images/2.jpg')"
  },
  {
    title: "Walking Through Life, Hand in Hand",
    date: "A Decade of Love",
    copy:
      "From shared dreams and endless conversations to every sunrise and sunset together, we discovered that home isn't a place—it's being with the person who chooses you every single day.",
    image: "url('/images/6L.JPG')"
  },
  {
    title: "One Promise, Two Hearts",
    date: "Our Forever Awaits",
    copy:
      "What began as a love story became a lifelong promise. Side by side, we stepped closer to forever, carrying with us every memory that brought us to this beautiful chapter.",
    image: "url('/images/8L.JPG')"
  },
  {
    title: "Together, Forever Begins",
    date: "9 July 2026",
    copy:
      "With the blessings of our families and the love we've nurtured for ten unforgettable years, we joyfully begin the most beautiful journey of our lives—as husband and wife, forever together.",
    image: "url('/images/11L.JPG')"
  }
];

export const events: WeddingEvent[] = [
  {
    title: "Haldi Ceremony",
    date: "8 July 2026",
    time: "Starts at 4:00 PM",
    venue: "At Bride's / Groom's Residence",
    palette: "#F4C542",
    icon: Flower2,
    description:
      "A joyful celebration filled with turmeric, laughter, music, and the blessings of our loved ones as we prepare for our new beginning."
  },
  {
    title: "Wedding Ceremony",
    date: "9 July 2026",
    time: "11:20 AM",
    venue: "SVR Gardens, Karimnagar",
    palette: "#651B32",
    icon: CalendarHeart,
    description:
      "With the blessings of our families, we joyfully exchange vows and begin our forever together."
  }
];
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
    title: "Where Our Journey Began",
    date: "The Beginning",
    copy:
      "Every beautiful journey begins with a single step. Ours started with shared smiles, meaningful moments, and a bond that grew stronger with every passing season.",
    image: "url('/images/2.jpg')"
  },
  {
    title: "Growing Together",
    date: "Cherished Memories",
    copy:
      "Through countless moments of joy, laughter, and unwavering support, we discovered that life's greatest happiness is found in walking every path together.",
    image: "url('/images/6L.JPG')"
  },
  {
    title: "A Promise for Tomorrow",
    date: "A New Chapter",
    copy:
      "With grateful hearts and the blessings of our families, we look ahead to a future filled with hope, happiness, and beautiful memories yet to be written.",
    image: "url('/images/8L.JPG')"
  },
  {
    title: "Forever Begins Here",
    date: "9 July 2026",
    copy:
      "As we begin this beautiful new chapter together, we warmly invite you to celebrate our wedding and bless us as we step into a lifetime of togetherness.",
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

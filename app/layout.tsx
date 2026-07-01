import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akhila & Naveen | Wedding Invitation",
  description: "A premium cinematic Indian wedding invitation experience for Akhila and Naveen.",
  icons: {
    icon: "/images/images.avif",
    shortcut: "/images/images.avif",
    apple: "/images/images.avif",
  },
  openGraph: {
    title: "Akhila & Naveen | Wedding Invitation",
    description: "Our forever begins here.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#651B32",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

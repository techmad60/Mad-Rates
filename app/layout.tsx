import type { Metadata } from "next";
import 
{Poppins, Braah_One, Poor_Story} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const braahOne = Braah_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const poorStory = Poor_Story({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poor-story",
});

export const metadata: Metadata = {
  title: "Mad Rates",
  description: "Your Daily Dose of Crypto Madness. 🐵⚡",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${braahOne.variable} ${poorStory.variable}  antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import 
{Poppins, Braah_One} from "next/font/google";
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
      <body className={`${poppins.variable} ${braahOne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

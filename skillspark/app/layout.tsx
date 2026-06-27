import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillSpark - Spark Your Tech Journey",
  description: "Gamified learning platform to master programming, design, and developer skills through interactive bite-sized challenges and daily tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark-theme">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { I18nProvider } from "@/context/I18nContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wassim AHMED | Développeur Full Stack",
  description:
    "Portfolio professionnel de Wassim AHMED, Développeur Full Stack spécialisé en Next.js, React, Node.js / NestJS, React Native et architectures Cloudflare.",
  keywords: [
    "Wassim AHMED",
    "Développeur Full Stack",
    "Full Stack Developer",
    "Next.js Developer",
    "React",
    "NestJS",
    "React Native",
    "Cloudflare Workers",
    "TypeScript",
  ],
  authors: [{ name: "Wassim AHMED" }],
  openGraph: {
    title: "Wassim AHMED | Développeur Full Stack",
    description:
      "Portfolio bilingue (Français, Anglais) de Wassim AHMED, Développeur Full Stack (Next.js, Cloudflare, React Native).",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      dir="ltr"
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

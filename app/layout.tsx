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

const themeScript = `(function(){try{var t=localStorage.getItem("portfolio_theme");var c=localStorage.getItem("portfolio_color_theme");var d=document.documentElement;if(t==="light"){d.classList.remove("dark");d.classList.add("light");}else{d.classList.add("dark");d.classList.remove("light");}if(c&&["orange","emerald","cyan","violet","rose","amber"].indexOf(c)!==-1){d.setAttribute("data-color-theme",c);}else{d.setAttribute("data-color-theme","orange");}var l=localStorage.getItem("portfolio_locale");if(l==="fr"||l==="en"){d.lang=l;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      dir="ltr"
      className={`${inter.variable} dark`}
      data-color-theme="orange"
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

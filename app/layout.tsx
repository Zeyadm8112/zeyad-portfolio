import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Absolute base for share-preview images. Set NEXT_PUBLIC_SITE_URL to the
// real domain (e.g. https://zeyad.dev); on Vercel it falls back to the
// production domain automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Zeyad Mohamed — IT Technical Support";
const description =
  "IT Technical Support specialist in Suez & 6th of October City, Egypt — Windows & Linux, Active Directory, networking, Microsoft 365, Intune and cybersecurity.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Zeyad Mohamed",
  authors: [{ name: "Zeyad Mohamed" }],
  keywords: [
    "IT Technical Support",
    "Windows Server",
    "Active Directory",
    "Networking",
    "Linux",
    "Cybersecurity",
    "Microsoft 365",
    "Intune",
    "Egypt",
  ],
  // The preview image comes from app/opengraph-image.png and app/twitter-image.png
  openGraph: {
    type: "website",
    siteName: "Zeyad Mohamed",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// Runs before paint: apply a saved theme choice (otherwise CSS follows the
// OS setting) and skip the boot animation if it already played this session.
const themeInit = `try{var t=localStorage.getItem("zm-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}try{if(sessionStorage.getItem("zm-booted"))document.documentElement.dataset.booted="1"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}

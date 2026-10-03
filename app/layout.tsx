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

export const metadata: Metadata = {
  title: "Zeyad Mohamed — IT Technical Support",
  description:
    "IT Technical Support specialist in Suez, Egypt — Windows & Linux, Active Directory, networking, Microsoft 365, Intune and cybersecurity.",
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

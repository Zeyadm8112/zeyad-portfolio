"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Content — swap these out with your real photos, links, and copy.
// Drop image files into /public/images and point the paths at them,
// e.g. heroPhoto: "/images/zeyad.jpg".
// ---------------------------------------------------------------------------

const IMAGES: {
  heroPhoto: string | null;
  molagloraWeb: string | null;
  molagloraApp: string | null;
  portrait: string | null;
  aloyFront: string | null;
  aloyBack: string | null;
  aloyRag: string | null;
  footballEtl: string | null;
  activator: string | null;
} = {
  heroPhoto: "/me.jpg",
  molagloraWeb: "/molaglora-lap.png",
  molagloraApp: "/molaglora-mobile.png",
  portrait: "/me2.jpg",
  aloyFront: "/aloy-front.png",
  aloyBack: "/aloy-back.png",
  aloyRag: "/aloy-rag-.png",
  footballEtl: "/etl.png",
  activator: "/activator-client.png",
};

const LINKS = {
  email: "zeyadm7811@outlook.com",
  appStore: "https://apps.apple.com/app/molaglora/id6771689918",
  googlePlay: "https://play.google.com/store/apps/details?id=com.icecodeco.molagloraios",
  web: "https://molaglora-web.vercel.app/",
  github: "https://github.com/Zeyadm8112",
  linkedin: "https://www.linkedin.com/in/zeyad-mohamed-9b5a9a228/",
  Upwork: "https://www.upwork.com/freelancers/~0112a079ef0c0af1aa",
  aloyFrontend: "https://github.com/Zeyadm8112/aloy-frontend",
  aloyBackend: "https://github.com/Zeyadm8112/aloy-backend",
  aloyRag: "https://github.com/Zeyadm8112/aloy_rag",
  footballEtl: "https://github.com/Zeyadm8112/Football-stats-ETL",
  activator: "https://github.com/Zeyadm8112/Activator",
};

const SKILLS = [
  "PYTHON",
  "DJANGO",
  "DJANGO REST FRAMEWORK",
  "REACT",
  "NEXT.JS",
  "REACT NATIVE",
  "EXPO",
  "TYPESCRIPT",
  "JAVASCRIPT",
  "POSTGRESQL",
  "SUPABASE",
  "SQL",
  "TAILWIND CSS",
  "HTML5 / CSS3",
  "REST APIs",
  "DOCKER",
  "GIT",
  "LINUX",
];
const BOOKS = [
  { title: "TWO SCOOPS OF DJANGO", h: 260, bg: "#2f6fed", fg: "#f2efe9" },
  { title: "DJANGO FOR PROFESSIONALS", h: 300, bg: "#f2efe9", fg: "#0f0e0c" },
  { title: "FLUENT PYTHON", h: 280, bg: "#161512", fg: "#f2efe9" },
  { title: "PYTHON COOKBOOK", h: 250, bg: "var(--accent)", fg: "#0f0e0c" },
  { title: "LEARNING REACT", h: 230, bg: "#b4513e", fg: "#f2efe9" },
  { title: "FRONT-END ARCHITECTURE\nFOR DESIGN SYSTEMS", h: 340, bg: "#3e3a33", fg: "#f2efe9" },
  { title: "FULL STACK REACT NATIVE", h: 290, bg: "#5d6d7e", fg: "#f2efe9" },
  { title: "REACT NATIVE IN ACTION", h: 270, bg: "#4a90e2", fg: "#f2efe9" },
  { title: "REACT NATIVE COOKBOOK", h: 250, bg: "#2d3748", fg: "#f2efe9" },
];

const CERTIFICATIONS = [
    { title: "OWASP Mobile Top 10 2025: Android & iOS App Security", issuer: "Udemy", date: "ISSUED 2025" },
  { title: "Python and Flask Demonstration Practice", issuer: "Udemy", date: "ISSUED 2024" },
  { title: "Python OOP: A Complete Course in Object Oriented Programming", issuer: "Udemy", date: "ISSUED 2024" },
  { title: "Python And Flask Framework Complete Course for beginners", issuer: "Udemy", date: "ISSUED 2024" },
  { title: "Agile Crash Course for Beginners", issuer: "Udemy", date: "ISSUED 2024" },
  { title: "OWASP Top 10 (Web)", issuer: "MaharaTech / ITIMooca", date: "ISSUED 2023" },
  { title: "Android Development Google Africa Training Program", issuer: "Google Developers", date: "ISSUED 2023" },
  { title: "UX Design Fundamentals", issuer: "MaharaTech / ITIMooca", date: "ISSUED 2022" },
  { title: "UX Design Fundamentals", issuer: "MaharaTech / ITIMooca", date: "ISSUED 2022" },
    { title: "ITI 101: Introduction to Computer Science", issuer: "Information Technology Institute", date: "ISSUED 2022" },

  { title: "CS50", issuer: "Harvard UNiversity", date: "ISSUED 2022" },
];

const CURRENT_COURSES = [
  {
    title: "SQL Masterclass: From Absolute Beginner to Developer",
    provider: "Udemy",
    focus: "Advanced SQL, Database Design & Query Optimization",
  },
  {
    title: "API Testing with Python – Manual & Automation using Pytest",
    provider: "Udemy",
    focus: "API Testing, Pytest Automation & REST Validation",
  },
  {
    title: "Microsoft 365 Productivity Mastery: Save 10+ Hours a Week",
    provider: "Udemy",
    focus: "Microsoft 365, Workflow Automation & Productivity",
  },
  {
    title: "OWASP Security Testing of Web, API, Android & Source Code App",
    provider: "Udemy",
    focus: "Application Security, OWASP Testing & Vulnerability Assessment",
  },
  {
    title: "Code Reviews for Secure, Clean, and Scalable Code",
    provider: "Udemy",
    focus: "Secure Code Reviews, Clean Architecture & Best Practices",
  },
  {
    title: "Governance, Risk and Compliance (GRC) and Data Privacy",
    provider: "Udemy",
    focus: "Cybersecurity Governance, Risk Management & Data Privacy",
  },
];
const POSTS = [
  {
    date: "Dec 1, 2025 · MEDIUM",
    title: "Stop Confusing Your Developers: Document Your Django API Today!",
    href: "https://medium.com/@zeyadm7811/stop-confusing-your-developers-document-your-django-api-today-508a1eea6351",
  },
  {
    date: "Sep 2, 2025 · MEDIUM",
    title: "A01:2021 – Broken Access Control",
    href: "https://medium.com/@zeyadm7811/a01-2021-broken-access-control-1c1c855ad365",
  },
  {
    date: "Aug 31, 2025 · MEDIUM",
    title: "Defend Against OWASP Top 10 in Django",
    href: "https://medium.com/@zeyadm7811/defend-against-owasp-top-10-in-django-31b275da10b8",
  },
  {
    date: "Aug 27, 2025 · MEDIUM",
    title: "Testing Django Like a Pro: Achieving Complete Coverage",
    href: "https://medium.com/@zeyadm7811/testing-django-like-a-pro-achieving-complete-coverage-3a8fa40ff768",
  },
];

const PROJECTS = [
  {
    title: "Aloy AI Document Analysis - Backend",
    description:
      "Scalable Django backend powering AI document analysis with REST APIs, WebSockets, workspace management, role-based access control, and real-time collaborative chat.",
    tags: ["DJANGO", "DRF", "WEBSOCKETS", "POSTGRESQL"],
    badge: "AI BACKEND",
    images: {
      primary: IMAGES.aloyBack,
    },
    links: [
      { title: "GITHUB ↗", href: LINKS.aloyBackend },
    ],
  },
  {
    title: "Aloy AI Document Analysis - Frontend",
    description:
      "Enterprise document analysis frontend built with Next.js, featuring real-time AI chat, collaborative workspaces, role-based access control, and WebSocket-powered live updates.",
    tags: ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "WEBSOCKETS"],
    badge: "ENTERPRISE FRONTEND",
    images: {
      primary: IMAGES.aloyFront,
    },
    links: [
      { title: "GITHUB ↗", href: LINKS.aloyFrontend },
    ],
  },
  {
    title: "Aloy AI Document Analysis - RAG Engine",
    description:
      "Production-ready Retrieval-Augmented Generation (RAG) pipeline for document ingestion, semantic search, vector embeddings, and LLM-powered question answering.",
    tags: ["PYTHON", "RAG", "LLM", "VECTOR SEARCH"],
    badge: "AI ENGINE",
    images: {
      primary: IMAGES.aloyRag,
    },
    links: [
      { title: "GITHUB ↗", href: LINKS.aloyRag },
    ],
  },
  {
    title: "Football ETL Pipeline",
    description:
      "Automated data engineering pipeline using Apache Airflow to extract football statistics, transform datasets with pandas, and load them into PostgreSQL on a cloud Linux server.",
    tags: ["PYTHON", "AIRFLOW", "POSTGRESQL", "PANDAS"],
    badge: "DATA ENGINEERING",
    images: {
      primary: IMAGES.footballEtl,
    },
    links: [
      { title: "GITHUB ↗", href: LINKS.footballEtl },
    ],
  },
  {
    title: "IceCode License Activator",
    description:
      "Hardware-bound Windows application licensing system with a Python backend, secure activation workflow, and centralized license management for desktop software.",
    tags: ["PYTHON", "POWERSHELL", "WSGI", "DEBIAN"],
    badge: "LICENSING SYSTEM",
    images: {
      primary: IMAGES.activator,
    },
    links: [
      { title: "GITHUB ↗", href: LINKS.activator },
    ],
  },
];

type Project = {
  title: string;
  description: string;
  tags: string[];
  badge?: string;
  images: {
    primary: string | null;
    secondary?: string | null;
  };
  links: {
    title: string;
    href: string;
  }[];
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  useReveal();
  return (
    <div className="relative min-h-screen">
      <CursorBlob />
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <Skills />
      <Experience />
      <Certifications />
      <Courses />
      <About />
      <Books />
      <Blog />
      <Contact />
      <FloatingCVButton />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function subscribeTheme(cb: () => void) {
  window.addEventListener("zm-theme", cb);
  return () => window.removeEventListener("zm-theme", cb);
}

function readTheme(): "dark" | "light" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function Nav() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "light");

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    if (next === "dark") document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("zm-theme", next);
    } catch {}
    window.dispatchEvent(new Event("zm-theme"));
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-[18px] font-mono text-xs tracking-[.08em] text-white mix-blend-difference md:px-10">
      <a href="#top" className="text-sm font-bold">
        ZM©2026
      </a>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden items-center gap-4 md:flex md:gap-[26px]">
          <a href="#work" className="hover:text-accent-ink">WORK</a>
          <a href="#about" className="hover:text-accent-ink">ABOUT</a>
          <a href="#books" className="hover:text-accent-ink">BOOKS</a>
          <a href="#blog" className="hover:text-accent-ink">BLOG</a>
        </div>
        <a
          href="#contact"
          className="underline underline-offset-4 hover:text-accent-ink"
        >
          CONTACT
        </a>
        <button
          onClick={toggleTheme}
          className="cursor-pointer rounded-full border border-current bg-transparent px-3 py-[5px] font-mono text-[10px] tracking-[.08em] text-inherit sm:px-3.5 sm:text-[11px]"
        >
          {theme === "light" ? "◐ DARK" : "◐ LIGHT"}
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-5 pt-24 pb-8 md:pt-[120px] md:px-10"
    >
      {/* Floating polaroid + rotating badge - Now visible on all screens */}
      <div className="absolute top-[8%] right-[5%] z-[2] animate-[floaty_7s_ease-in-out_infinite] sm:top-[10%] sm:right-[6%] md:top-[12%] md:right-[7%]">
        <div className="relative w-[120px] rotate-[4deg] transition-transform duration-[.4s] ease-[cubic-bezier(.2,.7,.2,1)] hover:rotate-0 hover:scale-[1.03] sm:w-[180px] md:w-[250px]">
          <div className="rounded-[14px] border border-fg/30 bg-panel px-1.5 pt-1.5 shadow-[8px_8px_0_var(--accent)] sm:rounded-[18px] sm:px-2.5 sm:pt-2.5 sm:shadow-[10px_10px_0_var(--accent)]">
            <div className="h-[140px] w-full sm:h-[200px] md:h-[290px]">
              <ImageSlot
                src={IMAGES.heroPhoto}
                alt="Zeyad Mohamed"
                label="Drop your photo"
                className="rounded-[8px] sm:rounded-[10px]"
              />
            </div>
            <div className="flex items-center justify-between px-1 py-1.5 font-mono text-[8px] tracking-[.08em] text-fg/55 sm:py-2.5 sm:text-[10.5px]">
              <span>ZEYAD.JPG</span>
              <span className="text-accent-ink">● REC</span>
            </div>
          </div>
          
          {/* Rotating badge - scaled down on mobile */}
          <div className="pointer-events-none absolute -top-[20px] -left-[20px] h-[60px] w-[60px] animate-[spin_14s_linear_infinite] sm:-top-[30px] sm:-left-[30px] sm:h-[80px] sm:w-[80px] md:-top-[42px] md:-left-[50px] md:h-[118px] md:w-[118px]">
            <svg viewBox="0 0 150 150" className="h-full w-full overflow-visible">
              <defs>
                <path
                  id="circ"
                  d="M 75,75 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
                />
              </defs>
              <circle cx="75" cy="75" r="72" style={{ fill: "var(--bg)" }} />
              <text
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "13.5px",
                  letterSpacing: ".3em",
                  fill: "var(--fg)",
                }}
              >
                <textPath href="#circ">
                  {"OPEN TO WORK • FULL-STACK • "}
                </textPath>
              </text>
              <circle cx="75" cy="75" r="5" style={{ fill: "var(--accent)" }} />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-3.5 flex items-center gap-2.5 font-mono text-[11px] tracking-[.1em] text-fg/60 sm:text-[13px]">
        <span className="inline-block h-2 w-2 animate-[blink_1.6s_infinite] rounded-full bg-accent" />
        Full-Stack ENGINEER — Suez → EVERYWHERE
      </div>
      <h1 className="m-0 text-[clamp(42px,15vw,220px)] leading-[.9] font-bold tracking-[-.03em] uppercase">
        <span data-reveal className="block">
          Zeyad
        </span>
        <span
          data-reveal
          className="block text-transparent [-webkit-text-stroke:2px_var(--fg)]"
        >
          Mohamed
        </span>
      </h1>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-fg/[.18] pt-[18px] pb-[26px] sm:mt-9 sm:gap-6">
        <p className="m-0 max-w-[460px] text-[15px] leading-[1.55] text-fg/75 sm:text-[17px]">
          I enjoy taking ideas from paper to production, building every layer of the stack.
        </p>
      </div>
    </section>
  );
}
function Marquee() {
  const line = "DJANGO ✦ REACT ✦ NEXT.JS ✦ REACT NATIVE ✦ EXPO ✦ TYPESCRIPT ✦ PYTHON ✦ FULL STACK";
  return (
    <div className="overflow-hidden border-y border-fg/[.18] bg-accent text-[#0f0e0c]">
      <div className="flex w-max animate-[marquee_18s_linear_infinite] py-3 text-[16px] font-semibold tracking-[.02em] whitespace-nowrap sm:py-3.5 sm:text-[22px]">
        <span className="px-3 sm:px-[18px]">{line}</span>
        <span className="px-3 sm:px-[18px]" aria-hidden>
          {line}
        </span>
      </div>
    </div>
  );
}

function Work() {
  const tiltRef = useTilt<HTMLDivElement>();
  return (
    <section id="work" className="px-4 pt-[70px] pb-[40px] sm:px-5 sm:pt-[110px] sm:pb-[60px] md:px-10">
      <SectionHeading num="01">Selected Work</SectionHeading>

      <div
        ref={tiltRef}
        data-reveal
        className="grid grid-cols-1 gap-8 rounded-[20px] border border-fg/20 bg-panel p-4 will-change-transform [transform-style:preserve-3d] sm:p-6 sm:gap-11 md:p-11 lg:grid-cols-[1fr_1fr]"
      >
        <div className="flex flex-col justify-between gap-5 sm:gap-7">
          <div>
            <div className="mb-4 flex flex-wrap gap-2 font-mono text-[10px] sm:text-[11px]">
              <span className="rounded-full border border-fg/30 px-2 py-[4px] sm:px-3 sm:py-[5px]">
                NEXT.JS
              </span>
              <span className="rounded-full border border-fg/30 px-2 py-[4px] sm:px-3 sm:py-[5px]">
                REACT NATIVE · EXPO
              </span>
              <span className="rounded-full border border-accent px-2 py-[4px] text-accent-ink sm:px-3 sm:py-[5px]">
                LIVE ON BOTH STORES
              </span>
            </div>
            <h3 className="mt-0 mb-3 text-[clamp(28px,6vw,64px)] font-bold tracking-[-.02em]">
              Molaglora
            </h3>
            <p className="m-0 max-w-[420px] text-[14px] leading-[1.6] text-fg/70 sm:text-base">
              A cross-platform product built end-to-end: Next.js web app plus a
              React Native (Expo) app shipped to the App Store and Google Play
              from a single design language.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[10px] sm:gap-3.5 sm:text-xs">
            <StoreLink href={LINKS.appStore}>APP STORE ↗</StoreLink>
            <StoreLink href={LINKS.googlePlay}>GOOGLE PLAY ↗</StoreLink>
            <StoreLink href={LINKS.web}>WEB ↗</StoreLink>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_120px] lg:grid-cols-[1fr_150px]">
          <div className="h-[300px] sm:h-[400px] md:h-[460px]">
            <ImageSlot
              src={IMAGES.molagloraWeb}
              alt="Molaglora web app"
              label="Molaglora web screenshot"
              className="rounded-[14px]"
              fit="contain"
            />
          </div>
<div className="h-[250px] sm:h-[350px] md:h-[400px]"> 
  <ImageSlot
    src={IMAGES.molagloraApp}
    alt="Molaglora mobile app"
    label="App screen"
    className="rounded-[14px]"
    fit="contain"
  />
</div>

        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectShowcase
            key={project.title}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="px-4 py-[40px] sm:px-5 sm:py-[60px] md:px-10">
      <SectionHeading num="02">Stack</SectionHeading>
      <div data-reveal className="flex flex-wrap gap-2 font-mono text-[11px] sm:gap-3 sm:text-sm">
        {SKILLS.map((s) => (
          <span
            key={s}
            className="cursor-default rounded-full border border-fg/30 px-3 py-2 transition-colors hover:border-accent-ink hover:bg-accent hover:text-[#0f0e0c] sm:px-[22px] sm:py-3"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="px-4 py-[40px] sm:px-5 sm:py-[60px] md:px-10">
      <SectionHeading num="03" className="mb-3">
        Experience
      </SectionHeading>

      <div
        data-reveal
        className="grid grid-cols-1 items-baseline gap-2 border-t border-fg/[.18] py-5 sm:py-[26px] md:grid-cols-[200px_1fr_1fr] md:gap-5"
      >
        <span className="font-mono text-[10px] text-fg/50 sm:text-xs">
          JAN 2026 – PRESENT
        </span>
        <span className="text-[18px] font-semibold sm:text-[22px]">
          Full Stack Developer | IceCodeCo
        </span>
        <span className="text-[13px] leading-normal text-fg/60 sm:text-[15px]">
          Developing scalable web applications using Django, React, Next.js, and
          TypeScript. Building REST APIs, responsive user interfaces, and
          cross-platform mobile applications while contributing to SaaS products
          and client solutions.
        </span>
      </div>

      <div
        data-reveal
        className="grid grid-cols-1 items-baseline gap-2 border-t border-fg/[.18] py-5 sm:py-[26px] md:grid-cols-[200px_1fr_1fr] md:gap-5"
      >
        <span className="font-mono text-[10px] text-fg/50 sm:text-xs">
          DEC 2023 – JAN 2026
        </span>
        <span className="text-[18px] font-semibold sm:text-[22px]">
          Technical Support Specialist | Industrial Company
        </span>
        <span className="text-[13px] leading-normal text-fg/60 sm:text-[15px]">
          Maintained enterprise IT infrastructure, diagnosed hardware and
          software issues, managed networking and system configurations, and
          provided technical support to ensure reliable day-to-day operations.
        </span>
      </div>

      <div
        data-reveal
        className="grid grid-cols-1 items-baseline gap-2 border-t border-fg/[.18] py-5 sm:py-[26px] md:grid-cols-[200px_1fr_1fr] md:gap-5"
      >
        <span className="font-mono text-[10px] text-fg/50 sm:text-xs">
          JUL 2023 – AUG 2023
        </span>
        <span className="text-[18px] font-semibold sm:text-[22px]">
          Python Automation &amp; Web Scraping Engineer | Upwork
        </span>
        <span className="text-[13px] leading-normal text-fg/60 sm:text-[15px]">
          Built Python automation tools, web scrapers, and data extraction
          pipelines using Selenium and related technologies. Delivered reliable
          automation solutions for international clients.
        </span>
      </div>

      <div
        data-reveal
        className="grid grid-cols-1 items-baseline gap-2 border-t border-fg/[.18] py-5 sm:py-[26px] md:grid-cols-[200px_1fr_1fr] md:gap-5"
      >
        <span className="font-mono text-[10px] text-fg/50 sm:text-xs">
          SEP 2022 – MAR 2023
        </span>
        <span className="text-[18px] font-semibold sm:text-[22px]">
          Android Developer Intern | Google
        </span>
        <span className="text-[13px] leading-normal text-fg/60 sm:text-[15px]">
          Developed Android applications using Kotlin, implemented modern mobile
          development practices, and gained hands-on experience with Android
          architecture and asynchronous programming.
        </span>
      </div>

      <div
        data-reveal
        className="grid grid-cols-1 items-baseline gap-2 border-t border-fg/[.18] py-5 sm:py-[26px] md:grid-cols-[200px_1fr_1fr] md:gap-5"
      >
        <span className="font-mono text-[10px] text-fg/50 sm:text-xs">
          JUL 2022 – AUG 2022
        </span>
        <span className="text-[18px] font-semibold sm:text-[22px]">
          Flutter Mobile Developer Intern | ITI
        </span>
        <span className="text-[13px] leading-normal text-fg/60 sm:text-[15px]">
          Built cross-platform mobile applications with Flutter and Dart while
          applying object-oriented programming principles and modern mobile UI
          development practices.
        </span>
      </div>

      <div
        data-reveal
        className="grid grid-cols-1 items-baseline gap-2 border-y border-fg/[.18] py-5 sm:py-[26px] md:grid-cols-[200px_1fr_1fr] md:gap-5"
      >
        <span className="font-mono text-[10px] text-fg/50 sm:text-xs">
          FEB 2022 – MAR 2022
        </span>
        <span className="text-[18px] font-semibold sm:text-[22px]">
          Computer Science Intern | ITI
        </span>
        <span className="text-[13px] leading-normal text-fg/60 sm:text-[15px]">
          Learned software engineering fundamentals including C#, cybersecurity,
          algorithms, and problem-solving while completing CS50 practical technical
          projects.
        </span>
      </div>
    </section>
  );
}
function Certifications() {
  return (
    <section id="certifications" className="px-4 py-[40px] sm:px-5 sm:py-[60px] md:px-10">
      <SectionHeading num="04">Certifications</SectionHeading>
      <div className="border-y border-fg/[.18]">
        {CERTIFICATIONS.map((certification, index) => (
          <div
            key={`${certification.title}-${index}`}
            data-reveal
            className="grid grid-cols-1 items-center gap-2 border-b border-fg/[.18] px-2 py-4 last:border-b-0 transition-colors hover:bg-panel sm:py-6 md:grid-cols-[90px_1fr_auto] md:gap-5"
          >
            <span className="font-mono text-[10px] text-accent-ink sm:text-xs">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="m-0 text-[clamp(18px,3vw,34px)] font-semibold tracking-[-.02em]">
                {certification.title}
              </h3>
              <p className="mt-1 mb-0 font-mono text-[10px] tracking-[.06em] text-fg/50 sm:mt-2 sm:text-[11px]">
                {certification.issuer}
              </p>
            </div>
            <span className="font-mono text-[10px] text-fg/50 sm:text-xs">
              {certification.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Courses() {
  return (
    <section id="courses" className="px-4 py-[40px] sm:px-5 sm:py-[60px] md:px-10">
      <SectionHeading num="05">Currently Enrolled</SectionHeading>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {CURRENT_COURSES.map((course, index) => (
          <article
            key={`${course.title}-${index}`}
            data-reveal
            className="group rounded-[20px] border border-fg/20 bg-panel p-5 transition-transform duration-[.3s] hover:-translate-y-1 sm:p-7 md:p-9"
          >
            <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[.06em] sm:text-[11px]">
              <span className="text-fg/50">{course.provider}</span>
              <span className="rounded-full bg-accent px-2 py-1 text-[#0f0e0c] sm:px-3 sm:py-1.5">
                IN PROGRESS
              </span>
            </div>
            <h3 className="mt-6 mb-2 text-[clamp(20px,4vw,40px)] leading-[1.08] font-bold tracking-[-.025em] sm:mt-10 sm:mb-3">
              {course.title}
            </h3>
            <p className="m-0 font-mono text-[10px] tracking-[.06em] text-fg/50 sm:text-[11px]">
              FOCUS — {course.focus}
            </p>
            <div className="mt-6 h-1 overflow-hidden rounded-full bg-fg/15 sm:mt-9">
              <div className="h-full w-1/3 rounded-full bg-accent transition-[width] duration-300 group-hover:w-1/2" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 items-center gap-8 px-4 py-[40px] sm:gap-10 sm:px-5 sm:py-[60px] md:grid-cols-[280px_1fr] md:gap-14 md:px-10"
    >
      <div data-reveal className="h-[180px] w-[180px] mx-auto sm:h-[240px] sm:w-[240px] md:h-[280px] md:w-[280px] md:mx-0">
        <ImageSlot
          src={IMAGES.portrait}
          alt="Portrait of Zeyad Mohamed"
          label="Your photo"
          className="rounded-full"
        />
      </div>
      <div data-reveal>
        <span className="font-mono text-[10px] text-accent-ink sm:text-xs">06 — ABOUT</span>
        <p className="mt-3 mb-0 max-w-[820px] text-[clamp(18px,3.5vw,38px)] leading-[1.35] font-medium sm:mt-4">
          I'm Zeyad — a Full Stack Developer passionate about bringing ideas to life. I enjoy taking projects from a sketch on paper to a complete system, designing the database, building the backend, and crafting polished web and mobile experiences.
        </p>
      </div>
    </section>
  );
}

function Books() {
  return (
    <section id="books" className="px-4 py-[40px] sm:px-5 sm:py-[60px] md:px-10">
      <SectionHeading num="07" className="mb-2.5">
        Bookshelf
      </SectionHeading>
      <div
        data-reveal
        className="flex flex-wrap items-end gap-1.5 border-b-[4px] border-fg/[.18] px-1 sm:gap-2.5 sm:border-b-[6px] sm:px-2"
      >
        {BOOKS.map((b) => (
          <div
            key={b.title}
            title={b.title}
            className="flex w-[36px] sm:w-[44px] md:w-[52px] cursor-default items-center justify-center rounded-t transition-transform duration-[.25s] hover:-translate-y-2 sm:hover:-translate-y-3 md:hover:-translate-y-4"
            style={{ background: b.bg, color: b.fg, height: `${b.h * 0.7}px` }}
          >
            <span className="rotate-180 py-2 font-mono text-[9px] font-bold tracking-[.04em] whitespace-nowrap [writing-mode:vertical-rl] sm:py-3 sm:text-[10.5px] md:text-[11.5px]">
              {b.title}
            </span>
          </div>
        ))}
        <div className="ml-2 pb-2 font-mono text-[10px] text-accent-ink sm:ml-6 sm:pb-3.5 sm:text-xs">
          <span className="inline-block animate-[blink_1.6s_infinite]">▮</span>{" "}
          CURRENTLY READING ....
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="px-4 py-[40px] sm:px-5 sm:py-[60px] md:px-10">
      <SectionHeading num="08">Writing</SectionHeading>
      {POSTS.map((p) => (
        <a
          key={p.title}
          href={p.href}
          data-reveal
          className="grid grid-cols-1 items-baseline gap-1 border-t border-fg/[.18] px-2 py-4 transition-colors hover:bg-panel sm:py-6 md:grid-cols-[140px_1fr_auto] md:gap-5"
        >
          <span className="font-mono text-[10px] text-fg/50 sm:text-xs">{p.date}</span>
          <span className="text-[clamp(16px,3vw,30px)] font-semibold">
            {p.title}
          </span>
          <span className="text-[18px] text-accent-ink sm:text-[22px]">→</span>
        </a>
      ))}
      <div className="border-t border-fg/[.18]" />
    </section>
  );
}

function Contact() {
  const magnetRef = useMagnet<HTMLAnchorElement>();
  return (
    <section
      id="contact"
      className="px-4 pt-[80px] pb-6 text-center sm:px-5 sm:pt-[120px] sm:pb-10 md:px-10"
    >
      <span className="font-mono text-[10px] text-accent-ink sm:text-xs">09 — SAY HI</span>
      <div data-reveal className="mt-4 sm:mt-5">
        <a
          href={`mailto:${LINKS.email}`}
          ref={magnetRef}
          className="inline-block text-[clamp(14px,4vw,42px)] font-bold tracking-[-.02em] break-all text-transparent uppercase will-change-transform [-webkit-text-stroke:1.5px_var(--fg)] hover:text-accent-ink hover:[-webkit-text-stroke:1.5px_var(--accent-ink)] sm:[-webkit-text-stroke:2px_var(--fg)] sm:hover:[-webkit-text-stroke:2px_var(--accent-ink)]"
        >
          {LINKS.email}
        </a>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4 font-mono text-[10px] sm:mt-11 sm:gap-[26px] sm:text-xs">
        <a
          href={LINKS.github}
          className="underline underline-offset-4 hover:text-accent-ink"
        >
          GITHUB
        </a>
        <a
          href={LINKS.linkedin}
          className="underline underline-offset-4 hover:text-accent-ink"
        >
          LINKEDIN
        </a>
        <a
          href={LINKS.Upwork}
          className="underline underline-offset-4 hover:text-accent-ink"
        >
          Upwork
        </a>
      </div>
      <div className="mt-12 flex flex-wrap justify-between gap-2 border-t border-fg/[.18] py-4 font-mono text-[10px] text-fg/40 sm:mt-20 sm:py-5 sm:text-[11px]">
        <span>© 2026 ZEYAD MOHAMED</span>
        <span>BUILT WITH REACT, OBVIOUSLY</span>
      </div>
    </section>
  );
}

function FloatingCVButton() {
  return (
    <a
      href="https://drive.google.com/file/d/1vkyMIKVm6wpKMphKLz8wQqSDtzBr_tyT/view?usp=drive_link"
      download
      className="
        group
        fixed bottom-4 right-4 z-50
        h-12 w-12 sm:h-14 sm:w-14 hover:w-36 sm:hover:w-48
        overflow-hidden
        rounded-full
        bg-accent
        shadow-lg
        transition-all duration-300
        animate-[floaty_4s_ease-in-out_infinite]
      "
    >
      <div className="absolute inset-y-0 left-0 flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
        <Download size={20} className="sm:size-[24px]" />
      </div>

      <span className="ml-12 flex h-full items-center font-mono text-[10px] font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:ml-14 sm:text-sm">
        Download CV
      </span>
    </a>
  );
}

function ProjectShowcase({
  project,
}: {
  project: Project;
}) {
  const tiltRef = useTilt<HTMLDivElement>();

  return (
    <div
      ref={tiltRef}
      data-reveal
      className="
        rounded-[20px]
        border border-fg/20
        bg-panel
        p-4
        sm:p-6
        md:p-11
        will-change-transform
        [transform-style:preserve-3d]
      "
    >
      <div className="flex min-h-[200px] flex-col justify-between gap-6 sm:min-h-[280px] sm:gap-10">
        <div>
          <div className="mb-3 flex flex-wrap gap-1.5 font-mono text-[9px] sm:mb-5 sm:gap-2 sm:text-[11px]">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-fg/30 px-1.5 py-1 sm:px-3 sm:py-[5px]"
              >
                {tag}
              </span>
            ))}

            {project.badge && (
              <span className="rounded-full border border-accent px-1.5 py-1 text-accent-ink sm:px-3 sm:py-[5px]">
                {project.badge}
              </span>
            )}
          </div>

          <h3 className="mb-3 text-[clamp(24px,5vw,64px)] font-bold tracking-[-0.02em] sm:mb-5">
            {project.title}
          </h3>

          <p className="max-w-4xl text-[14px] leading-7 text-fg/70 sm:text-[17px] sm:leading-8">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 font-mono text-[10px] sm:gap-3.5 sm:text-xs">
          {project.links.map((link) => (
            <StoreLink key={link.title} href={link.href}>
              {link.title}
            </StoreLink>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

function SectionHeading({
  num,
  children,
  className = "mb-6 sm:mb-9",
}: {
  num: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline gap-3 sm:gap-4 ${className}`}>
      <span className="font-mono text-[10px] text-accent-ink sm:text-xs">{num}</span>
      <h2 className="m-0 text-[clamp(28px,7vw,88px)] font-bold tracking-[-.02em] uppercase">
        {children}
      </h2>
    </div>
  );
}

function StoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-fg px-3 py-2 transition-colors hover:bg-fg hover:text-bg sm:px-[22px] sm:py-3"
    >
      {children}
    </a>
  );
}

function ImageSlot({
  src,
  alt,
  label,
  className = "",
  fit = "cover",
}: {
  src: string | null;
  alt: string;
  label: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={
            fit === "contain" ? "object-contain object-bottom" : "object-cover"
          }
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent 0 9px, color-mix(in oklab, var(--fg) 6%, transparent) 9px 18px)",
          }}
        >
          <span className="px-3 text-center font-mono text-[10px] tracking-[.08em] text-fg/45 sm:text-[11px]">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Motion — reveals, cursor blob, tilt, magnetic hover.
// Everything here no-ops under prefers-reduced-motion (and the cursor blob
// also skips touch devices).
// ---------------------------------------------------------------------------

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useReveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition =
        "opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CursorBlob() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rely solely on pointer capability: if coarse-only (pure touch like phones), skip execution
    const isCoarseOnly = window.matchMedia("(pointer: coarse) and (hover: none)").matches;
    
    if (isCoarseOnly || prefersReducedMotion()) {
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.display = 'block';
    ring.style.display = 'block';

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (ev: MouseEvent) => {
      mx = ev.clientX;
      my = ev.clientY;
      dot.style.transform = `translate(${mx - 7}px, ${my - 7}px)`;
      const target = ev.target as Element | null;
      const hovering = target?.closest?.("a, button, [data-hover]");
      const size = hovering ? 72 : 44;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
    };

    window.addEventListener("mousemove", onMove);

    const loop = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      const s = parseFloat(ring.style.width) || 44;
      ring.style.transform = `translate(${rx - s / 2}px, ${ry - s / 2}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-3.5 w-3.5 rounded-full bg-white mix-blend-difference"
        style={{ transform: "translate(-100px,-100px)", display: 'none' }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-[1.5px] border-white mix-blend-difference [transition:width_.25s,height_.25s]"
        style={{ width: 44, height: 44, transform: "translate(-100px,-100px)", display: 'none' }}
      />
    </>
  );
}function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card || prefersReducedMotion()) return;

    const onMove = (ev: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1200px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg)`;
    };
    const onLeave = () => {
      card.style.transition = "transform .5s ease";
      card.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
      setTimeout(() => {
        card.style.transition = "";
      }, 500);
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return ref;
}

function useMagnet<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const onMove = (ev: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translate(${px * 18}px, ${py * 14}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return ref;
}
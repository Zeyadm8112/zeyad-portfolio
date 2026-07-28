"use client";

import Image from "next/image";
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
} = {
  heroPhoto: null,
  molagloraWeb: null,
  molagloraApp: null,
  portrait: null,
};

const LINKS = {
  email: "hello@zeyad.dev",
  appStore: "#",
  googlePlay: "#",
  web: "#",
  github: "#",
  linkedin: "#",
  twitter: "#",
};

const SKILLS = [
  "REACT",
  "REACT NATIVE",
  "NEXT.JS",
  "EXPO",
  "TYPESCRIPT",
  "JAVASCRIPT (ES2024)",
  "REDUX / ZUSTAND",
  "REACT QUERY",
  "TAILWIND",
  "REANIMATED",
  "REST / GRAPHQL",
  "CI/CD · EAS",
];

const BOOKS = [
  { title: "REFACTORING UI", h: 220, bg: "#2f6fed", fg: "#f2efe9" },
  { title: "CLEAN CODE", h: 260, bg: "#f2efe9", fg: "#0f0e0c" },
  { title: "THE PRAGMATIC PROGRAMMER", h: 300, bg: "#161512", fg: "#f2efe9" },
  { title: "EFFECTIVE TYPESCRIPT", h: 240, bg: "var(--accent)", fg: "#0f0e0c" },
  { title: "ATOMIC HABITS", h: 210, bg: "#b4513e", fg: "#f2efe9" },
  { title: "DEEP WORK", h: 270, bg: "#3e3a33", fg: "#f2efe9" },
];

const CURRENT_BOOK = "DESIGNING INTERFACES";

const POSTS = [
  { date: "2026 · DRAFT", title: "One design language, two app stores", href: "#" },
  { date: "2026 · DRAFT", title: "Why Expo finally won me over", href: "#" },
  { date: "2026 · DRAFT", title: "Scroll-driven animations without a library", href: "#" },
];

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
      <About />
      <Books />
      <Blog />
      <Contact />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

// Theme lives on <html data-theme> (set before paint by the layout's inline
// script), so React reads it as an external store instead of duplicating it.
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

  // White + difference blend inverts to dark ink on the light theme.
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-[18px] font-mono text-xs tracking-[.08em] text-white mix-blend-difference md:px-10">
      <a href="#top" className="text-sm font-bold">
        ZM©2026
      </a>
      <div className="flex items-center gap-4 md:gap-[26px]">
        <div className="hidden items-center gap-[26px] md:flex">
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
          className="cursor-pointer rounded-full border border-current bg-transparent px-3.5 py-[5px] font-mono text-[11px] tracking-[.08em] text-inherit"
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
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-5 pt-[120px] md:px-10"
    >
      {/* Floating polaroid + rotating badge */}
      <div className="absolute top-[12%] right-[7%] z-[2] hidden animate-[floaty_7s_ease-in-out_infinite] md:block">
        <div className="relative w-[250px] rotate-[4deg] transition-transform duration-[.4s] ease-[cubic-bezier(.2,.7,.2,1)] hover:rotate-0 hover:scale-[1.03]">
          <div className="rounded-[18px] border border-fg/30 bg-panel px-2.5 pt-2.5 shadow-[10px_10px_0_var(--accent)]">
            <div className="h-[290px] w-full">
              <ImageSlot
                src={IMAGES.heroPhoto}
                alt="Zeyad Mohamed"
                label="Drop your photo"
                className="rounded-[10px]"
              />
            </div>
            <div className="flex items-center justify-between px-1 py-2.5 font-mono text-[10.5px] tracking-[.08em] text-fg/55">
              <span>ZEYAD.JPG</span>
              <span className="text-accent-ink">● REC</span>
            </div>
          </div>
          <div className="pointer-events-none absolute -top-[42px] -left-[50px] h-[118px] w-[118px] animate-[spin_14s_linear_infinite]">
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
                  {"OPEN TO WORK • REACT NATIVE • "}
                </textPath>
              </text>
              <circle cx="75" cy="75" r="5" style={{ fill: "var(--accent)" }} />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-3.5 flex items-center gap-2.5 font-mono text-[13px] tracking-[.1em] text-fg/60">
        <span className="inline-block h-2 w-2 animate-[blink_1.6s_infinite] rounded-full bg-accent" />
        FRONT-END ENGINEER — CAIRO → EVERYWHERE
      </div>
      <h1 className="m-0 text-[clamp(72px,13.5vw,220px)] leading-[.88] font-bold tracking-[-.03em] uppercase">
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
      <div className="mt-9 flex flex-wrap items-end justify-between gap-6 border-t border-fg/[.18] pt-[18px] pb-[26px]">
        <p className="m-0 max-w-[460px] text-[17px] leading-[1.55] text-fg/75">
          I build fast, playful interfaces for the web and both app stores —
          React on the front, React Native everywhere else.
        </p>
        <div className="font-mono text-xs text-fg/50">SCROLL ↓</div>
      </div>
    </section>
  );
}

function Marquee() {
  const line =
    "REACT ✦ REACT NATIVE ✦ NEXT.JS ✦ EXPO ✦ TYPESCRIPT ✦ SHIPPED TO BOTH STORES ✦";
  return (
    <div className="overflow-hidden border-y border-fg/[.18] bg-accent text-[#0f0e0c]">
      <div className="flex w-max animate-[marquee_18s_linear_infinite] py-3.5 text-[22px] font-semibold tracking-[.02em] whitespace-nowrap">
        <span className="px-[18px]">{line}</span>
        <span className="px-[18px]" aria-hidden>
          {line}
        </span>
      </div>
    </div>
  );
}

function Work() {
  const tiltRef = useTilt<HTMLDivElement>();
  return (
    <section id="work" className="px-5 pt-[110px] pb-[60px] md:px-10">
      <SectionHeading num="01">Selected Work</SectionHeading>

      <div
        ref={tiltRef}
        data-reveal
        className="grid grid-cols-1 gap-11 rounded-[20px] border border-fg/20 bg-panel p-6 will-change-transform [transform-style:preserve-3d] md:p-11 lg:grid-cols-[1.1fr_.9fr]"
      >
        <div className="flex flex-col justify-between gap-7">
          <div>
            <div className="mb-5 flex flex-wrap gap-2 font-mono text-[11px]">
              <span className="rounded-full border border-fg/30 px-3 py-[5px]">
                NEXT.JS
              </span>
              <span className="rounded-full border border-fg/30 px-3 py-[5px]">
                REACT NATIVE · EXPO
              </span>
              <span className="rounded-full border border-accent px-3 py-[5px] text-accent-ink">
                LIVE ON BOTH STORES
              </span>
            </div>
            <h3 className="mt-0 mb-3.5 text-[clamp(36px,4.5vw,64px)] font-bold tracking-[-.02em]">
              Molaglora
            </h3>
            <p className="m-0 max-w-[420px] text-base leading-[1.6] text-fg/70">
              A cross-platform product built end-to-end: Next.js web app plus a
              React Native (Expo) app shipped to the App Store and Google Play
              from a single design language.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 font-mono text-xs">
            <StoreLink href={LINKS.appStore}>APP STORE ↗</StoreLink>
            <StoreLink href={LINKS.googlePlay}>GOOGLE PLAY ↗</StoreLink>
            <StoreLink href={LINKS.web}>WEB ↗</StoreLink>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_120px] items-end gap-4">
          <div className="h-[360px]">
            <ImageSlot
              src={IMAGES.molagloraWeb}
              alt="Molaglora web app"
              label="Molaglora web screenshot"
              className="rounded-[14px]"
            />
          </div>
          <div className="h-[240px]">
            <ImageSlot
              src={IMAGES.molagloraApp}
              alt="Molaglora mobile app"
              label="App screen"
              className="rounded-[14px]"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          data-reveal
          className="flex min-h-[180px] flex-col justify-between gap-4 rounded-[20px] border border-dashed border-fg/25 p-9"
        >
          <span className="font-mono text-[11px] text-fg/45">
            PROJECT SLOT — 02
          </span>
          <p className="m-0 text-[15px] text-fg/50">
            Your next case study goes here. Send me the details and I&apos;ll
            lay it out.
          </p>
        </div>
        <div
          data-reveal
          className="flex min-h-[180px] flex-col justify-between gap-4 rounded-[20px] border border-dashed border-fg/25 p-9"
        >
          <span className="font-mono text-[11px] text-fg/45">
            PROJECT SLOT — 03
          </span>
          <p className="m-0 text-[15px] text-fg/50">
            Side project, client work, or an open-source tool.
          </p>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="px-5 py-[60px] md:px-10">
      <SectionHeading num="02">Stack</SectionHeading>
      <div data-reveal className="flex flex-wrap gap-3 font-mono text-sm">
        {SKILLS.map((s) => (
          <span
            key={s}
            className="cursor-default rounded-full border border-fg/30 px-[22px] py-3 transition-colors hover:border-accent-ink hover:bg-accent hover:text-[#0f0e0c]"
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
    <section className="px-5 py-[60px] md:px-10">
      <SectionHeading num="03" className="mb-3">
        Experience
      </SectionHeading>
      <div
        data-reveal
        className="grid grid-cols-1 items-baseline gap-2 border-t border-fg/[.18] py-[26px] md:grid-cols-[200px_1fr_1fr] md:gap-5"
      >
        <span className="font-mono text-xs text-fg/50">2024 — NOW</span>
        <span className="text-[22px] font-semibold">
          Molaglora — Founding Front-End Engineer
        </span>
        <span className="text-[15px] leading-normal text-fg/60">
          Built and shipped the web (Next.js) and mobile (Expo) apps solo, from
          first commit to both stores.
        </span>
      </div>
      <div
        data-reveal
        className="grid grid-cols-1 items-baseline gap-2 border-y border-fg/[.18] py-[26px] md:grid-cols-[200px_1fr_1fr] md:gap-5"
      >
        <span className="font-mono text-xs text-fg/50">YYYY — YYYY</span>
        <span className="text-[22px] font-semibold text-fg/40">
          Previous role — add yours
        </span>
        <span className="text-[15px] leading-normal text-fg/35">
          Company, what you built, and the impact.
        </span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 items-center gap-10 px-5 py-[60px] md:grid-cols-[280px_1fr] md:gap-14 md:px-10"
    >
      <div data-reveal className="h-[280px] w-[280px]">
        <ImageSlot
          src={IMAGES.portrait}
          alt="Portrait of Zeyad Mohamed"
          label="Your photo"
          className="rounded-full"
        />
      </div>
      <div data-reveal>
        <span className="font-mono text-xs text-accent-ink">04 — ABOUT</span>
        <p className="mt-4 mb-0 max-w-[820px] text-[clamp(24px,2.8vw,38px)] leading-[1.35] font-medium">
          I&apos;m Zeyad — a front-end engineer who treats the browser like a
          playground and the app stores like a shipping dock. One codebase
          mindset, obsessive about feel: every tap, scroll, and transition
          should earn its place.
        </p>
      </div>
    </section>
  );
}

function Books() {
  return (
    <section id="books" className="px-5 py-[60px] md:px-10">
      <SectionHeading num="05" className="mb-2.5">
        Bookshelf
      </SectionHeading>
      <p className="mt-0 mb-9 font-mono text-xs text-fg/50">
        HOVER A SPINE — SWAP IN YOUR OWN TITLES
      </p>
      <div
        data-reveal
        className="flex flex-wrap items-end gap-2.5 border-b-[6px] border-fg/[.18] px-2"
      >
        {BOOKS.map((b) => (
          <div
            key={b.title}
            title={b.title}
            className="flex w-[52px] cursor-default items-center justify-center rounded-t transition-transform duration-[.25s] hover:-translate-y-4"
            style={{ background: b.bg, color: b.fg, height: b.h }}
          >
            <span className="rotate-180 py-3 font-mono text-[11.5px] font-bold tracking-[.04em] whitespace-nowrap [writing-mode:vertical-rl]">
              {b.title}
            </span>
          </div>
        ))}
        <div className="ml-6 pb-3.5 font-mono text-xs text-accent-ink">
          <span className="inline-block animate-[blink_1.6s_infinite]">▮</span>{" "}
          CURRENTLY READING: {CURRENT_BOOK}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="px-5 py-[60px] md:px-10">
      <SectionHeading num="06">Writing</SectionHeading>
      {POSTS.map((p) => (
        <a
          key={p.title}
          href={p.href}
          data-reveal
          className="grid grid-cols-1 items-baseline gap-1 border-t border-fg/[.18] px-2 py-6 transition-colors hover:bg-panel sm:grid-cols-[140px_1fr_auto] sm:gap-5"
        >
          <span className="font-mono text-xs text-fg/50">{p.date}</span>
          <span className="text-[clamp(20px,2.4vw,30px)] font-semibold">
            {p.title}
          </span>
          <span className="text-[22px] text-accent-ink">→</span>
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
      className="px-5 pt-[120px] pb-10 text-center md:px-10"
    >
      <span className="font-mono text-xs text-accent-ink">07 — SAY HI</span>
      <div data-reveal className="mt-5">
        <a
          href={`mailto:${LINKS.email}`}
          ref={magnetRef}
          className="inline-block text-[clamp(40px,7.5vw,110px)] font-bold tracking-[-.03em] break-all text-transparent uppercase will-change-transform [-webkit-text-stroke:2px_var(--fg)] hover:text-accent-ink hover:[-webkit-text-stroke:2px_var(--accent-ink)]"
        >
          {LINKS.email}
        </a>
      </div>
      <div className="mt-11 flex flex-wrap justify-center gap-[26px] font-mono text-xs">
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
          href={LINKS.twitter}
          className="underline underline-offset-4 hover:text-accent-ink"
        >
          X / TWITTER
        </a>
      </div>
      <div className="mt-20 flex flex-wrap justify-between gap-2 border-t border-fg/[.18] py-5 font-mono text-[11px] text-fg/40">
        <span>© 2026 ZEYAD MOHAMED</span>
        <span>BUILT WITH REACT, OBVIOUSLY</span>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

function SectionHeading({
  num,
  children,
  className = "mb-9",
}: {
  num: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline gap-4 ${className}`}>
      <span className="font-mono text-xs text-accent-ink">{num}</span>
      <h2 className="m-0 text-[clamp(40px,6vw,88px)] font-bold tracking-[-.02em] uppercase">
        {children}
      </h2>
    </div>
  );
}

function StoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-fg px-[22px] py-3 transition-colors hover:bg-fg hover:text-bg"
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
}: {
  src: string | null;
  alt: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent 0 9px, color-mix(in oklab, var(--fg) 6%, transparent) 9px 18px)",
          }}
        >
          <span className="px-3 text-center font-mono text-[11px] tracking-[.08em] text-fg/45">
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
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (prefersReducedMotion()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

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
        style={{ transform: "translate(-100px,-100px)" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-[1.5px] border-white mix-blend-difference [transition:width_.25s,height_.25s]"
        style={{ width: 44, height: 44, transform: "translate(-100px,-100px)" }}
      />
    </>
  );
}

function useTilt<T extends HTMLElement>() {
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

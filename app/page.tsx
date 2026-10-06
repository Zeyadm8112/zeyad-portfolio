"use client";
import Image from "next/image";
import { Download, Moon, Sun } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type Ref,
} from "react";

// ---------------------------------------------------------------------------
// Content — taken from Zeyad's IT Technical Support CV.
// Photos live in /public. The CV PDF is /public/Zeyad-Mohamed-IT-CV.pdf.
// ---------------------------------------------------------------------------

const IMAGES: {
  heroPhoto: string | null;
  portrait: string | null;
} = {
  heroPhoto: "/z1.png",
  portrait: "/z2.png",
};

const LINKS = {
  email: "zeyadm7811@outlook.com",
  whatsapp: "https://wa.me/201020622808",
  whatsappLabel: "+20 102 062 2808",
  github: "https://github.com/Zeyadm8112",
  linkedin: "https://www.linkedin.com/in/zeyad-mohamed-9b5a9a228/",
  medium: "https://medium.com/@zeyadm7811",
  cv: "/Zeyad-Mohamed-IT-CV.pdf",
  networkRepo: "https://github.com/Zeyadm8112/Network_Designing",
};

const PROFILE = {
  role: "IT Technical Support",
  location: "Suez & 6th of October City, Giza — Egypt",
  // Shown as separate "sites" in the hero
  sites: [
    { city: "Suez", region: "Egypt" },
    { city: "6th of October City", region: "Giza" },
  ],
  tagline:
    "Keeping users productive and systems healthy — Windows, Active Directory, networks, Linux and security.",
  summary:
    "I'm 24-year-old IT Technical Support professional with 2+ years of experience supporting users in enterprise environments. Interested in IT Technical Support and Application Support, with skills in Windows and Linux systems, Active Directory, networking, hardware and software troubleshooting, device setup, and system diagnostics. Familiar with Microsoft 365, Intune, remote support, ticketing systems, and IT security practices.",
  summaryMore:
    "Strong problem-solving and communication skills, with the ability to troubleshoot issues, investigate root causes, document solutions, and escalate complex incidents with clear technical details. Currently studying Computer Science, with hands-on experience in Python, PowerShell, SQL, and full-stack development, allowing me to approach technical issues from both the infrastructure and application sides.",
  education: {
    degree: "Computer Science Student",
    school: "Higher Institute for Computer Science & Information Systems (New Cairo Academy)",
    date: "2024 – Present",
  },
};

// Skills grouped into "VLANs" on the switch panel.
const SKILL_GROUPS: {
  vlan: number;
  name: string;
  label: string;
  skills: { name: string; detail?: string }[];
}[] = [
  {
    vlan: 10,
    name: "IT-ADMIN",
    label: "Technical Support & IT Administration",
    skills: [
      { name: "Windows OS Troubleshooting" },
      { name: "Device Setup & Support" },
      { name: "Networking Troubleshooting" },
      { name: "Windows Server & Active Directory Management" },
      {
        name: "System Monitoring & Diagnostics",
        detail: "Sergei Strelec Toolkit, system logs, disk utilities, partitions, backup & restore",
      },
      { name: "Switch Configuration Assistance" },
      { name: "Remote Connections & Remote Desktop Tools" },
      { name: "Software Installation & Support", detail: "including issue resolution" },
      { name: "Security Policy Enforcement & Compliance" },
      { name: "Microsoft 365 Administration" },
      { name: "Intune Device Management" },
      { name: "Ticketing Systems", detail: "Zendesk, Jira" },
      { name: "Cloud Platforms & Services" },
      { name: "Linux Systems" },
      { name: "ITIL 4 Foundation" },
    ],
  },
  {
    vlan: 20,
    name: "SECURITY",
    label: "Cybersecurity",
    skills: [
      { name: "User Security Awareness Training" },
      { name: "Security Policy Implementation Support" },
      { name: "OWASP Top 10 Knowledge" },
      { name: "MITRE ATT&CK Framework Awareness" },
      { name: "CVE Analysis & Vulnerability Assessment" },
      { name: "Penetration Testing Fundamentals" },
      { name: "Malware Analysis & Reverse Engineering", detail: "Basic" },
      { name: "VirusTotal File & URL Analysis" },
    ],
  },
  {
    vlan: 30,
    name: "SCRIPTING",
    label: "Programming",
    skills: [
      { name: "Python Scripting", detail: "automation and troubleshooting tasks" },
      { name: "PowerShell & Bash Scripting", detail: "system administration and automation" },
      { name: "API Integration & Testing", detail: "REST APIs, status codes, error handling" },
      { name: "Debugging & Log Analysis", detail: "frontend, backend, and server logs" },
      { name: "Full-stack Development", detail: "Django & Next.js" },
      { name: "Mobile App Development" },
      { name: "SQL Databases", detail: "PostgreSQL, schema design, query troubleshooting" },
      { name: "Git & GitHub Version Control", detail: "collaboration and documentation" },
      { name: "Agile Development Practices", detail: "Scrum, iterative delivery, collaboration" },
    ],
  },
  {
    vlan: 40,
    name: "SOFT-SKILLS",
    label: "Soft Skills",
    skills: [
      { name: "Strong Communication & Active Listening" },
      { name: "Problem-Solving & Analytical Thinking" },
      { name: "Patience & Empathy in User Support" },
      { name: "Team Collaboration & Cross-Department Coordination" },
      { name: "Time Management & Task Prioritization" },
      { name: "Documentation-Oriented Approach" },
      { name: "Adaptability & Fast Learning in New Systems" },
      { name: "Conflict Resolution & Stress Management" },
      { name: "Explaining Technical Concepts to Non-Technical Users" },
      { name: "Effective Issue Escalation with Clear Explanations" },
    ],
  },
];

type CertPurpose = "SECURITY" | "NETWORKING" | "IT SUPPORT" | "COMPUTER SCIENCE" | "DEVELOPMENT";

const CERTIFICATIONS: { title: string; issuer: string; purpose: CertPurpose }[] = [
  { title: "Operating Systems Support", issuer: "Cisco Netwrok Academy", purpose: "IT SUPPORT" },
  { title: "Master MCSE : Windows Server 2022 OS Administration Course", issuer: "Udemy", purpose: "IT SUPPORT" },
  { title: "Hardware and Upgrade Support", issuer: "Cisco Netwrok Academy", purpose: "IT SUPPORT" },
  { title: "Security and Connectivity Support", issuer: "Cisco Netwrok Academy", purpose: "IT SUPPORT" },
  { title: "IT Customer Support Basics", issuer: "Cisco Netwrok Academy", purpose: "IT SUPPORT" },
  { title: "Service Level Agreements & Quality of Service for Beginners", issuer: "Udemy", purpose: "IT SUPPORT" },
  { title: "IT Support & Troubleshooting Tips for Clinical Environments", issuer: "Udemy", purpose: "IT SUPPORT" },
  { title: "Mastering Windows Security", issuer: "Udemy", purpose: "IT SUPPORT" },
  { title: "Computer Networking Basics for Desktop Support Technicians", issuer: "Udemy", purpose: "IT SUPPORT" },
  { title: "Networking Basics", issuer: "Cisco Network Academy", purpose: "NETWORKING" },
  { title: "IP Addressing and Subnetting — Zero to Hero", issuer: "Udemy", purpose: "NETWORKING" },
  { title: "Ethical Hacker", issuer: "Cisco Networking Academy", purpose: "SECURITY" },
  { title: "OWASP Top 10 (Web)", issuer: "MaharaTech", purpose: "SECURITY" },
  { title: "Malware Analysis Fundamentals", issuer: "MaharaTech", purpose: "SECURITY" },
  { title: "Nmap Advanced Techniques Course A To Z On Network Scan ", issuer: "MaharaTech", purpose: "SECURITY" },
  { title: "Reverse Code Engineering", issuer: "MaharaTech", purpose: "SECURITY" },
  { title: "Google Africa Android Developer Scholarship Program", issuer: "Google Developers", purpose: "DEVELOPMENT" },
  { title: "Python and Flask Demonstration Practice Course", issuer: "Udemy", purpose: "DEVELOPMENT" },
  { title: "Python And Flask Framework Complete Course for beginners", issuer: "Udemy", purpose: "DEVELOPMENT" },
  { title: "Agile Crash Course For Beginners", issuer: "Udemy", purpose: "DEVELOPMENT" },
  { title: "CS50x", issuer: "Harvard edX", purpose: "COMPUTER SCIENCE" },
  { title: "ITI Program 101 — Intro to CS", issuer: "ITI", purpose: "COMPUTER SCIENCE" },
  { title: "Freelancing basics", issuer: "MaharaTech", purpose: "COMPUTER SCIENCE" },
];

const CURRENT_COURSES = [
  {
    title: "Practical Cisco Networking Labs in Cisco Packet Tracer",
    provider: "Udemy",
    focus: "Cisco Networking, Routing & Network Troubleshooting",
  },
  {
    title: "Server Infrastructure - IT Technical Support (Level 3) Guide",
    provider: "Udemy",
    focus: "L3 Support, Servers & Enterprise IT Infrastructure",
  },
  {
    title: "Azure Entra ID: Identity Management and Architecture",
    provider: "Udemy",
    focus: "Microsoft Entra ID & Identity Management",
  },
  {
    title: "SQL Masterclass: From Absolute Beginner to Developer",
    provider: "Udemy",
    focus: "SQL, Database Management & Query Optimization",
  },
  {
    title: "PowerShell Masterclass: Essential IT Automation & Scripting",
    provider: "Udemy",
    focus: "PowerShell, IT Automation & System Administration",
  },
  {
    title: "Linux Admin: Build Job-Ready Skills with 6 Projects",
    provider: "Udemy",
    focus: "Linux Administration & Troubleshooting",
  },
  {
    title: "Mastering of Python Script for System Administrator",
    provider: "Udemy",
    focus: "Python Automation & System Administration",
  },
  {
    title: "pfSense: Network Security and Firewall Management",
    provider: "Udemy",
    focus: "Firewall Management & Network Security",
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

// Network design labs — from github.com/Zeyadm8112/Network_Designing
type Segment = { vlan?: number; name: string; net: string };
type NetSwitch = { name: string; segments: Segment[] };
type NetRouter = { name: string; model: string; switches: NetSwitch[] };
type NetProject = {
  title: string;
  folder: string;
  badge: string;
  tags: string[];
  summary: string;
  highlights: string[];
  wan?: string[];
  routers: NetRouter[];
};

const PROJECTS: NetProject[] = [
  {
    title: "Hotel Network",
    folder: "Hotel-Network",
    badge: "MULTI-ROUTER · OSPF",
    tags: ["CISCO PACKET TRACER", "OSPF", "VLANs", "DHCP", "SSH", "PORT SECURITY"],
    summary:
      "A modern network for a three-floor hotel: one router per floor in the IT server room, linked with serial DCE cables, a switch and Wi-Fi on every floor, and every department isolated in its own VLAN.",
    highlights: [
      "OSPF routing advertises every network across the three routers",
      "8 departmental VLANs over 3 floors, each with its own /24",
      "Each router acts as DHCP server for its floor's VLANs",
      "SSH configured on all routers for remote login",
      "Port security on IT fa0/1 — sticky MAC, violation mode shutdown",
      "Full inter-VLAN communication across the building",
    ],
    wan: ["10.10.10.0/30", "10.10.10.4/30", "10.10.10.8/30"],
    routers: [
      {
        name: "R1 · 1st Floor",
        model: "Router",
        switches: [
          {
            name: "SW-F1",
            segments: [
              { vlan: 80, name: "Reception", net: "192.168.8.0/24" },
              { vlan: 70, name: "Store", net: "192.168.7.0/24" },
              { vlan: 60, name: "Logistics", net: "192.168.6.0/24" },
            ],
          },
        ],
      },
      {
        name: "R2 · 2nd Floor",
        model: "Router",
        switches: [
          {
            name: "SW-F2",
            segments: [
              { vlan: 50, name: "Finance", net: "192.168.5.0/24" },
              { vlan: 40, name: "HR", net: "192.168.4.0/24" },
              { vlan: 30, name: "Sales", net: "192.168.3.0/24" },
            ],
          },
        ],
      },
      {
        name: "R3 · 3rd Floor",
        model: "Router",
        switches: [
          {
            name: "SW-F3",
            segments: [
              { vlan: 20, name: "Admin", net: "192.168.2.0/24" },
              { vlan: 10, name: "IT", net: "192.168.1.0/24" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Small Office Network",
    folder: "Small-Office-Network",
    badge: "ROUTER-ON-A-STICK",
    tags: ["CISCO 2811", "VLSM /26", "802.1Q TRUNK", "DHCP", "WIRELESS"],
    summary:
      "A small office network for three departments: a Cisco 2811 router routes between VLANs over a single trunk, every department gets its own wireless access point, and addresses are handed out automatically.",
    highlights: [
      "One /24 split into three /26 department subnets",
      "802.1Q sub-interfaces on Fa0/0 for inter-VLAN routing",
      "A DHCP pool per department with gateway and DNS",
      "Trunk on Fa0/1 allowing VLANs 10, 20 and 30",
      "Wireless access point in every department",
    ],
    routers: [
      {
        name: "R1",
        model: "Cisco 2811",
        switches: [
          {
            name: "SW1",
            segments: [
              { vlan: 10, name: "Finance / HR", net: "192.168.1.0/26" },
              { vlan: 20, name: "Admin / IT", net: "192.168.1.64/26" },
              { vlan: 30, name: "Customer Service", net: "192.168.1.128/26" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Simple Network",
    folder: "Simple_Network",
    badge: "SUBNETTING",
    tags: ["CISCO 2911", "2960 SWITCHES", "/25 SUBNETS", "STATIC IP"],
    summary:
      "Two departments — Accounts and Delivery — connected through a Cisco 2911 router, each on its own 2960 switch and /25 subnet with PCs and a printer.",
    highlights: [
      "198.162.40.0/24 subnetted into two /25 networks",
      "Router gateways on Gig0/0 (.1) and Gig0/1 (.129)",
      "Static IP plan for every PC and printer",
      "Cross-department connectivity verified with ping",
    ],
    routers: [
      {
        name: "R1",
        model: "Cisco 2911",
        switches: [
          { name: "SW-ACC", segments: [{ name: "Accounts", net: "198.162.40.0/25" }] },
          { name: "SW-DEL", segments: [{ name: "Delivery", net: "198.162.40.128/25" }] },
        ],
      },
    ],
  },
];

const EXPERIENCE = [
  {
    date: "JUNE 2026 – PRESENT",
    title: "Full Stack Developer — Freelancing",
    company: "Ice Code",
    location: "Suez",
    bullets: [
      "Built web applications using Python, Django, React, and REST APIs.",
      "Managed client projects from requirements to delivery.",
      "Troubleshot and debugged application-level issues.",
      "Used Git/GitHub for version control and documentation.",
    ],
  },
  {
    date: "JANUARY 2024 – MAY 2026",
    title: "IT Technical Support — Outsource",
    company: "Industrial Company",
    location: "Ain Sokhna District, Suez",
    bullets: [
      "Provided technical support for hardware, software, and end-user device issues in an enterprise environment.",
      "Prepared, configured, and deployed computers and IT devices for employees.",
      "Performed Windows system diagnostics and troubleshooting using system logs, disk utilities, and Sergei Strelec Toolkit.",
      "Supported network installations, including physical setup, device connectivity, and basic troubleshooting.",
      "Managed and maintained IT equipment inventory, including cables, access points, racks, and networking accessories.",
      "Diagnosed and resolved technical issues, escalating complex problems to specialized technical teams when required.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  useReveal();
  return (
    <div className="relative min-h-screen">
      <BootScreen />
      <CursorReticle />
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <Skills />
      <Experience />
      <Certifications />
      <Courses />
      <About />
      <Blog />
      <Contact />
      <FloatingCVButton />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Boot screen — a quick BIOS/POST sequence, once per browser session.
// ---------------------------------------------------------------------------

const BOOT_LINES: { text: string; ok?: string; dim?: boolean }[] = [
  { text: "ZM-BIOS v26.10  ·  (C) 2026 ZM SYSTEMS", dim: true },
  { text: "CPU0 ........................................", ok: "OK" },
  { text: "Memory test: 16777216K", ok: "OK" },
  { text: "Detecting network adapters ... eth0 1000Mb/s full-duplex", ok: "UP" },
  { text: "DHCP: lease acquired 10.0.0.7/24  gw 10.0.0.1", ok: "OK" },
  { text: "Joining domain ZM.LOCAL (Kerberos) ...........", ok: "OK" },
  { text: "Loading firewall policy ............... 128 rules", ok: "OK" },
  { text: "Starting services: sshd · dns · dhcp · ad-ds", ok: "OK" },
  { text: "Mounting \\\\SRV-FS01\\portfolio ...............", ok: "OK" },
  { text: "Welcome. Press any key to continue_", dim: true },
];

function BootScreen() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem("zm-booted", "1");
    } catch {}
    const el = ref.current;
    if (!el) return;
    const skip = () => el.classList.add("is-done");
    window.addEventListener("keydown", skip, { once: true });
    const t = window.setTimeout(skip, 2700);
    return () => {
      window.removeEventListener("keydown", skip);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="boot"
      onClick={() => ref.current?.classList.add("is-done")}
    >
      {BOOT_LINES.map((l, i) => (
        <div
          key={i}
          className={`boot-line flex gap-3 ${l.dim ? "boot-dim" : ""}`}
          style={{ animationDelay: `${0.1 + i * 0.17}s` }}
        >
          <span className="min-w-0 truncate">{l.text}</span>
          {l.ok && (
            <span className="boot-ok shrink-0">[ {l.ok} ]</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nav — a status bar: host, links, live clock, link state, theme toggle.
// Theme follows the system until the visitor picks one.
// ---------------------------------------------------------------------------

function subscribeTheme(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  window.addEventListener("zm-theme", cb);
  mq.addEventListener("change", cb);
  return () => {
    window.removeEventListener("zm-theme", cb);
    mq.removeEventListener("change", cb);
  };
}

function readTheme(): "dark" | "light" {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function Nav() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark" as const);
  const clockRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      if (clockRef.current) {
        clockRef.current.textContent = new Date().toLocaleTimeString("en-GB", {
          hour12: false,
        });
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("zm-theme", next);
    } catch {}
    window.dispatchEvent(new Event("zm-theme"));
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/75 font-mono text-[11px] tracking-[.08em] backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 sm:px-5 md:px-10">
        <a href="#top" className="flex items-center gap-2 text-sm font-bold">
          <span className="grid h-6 w-6 place-items-center rounded-[5px] bg-accent text-[11px] text-on-accent">
            &gt;_
          </span>
          ZM©2026
        </a>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-5 md:flex md:gap-6">
            {[
              ["#work", "PROJECTS"],
              ["#skills", "SKILLS"],
              ["#experience", "EXPERIENCE"],
              ["#about", "ABOUT"],
              ["#blog", "BLOG"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="group hover:text-accent-ink">
                <span className="text-fg/35 group-hover:text-accent-ink">/</span>
                {label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="rounded-[6px] border border-accent-ink/60 px-2.5 py-1 text-accent-ink hover:bg-accent hover:text-on-accent"
          >
            CONTACT
          </a>
          <span className="hidden items-center gap-2 text-fg/55 xl:flex">
            <span className="inline-block h-1.5 w-1.5 animate-[blink_1.6s_infinite] rounded-full bg-accent" />
            ONLINE
            <span className="text-fg/25">|</span>
            <span ref={clockRef} className="tabular-nums">--:--:--</span>
          </span>
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="group relative flex h-[26px] w-[52px] cursor-pointer items-center rounded-full border border-line bg-panel p-[2px] transition-colors hover:border-fg/50"
          >
            <span
              className={`grid h-5 w-5 place-items-center rounded-full bg-accent text-on-accent shadow-[0_0_10px_color-mix(in_oklab,var(--accent)_60%,transparent)] transition-transform duration-300 ${
                theme === "light" ? "translate-x-[26px]" : "translate-x-0"
              }`}
            >
              {theme === "light" ? <Sun size={12} strokeWidth={2.5} /> : <Moon size={12} strokeWidth={2.5} />}
            </span>
          </button>
        </div>
      </div>
      <div
        ref={progressRef}
        className="h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
        style={{ transform: "scaleX(0)" }}
      />
    </nav>
  );
}

// Hero
// ---------------------------------------------------------------------------

function Hero() {
  const uptimeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      const hh = String(Math.floor(s / 3600)).padStart(2, "0");
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      if (uptimeRef.current) uptimeRef.current.textContent = `${hh}:${mm}:${ss}`;
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-4 pt-24 pb-8 sm:px-5 md:px-10 md:pt-[110px]"
    >
      <NetworkCanvas />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_100%,var(--bg)_25%,transparent_70%)]"
      />

      {/* Top row: live terminal + RDP photo window */}
      <div className="relative z-[2] grid grid-cols-1 items-start gap-6 sm:grid-cols-[1fr_auto]">
        <div className="hidden max-w-[540px] sm:block">
          <TypingTerminal />
        </div>

        <div className="ml-auto animate-[floaty_7s_ease-in-out_infinite]">
          <div className="relative w-[150px] transition-transform duration-[.4s] ease-[cubic-bezier(.2,.7,.2,1)] hover:scale-[1.03] sm:w-[200px] md:w-[260px]">
            <div className="win">
              <div className="win-bar !px-2 !py-1.5 sm:!px-3">
                <span className="text-accent-ink">▣</span>
                <span className="truncate">RDP · ZEYAD-PC</span>
                <div className="win-ctrl max-sm:hidden">
                  <span>─</span>
                  <span>▢</span>
                  <span>✕</span>
                </div>
              </div>
              <div className="scanlines scanbeam relative h-[160px] w-full sm:h-[210px] md:h-[290px]">
                <ImageSlot
                  src={IMAGES.heroPhoto}
                  alt="Zeyad Mohamed"
                  label="Drop your photo"
                />
                <div className="corners" />
              </div>
              <div className="flex items-center justify-between px-2.5 py-2 font-mono text-[8.5px] tracking-[.08em] text-fg/55 sm:text-[10.5px]">
                <span>ZEYAD.JPG</span>
                <span className="text-danger">
                  <span className="animate-[blink_1.2s_infinite]">●</span> REC
                </span>
              </div>
            </div>

            {/* Rotating badge */}
            <div className="pointer-events-none absolute top-[38%] -left-[30px] h-[64px] w-[64px] animate-[spin_14s_linear_infinite] sm:-left-[44px] sm:h-[88px] sm:w-[88px] md:-left-[59px] md:h-[118px] md:w-[118px]">
              <svg viewBox="0 0 150 150" className="h-full w-full overflow-visible">
                <defs>
                  <path
                    id="circ"
                    d="M 75,75 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
                  />
                </defs>
                <circle
                  cx="75"
                  cy="75"
                  r="72"
                  style={{ fill: "var(--bg)", stroke: "var(--accent)", strokeWidth: 1.5 }}
                />
                <text
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "13.5px",
                    letterSpacing: ".3em",
                    fill: "var(--fg)",
                  }}
                >
                  <textPath href="#circ">{"OPEN TO WORK • IT SUPPORT • "}</textPath>
                </text>
                <circle cx="75" cy="75" r="6" style={{ fill: "var(--accent)" }} />
                <circle
                  cx="75"
                  cy="75"
                  r="14"
                  style={{ fill: "none", stroke: "var(--accent)", strokeWidth: 1, opacity: 0.5 }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: name block */}
      <div className="relative z-[2] mt-14">
        <div className="mb-3.5 flex flex-wrap items-center gap-2.5 font-mono text-[11px] tracking-[.1em] text-fg/65 sm:text-[13px]">
          <span className="text-accent-ink">root@zm:~#</span>
          <span className="inline-block h-2 w-2 animate-[blink_1.6s_infinite] rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
          <span>{PROFILE.role} —</span>
          {PROFILE.sites.map((site, i) => (
            <span key={site.city} className="inline-flex items-center gap-2">
              {i > 0 && <span className="text-fg/30">⇄</span>}
              <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-line bg-panel/70 px-2 py-0.5">
                <span className="text-accent-ink">◉</span>
                {site.city}, {site.region}
              </span>
            </span>
          ))}
        </div>
        <h1 className="m-0 text-[clamp(42px,15vw,220px)] leading-[.9] font-bold tracking-[-.03em] uppercase">
          <span data-reveal className="block">
            Zeyad
          </span>
          <span
            data-reveal
            data-text="Mohamed"
            className="glitch block text-transparent [-webkit-text-stroke:2px_var(--fg)]"
          >
            Mohamed
          </span>
        </h1>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-5 border-t border-line pt-[18px] sm:mt-9">
          <p className="m-0 max-w-[460px] text-[15px] leading-[1.55] text-fg/75 sm:text-[17px]">
            {PROFILE.tagline}
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-[10px] tracking-[.08em] text-fg/60 sm:text-[11px]">
            <span className="rounded-[6px] border border-line bg-panel/70 px-2.5 py-1.5">
              <span className="text-fg/40">IPv4 </span>10.0.0.7/24
            </span>
            <span className="rounded-[6px] border border-line bg-panel/70 px-2.5 py-1.5">
              <span className="text-fg/40">LINK </span>
              <span className="text-accent-ink">▲ 1 Gbps</span>
            </span>
            <span className="rounded-[6px] border border-line bg-panel/70 px-2.5 py-1.5">
              <span className="text-fg/40">UPTIME </span>
              <span ref={uptimeRef} className="tabular-nums">00:00:00</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// A small terminal that types PowerShell / Cisco / bash commands on a loop.
// It opens already showing a session so it's never blank.
const TERMINAL_SCRIPT: { prompt: string; cmd: string; out: string[] }[] = [
  {
    prompt: "PS C:\\>",
    cmd: "Get-ADUser zeyad -Properties Title | Select Name, Title",
    out: ["Name           Title", "----           -----", "Zeyad Mohamed  IT Technical Support"],
  },
  {
    prompt: "PS C:\\>",
    cmd: "gpupdate /force",
    out: [
      "Updating policy...",
      "Computer Policy update has completed successfully.",
      "User Policy update has completed successfully.",
    ],
  },
  {
    prompt: "R3#",
    cmd: "show vlan brief | include active",
    out: ["10   it-vlan        active    Fa0/3-6", "20   admin-vlan     active    Fa0/7-10"],
  },
  {
    prompt: "PS C:\\>",
    cmd: "Test-Connection 192.168.1.1 -Count 2",
    out: [
      "Reply from 192.168.1.1: bytes=32 time<1ms TTL=255",
      "Reply from 192.168.1.1: bytes=32 time<1ms TTL=255",
    ],
  },
  {
    prompt: "zeyad@srv-01:~$",
    cmd: "systemctl status helpdesk",
    out: ["● helpdesk.service - IT Technical Support", "   Active: active (running)"],
  },
  {
    prompt: "zeyad@srv-01:~$",
    cmd: "sudo ufw status",
    out: ["Status: active", "22/tcp    ALLOW   192.168.1.0/24", "443/tcp   ALLOW   Anywhere"],
  },
];

type TermLine = { kind: "cmd" | "out"; prompt?: string; text: string };

const scriptLines = (steps: typeof TERMINAL_SCRIPT): TermLine[] =>
  steps.flatMap((s) => [
    { kind: "cmd" as const, prompt: s.prompt, text: s.cmd },
    ...s.out.map((o) => ({ kind: "out" as const, text: o })),
  ]);

const TERMINAL_INTRO: TermLine[] = [
  { kind: "out", text: "Windows PowerShell" },
  { kind: "out", text: "Copyright (C) Microsoft Corporation. All rights reserved." },
  { kind: "out", text: "" },
  ...scriptLines(TERMINAL_SCRIPT.slice(0, 1)),
];

const promptClass = (p?: string) =>
  p?.startsWith("PS") ? "text-accent-2" : p?.endsWith("#") ? "text-warn" : "text-accent-ink";

function TypingTerminal() {
  const [lines, setLines] = useState<TermLine[]>(TERMINAL_INTRO);
  const [typing, setTyping] = useState<{ prompt: string; text: string }>({
    prompt: TERMINAL_SCRIPT[1].prompt,
    text: "",
  });

  useEffect(() => {
    let cancelled = false;
    if (prefersReducedMotion()) return;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const booted = !!document.documentElement.dataset.booted;

    (async () => {
      await sleep(booted ? 600 : 2300); // let the boot screen finish
      let i = 1;
      while (!cancelled) {
        const step = TERMINAL_SCRIPT[i % TERMINAL_SCRIPT.length];
        for (let c = 1; c <= step.cmd.length && !cancelled; c++) {
          setTyping({ prompt: step.prompt, text: step.cmd.slice(0, c) });
          await sleep(26 + Math.random() * 42);
        }
        await sleep(260);
        if (cancelled) return;
        setLines((prev) => [...prev, ...scriptLines([step])].slice(-9));
        setTyping({ prompt: TERMINAL_SCRIPT[(i + 1) % TERMINAL_SCRIPT.length].prompt, text: "" });
        await sleep(1500);
        i++;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="win !bg-panel/85 backdrop-blur-sm">
      <div className="win-bar">
        <span className="text-accent-2">⌘</span>
        <span className="truncate">Windows Terminal — admin</span>
        <div className="win-ctrl">
          <span>─</span>
          <span>▢</span>
          <span>✕</span>
        </div>
      </div>
      <div className="h-[240px] overflow-hidden px-4 py-3 font-mono text-[11.5px] leading-[1.65] md:h-[260px] md:text-[12.5px]">
        <div className="flex h-full flex-col justify-end">
          {lines.map((l, i) =>
            l.kind === "cmd" ? (
              <div key={i} className="truncate">
                <span className={promptClass(l.prompt)}>{l.prompt}</span> {l.text}
              </div>
            ) : (
              <div key={i} className="min-h-[1.65em] truncate whitespace-pre text-fg/55">
                {l.text}
              </div>
            ),
          )}
          <div className="truncate">
            <span className={promptClass(typing.prompt)}>{typing.prompt}</span> {typing.text}
            <span className="ml-0.5 inline-block h-[1.05em] w-[0.6em] translate-y-[2px] animate-[caret_1s_infinite] bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated network topology: hosts drift, links form between neighbours,
// packets travel along links. Your cursor joins the network as a host.
function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const LINK = 150;

    type Node = { x: number; y: number; vx: number; vy: number; kind: 0 | 1 | 2 };
    type Packet = { a: number; b: number; t: number; v: number; alt: boolean };
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    const mouse = { x: -9999, y: -9999 };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        fg: cs.getPropertyValue("--fg").trim() || "#dbe7ef",
        accent: cs.getPropertyValue("--accent").trim() || "#39ff88",
        accent2: cs.getPropertyValue("--accent-2").trim() || "#3ac8ff",
      };
    };
    let colors = readColors();
    const onTheme = () => {
      colors = readColors();
      if (reduced) draw();
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(16, Math.min(70, Math.round((w * h) / 24000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        kind: (Math.random() < 0.12 ? 1 : Math.random() < 0.1 ? 2 : 0) as 0 | 1 | 2,
      }));
      packets = [];
      if (reduced) draw();
    };

    const dist = (a: Node, b: Node) => Math.hypot(a.x - b.x, a.y - b.y);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // links
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.fg;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = dist(nodes[i], nodes[j]);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        // cursor host
        const dm = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
        if (dm < LINK * 1.3) {
          ctx.strokeStyle = colors.accent;
          ctx.globalAlpha = (1 - dm / (LINK * 1.3)) * 0.7;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.strokeStyle = colors.fg;
        }
      }

      // hosts
      for (const n of nodes) {
        if (n.kind === 1) {
          // server
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = colors.accent2;
          ctx.fillRect(n.x - 3.5, n.y - 3.5, 7, 7);
        } else if (n.kind === 2) {
          // router
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = colors.accent;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y - 5);
          ctx.lineTo(n.x + 5, n.y);
          ctx.lineTo(n.x, n.y + 5);
          ctx.lineTo(n.x - 5, n.y);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.globalAlpha = 0.45;
          ctx.fillStyle = colors.fg;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // packets
      for (const p of packets) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.globalAlpha = 1;
        ctx.fillStyle = p.alt ? colors.accent2 : colors.accent;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      if (visible) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
        // spawn packets along existing links
        if (packets.length < 26 && Math.random() < 0.18) {
          const a = Math.floor(Math.random() * nodes.length);
          let best = -1;
          let bestD = LINK;
          for (let j = 0; j < nodes.length; j++) {
            if (j === a) continue;
            const d = dist(nodes[a], nodes[j]);
            if (d < bestD && Math.random() < 0.6) {
              best = j;
              bestD = d;
            }
          }
          if (best >= 0)
            packets.push({ a, b: best, t: 0, v: 0.008 + Math.random() * 0.014, alt: Math.random() < 0.35 });
        }
        packets = packets.filter((p) => {
          p.t += p.v;
          return p.t < 1 && dist(nodes[p.a], nodes[p.b]) < LINK * 1.1;
        });
        draw();
      }
      raf = requestAnimationFrame(step);
    };

    const onMove = (ev: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = ev.clientX - r.left;
      mouse.y = ev.clientY - r.top;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("zm-theme", onTheme);

    let io: IntersectionObserver | null = null;
    if (!reduced) {
      window.addEventListener("mousemove", onMove);
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
      });
      io.observe(canvas);
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("zm-theme", onTheme);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}

function Marquee() {
  const line = "WINDOWS SERVER ✦ ACTIVE DIRECTORY ✦ NETWORKING ✦ LINUX ✦ MICROSOFT 365 ✦ INTUNE ✦ CYBERSECURITY ✦ POWERSHELL ✦ TECHNICAL SUPPORT";
  const ports =
    "22/SSH ● 53/DNS ● 67/DHCP ● 88/KERBEROS ● 135/RPC ● 389/LDAP ● 443/HTTPS ● 445/SMB ● 636/LDAPS ● 3389/RDP ● ";
  return (
    <div className="relative z-[2] border-y border-line">
      <div className="overflow-hidden bg-accent text-on-accent">
        <div className="flex w-max animate-[marquee_18s_linear_infinite] py-3 text-[16px] font-semibold tracking-[.02em] whitespace-nowrap sm:py-3.5 sm:text-[22px]">
          <span className="px-3 sm:px-[18px]">{line}</span>
          <span className="px-3 sm:px-[18px]" aria-hidden>
            {line}
          </span>
        </div>
      </div>
      <div aria-hidden className="overflow-hidden bg-panel">
        <div className="flex w-max animate-[marquee-rev_40s_linear_infinite] py-2 font-mono text-[10px] tracking-[.14em] whitespace-nowrap text-fg/50 sm:text-[11px]">
          <span className="px-3">{ports.repeat(2)}</span>
          <span className="px-3">{ports.repeat(2)}</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 01 — Projects: Cisco network designs, each with a live topology diagram
// ---------------------------------------------------------------------------

function Work() {
  return (
    <section id="work" className="px-4 pt-[70px] pb-[40px] sm:px-5 sm:pt-[110px] sm:pb-[60px] md:px-10">
      <SectionHeading num="01" cmd={["bash", "git clone github.com/Zeyadm8112/Network_Designing"]}>
        Network Projects
      </SectionHeading>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <ProjectShowcase key={project.title} project={project} index={i} featured={i === 0} />
        ))}
      </div>

      <div data-reveal className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[12px] border border-dashed border-line px-5 py-4 font-mono text-[11px] tracking-[.06em] text-fg/55 sm:text-xs">
        <span>
          <span className="text-accent-ink">●</span> All labs built &amp; tested in Cisco Packet Tracer — .pkt files and full configs on GitHub
        </span>
        <StoreLink href={LINKS.networkRepo}>VIEW REPOSITORY ↗</StoreLink>
      </div>
    </section>
  );
}

function ProjectShowcase({
  project,
  index,
  featured = false,
}: {
  project: NetProject;
  index: number;
  featured?: boolean;
}) {
  const tiltRef = useTilt<HTMLDivElement>();
  const vlanCount = project.routers
    .flatMap((r) => r.switches)
    .flatMap((s) => s.segments).length;

  return (
    <Window
      innerRef={tiltRef}
      title={`\\\\SRV-FS01\\Network_Designing\\${project.folder}.pkt`}
      icon={["◆", "◈", "◇"][index % 3]}
      status={`${project.routers.length} RTR · ${vlanCount} ${project.routers[0].switches[0].segments[0].vlan ? "VLAN" : "LAN"}`}
      className={`will-change-transform [transform-style:preserve-3d] ${featured ? "lg:col-span-2" : ""}`}
    >
      <div
        className={`grid grid-cols-1 gap-8 p-4 sm:p-6 md:p-9 ${
          featured ? "xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:gap-12" : ""
        }`}
      >
        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="mb-4 flex flex-wrap gap-1.5 font-mono text-[9px] sm:gap-2 sm:text-[11px]">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              <Tag accent>{project.badge}</Tag>
            </div>
            <h3 className="mb-3 text-[clamp(26px,4.4vw,56px)] leading-[1.02] font-bold tracking-[-0.02em] sm:mb-4">
              {project.title}
            </h3>
            <p className="m-0 max-w-[620px] text-[14px] leading-7 text-fg/70 sm:text-[16px]">
              {project.summary}
            </p>

            <div className="mt-5 rounded-[10px] border border-line bg-panel-2/70 p-4 font-mono text-[11px] leading-[1.75] sm:text-[12px]">
              <div className="mb-1 text-fg/40">! running-config — highlights</div>
              {project.highlights.map((h) => (
                <div key={h} className="flex gap-2">
                  <span className="shrink-0 text-accent-ink">+</span>
                  <span className="text-fg/80">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-[10px] sm:gap-3.5 sm:text-xs">
            <StoreLink href={`${LINKS.networkRepo}/tree/main/${project.folder}`}>GITHUB ↗</StoreLink>
          </div>
        </div>

        <Topology project={project} />
      </div>
    </Window>
  );
}

// Data-driven topology: routers on top, serial/WAN links between them,
// switches below each router, then the VLANs / subnets behind each switch.
function Topology({ project }: { project: NetProject }) {
  const multi = project.routers.length > 1;
  return (
    <div className="relative overflow-hidden rounded-[12px] border border-line bg-[radial-gradient(circle,color-mix(in_oklab,var(--fg)_9%,transparent)_1px,transparent_1px)] bg-[length:18px_18px] p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[.1em] text-fg/45">
        <span>LOGICAL TOPOLOGY</span>
        <span className="flex items-center gap-1.5">
          <span className="led" /> ALL LINKS UP
        </span>
      </div>

      {multi && project.wan && (
        <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[10px] text-fg/55 sm:text-[11px]">
          <span className="text-fg/40">SERIAL (DCE) · OSPF</span>
          {project.wan.map((w) => (
            <span key={w} className="rounded-[5px] border border-warn/50 px-1.5 py-0.5 text-warn">
              {w}
            </span>
          ))}
        </div>
      )}

      <div
        className={`grid gap-4 ${
          multi ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1"
        }`}
      >
        {project.routers.map((r, ri) => (
          <div key={r.name} className="relative flex flex-col items-center">
            {/* serial link to the next router */}
            {multi && ri < project.routers.length - 1 && (
              <span className="absolute top-[22px] left-[calc(50%+26px)] hidden h-0 w-[calc(100%-52px+1rem)] border-t-2 border-dashed border-warn/70 sm:block">
                <span className="packet absolute -top-[4px] h-1.5 w-1.5 rounded-full bg-warn shadow-[0_0_8px_var(--warn)]" />
              </span>
            )}

            {/* router */}
            <div className="relative z-[1] grid h-11 w-11 place-items-center rounded-full border-2 border-accent bg-panel text-[15px] text-accent-ink shadow-[0_0_18px_color-mix(in_oklab,var(--accent)_35%,transparent)]">
              ⇄
            </div>
            <div className="mt-1.5 text-center font-mono text-[10px] leading-tight sm:text-[11px]">
              <div className="font-bold">{r.name}</div>
              <div className="text-fg/45">{r.model}</div>
            </div>

            <div className={`mt-0 grid w-full gap-3 ${r.switches.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
              {r.switches.map((sw) => (
                <div key={sw.name} className="flex flex-col items-center">
                  <span className="h-5 border-l-2 border-accent-2/70" />
                  <div className="flex items-center gap-1.5 rounded-[6px] border border-accent-2/60 bg-panel px-2 py-1 font-mono text-[10px] font-bold text-accent-2 sm:text-[11px]">
                    <span className="grid grid-cols-4 gap-[2px]">
                      {Array.from({ length: 8 }).map((_, k) => (
                        <span key={k} className="h-[3px] w-[3px] rounded-[1px] bg-accent-2/80" />
                      ))}
                    </span>
                    {sw.name}
                  </div>
                  <span className="h-3 border-l border-dashed border-fg/30" />
                  <div className="flex w-full flex-col gap-1.5">
                    {sw.segments.map((s) => (
                      <div
                        key={s.net}
                        className="rounded-[6px] border border-line bg-panel/90 px-2 py-1.5 font-mono text-[10px] leading-tight sm:text-[10.5px]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate font-semibold">{s.name}</span>
                          {s.vlan && (
                            <span className="shrink-0 rounded-[3px] bg-accent/15 px-1 text-accent-ink">
                              VLAN {s.vlan}
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 text-fg/50">{s.net}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 02 — Skills: a managed switch; each skill group is a VLAN you can select
// ---------------------------------------------------------------------------

function Skills() {
  const [active, setActive] = useState(0);
  const group = SKILL_GROUPS[active];
  const total = 16;
  const ports = Array.from({ length: total }, (_, i) => group.skills[i] ?? null);
  const allCount = SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0);

  return (
    <section id="skills" className="px-4 py-[40px] sm:px-5 sm:py-[60px] md:px-10">
      <SectionHeading num="02" cmd={["ios", `show interfaces status vlan ${group.vlan}`]}>
        Skills
      </SectionHeading>

      <div data-reveal className="switch flex overflow-hidden">
        <div className="switch-ear hidden w-8 shrink-0 border-r border-line sm:block" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 font-mono text-[10px] tracking-[.1em] text-fg/55 sm:px-6 sm:text-[11px]">
            <div className="flex items-center gap-3">
              <span className="font-bold text-fg">ZM-CORE-SW01</span>
              <span className="hidden sm:inline">{allCount} SKILLS · {SKILL_GROUPS.length} VLANs · L3 MANAGED</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="led" /> PWR
              </span>
              <span className="flex items-center gap-1.5">
                <span className="led" /> SYS
              </span>
              <span className="flex items-center gap-1.5">
                <span className="led amber" /> ACT
              </span>
            </div>
          </div>

          {/* VLAN selector */}
          <div role="tablist" className="flex gap-2 overflow-x-auto border-b border-line px-4 py-3 sm:px-6">
            {SKILL_GROUPS.map((g, i) => (
              <button
                key={g.vlan}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`shrink-0 cursor-pointer rounded-[8px] border px-3 py-2 text-left font-mono text-[10px] tracking-[.06em] transition-colors sm:text-[11px] ${
                  i === active
                    ? "border-accent bg-accent text-on-accent"
                    : "border-line text-fg/65 hover:border-fg/40 hover:text-fg"
                }`}
              >
                <span className="block font-bold">VLAN {g.vlan} · {g.name}</span>
                <span className={`block ${i === active ? "text-on-accent/75" : "text-fg/40"}`}>
                  {g.skills.length} ports up
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-baseline justify-between gap-3 px-4 pt-4 sm:px-6">
            <h3 className="m-0 text-[clamp(18px,2.4vw,26px)] font-semibold tracking-[-.01em]">{group.label}</h3>
            <span className="font-mono text-[10px] text-accent-ink sm:text-[11px]">
              {group.skills.length}/{total} UP
            </span>
          </div>

          <div key={active} className="grid grid-cols-1 gap-x-3 gap-y-2 p-4 min-[460px]:grid-cols-2 sm:p-6 md:grid-cols-3 xl:grid-cols-4">
            {ports.map((skill, i) => (
              <div
                key={i}
                tabIndex={skill ? 0 : -1}
                className={`port group flex cursor-default items-center gap-3 rounded-[10px] border border-transparent p-2 outline-none transition-colors ${
                  skill ? "hover:border-line hover:bg-accent/10 focus-visible:bg-accent/10" : "is-empty opacity-40"
                }`}
                style={skill ? { animation: `port-in .35s ease ${i * 0.03}s both` } : undefined}
              >
                <div className="flex shrink-0 flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <span className={`led ${skill ? "" : "off"}`} />
                    <span
                      className={`led ${skill ? "amber" : "off"}`}
                      style={{ animationDelay: `${((i * 37) % 19) / 10}s` }}
                    />
                  </div>
                  <div className="rj45" />
                  <span className="font-mono text-[9px] text-fg/40">Gi0/{i + 1}</span>
                </div>
                <div className="min-w-0">
                  <span
                    className={`block text-[13px] leading-snug font-semibold sm:text-[14px] ${
                      skill ? "text-fg group-hover:text-accent-ink" : "font-mono text-[11px] text-fg/40"
                    }`}
                  >
                    {skill ? skill.name : "— not connected"}
                  </span>
                  {skill?.detail && (
                    <span className="mt-0.5 block font-mono text-[10px] leading-snug text-fg/45">
                      {skill.detail}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="switch-ear hidden w-8 shrink-0 border-l border-line sm:block" />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 03 — Experience: Event Viewer
// ---------------------------------------------------------------------------

function Experience() {
  return (
    <section id="experience" className="px-4 py-[40px] sm:px-5 sm:py-[60px] md:px-10">
      <SectionHeading num="03" cmd={["ps", "Get-WinEvent -LogName Career"]}>
        Experience
      </SectionHeading>

      <Window
        title="Event Viewer › Applications and Services Logs › Career"
        icon="◧"
        status={`${EXPERIENCE.length} events`}
      >
        <div className="hidden grid-cols-[150px_220px_1fr] gap-5 border-b border-line bg-panel-2/60 px-6 py-2.5 font-mono text-[10.5px] tracking-[.08em] text-fg/45 md:grid">
          <span>LEVEL</span>
          <span>DATE AND TIME</span>
          <span>EVENT</span>
        </div>
        {EXPERIENCE.map((e) => {
          const active = e.date.includes("PRESENT");
          return (
            <div
              key={e.title}
              data-reveal
              className="grid grid-cols-1 items-baseline gap-2 border-b border-line px-4 py-6 transition-colors last:border-b-0 hover:bg-accent/[.04] sm:px-6 sm:py-8 md:grid-cols-[150px_220px_1fr] md:gap-5"
            >
              <span
                className={`flex items-center gap-2 font-mono text-[10px] tracking-[.08em] sm:text-[11px] ${
                  active ? "text-accent-ink" : "text-accent-2"
                }`}
              >
                <span
                  className={`grid h-4 w-4 place-items-center rounded-full border text-[9px] ${
                    active ? "border-accent-ink" : "border-accent-2"
                  }`}
                >
                  {active ? "▶" : "i"}
                </span>
                {active ? "Running" : "Information"}
              </span>
              <div className="font-mono text-[10px] text-fg/50 sm:text-xs">
                <div>{e.date}</div>
                <div className="mt-1 text-fg/35">{e.location}</div>
              </div>
              <div>
                <span className="block text-[20px] leading-tight font-semibold sm:text-[26px]">{e.title}</span>
                <span className="mt-1 block font-mono text-[11px] tracking-[.06em] text-accent-ink sm:text-xs">
                  @ {e.company}
                </span>
                <ul className="m-0 mt-4 grid list-none grid-cols-1 gap-x-8 gap-y-2.5 p-0 lg:grid-cols-2">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[13.5px] leading-relaxed text-fg/70 sm:text-[15px]">
                      <span className="mt-[3px] shrink-0 font-mono text-[11px] text-accent-ink">›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </Window>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 04 — Certifications: a certificate store (certmgr.msc). Each certification is
// an X.509-style certificate you can flip to inspect its details & trust chain.
// ---------------------------------------------------------------------------

const CERT_PURPOSES: { key: CertPurpose | "ALL"; label: string; icon: string }[] = [
  { key: "ALL", label: "All purposes", icon: "✱" },
  { key: "IT SUPPORT", label: "IT Support", icon: "⚙" },
  { key: "NETWORKING", label: "Networking", icon: "⇄" },
  { key: "SECURITY", label: "Security", icon: "⛨" },
  { key: "DEVELOPMENT", label: "Development", icon: "</>" },
  { key: "COMPUTER SCIENCE", label: "Computer Science", icon: "🖥" },
  
];

// FNV-1a → deterministic hex, so serials/thumbprints are stable on server & client
function hexHash(input: string, bytes: number) {
  let out = "";
  let h = 0x811c9dc5;
  for (let round = 0; out.length < bytes * 2; round++) {
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i) + round;
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    out += h.toString(16).padStart(8, "0");
  }
  return out.slice(0, bytes * 2).toUpperCase();
}

const pairs = (hex: string) => hex.match(/.{2}/g)?.join(" ") ?? hex;

const initials = (s: string) =>
  s
    .split(/[\s/]+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function Certifications() {
  const [purpose, setPurpose] = useState<CertPurpose | "ALL">("ALL");
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [verified, setVerified] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // "Verify chain of trust" counter that runs once when the section is seen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVerified(CERTIFICATIONS.length);
      return;
    }
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let n = 0;
        timer = window.setInterval(() => {
          n++;
          setVerified(n);
          if (n >= CERTIFICATIONS.length) window.clearInterval(timer);
        }, 170);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const done = verified >= CERTIFICATIONS.length;
  const visible = CERTIFICATIONS.map((c, i) => ({ ...c, i })).filter(
    (c) => purpose === "ALL" || c.purpose === purpose,
  );

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="px-4 py-[40px] sm:px-5 sm:py-[60px] md:px-10"
    >
      <SectionHeading num="04" cmd={["ps", "Get-ChildItem Cert:\\CurrentUser\\My | Test-Certificate"]}>
        Certifications
      </SectionHeading>

      <Window title="certmgr — Certificates - Current User › Personal › Certificates" icon="⚿" status="X.509 v3">
        {/* Verification bar */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line bg-panel-2/60 px-4 py-3 font-mono text-[10.5px] tracking-[.06em] sm:px-6 sm:text-[11.5px]">
          <span className={`flex items-center gap-2 ${done ? "text-accent-ink" : "text-warn"}`}>
            <span
              className={`grid h-4 w-4 place-items-center rounded-full border text-[9px] ${
                done ? "border-accent-ink" : "animate-spin border-warn border-t-transparent"
              }`}
            >
              {done ? "✓" : ""}
            </span>
            {done ? "Chain of trust verified" : "Verifying chain of trust…"}
          </span>
          <div className="h-1.5 min-w-[120px] flex-1 overflow-hidden rounded-full bg-fg/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-2 to-accent transition-[width] duration-200"
              style={{ width: `${(verified / CERTIFICATIONS.length) * 100}%` }}
            />
          </div>
          <span className="tabular-nums text-fg/55">
            {verified}/{CERTIFICATIONS.length} TRUSTED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr]">
          {/* Intended purpose filter — sidebar on desktop, chips on mobile */}
          <aside className="border-b border-line p-4 font-mono text-[11px] sm:p-5 lg:border-r lg:border-b-0">
            <div className="mb-3 text-[10px] tracking-[.1em] text-fg/40">INTENDED PURPOSE</div>
            <div role="tablist" className="flex gap-1.5 overflow-x-auto lg:flex-col lg:overflow-visible">
              {CERT_PURPOSES.map((p) => {
                const count =
                  p.key === "ALL"
                    ? CERTIFICATIONS.length
                    : CERTIFICATIONS.filter((c) => c.purpose === p.key).length;
                const on = purpose === p.key;
                return (
                  <button
                    key={p.key}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setPurpose(p.key)}
                    className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-[8px] border px-3 py-2 text-left tracking-[.04em] transition-colors ${
                      on
                        ? "border-accent bg-accent text-on-accent"
                        : "border-transparent text-fg/65 hover:border-line hover:bg-panel-2"
                    }`}
                  >
                    <span className="w-5 text-center">{p.icon}</span>
                    <span className="flex-1 whitespace-nowrap">{p.label}</span>
                    <span className={on ? "text-on-accent/70" : "text-fg/35"}>{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 hidden rounded-[10px] border border-dashed border-line p-3 text-[10px] leading-relaxed text-fg/45 lg:block">
              <span className="text-accent-ink">tip ›</span> click a certificate to inspect its details and certification path.
            </div>
          </aside>

          {/* Certificate cards */}
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">
            {visible.map((c) => (
              <CertCard
                key={c.title}
                cert={c}
                index={c.i}
                flipped={flipped.has(c.i)}
                trusted={c.i < verified}
                onToggle={() => toggle(c.i)}
              />
            ))}
          </div>
        </div>
      </Window>
    </section>
  );
}

function CertCard({
  cert,
  index,
  flipped,
  trusted,
  onToggle,
}: {
  cert: { title: string; issuer: string; purpose: CertPurpose };
  index: number;
  flipped: boolean;
  trusted: boolean;
  onToggle: () => void;
}) {
  const serial = pairs(hexHash(cert.title + cert.issuer, 8));
  const thumb = pairs(hexHash(cert.issuer + cert.title, 10));
  const icon = CERT_PURPOSES.find((p) => p.key === cert.purpose)?.icon ?? "✱";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-pressed={flipped}
      aria-label={`${cert.title} — ${flipped ? "hide" : "show"} certificate details`}
      className="cert group block h-[280px] w-full cursor-pointer rounded-[14px] text-left outline-none [perspective:1400px] focus-visible:ring-2 focus-visible:ring-accent"
      style={{ animation: `port-in .4s ease ${index * 0.04}s both` }}
    >
      <div
        className={`cert-inner relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(6deg)_rotateX(-3deg)]"
        }`}
      >
        {/* FRONT — the certificate */}
        <div className="cert-face cert-paper absolute inset-0 flex flex-col overflow-hidden rounded-[14px] border border-line p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="font-mono text-[9.5px] leading-relaxed tracking-[.12em] text-fg/45">
              <div>CERTIFICATE · X.509 v3</div>
              <div className="text-accent-2">
                {icon} {cert.purpose}
              </div>
            </div>
            <div className="holo grid h-14 w-14 shrink-0 place-items-center rounded-full">
              <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-panel font-mono text-[12px] font-bold text-fg">
                {initials(cert.issuer)}
              </span>
            </div>
          </div>

          <div className="mt-3 font-mono text-[9.5px] tracking-[.12em] text-fg/40">ISSUED TO</div>
          <div className="text-[13px] font-semibold tracking-[.02em]">Zeyad Mohamed</div>

          <h3 className="mt-3 mb-0 line-clamp-3 text-[19px] leading-[1.18] font-bold tracking-[-.01em] sm:text-[21px]">
            {cert.title}
          </h3>

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-dashed border-line pt-3">
            <div className="min-w-0 font-mono text-[10px] leading-relaxed">
              <div className="text-fg/40">ISSUED BY</div>
              <div className="truncate font-semibold text-fg/80">{cert.issuer}</div>
            </div>
            <span
              className={`flex shrink-0 items-center gap-1.5 rounded-[6px] border px-2 py-1 font-mono text-[9.5px] tracking-[.08em] transition-colors ${
                trusted
                  ? "border-accent-ink/50 bg-accent/10 text-accent-ink"
                  : "border-line text-fg/40"
              }`}
            >
              {trusted ? "✓ TRUSTED" : "… CHECKING"}
            </span>
          </div>
          <span className="pointer-events-none absolute right-3 bottom-[62px] font-mono text-[9px] tracking-[.1em] text-fg/30 opacity-0 transition-opacity group-hover:opacity-100">
            CLICK TO INSPECT ↻
          </span>
        </div>

        {/* BACK — details + certification path */}
        <div className="cert-face absolute inset-0 flex [transform:rotateY(180deg)] flex-col overflow-hidden rounded-[14px] border border-accent-2/50 bg-panel font-mono text-[10px]">
          <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-3 py-2 tracking-[.06em] text-fg/60">
            <span className="text-accent-2">⚿</span> Certificate › Details
            <span className="ml-auto text-fg/35">✕</span>
          </div>
          <dl className="m-0 grid grid-cols-[92px_1fr] gap-x-2 gap-y-1.5 px-3 py-3 leading-snug">
            <dt className="text-fg/40">Version</dt>
            <dd className="m-0">V3</dd>
            <dt className="text-fg/40">Serial</dt>
            <dd className="m-0 break-all">{serial}</dd>
            <dt className="text-fg/40">Signature</dt>
            <dd className="m-0">sha256RSA</dd>
            <dt className="text-fg/40">Subject</dt>
            <dd className="m-0">CN=Zeyad Mohamed, OU=IT</dd>
            <dt className="text-fg/40">Key usage</dt>
            <dd className="m-0 text-accent-2">{cert.purpose}</dd>
            <dt className="text-fg/40">Thumbprint</dt>
            <dd className="m-0 break-all text-fg/70">{thumb}</dd>
          </dl>
          <div className="mt-auto border-t border-line px-3 py-3">
            <div className="mb-1.5 tracking-[.08em] text-fg/40">CERTIFICATION PATH</div>
            <div className="leading-[1.7]">
              <div className="truncate">
                <span className="text-warn">▣</span> {cert.issuer} Root CA
              </div>
              <div className="truncate pl-4">
                <span className="text-fg/35">└</span> <span className="text-accent-2">▣</span> zm.local Issuing CA
              </div>
              <div className="truncate pl-8">
                <span className="text-fg/35">└</span> <span className="text-accent-ink">✓</span>{" "}
                <span className="font-semibold">{cert.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 05 — Currently Enrolled: updates being installed
// ---------------------------------------------------------------------------

function Courses() {
  return (
    <section id="courses" className="px-4 py-[40px] sm:px-5 sm:py-[60px] md:px-10">
      <SectionHeading num="05" cmd={["bash", "sudo apt list --upgradable"]}>
        Currently Enrolled
      </SectionHeading>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {CURRENT_COURSES.map((course, index) => (
          <article
            key={`${course.title}-${index}`}
            data-reveal
            className="win group transition-transform duration-[.3s] hover:-translate-y-1"
          >
            <div className="win-bar">
              <span className="inline-block animate-[spin_3s_linear_infinite] text-accent-ink">⟳</span>
              <span className="truncate">
                Installing update {index + 1} of {CURRENT_COURSES.length}
              </span>
              <span className="ml-auto shrink-0 text-fg/40">{course.provider}</span>
            </div>
            <div className="p-5 sm:p-7 md:p-9">
              <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[.06em] sm:text-[11px]">
                <span className="text-fg/50">PKG-{String(index + 1).padStart(3, "0")}</span>
                <span className="rounded-[6px] bg-accent px-2 py-1 text-on-accent sm:px-3 sm:py-1.5">
                  IN PROGRESS
                </span>
              </div>
              <h3 className="mt-6 mb-2 text-[clamp(20px,3.4vw,36px)] leading-[1.08] font-bold tracking-[-.025em] sm:mt-8 sm:mb-3">
                {course.title}
              </h3>
              <p className="m-0 font-mono text-[10px] tracking-[.06em] text-fg/50 sm:text-[11px]">
                FOCUS — {course.focus}
              </p>
              <div className="mt-6 h-2.5 overflow-hidden rounded-[4px] border border-line bg-fg/10 sm:mt-8">
                <div className="stripes h-full w-1/3 transition-[width] duration-500 group-hover:w-1/2" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 06 — About: radar + terminal
// ---------------------------------------------------------------------------

function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 items-center gap-10 px-4 py-[40px] sm:gap-12 sm:px-5 sm:py-[60px] md:grid-cols-[300px_1fr] md:gap-14 md:px-10"
    >
      <div data-reveal className="radar mx-auto h-[220px] w-[220px] sm:h-[270px] sm:w-[270px] md:mx-0 md:h-[300px] md:w-[300px]">
        <div className="radar-sweep" />
        <div className="absolute inset-[18%] overflow-hidden rounded-full border-2 border-accent shadow-[0_0_30px_color-mix(in_oklab,var(--accent)_35%,transparent)]">
          <ImageSlot
            src={IMAGES.portrait}
            alt="Portrait of Zeyad Mohamed"
            label="Your photo"
            className="rounded-full"
          />
        </div>
        <span className="blip top-[12%] left-[64%]" />
        <span className="blip top-[70%] left-[10%] [animation-delay:.7s]" />
        <span className="blip top-[84%] left-[78%]" />
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[.12em] whitespace-nowrap text-accent-ink">
          HOST: ZEYAD · EGYPT ●
        </span>
      </div>

      <div data-reveal>
        <div className="win">
          <div className="win-bar">
            <span className="text-accent-ink">$</span>
            <span className="truncate">zeyad@srv-01: ~/about</span>
            <div className="win-ctrl">
              <span>─</span>
              <span>▢</span>
              <span>✕</span>
            </div>
          </div>
          <div className="p-5 sm:p-8">
            <div className="font-mono text-[11px] text-fg/55 sm:text-[12px]">
              <span className="text-accent-ink">zeyad@srv-01:~$</span> cat summary.txt
            </div>
            <span className="mt-4 block font-mono text-[10px] text-accent-ink sm:text-xs">06 — ABOUT</span>
            <p className="mt-3 mb-0 max-w-[900px] text-[clamp(18px,2.4vw,28px)] leading-[1.4] font-medium sm:mt-4">
              {PROFILE.summary}
            </p>
            <p className="mt-4 mb-0 max-w-[900px] text-[14px] leading-relaxed text-fg/65 sm:text-[16px]">
              {PROFILE.summaryMore}
            </p>

            <div className="mt-5 font-mono text-[11px] sm:text-[12px]">
              <span className="text-accent-ink">zeyad@srv-01:~$</span>{" "}
              <span className="inline-block h-[1.05em] w-[0.6em] translate-y-[2px] animate-[caret_1s_infinite] bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 07 — Writing: packet capture
// ---------------------------------------------------------------------------

function Blog() {
  const host = (href: string) => {
    try {
      return new URL(href).hostname;
    } catch {
      return "remote";
    }
  };

  return (
    <section id="blog" className="px-4 py-[40px] sm:px-5 sm:py-[60px] md:px-10">
      <SectionHeading num="07" cmd={["bash", "sudo tcpdump -i eth0 port 443"]}>
        Writing
      </SectionHeading>

      <Window title="Capturing from eth0 — blog.pcapng" icon="◉" status={`${POSTS.length} packets`}>
        <div className="hidden grid-cols-[50px_190px_130px_90px_1fr_30px] gap-4 border-b border-line bg-panel-2/60 px-5 py-2.5 font-mono text-[10.5px] tracking-[.08em] text-fg/45 md:grid">
          <span>NO.</span>
          <span>TIME</span>
          <span>SOURCE</span>
          <span>PROTO</span>
          <span>INFO</span>
          <span />
        </div>
        {POSTS.map((p, i) => (
          <a
            key={p.title}
            href={p.href}
            data-reveal
            className="group grid grid-cols-1 items-baseline gap-1 border-b border-line px-4 py-4 transition-colors last:border-b-0 hover:bg-accent hover:text-on-accent sm:px-5 sm:py-6 md:grid-cols-[50px_190px_130px_90px_1fr_30px] md:gap-4"
          >
            <span className="hidden font-mono text-xs text-fg/40 group-hover:text-on-accent/70 md:block">
              {i + 1}
            </span>
            <span className="font-mono text-[10px] text-fg/50 group-hover:text-on-accent/70 sm:text-xs">
              {p.date}
            </span>
            <span className="hidden font-mono text-xs text-fg/50 group-hover:text-on-accent/70 md:block">
              {host(p.href)}
            </span>
            <span className="hidden font-mono text-xs text-accent-2 group-hover:text-on-accent md:block">
              TLSv1.3
            </span>
            <span className="text-[clamp(16px,2.6vw,28px)] font-semibold">{p.title}</span>
            <span className="hidden text-[18px] text-accent-ink group-hover:text-on-accent sm:text-[22px] md:block">
              →
            </span>
          </a>
        ))}
      </Window>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 08 — Contact
// ---------------------------------------------------------------------------

function Contact() {
  const magnetRef = useMagnet<HTMLAnchorElement>();
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 pt-[80px] pb-6 text-center sm:px-5 sm:pt-[120px] sm:pb-10 md:px-10"
    >
      <div aria-hidden className="pointer-events-none absolute top-[40%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[90px]" />

      <div className="relative">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-[10px] tracking-[.1em] text-fg/60 sm:text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          PORT 25 OPEN · AWAITING CONNECTION
        </div>
        <div>
          <span className="font-mono text-[10px] text-accent-ink sm:text-xs">08 — OPEN A TICKET</span>
        </div>
        <div data-reveal className="mt-4 sm:mt-5">
          <a
            href={`mailto:${LINKS.email}`}
            ref={magnetRef}
            className="inline-block text-[clamp(14px,4vw,42px)] font-bold tracking-[-.02em] break-all text-transparent uppercase will-change-transform [-webkit-text-stroke:1.5px_var(--fg)] hover:text-accent-ink hover:[-webkit-text-stroke:1.5px_var(--accent-ink)] sm:[-webkit-text-stroke:2px_var(--fg)] sm:hover:[-webkit-text-stroke:2px_var(--accent-ink)]"
          >
            {LINKS.email}
          </a>
        </div>
        <div className="mt-4 font-mono text-[11px] text-fg/55 sm:text-xs">
          {PROFILE.location}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3 font-mono text-[10px] sm:mt-10 sm:gap-4 sm:text-xs">
          {[
            [LINKS.whatsapp, "WHATSAPP" ],
            [LINKS.linkedin, "LINKEDIN"],
            [LINKS.github, "GITHUB"],
            [LINKS.medium, "MEDIUM"],
          ].map(([href, label]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-[8px] border border-line bg-panel px-4 py-2.5 transition-colors hover:border-accent-ink hover:text-accent-ink"
            >
              <span className="led off group-hover:!bg-accent group-hover:!shadow-[0_0_8px_var(--accent)]" />
              {label}
            </a>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-2 border-t border-line py-4 font-mono text-[10px] text-fg/40 sm:mt-20 sm:py-5 sm:text-[11px]">
          <span>© 2026 ZEYAD MOHAMED</span>
          <span>REFERENCES AVAILABLE ON REQUEST</span>
        </div>
      </div>
    </section>
  );
}

function FloatingCVButton() {
  return (
    <a
      href={LINKS.cv}
      download="Zeyad-Mohamed-IT-CV.pdf"
      className="
        group
        fixed bottom-4 right-4 z-50
        h-12 w-12 sm:h-14 sm:w-14 hover:w-36 sm:hover:w-48
        overflow-hidden
        rounded-[14px]
        bg-accent text-on-accent
        shadow-[0_0_24px_color-mix(in_oklab,var(--accent)_45%,transparent)]
        transition-all duration-300
        animate-[floaty_4s_ease-in-out_infinite]
      "
    >
      <div className="absolute inset-y-0 left-0 flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
        <Download size={20} className="sm:size-[24px]" />
      </div>

      <span className="ml-12 flex h-full items-center font-mono text-[10px] font-semibold whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:ml-14 sm:text-sm">
        Download CV
      </span>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

const PROMPTS: Record<string, { p: string; cls: string }> = {
  ps: { p: "PS C:\\Users\\zeyad>", cls: "text-accent-2" },
  bash: { p: "zeyad@srv-01:~$", cls: "text-accent-ink" },
  ios: { p: "ZM-CORE-SW01#", cls: "text-warn" },
};

function SectionHeading({
  num,
  children,
  cmd,
  className = "mb-6 sm:mb-9",
}: {
  num: string;
  children: ReactNode;
  cmd?: [keyof typeof PROMPTS, string];
  className?: string;
}) {
  return (
    <div className={className}>
      {cmd && (
        <div className="mb-2 truncate font-mono text-[10px] text-fg/50 sm:mb-3 sm:text-[12px]">
          <span className={PROMPTS[cmd[0]].cls}>{PROMPTS[cmd[0]].p}</span> {cmd[1]}
          <span className="ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[2px] animate-[caret_1s_infinite] bg-fg/50" />
        </div>
      )}
      <div className="flex items-baseline gap-3 sm:gap-4">
        <span className="font-mono text-[10px] text-accent-ink sm:text-xs">[{num}]</span>
        <h2 className="m-0 text-[clamp(28px,7vw,88px)] leading-[1] font-bold tracking-[-.02em] uppercase">
          {children}
        </h2>
      </div>
    </div>
  );
}

function Window({
  title,
  icon = "▣",
  status,
  children,
  className = "",
  innerRef,
}: {
  title: string;
  icon?: string;
  status?: string;
  children: ReactNode;
  className?: string;
  innerRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div ref={innerRef} data-reveal className={`win ${className}`}>
      <div className="win-bar">
        <span className="text-accent-ink">{icon}</span>
        <span className="min-w-0 truncate">{title}</span>
        {status && (
          <span className="hidden shrink-0 rounded-[4px] border border-line px-1.5 py-[1px] text-[9.5px] text-fg/45 sm:inline">
            {status}
          </span>
        )}
        <div className="win-ctrl">
          <span>─</span>
          <span>▢</span>
          <span>✕</span>
        </div>
      </div>
      {children}
    </div>
  );
}

function Tag({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`rounded-[6px] border px-2 py-[4px] sm:px-3 sm:py-[5px] ${
        accent ? "border-accent-ink/60 bg-accent/10 text-accent-ink" : "border-line text-fg/75"
      }`}
    >
      {children}
    </span>
  );
}

function StoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-[8px] border border-fg/60 px-3 py-2 transition-colors hover:border-accent hover:bg-accent hover:text-on-accent sm:px-[22px] sm:py-3"
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
          className={fit === "contain" ? "object-contain object-bottom" : "object-cover"}
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
// Motion — reveals, reticle cursor, tilt, magnetic hover.
// Everything here no-ops under prefers-reduced-motion (and the cursor
// also skips touch devices).
// ---------------------------------------------------------------------------

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useReveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
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
            // hand transform back to hover/tilt effects once revealed
            window.setTimeout(() => {
              el.style.transition = "";
              el.style.transform = "";
            }, 750);
          }
        });
      },
      { threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CursorReticle() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarseOnly = window.matchMedia("(pointer: coarse) and (hover: none)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || isCoarseOnly || prefersReducedMotion()) return;

    dot.style.display = "block";
    ring.style.display = "block";

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let rot = 0;
    let hovering = false;

    const onMove = (ev: MouseEvent) => {
      mx = ev.clientX;
      my = ev.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      const target = ev.target as Element | null;
      hovering = !!target?.closest?.("a, button, [data-hover], .port");
      const size = hovering ? 58 : 34;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
    };

    window.addEventListener("mousemove", onMove);

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      rot += hovering ? 2.2 : 0;
      const s = parseFloat(ring.style.width) || 34;
      ring.style.transform = `translate(${rx - s / 2}px, ${ry - s / 2}px) rotate(${hovering ? rot : 0}deg)`;
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
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ transform: "translate(-100px,-100px)", display: "none" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="reticle pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-[1.5px] border-white mix-blend-difference [transition:width_.2s,height_.2s]"
        style={{ width: 34, height: 34, transform: "translate(-100px,-100px)", display: "none" }}
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
      card.style.transform = `perspective(1200px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg)`;
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

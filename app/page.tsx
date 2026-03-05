'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

type ProductStatus = 'live' | 'development' | 'concept';
type RoadmapStatus = 'done' | 'active' | 'planned';

interface Product {
  id: string;
  name: string;
  version: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  route?: string;
  specs?: { key: string; value: string }[];
  featured?: boolean;
}

interface RoadmapItem {
  id: string;
  period: string;
  title: string;
  description: string;
  status: RoadmapStatus;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BRAND = {
  name: 'ie Dynamics',
  tagline: 'Engineering Intelligence',
  email: 'iedynstudio@outlook.com',
  location: 'Turkey — Remote First',
  status: 'Open to Collaboration',
};

const NAV_LINKS = [
  { label: 'Products',   href: '#products' },
  { label: 'Technology', href: '#tech'     },
  { label: 'About',      href: '#about'    },
  { label: 'Roadmap',    href: '#roadmap'  },
  { label: 'Contact',    href: '#contact'  },
];

const PRODUCTS: Product[] = [
  {
    id: 'pitchpro',
    name: 'PitchPro',
    version: 'Version 16.0',
    tagline: 'Football Tactics Board',
    description:
      'A professional-grade football tactics board engineered for coaches, analysts, and tactical thinkers. Draw formations, animate movements, and build complex strategic scenarios with a precision-built toolset designed from the ground up for the modern game.',
    status: 'live',
    route: '/apps/pitchpro',
    specs: [
      { key: 'Category', value: 'Sports Analytics'        },
      { key: 'Platform', value: 'Web — PWA Ready'         },
      { key: 'Stack',    value: 'HTML / CSS / Canvas API' },
      { key: 'Build',    value: 'v16 — Optimized Module'  },
    ],
    featured: true,
  },
  {
    id: 'analytiq',
    name: 'AnalytIQ',
    version: 'v1.0',
    tagline: 'Sports Performance Analytics',
    description:
      'Advanced performance metrics dashboard for sports teams. Data ingestion, visualization, and AI-driven pattern recognition for post-match analysis.',
    status: 'development',
  },
  {
    id: 'simflow',
    name: 'SimFlow',
    version: 'v1.0',
    tagline: 'Process Simulation Engine',
    description:
      'Industrial process simulation and optimization tool. Discrete-event modeling meets intuitive visual programming. Built for industrial engineers by an industrial engineer.',
    status: 'concept',
  },
];

const ROADMAP: RoadmapItem[] = [
  {
    id: 'r1', period: '2024 — Q4',
    title: 'PitchPro v16 — Football Tactics Board',
    description: 'Full-featured football tactics board. Player management, formation drawing, animation system, export functionality. 16 iterations to production quality.',
    status: 'done',
  },
  {
    id: 'r2', period: '2025 — Q1–Q2',
    title: 'ie Dynamics Portal v1.0',
    description: 'Main brand portal. Product showcase, documentation hub, brand identity. Next.js 15, TypeScript, Tailwind CSS, PWA-ready. Google Play compliant.',
    status: 'active',
  },
  {
    id: 'r3', period: '2025 — Q2–Q3',
    title: 'AnalytIQ — Sports Performance Dashboard',
    description: 'Data-driven performance analytics for teams and individual athletes. Video tagging, KPI dashboards, comparative analysis across seasons.',
    status: 'planned',
  },
  {
    id: 'r4', period: '2025 — Q4',
    title: 'SimFlow — Process Simulation Engine',
    description: 'Visual discrete-event simulation for industrial processes. Bottleneck analysis, optimization recommendations.',
    status: 'planned',
  },
  {
    id: 'r5', period: '2026',
    title: 'ORsuite — Operations Research Toolkit',
    description: 'Linear programming, scheduling, supply chain optimization — all in a browser-native interface. Engineering-grade computation, consumer-grade UX.',
    status: 'planned',
  },
];

const TECH_STACK = [
  { name: 'Next.js 15',     role: 'Application Framework', icon: '⬡' },
  { name: 'Tailwind CSS',   role: 'Design System',         icon: '◈' },
  { name: 'TypeScript',     role: 'Type Safety',           icon: '◎' },
  { name: 'Vercel',         role: 'Deployment Platform',   icon: '▲' },
  { name: 'D3.js / Canvas', role: 'Data Visualization',    icon: '⊕' },
  { name: 'Supabase',       role: 'Backend & Database',    icon: '◉' },
  { name: 'Framer Motion',  role: 'Animation Engine',      icon: '⬡' },
  { name: 'Python / Pandas',role: 'Data Processing',       icon: '◧' },
];

const TICKER_ITEMS = [
  'PitchPro v16 ◈ Live',
  'Football Tactics Board ◈ Available Now',
  'ie Dynamics ◈ Engineering Intelligence',
  'Sports Analytics Platform ◈ In Development',
  'Process Simulation Engine ◈ Roadmap 2025',
  'Operations Research Suite ◈ Planned',
];

// ─── Sub-components (all inlined) ─────────────────────────────────────────────

function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="2"  y="2"  width="14" height="14" stroke="#00e87a" strokeWidth="1.5" />
      <rect x="20" y="2"  width="14" height="14" stroke="#00e87a" strokeWidth="1.5" opacity="0.4" />
      <rect x="2"  y="20" width="14" height="14" stroke="#00e87a" strokeWidth="1.5" opacity="0.4" />
      <rect x="20" y="20" width="14" height="14" stroke="#00e87a" strokeWidth="1.5" opacity="0.2" />
      <rect x="8"  y="8"  width="20" height="20" fill="#00e87a" opacity="0.08" />
      <line x1="18" y1="2"  x2="18" y2="34" stroke="#00e87a" strokeWidth="0.5" opacity="0.3" />
      <line x1="2"  y1="18" x2="34" y2="18" stroke="#00e87a" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StatusDot({ label }: { label?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{
        display: 'inline-block', width: '6px', height: '6px',
        borderRadius: '50%', background: '#00e87a',
        boxShadow: '0 0 8px #00e87a',
        animation: 'pulseDot 2s ease-in-out infinite',
      }} />
      {label && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.08em', color: '#4a5568' }}>
          {label}
        </span>
      )}
    </div>
  );
}

function SectionLabel({ text, index }: { text: string; index: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}>
      <span style={{ display: 'block', width: '40px', height: '1px', background: '#00e87a' }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#00e87a' }}>
        {text}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#4a5568', marginLeft: 'auto' }}>
        {index}
      </span>
    </div>
  );
}

const btnBase: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '10px',
  padding: '14px 32px', border: 'none', cursor: 'pointer',
  fontFamily: 'var(--font-head)', fontWeight: 700,
  fontSize: '14px', letterSpacing: '0.04em', textTransform: 'uppercase',
  textDecoration: 'none', transition: 'all 0.2s',
  clipPath: 'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))',
};

const btnPrimary: React.CSSProperties = { ...btnBase, background: '#00e87a', color: '#040507' };
const btnSecondary: React.CSSProperties = { ...btnBase, background: 'transparent', color: '#e8edf4', border: '1px solid rgba(255,255,255,0.12)' };

// ─── Pitch SVG ────────────────────────────────────────────────────────────────

function MiniPitch() {
  const homePositions: [number, number][] = [
    [30,110],[90,65],[90,95],[90,125],[90,155],
    [145,80],[145,110],[145,140],[215,70],[215,110],[215,150],
  ];
  const awayPositions: [number, number][] = [
    [290,110],[235,65],[235,95],[235,125],[235,155],
    [185,80],[185,110],[185,140],[175,110],
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: '#0d2a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,232,122,0.1), transparent 70%)' }} />
      <svg viewBox="0 0 320 220" fill="none" style={{ width: '80%', height: '75%', opacity: 0.6 }}>
        <rect x="10" y="10" width="300" height="200" stroke="rgba(0,232,122,0.5)" strokeWidth="1.5" />
        <line x1="160" y1="10" x2="160" y2="210" stroke="rgba(0,232,122,0.4)" strokeWidth="1" />
        <circle cx="160" cy="110" r="35" stroke="rgba(0,232,122,0.35)" strokeWidth="1" />
        <circle cx="160" cy="110" r="2" fill="rgba(0,232,122,0.7)" />
        <rect x="10" y="60" width="55" height="100" stroke="rgba(0,232,122,0.3)" strokeWidth="1" />
        <rect x="255" y="60" width="55" height="100" stroke="rgba(0,232,122,0.3)" strokeWidth="1" />
        <rect x="10" y="85" width="22" height="50" stroke="rgba(0,232,122,0.25)" strokeWidth="1" />
        <rect x="288" y="85" width="22" height="50" stroke="rgba(0,232,122,0.25)" strokeWidth="1" />
        {homePositions.map(([cx, cy], i) => (
          <circle key={`h${i}`} cx={cx} cy={cy} r="7"
            fill={i === 0 ? 'rgba(0,232,122,0.8)' : 'rgba(0,232,122,0.6)'}
            stroke={i === 0 ? '#00e87a' : 'none'} strokeWidth="1" />
        ))}
        {awayPositions.map(([cx, cy], i) => (
          <circle key={`a${i}`} cx={cx} cy={cy} r="7" fill={`rgba(255,59,59,${i === 0 ? 0.7 : 0.5})`} />
        ))}
        <circle cx="160" cy="110" r="5" fill="white" opacity="0.9" />
      </svg>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled]           = useState(false);
  const [cursorPos, setCursorPos]         = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorHover, setCursorHover]     = useState(false);
  const ringRef  = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef   = useRef<number>(0);

  // Scroll: active section + nav shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      let current = '';
      sections.forEach((s) => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Custom cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const onLeave = () => setCursorVisible(false);
    const onOver  = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest('a, button, [role="button"]');
      setCursorHover(!!el);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);

    const animate = () => {
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPosRef.current.x}px`;
        ringRef.current.style.top  = `${ringPosRef.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const statusCfg = {
    live:        { label: '● Live — Available Now', color: '#00e87a', bg: 'rgba(0,232,122,0.1)',  border: 'rgba(0,232,122,0.2)'  },
    development: { label: '◐ In Development',       color: '#f5a623', bg: 'rgba(245,166,35,0.1)', border: 'rgba(245,166,35,0.2)' },
    concept:     { label: '◎ Concept Phase',         color: '#3d8ef0', bg: 'rgba(61,142,240,0.1)', border: 'rgba(61,142,240,0.2)' },
  };

  const roadmapCfg = {
    done:    { label: '✓ Completed',   color: '#00e87a', bg: 'rgba(0,232,122,0.1)',  dot: '#00e87a', glow: true  },
    active:  { label: '⟳ In Progress', color: '#f5a623', bg: 'rgba(245,166,35,0.1)', dot: '#00e87a', glow: true  },
    planned: { label: '◎ Planned',     color: '#4a5568', bg: 'rgba(255,255,255,0.04)',dot: '#2d3748', glow: false },
  };

  return (
    <>
      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --font-head: 'Syne', sans-serif;
          --font-mono: 'Space Mono', monospace;
          --font-body: 'DM Sans', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: #040507;
          color: #e8edf4;
          font-family: var(--font-body);
          font-weight: 300;
          overflow-x: hidden;
          cursor: none;
          -webkit-font-smoothing: antialiased;
        }

        @media (hover: none) {
          body { cursor: auto; }
          .ie-cursor, .ie-cursor-ring { display: none !important; }
        }

        ::-webkit-scrollbar       { width: 3px; }
        ::-webkit-scrollbar-track { background: #040507; }
        ::-webkit-scrollbar-thumb { background: #00e87a; }
        ::selection               { background: rgba(0,232,122,0.2); }

        @keyframes pulseDot {
          0%,100% { opacity:1; box-shadow: 0 0 8px #00e87a; }
          50%      { opacity:0.5; box-shadow: 0 0 4px #00e87a; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .anim-in   { opacity:0; animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
        .d1 { animation-delay:0.10s; }
        .d2 { animation-delay:0.20s; }
        .d3 { animation-delay:0.35s; }
        .d4 { animation-delay:0.50s; }

        .reveal {
          opacity:0; transform:translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .revealed { opacity:1; transform:translateY(0); }

        .ghost-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.15);
          color: transparent;
        }

        .product-card { transition: background 0.3s; }
        .product-card:hover { background: #121820 !important; }

        .tech-item:hover {
          background: #0d1219 !important;
          border-color: rgba(0,232,122,0.15) !important;
        }

        .nav-link::after {
          content:''; position:absolute; bottom:-4px; left:0; right:0;
          height:1px; background:#00e87a;
          transform:scaleX(0); transition:transform 0.2s;
        }
        .nav-link:hover::after, .nav-link.active::after { transform:scaleX(1); }
        .nav-link:hover { color: #e8edf4 !important; }

        .btn-primary-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 48px rgba(0,232,122,0.3);
        }
        .btn-secondary-hover:hover {
          border-color: rgba(0,232,122,0.4) !important;
          background: rgba(0,232,122,0.05) !important;
        }

        .ticker-track { animation: ticker 25s linear infinite; }

        .section-base {
          position: relative;
          z-index: 2;
          padding: 120px 48px;
        }

        @media (max-width: 768px) {
          .section-base { padding: 80px 24px; }
          .hero-stats, .manifesto-sidebar { display: none !important; }
          .products-grid { grid-template-columns: 1fr !important; }
          .featured-grid { grid-template-columns: 1fr !important; }
          .tech-grid     { grid-template-columns: repeat(2,1fr) !important; }
          .contact-grid  { grid-template-columns: 1fr !important; }
          .manifesto-grid{ grid-template-columns: 1fr !important; }
          .nav-links     { display: none !important; }
        }
      `}</style>

      {/* ── Custom Cursor ── */}
      <div
        className="ie-cursor"
        style={{
          position: 'fixed', zIndex: 9999, pointerEvents: 'none',
          width: cursorHover ? '14px' : '8px',
          height: cursorHover ? '14px' : '8px',
          background: '#00e87a', borderRadius: '50%',
          left: cursorPos.x, top: cursorPos.y,
          transform: 'translate(-50%,-50%)',
          opacity: cursorVisible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
        }}
      />
      <div
        ref={ringRef}
        className="ie-cursor-ring"
        style={{
          position: 'fixed', zIndex: 9998, pointerEvents: 'none',
          width: cursorHover ? '48px' : '32px',
          height: cursorHover ? '48px' : '32px',
          border: '1px solid rgba(0,232,122,0.4)', borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          opacity: cursorVisible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
        }}
      />

      {/* ── Grid Background ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,232,122,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,232,122,0.025) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* ── Noise Overlay ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000, pointerEvents: 'none', opacity: 0.4,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
      }} />

      {/* ════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: scrolled ? 'rgba(4,5,7,0.92)' : 'rgba(4,5,7,0.70)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        transition: 'background 0.3s',
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <LogoMark size={36} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '18px', color: '#00e87a', letterSpacing: '-0.02em' }}>
              ie Dynamics
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4a5568', marginTop: '2px' }}>
              Engineering Intelligence
            </span>
          </div>
        </a>
<ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '40px', listStyle: 'none' }}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a 
                href={l.href}
                className={`nav-link${activeSection === l.href.replace('#','') ? ' active' : ''}`}
                style={{
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '11px',
                  letterSpacing: '0.12em', 
                  textTransform: 'uppercase',
                  textDecoration: 'none', 
                  position: 'relative',
                  color: activeSection === l.href.replace('#','') ? '#e8edf4' : '#4a5568',
                  transition: 'color 0.2s',
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <StatusDot label="Systems Operational" />
      </nav>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '152px 48px 80px', overflow: 'hidden', zIndex: 2 }}>
        {/* Glows */}
        <div style={{ position: 'absolute', top: '-200px', left: '-200px', width: '800px', height: '800px', background: 'radial-gradient(circle,rgba(0,232,122,0.07) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-300px', right: '-100px', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(61,142,240,0.05) 0%,transparent 60%)', pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
          <div className="anim-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '32px', padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00e87a', border: '1px solid rgba(0,232,122,0.2)', background: 'rgba(0,232,122,0.05)', borderRadius: '2px' }}>
            <span>◈</span> Industrial Engineering meets Digital Product <span style={{ opacity: 0.5 }}>— v1.0</span>
          </div>

          <h1 className="anim-in d1" style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(56px,8vw,108px)', lineHeight: '0.92', letterSpacing: '-0.03em', marginBottom: '40px' }}>
            <span style={{ display: 'block' }}>Engineering</span>
            <span style={{ display: 'block' }}>Intelligence</span>
            <span style={{ display: 'block', WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>
              <span style={{ color: '#00e87a', WebkitTextStroke: '0' }}>ie</span>{' '}Dynamics
            </span>
          </h1>

          <p className="anim-in d2" style={{ maxWidth: '560px', fontSize: '16px', lineHeight: '1.7', color: 'rgba(232,237,244,0.6)', marginBottom: '56px' }}>
            A technology brand built at the intersection of industrial engineering and digital product design. We engineer analytical tools that turn complex systems into actionable intelligence.
          </p>

          <div className="anim-in d3" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="#products" style={btnPrimary} className="btn-primary-hover">
              Explore Products <ArrowRight />
            </Link>
            <Link href="#about" style={btnSecondary} className="btn-secondary-hover">
              Our Approach
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats anim-in d4" style={{ position: 'absolute', right: '48px', bottom: '80px', display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 2 }}>
          {[{ num: '01', accent: '.', label: 'Live Product' }, { num: 'v', accent: '16', label: 'Current Build' }, { num: '∞', accent: '', label: 'Possibilities' }].map((s) => (
            <div key={s.label} style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '36px', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {s.num}<span style={{ color: '#00e87a' }}>{s.accent}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4a5568', marginTop: '4px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Radar diagram */}
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '520px', height: '520px', opacity: 0.15, zIndex: 1, pointerEvents: 'none' }}>
          <svg viewBox="0 0 520 520" fill="none">
            {[240, 180, 120, 60].map((r) => <circle key={r} cx="260" cy="260" r={r} stroke="rgba(0,232,122,0.5)" strokeWidth="1" />)}
            <circle cx="260" cy="260" r="8" fill="rgba(0,232,122,0.5)" />
            <line x1="20" y1="260" x2="500" y2="260" stroke="rgba(0,232,122,0.3)" strokeWidth="1" />
            <line x1="260" y1="20" x2="260" y2="500" stroke="rgba(0,232,122,0.3)" strokeWidth="1" />
            <line x1="90" y1="90" x2="430" y2="430" stroke="rgba(0,232,122,0.15)" strokeWidth="1" />
            <line x1="430" y1="90" x2="90" y2="430" stroke="rgba(0,232,122,0.15)" strokeWidth="1" />
            <circle cx="380" cy="140" r="5" fill="rgba(0,232,122,0.6)" />
            <circle cx="140" cy="380" r="5" fill="rgba(0,232,122,0.4)" />
            <circle cx="400" cy="320" r="3" fill="rgba(61,142,240,0.6)" />
            <circle cx="150" cy="180" r="3" fill="rgba(245,166,35,0.6)" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TICKER
      ════════════════════════════════════════════ */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 0', overflow: 'hidden', background: '#080b0f', position: 'relative', zIndex: 2 }}>
        <div className="ticker-track" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 40px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4a5568' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          PRODUCTS
      ════════════════════════════════════════════ */}
      <section id="products" className="section-base" style={{ background: '#080b0f' }}>
        <SectionLabel text="Product Suite" index="01 / 04" />

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(36px,5vw,64px)', lineHeight: '0.95', letterSpacing: '-0.02em' }}>
            Our<br /><span className="ghost-text">Instruments</span>
          </h2>
          <p style={{ maxWidth: '360px', fontSize: '14px', lineHeight: '1.7', color: 'rgba(232,237,244,0.5)' }}>
            Precision-engineered analytical tools. Built for professionals who demand accuracy and depth from their digital workflows.
          </p>
        </div>

        <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
          {PRODUCTS.map((p, idx) => {
            const cfg = statusCfg[p.status];
            if (p.featured) {
              return (
                <div key={p.id} className="product-card reveal featured-grid" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', padding: '48px', background: '#0d1219', border: '1px solid rgba(255,255,255,0.06)', borderTop: '2px solid #00e87a', position: 'relative', overflow: 'hidden' }}>
                  <div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '1px', marginBottom: '24px', background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                      {cfg.label}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '32px', letterSpacing: '-0.02em', marginBottom: '8px' }}>{p.name}</h3>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4a5568', letterSpacing: '0.1em', marginBottom: '20px' }}>{p.version} — {p.tagline}</p>
                    <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(232,237,244,0.55)', marginBottom: '32px' }}>{p.description}</p>
                    {p.specs && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
                        {p.specs.map((s) => (
                          <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>
                            <span style={{ color: '#4a5568', letterSpacing: '0.1em', textTransform: 'uppercase', minWidth: '100px' }}>{s.key}</span>
                            <span style={{ flex: 1, borderTop: '1px dashed rgba(255,255,255,0.12)', marginTop: '1px' }} />
                            <span style={{ color: '#e8edf4', letterSpacing: '0.05em' }}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {p.route && (
                      <Link href={p.route} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#00e87a', textDecoration: 'none' }}>
                        Launch Application <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                  <div style={{ aspectRatio: '4/3', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                    <MiniPitch />
                  </div>
                  <span style={{ position: 'absolute', bottom: '24px', right: '32px', fontFamily: 'var(--font-mono)', fontSize: '72px', fontWeight: 700, color: 'rgba(255,255,255,0.03)', lineHeight: 1, pointerEvents: 'none' }}>0{idx + 1}</span>
                </div>
              );
            }
            const accentColor = p.status === 'development' ? '#f5a623' : '#3d8ef0';
            return (
              <div key={p.id} className="product-card reveal" style={{ padding: '48px', background: '#0d1219', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '1px', marginBottom: '24px', background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                  {cfg.label}
                </span>
                <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '32px', letterSpacing: '-0.02em', marginBottom: '8px' }}>{p.name}</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4a5568', letterSpacing: '0.1em', marginBottom: '20px' }}>{p.version} — {p.tagline}</p>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(232,237,244,0.55)', marginBottom: '32px' }}>{p.description}</p>
                <a href="#roadmap" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: accentColor, textDecoration: 'none' }}>
                  View Roadmap <ArrowRight size={16} />
                </a>
                <span style={{ position: 'absolute', bottom: '24px', right: '32px', fontFamily: 'var(--font-mono)', fontSize: '72px', fontWeight: 700, color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>0{idx + 1}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TECH STACK
      ════════════════════════════════════════════ */}
      <section id="tech" className="section-base" style={{ background: '#040507', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <SectionLabel text="Technology Stack" index="02 / 04" />
        <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(36px,5vw,64px)', lineHeight: '0.95', letterSpacing: '-0.02em', marginBottom: '64px' }}>
          Built with<br /><span className="ghost-text">Precision</span>
        </h2>
        <div className="tech-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2px' }}>
          {TECH_STACK.map((t) => (
            <div key={t.name} className="tech-item reveal" style={{ padding: '32px', border: '1px solid rgba(255,255,255,0.06)', background: '#080b0f', display: 'flex', flexDirection: 'column', gap: '12px', transition: 'background 0.2s, border-color 0.2s' }}>
              <span style={{ fontSize: '24px', opacity: 0.8 }}>{t.icon}</span>
              <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '16px' }}>{t.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4a5568' }}>{t.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MANIFESTO / ABOUT
      ════════════════════════════════════════════ */}
      <section id="about" className="section-base" style={{ background: '#0d1219' }}>
        <SectionLabel text="About ie Dynamics" index="03 / 04" />
        <div className="manifesto-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>

          <div className="manifesto-sidebar" style={{ position: 'sticky', top: '100px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '120px', fontWeight: 700, color: 'rgba(0,232,122,0.06)', lineHeight: 1, marginBottom: '-20px' }}>∫</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,#00e87a,#3d8ef0)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '14px', color: '#040507' }}>IE</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '14px' }}>Founder, ie Dynamics</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4a5568', marginTop: '2px' }}>Industrial Engineering Candidate</div>
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(32px,4vw,56px)', lineHeight: '1.0', letterSpacing: '-0.02em', marginBottom: '40px' }}>
              Where Engineering<br />Meets Product.
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.9', color: 'rgba(232,237,244,0.6)', marginBottom: '24px' }}>
              <strong style={{ color: '#e8edf4', fontWeight: 500 }}>ie Dynamics was born from a simple observation:</strong> the tools engineers and analysts use every day are either too generic or too complex. There is a gap between what spreadsheets can offer and what a real analytical platform should deliver.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.9', color: 'rgba(232,237,244,0.6)', marginBottom: '24px' }}>
              We sit at the intersection of <strong style={{ color: '#e8edf4', fontWeight: 500 }}>industrial engineering methodology</strong> and modern web product design. Every tool we build is grounded in rigorous systems thinking — then delivered through interfaces that feel native, fast, and intuitive.
            </p>
            <blockquote style={{ borderLeft: '2px solid #00e87a', padding: '24px 32px', background: 'rgba(0,232,122,0.04)', margin: '40px 0' }}>
              <p style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '20px', lineHeight: '1.5' }}>
                &quot;The best analytical tool is one you forget you&apos;re using — because it thinks the way you think.&quot;
              </p>
            </blockquote>
            <p style={{ fontSize: '15px', lineHeight: '1.9', color: 'rgba(232,237,244,0.6)' }}>
              What comes next is bigger: <strong style={{ color: '#e8edf4', fontWeight: 500 }}>sports analytics platforms, industrial simulation engines, operations research suites</strong> — all sharing the same design DNA and engineering-first philosophy.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ROADMAP
      ════════════════════════════════════════════ */}
      <section id="roadmap" className="section-base" style={{ background: '#040507' }}>
        <SectionLabel text="Development Roadmap" index="04 / 04" />
        <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(36px,5vw,64px)', lineHeight: '0.95', letterSpacing: '-0.02em', marginBottom: '64px' }}>
          What&apos;s<br /><span className="ghost-text">Coming</span>
        </h2>
        <div style={{ position: 'relative', paddingLeft: '40px', borderLeft: '1px solid #00e87a' }}>
          {ROADMAP.map((item) => {
            const cfg = roadmapCfg[item.status];
            return (
              <div key={item.id} className="reveal" style={{ position: 'relative', paddingBottom: '56px' }}>
                <span style={{ position: 'absolute', left: '-44px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: cfg.dot, boxShadow: cfg.glow ? '0 0 16px rgba(0,232,122,0.5)' : 'none', display: 'inline-block' }} />
                <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '1px', marginBottom: '12px', background: cfg.bg, color: cfg.color }}>
                  {cfg.label}
                </span>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4a5568', marginBottom: '10px' }}>{item.period}</p>
                <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(232,237,244,0.5)', lineHeight: '1.6', maxWidth: '500px' }}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CONTACT / CTA
      ════════════════════════════════════════════ */}
      <section id="contact" className="section-base" style={{ background: '#080b0f', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(40px,6vw,80px)', letterSpacing: '-0.03em', lineHeight: '0.95', marginBottom: '24px' }}>
            Let&apos;s Build<br />Something <span style={{ color: '#00e87a' }}>Real.</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(232,237,244,0.5)', marginBottom: '48px', lineHeight: '1.7' }}>
            Interested in collaborating, investing, or just want to follow the journey? ie Dynamics is an open project — every product ships publicly.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`mailto:${BRAND.email}`} style={btnPrimary} className="btn-primary-hover">
              Get in Touch <ArrowRight />
            </a>
            <a href="#products" style={btnSecondary} className="btn-secondary-hover">
              Explore Products
            </a>
          </div>
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', marginTop: '64px', textAlign: 'left' }}>
            {[{ type: 'Email', value: BRAND.email }, { type: 'Status', value: BRAND.status }, { type: 'Location', value: BRAND.location }].map((c) => (
              <div key={c.type} className="reveal" style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.06)', background: '#0d1219' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4a5568', marginBottom: '8px' }}>{c.type}</p>
                <p style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '15px' }}>
                  {c.type === 'Email'
                    ? <a href={`mailto:${c.value}`} style={{ color: '#e8edf4', textDecoration: 'none' }}>{c.value}</a>
                    : c.value
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      {/* 6. FOOTER */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-[#040507] flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
          <span>© 2026 IE DYNAMICS — <span className="text-[#00e87a]">SYSTEMS OPERATIONAL</span></span>
          {/* YENİ EKLENEN LİNK BURADA: */}
          <a href="/privacy.html" target="_blank" className="hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5">
            Privacy Policy
          </a>
        </div>
        
        <div className="flex gap-8">
           <a href="#" className="text-gray-600 hover:text-white transition-colors"><Globe size={16}/></a>
           <a href="#" className="text-gray-600 hover:text-white transition-colors"><Menu size={16}/></a>
        </div>
      </footer>
    </>
  );
}
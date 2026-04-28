"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { Star } from "lucide-react";
import { FadeUp } from "@/components/ui/animate";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  stars: number;
  initials: string;
  avatarBg: string;
  metric: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ryan B.",
    role: "CEO",
    company: "NovaTech SaaS",
    quote:
      "VirtualPersonal.ai matched us with an EA who completely transformed how I operate. Calendar, inbox, travel — all handled. I gained back 40 hours a week and finally focus on strategy.",
    stars: 4,
    initials: "RB",
    avatarBg: "bg-teal-500",
    metric: "40 hrs/wk saved",
  },
  {
    name: "Sophie L.",
    role: "COO",
    company: "Luminos Commerce",
    quote:
      "The bookkeeper they placed found $23K in billing errors in her very first month. The ROI on our investment has been extraordinary — we hired two more VAs within 60 days.",
    stars: 5,
    initials: "SL",
    avatarBg: "bg-purple-500",
    metric: "$23K recovered, month 1",
  },
  {
    name: "Tom N.",
    role: "Founder",
    company: "ScaleCraft Agency",
    quote:
      "We scaled from a 3-person team to 18 virtual professionals in under 8 months — every single placement has been exceptional. Our secret competitive weapon.",
    stars: 5,
    initials: "TN",
    avatarBg: "bg-amber-500",
    metric: "15 VAs placed",
  },
  {
    name: "Clara P.",
    role: "Managing Director",
    company: "Meridian Capital",
    quote:
      "Our EA handles investor communications, due diligence scheduling, and portfolio updates flawlessly. We couldn't scale our deal flow without her. Worth every penny.",
    stars: 5,
    initials: "CP",
    avatarBg: "bg-indigo-500",
    metric: "3× deal velocity",
  },
  {
    name: "Kate H.",
    role: "Head of Growth",
    company: "PulseMedia",
    quote:
      "Our Social Media Manager doubled engagement across all channels in 60 days. The vetting process is genuinely rigorous — she hit the ground running from day one.",
    stars: 4,
    initials: "KH",
    avatarBg: "bg-pink-500",
    metric: "2× engagement in 60 days",
  },
  {
    name: "Nico V.",
    role: "CTO",
    company: "DevBridge Labs",
    quote:
      "Found a full-stack dev who integrated into our team seamlessly. The technical screening saved us months of interviewing. The quality bar here is genuinely different.",
    stars: 5,
    initials: "NV",
    avatarBg: "bg-blue-500",
    metric: "6 months hiring time saved",
  },
  {
    name: "Elena F.",
    role: "Founder",
    company: "Arbor Health",
    quote:
      "Our customer support VA handles 200+ tickets per week with a 98% satisfaction rate. As a small team this changed everything — we could finally focus on growth.",
    stars: 5,
    initials: "EF",
    avatarBg: "bg-green-500",
    metric: "98% CSAT score",
  },
  {
    name: "Marcus D.",
    role: "CEO",
    company: "Stratio Finance",
    quote:
      "The matching speed was incredible. Within 48 hours I had three shortlisted candidates — all strong fits. We chose one and she started the following Monday. Truly seamless.",
    stars: 4,
    initials: "MD",
    avatarBg: "bg-orange-500",
    metric: "48-hr turnaround",
  },
];

/* ── Stars ─────────────────────────────────────────────────────────── */
function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${
            n <= count
              ? "fill-amber-400 text-amber-400"
              : "fill-neutral-200 text-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Card ──────────────────────────────────────────────────────────── */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow:
          "0 28px 60px -12px rgba(0,0,0,0.55), 0 0 0 2px rgba(20,184,166,0.35)",
      }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="flex w-[320px] flex-shrink-0 flex-col gap-4 rounded-2xl bg-white p-6 cursor-default
                 shadow-[0_8px_36px_-8px_rgba(0,0,0,0.32)]"
    >
      <StarRow count={t.stars} />

      <p className="flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-4">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
        <div className="flex items-center gap-3">
          <div
            className={`h-9 w-9 flex-shrink-0 rounded-full ${t.avatarBg}
                        flex items-center justify-center text-xs font-bold text-white`}
          >
            {t.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
            <p className="text-xs text-neutral-500">{t.role} · {t.company}</p>
          </div>
        </div>
        <div className="ml-3 flex-shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 ring-1 ring-emerald-100">
          <span className="text-[10px] font-semibold text-emerald-700 whitespace-nowrap">
            {t.metric}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Infinite scroll track ─────────────────────────────────────────── */
function InfiniteTrack({
  items,
  direction,
  speed = 32,
}: {
  items: Testimonial[];
  direction: "left" | "right";
  speed?: number;
}) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const x         = useMotionValue(0);
  const pausedRef = useRef(false);
  const initRef   = useRef(false);

  useAnimationFrame((_, delta) => {
    if (pausedRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return;

    // Initialise right-direction tracks at -halfWidth so they begin mid-stream
    if (!initRef.current) {
      if (direction === "right") x.set(-halfWidth);
      initRef.current = true;
    }

    const step = (direction === "left" ? -1 : 1) * speed * (delta / 1000);
    let nx = x.get() + step;

    // Seamless loop boundary
    if (direction === "left"  && nx <= -halfWidth) nx += halfWidth;
    if (direction === "right" && nx >= 0)          nx -= halfWidth;

    x.set(nx);
  });

  // Subtle edge fade so cards gracefully appear/disappear at viewport edges
  const edgeMask =
    "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)";

  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: edgeMask, WebkitMaskImage: edgeMask }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <motion.div
        ref={trackRef}
        className="flex w-max gap-6 py-3"
        style={{ x, willChange: "transform" }}
      >
        {/* Duplicate set A + set B for seamless loop */}
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────────────── */
export function TestimonialsScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden py-28 lg:py-36"
    >
      {/* ── Background: professional business conference / leadership summit ──
           photo-1523580494863-6f3031224c94 — modern auditorium: professional
           speaker at a brightly lit stage, business audience in tiered seating,
           elegant convention centre interior.

           inset-[-10%] pre-expands the div so at ±8% parallax travel and the
           4px blur halation never expose a raw white edge.
           brightness(0.80) pre-darkens so the overlay stays thin and the
           conference scene remains clearly recognisable.                      */}
      <motion.div
        aria-hidden
        className="absolute inset-[-10%] bg-cover bg-center"
        style={{
          y: bgY,
          willChange: "transform",
          backgroundImage:
            'url("https://images.unsplash.com/photo-1523580494863-6f3031224c94' +
            '?auto=format&fit=crop&w=2560&q=85")',
          filter: "blur(4px) brightness(0.80)",
        }}
      />

      {/* Dark navy overlay — 40% keeps contrast without killing the scene */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(8, 14, 28, 0.40)" }}
      />

      {/* Radial vignette — draws the eye toward the card tracks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 140% 120% at 50% 50%, transparent 30%, rgba(8,14,28,0.60) 100%)",
        }}
      />

      {/* Teal brand glow — bottom-left atmospheric accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 2% 98%, rgba(20,184,166,0.14) 0%, transparent 65%)",
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative">

        {/* Centred header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <FadeUp className="mb-14 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-px w-10 bg-gold" />
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Success Stories
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Trusted by leaders worldwide
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/60">
              Join 200+ businesses that found exceptional talent through
              VirtualPersonal.ai.
            </p>
          </FadeUp>
        </div>

        {/* Full-width scroll tracks — not capped by max-w so cards fill the viewport */}
        <div className="flex flex-col gap-6">
          <InfiniteTrack items={TESTIMONIALS} direction="left"  speed={34} />
          <InfiniteTrack items={TESTIMONIALS} direction="right" speed={27} />
        </div>
      </div>
    </section>
  );
}

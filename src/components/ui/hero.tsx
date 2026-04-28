"use client";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";

const teamAvatars = [
  { initials: "JD", src: "https://res.cloudinary.com/doonkheo8/image/upload/v1770279333/a1.jpg" },
  { initials: "HJ", src: "https://res.cloudinary.com/doonkheo8/image/upload/v1770279333/a2.jpg" },
  { initials: "PI", src: "https://res.cloudinary.com/doonkheo8/image/upload/v1770279333/a3.jpg" },
  { initials: "KD", src: "https://res.cloudinary.com/doonkheo8/image/upload/v1770279333/a4.jpg" },
  { initials: "LD", src: "https://res.cloudinary.com/doonkheo8/image/upload/v1770279333/a5.jpg" },
];

const stats = [
  { emoji: "🚀", label: "IN CLIENT REVENUE GENERATED", value: "$5M+" },
  { emoji: "📈", label: "BUSINESSES LAUNCHED",          value: "200+" },
  { emoji: "💰", label: "SAVED IN OPERATIONAL COSTS",   value: "$500K+" },
];

function AvatarStack() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {teamAvatars.map((member, i) => (
          <Avatar
            key={member.initials}
            className="size-12 border-2 border-white/30 bg-navy-900 ring-1 ring-white/10"
            style={{ zIndex: teamAvatars.length - i }}
          >
            <AvatarImage alt={`Team member ${i + 1}`} src={member.src} />
            <AvatarFallback className="bg-navy-800 text-white text-xs font-medium">
              {member.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">200+ businesses trust us</p>
        <p className="text-xs text-white/60">Join the elite network</p>
      </div>
    </div>
  );
}

function StatsMarquee() {
  return (
    <Marquee
      className="border-white/10 border-y bg-navy-900/40 py-2.5 backdrop-blur-sm [--duration:35s] [--gap:3rem]"
      pauseOnHover
      repeat={4}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-4 whitespace-nowrap">
          <span className="font-bold font-mono text-primary text-base tracking-wide">
            {stat.value}
          </span>
          <span className="text-xs font-medium font-mono text-white/50 uppercase tracking-[0.2em]">
            {stat.label}
          </span>
          <span className="text-sm text-white/40">·</span>
        </div>
      ))}
    </Marquee>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-start justify-end overflow-hidden">
      {/* Cinematic Ken Burns background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-[-5%] bg-center bg-cover animate-kenburns will-change-transform"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2560&q=90")',
          }}
        />
      </div>
      {/* Navy overlay — richer than plain black */}
      <div className="absolute inset-0 bg-navy-900/65" />
      {/* Teal radial glow — atmospheric depth at bottom-left */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 90%, rgba(20,184,166,0.18) 0%, transparent 70%)",
        }}
      />
      {/* Dot-grid overlay — subtle texture */}
      <div aria-hidden className="absolute inset-0 bg-dots opacity-30" />
      {/* Bottom vignette for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-900/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Avatar + stats band */}
        <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-8 lg:px-12">
          <AvatarStack />
        </div>
        <StatsMarquee />

        {/* Main copy */}
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end">
            <div className="w-full space-y-6 sm:w-3/5">
              {/* Eyebrow pill badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                  Elite VA Recruitment · Since 2020
                </span>
              </div>
              {/* Headline */}
              <h1 className="font-display font-bold text-white leading-[1.04] tracking-tight
                             text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                We{" "}
                <span className="italic text-primary">think</span>
                , you{" "}
                <span className="italic text-primary">grow</span>
                <br />
                <span className="text-white/90">— that&apos;s the deal</span>
                <span className="sr-only"> — Elite Virtual Assistant Recruiting Agency. Hire the top 1% of vetted remote professionals with AI-powered matching.</span>
              </h1>
              <Button
                className="group rounded-none py-0 pr-0 text-[#0B1D35] font-medium text-lg
                           shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
                Post a Job
                <span className="ml-3 border-l border-neutral-400/40 p-3 transition-colors
                                 group-hover:border-neutral-400/60">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
            </div>

            <div className="w-full sm:w-2/5">
              <p className="text-base text-primary/90 italic leading-relaxed sm:text-right md:text-xl lg:text-2xl">
                We connect ambitious businesses with the top 1% of vetted virtual professionals.
                Smarter matching, dedicated talent, real results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, BookOpen, X, Calendar, User } from "lucide-react";
import { FadeUp } from "@/components/ui/animate";

// ─── Article content ──────────────────────────────────────────────────────────

interface Article {
  category: string;
  categoryColor: string;
  categoryBg: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  accentColor: string;
  author: string;
  authorRole: string;
  body: React.ReactNode;
}

const ARTICLES: Article[] = [
  {
    category: "Hiring Tips",
    categoryColor: "text-teal-700",
    categoryBg: "bg-teal-50 ring-1 ring-teal-100",
    title: "5 Questions You Must Ask Before Hiring a Virtual Assistant",
    excerpt:
      "Most founders hire their first VA backwards — they post a job, interview whoever applies, and hope for the best. Here's the framework that changes everything.",
    readTime: "4 min read",
    date: "Apr 2, 2025",
    accentColor: "bg-teal-500",
    author: "Sarah Chen",
    authorRole: "Senior Talent Advisor, VirtualPersonal.ai",
    body: (
      <div className="space-y-5 text-neutral-700 leading-relaxed">
        <p>
          I've placed hundreds of virtual assistants over the past five years. And if
          I'm honest, the hires that go wrong almost never fail because the VA wasn't
          skilled. They fail because the founder didn't know what they actually needed
          — or didn't know how to find out.
        </p>
        <p>
          So before you post a job listing, before you scroll through profiles, before
          you do anything — sit down and answer these five questions. They'll save you
          weeks of frustration.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          1. What would I do if this task disappeared from my plate today?
        </h3>
        <p>
          Don't start with a job description. Start with relief. What's the one thing
          you dread opening your inbox for? What task do you find yourself pushing to
          Friday — every single week — because you just don't want to deal with it?
          That's where your VA should start. Not with a list of ten things. One thing,
          done brilliantly.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          2. Am I hiring for skills or for thinking?
        </h3>
        <p>
          These require different people. A VA who executes tasks flawlessly from a
          checklist is incredibly valuable. So is a VA who can look at your calendar and
          proactively see that you have a conflict three weeks out. They're not the same
          person, and they won't thrive in the same environment. Know which one you need.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          3. How much context am I willing to give?
        </h3>
        <p>
          Be honest here. Some founders hand off work with three bullet points and
          never look back. Others want to review every email draft, every scheduled
          post, every invoice before it goes out. Neither is wrong — but your VA needs
          to match your style. A VA who thrives with autonomy will feel micromanaged
          and disengage. A VA who wants guidance will flounder with ambiguity.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          4. What does good look like in 90 days?
        </h3>
        <p>
          If you can't describe success, you can't hire for it. Write one paragraph —
          not a job description, just a paragraph — describing what your work life
          looks like three months from now if this hire goes perfectly. What's off your
          plate? What's running on autopilot? What are you spending your freed-up time
          doing? This paragraph becomes your north star for the entire hiring process.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          5. Would I trust this person to represent me?
        </h3>
        <p>
          Sooner or later, your VA will be responding to clients, vendors, or partners
          on your behalf. A late reply from them is a late reply from you. An unclear
          message from them is an unclear message from you. Hire someone whose judgment
          you'd trust even when you're not watching. If you have any hesitation after the
          first interview, trust it.
        </p>

        <div className="mt-8 rounded-xl bg-teal-50 p-5 ring-1 ring-teal-100">
          <p className="text-sm font-semibold text-teal-800 mb-1">One last thing.</p>
          <p className="text-sm text-teal-700">
            The best VA relationship I've ever seen started because a founder was
            radically honest in the interview — about what was messy, what had failed
            before, and what they were bad at delegating. That honesty built immediate
            trust. The VA knew exactly what she was walking into, and she thrived.
            Transparency isn't a weakness in a hiring conversation. It's your biggest
            asset.
          </p>
        </div>
      </div>
    ),
  },
  {
    category: "Productivity",
    categoryColor: "text-indigo-700",
    categoryBg: "bg-indigo-50 ring-1 ring-indigo-100",
    title: "How Executive Assistants Save Founders 30+ Hours Per Week",
    excerpt:
      "The right EA doesn't just manage your calendar — they create real leverage. We analysed 50 placements and found exactly where the time savings come from.",
    readTime: "6 min read",
    date: "Mar 28, 2025",
    accentColor: "bg-indigo-500",
    author: "Marcus Reid",
    authorRole: "Head of Client Success, VirtualPersonal.ai",
    body: (
      <div className="space-y-5 text-neutral-700 leading-relaxed">
        <p>
          Last quarter, we tracked time savings across 50 of our executive assistant
          placements. We asked founders to log, for four weeks, every task they handed
          off and how long it used to take them. The results surprised even us.
        </p>
        <p>
          The average founder reclaimed <strong className="text-neutral-900">34 hours per week</strong>.
          Not from doing less — from doing less of the wrong things.
        </p>
        <p>
          Here's where those hours actually came from.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          Inbox management: 8–12 hours/week
        </h3>
        <p>
          This is consistently the biggest win. Most founders are managing 200–400
          emails a day. An EA doesn't just delete spam — she triages, drafts replies,
          flags what genuinely needs your attention, and archives the rest. One of our
          clients, a fintech CEO, told us he went from spending two hours on email before
          breakfast to spending twenty minutes reviewing his EA's flagged items. He
          called it "the single biggest quality-of-life change" of the past five years.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          Calendar and scheduling: 4–6 hours/week
        </h3>
        <p>
          Scheduling sounds simple until you realise how much cognitive load it carries.
          Every "Does Tuesday at 3pm work for you?" email requires you to context-switch,
          check your calendar, consider your energy levels, and respond. Multiply that
          by fifteen meetings a week. An EA who owns your calendar doesn't just book
          meetings — she protects your deep work blocks, batches calls strategically,
          and says no on your behalf without it feeling personal.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          Travel and logistics: 3–5 hours/week
        </h3>
        <p>
          Flights, hotels, ground transport, itineraries, expense reports. These tasks
          are time-consuming but require almost no founder-level judgment. One of our
          clients flew internationally eight times last quarter. His EA handled every
          booking, managed three flight changes, and had a printed itinerary in his
          inbox the night before every trip. He estimated he saved six hours per trip.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          Investor and stakeholder comms: 4–8 hours/week
        </h3>
        <p>
          Preparing board updates, drafting investor replies, compiling portfolio
          summaries — this is high-stakes work that benefits enormously from a skilled
          EA who understands your voice and priorities. Several of our EA placements
          now draft the first version of every investor update. The founder reviews and
          edits. What used to take four hours takes forty-five minutes.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          The invisible hours: research and ops
        </h3>
        <p>
          Vendor comparisons, software research, meeting prep briefs, CRM updates,
          expense reconciliation — none of these feel like much individually. Together
          they can consume half a founder's week. An EA absorbs all of it.
        </p>

        <div className="mt-8 rounded-xl bg-indigo-50 p-5 ring-1 ring-indigo-100">
          <p className="text-sm font-semibold text-indigo-800 mb-2">The real ROI</p>
          <p className="text-sm text-indigo-700">
            At $2,000–$3,500/month for a world-class EA, the maths aren't complicated.
            If you bill at $500/hour and she saves you 30 hours a week, the leverage is
            extraordinary. But the founders who feel this most aren't the ones counting
            hours — they're the ones who can finally think clearly again.
          </p>
        </div>
      </div>
    ),
  },
  {
    category: "Remote Teams",
    categoryColor: "text-amber-700",
    categoryBg: "bg-amber-50 ring-1 ring-amber-100",
    title: "Building a High-Performance VA Team: A Founder's Playbook",
    excerpt:
      "Scaling from 1 VA to a 10-person virtual team is a completely different game. Here's the exact process one of our clients used to do it in 6 months.",
    readTime: "8 min read",
    date: "Mar 15, 2025",
    accentColor: "bg-amber-500",
    author: "Priya Menon",
    authorRole: "Growth Partnerships Lead, VirtualPersonal.ai",
    body: (
      <div className="space-y-5 text-neutral-700 leading-relaxed">
        <p>
          Tom hired his first VA through us in January. By June, he had eleven. His
          agency went from three full-time employees to a lean, powerful team of
          fourteen — twelve of whom were virtual professionals placed through
          VirtualPersonal.ai.
        </p>
        <p>
          I worked closely with Tom throughout that growth. What follows is essentially
          the playbook we built together — with his blessing to share it.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          Month 1–2: Nail one before adding another
        </h3>
        <p>
          Tom's first instinct was to hire three VAs simultaneously. We talked him out
          of it. Not because the cost was an issue — because the onboarding would have
          been chaos. His first hire, an executive assistant named Reya, got his full
          attention for two months. He documented how she worked. He identified where
          she needed more context. He built SOPs alongside her, not before her.
        </p>
        <p>
          By month two, Reya was running autonomously. That meant Tom had the bandwidth
          — and the systems — to bring someone else on.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          Month 3: Build the communication rhythm
        </h3>
        <p>
          When you have one VA, you can manage communication loosely. When you have
          four, you need structure. Tom implemented a simple weekly rhythm: a Monday
          async check-in (written, not a call), a Friday wrap-up, and a shared task
          board that everyone could see. Nothing complicated. But it meant that no one
          was waiting for Tom to reply before they could move forward.
        </p>
        <p>
          He also made one rule that transformed the team's culture: every team member
          had permission to flag a problem proactively, without waiting to be asked.
          That psychological safety made his remote team more reliable than most
          in-office teams I've worked with.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          Month 4–5: Identify your lead VA
        </h3>
        <p>
          One of Tom's team members — a project coordinator named Jonas — had a natural
          ability to coordinate between other VAs, spot blockers, and keep work moving
          without escalating everything to Tom. We helped Tom formalise this: Jonas
          became the team's operational lead. He ran the Monday check-ins. He flagged
          anything that needed Tom's attention.
        </p>
        <p>
          This single change reduced Tom's day-to-day management load by about 60%.
          He went from managing eleven people to managing one — who managed the rest.
        </p>

        <h3 className="font-display text-lg font-semibold text-neutral-900 pt-2">
          Month 6: Systematise everything you do more than once
        </h3>
        <p>
          The final piece was documentation. Every repeatable process — client
          onboarding, content calendar management, invoicing, weekly reporting — got
          a Loom walkthrough and a written SOP. Not elaborate ones. Just enough that
          a new VA could get to 80% competency in their first week.
        </p>
        <p>
          When Tom brought his eleventh hire on, the onboarding took three days instead
          of three weeks. The team absorbed her. She was contributing meaningfully by
          day five.
        </p>

        <div className="mt-8 rounded-xl bg-amber-50 p-5 ring-1 ring-amber-100">
          <p className="text-sm font-semibold text-amber-800 mb-2">What made this work</p>
          <p className="text-sm text-amber-700">
            Tom didn't scale fast. He scaled deliberately. Each new hire came after the
            previous one was running smoothly — not before. He invested in relationships,
            not just resources. Every single person on his team knew they were valued,
            knew what good looked like, and knew Tom would support them if something
            went wrong. That's not a process. That's leadership. And it travels just as
            well over Slack as it does across a conference room table.
          </p>
        </div>
      </div>
    ),
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function GoldLine() {
  return <div className="h-px w-10 bg-gold" />;
}

// ─── Article modal ────────────────────────────────────────────────────────────

function ArticleModal({
  article,
  onClose,
}: {
  article: Article | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {article && (
        <motion.div
          key="article-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 modal-backdrop"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 flex w-full max-w-2xl flex-col rounded-2xl bg-white
                       shadow-[0_32px_80px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/8"
            style={{ maxHeight: "90vh" }}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* ── Sticky header ─────────────────────────────────── */}
            <div className="flex-shrink-0 border-b border-neutral-100 px-7 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${article.categoryColor} ${article.categoryBg}`}>
                    {article.category}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-bold leading-snug text-neutral-900 sm:text-2xl">
                    {article.title}
                  </h2>
                  {/* Author + meta */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <User className="h-3 w-3 flex-shrink-0" />
                      <span className="font-medium text-neutral-700">{article.author}</span>
                      <span className="text-neutral-400">· {article.authorRole}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full
                             text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
                  aria-label="Close article"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── Scrollable body ───────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-7 py-6 text-[15px]">
              {article.body}
            </div>

            {/* ── Sticky footer ─────────────────────────────────── */}
            <div className="flex-shrink-0 border-t border-neutral-100 px-7 py-4">
              <button
                onClick={onClose}
                className="w-full rounded-full bg-neutral-900 py-2.5 text-sm font-semibold
                           text-white transition-colors hover:bg-neutral-800"
              >
                Close article
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Article card ─────────────────────────────────────────────────────────────

function ArticleCard({
  a,
  index,
  onOpen,
}: {
  a: Article;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.42, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -7, boxShadow: "0 24px 52px -8px rgba(0,0,0,0.11)" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl
                 border border-neutral-100 bg-white shadow-sm cursor-default"
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 h-full w-1 ${a.accentColor} rounded-l-2xl`} />

      <div className="flex flex-1 flex-col gap-5 p-7 pl-9">

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${a.categoryColor} ${a.categoryBg}`}>
            {a.category}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-neutral-400">
            <Clock className="h-3 w-3 flex-shrink-0" />
            {a.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-[18px] font-semibold leading-snug text-neutral-900
                       transition-colors duration-200 group-hover:text-primary">
          {a.title}
        </h3>

        {/* Excerpt */}
        <p className="flex-1 text-sm leading-relaxed text-neutral-500">{a.excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-neutral-50 pt-4">
          <div className="flex items-center gap-2 text-[11px] text-neutral-400">
            <BookOpen className="h-3 w-3" />
            {a.date}
          </div>
          <button
            onClick={onOpen}
            className={`flex items-center gap-1 text-xs font-semibold transition-all duration-200
                        group-hover:gap-2 ${a.categoryColor} cursor-pointer`}
          >
            Read article
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function BlogSection() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <section className="bg-neutral-50 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">

        <FadeUp className="mb-16 text-center">
          <div className="flex justify-center mb-4">
            <GoldLine />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            From the Team
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Insights for ambitious teams
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-neutral-500">
            Practical hiring advice, productivity frameworks, and remote team playbooks —
            written by our talent advisors.
          </p>
        </FadeUp>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [grid-auto-rows:1fr]">
          {ARTICLES.map((a, i) => (
            <ArticleCard
              key={a.title}
              a={a}
              index={i}
              onOpen={() => setActiveArticle(a)}
            />
          ))}
        </div>

        <FadeUp delay={280} className="mt-12 text-center">
          <motion.a
            href="#"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white
                       px-8 py-3 text-sm font-medium text-neutral-700 shadow-sm
                       transition-all duration-200
                       hover:border-primary/40 hover:text-primary hover:shadow-md hover:shadow-primary/8"
          >
            View all articles <ArrowRight className="h-4 w-4" />
          </motion.a>
        </FadeUp>
      </div>

      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </section>
  );
}

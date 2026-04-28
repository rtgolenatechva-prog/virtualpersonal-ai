// ─── Types ────────────────────────────────────────────────────────────────────

export type VAStatus   = "active" | "on-leave" | "new";
export type JobStatus  = "active" | "paused" | "filled" | "draft";
export type ActivityType = "match" | "message" | "interview" | "hired" | "invoice" | "review";

export interface VA {
  id: string;
  name: string;
  initials: string;
  avatarColor: string; // Tailwind gradient classes
  role: string;
  status: VAStatus;
  hoursThisMonth: number;
  hoursTotal: number;
  rating: number;
  nextCheckIn: string;
  timezone: string;
  startDate: string;
  skills: string[];
  performance: number; // 0–100
  monthlyRate: string;
}

export interface Job {
  id: string;
  title: string;
  type: "Full-time" | "Part-time" | "Contract";
  status: JobStatus;
  applicants: number;
  matches: number;
  postedDate: string;
  budget: string;
  location: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  content: string;
  time: string;
}

export interface Match {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: string;
  matchScore: number;
  hourlyRate: string;
  timezone: string;
  skills: string[];
  responseTime: string;
  available: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
// Replace fetch() calls with Supabase queries when wiring the backend.

export const MOCK_VAs: VA[] = [
  {
    id: "va-1",
    name: "Sarah Chen",
    initials: "SC",
    avatarColor: "from-teal-500 to-cyan-400",
    role: "Executive Assistant",
    status: "active",
    hoursThisMonth: 142,
    hoursTotal: 1840,
    rating: 4.9,
    nextCheckIn: "Tomorrow, 9:00 AM",
    timezone: "GMT+8 · Manila",
    startDate: "Jan 2024",
    skills: ["Calendar Mgmt", "Travel", "Email", "Notion"],
    performance: 97,
    monthlyRate: "$1,800/mo",
  },
  {
    id: "va-2",
    name: "Marcus Reid",
    initials: "MR",
    avatarColor: "from-purple-500 to-indigo-400",
    role: "Social Media Manager",
    status: "active",
    hoursThisMonth: 98,
    hoursTotal: 620,
    rating: 4.8,
    nextCheckIn: "Friday, 2:00 PM",
    timezone: "GMT+8 · Manila",
    startDate: "Jun 2024",
    skills: ["Content", "Canva", "Instagram", "Analytics"],
    performance: 91,
    monthlyRate: "$1,200/mo",
  },
  {
    id: "va-3",
    name: "Priya Menon",
    initials: "PM",
    avatarColor: "from-orange-400 to-amber-300",
    role: "Research & Data",
    status: "active",
    hoursThisMonth: 76,
    hoursTotal: 340,
    rating: 4.7,
    nextCheckIn: "Monday, 10:00 AM",
    timezone: "GMT+5:30 · India",
    startDate: "Oct 2024",
    skills: ["Research", "Excel", "Reports", "Data"],
    performance: 88,
    monthlyRate: "$900/mo",
  },
  {
    id: "va-4",
    name: "James Okafor",
    initials: "JO",
    avatarColor: "from-blue-500 to-sky-400",
    role: "Customer Support",
    status: "on-leave",
    hoursThisMonth: 0,
    hoursTotal: 280,
    rating: 4.6,
    nextCheckIn: "Returns Apr 22",
    timezone: "GMT+1 · Lagos",
    startDate: "Nov 2024",
    skills: ["Zendesk", "Live Chat", "Email", "CRM"],
    performance: 85,
    monthlyRate: "$1,100/mo",
  },
];

export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Executive Assistant",
    type: "Full-time",
    status: "active",
    applicants: 24,
    matches: 8,
    postedDate: "Apr 10, 2025",
    budget: "$1,800/mo",
    location: "Philippines preferred",
  },
  {
    id: "job-2",
    title: "Social Media & Content Manager",
    type: "Full-time",
    status: "active",
    applicants: 41,
    matches: 12,
    postedDate: "Apr 3, 2025",
    budget: "$1,200/mo",
    location: "Any timezone",
  },
  {
    id: "job-3",
    title: "Bookkeeper & Finance VA",
    type: "Part-time",
    status: "paused",
    applicants: 15,
    matches: 5,
    postedDate: "Mar 22, 2025",
    budget: "$900/mo",
    location: "Any timezone",
  },
  {
    id: "job-4",
    title: "Customer Success Representative",
    type: "Full-time",
    status: "filled",
    applicants: 63,
    matches: 18,
    postedDate: "Feb 14, 2025",
    budget: "$1,100/mo",
    location: "US hours preferred",
  },
  {
    id: "job-5",
    title: "Tech VA & Automation Specialist",
    type: "Contract",
    status: "draft",
    applicants: 0,
    matches: 0,
    postedDate: "—",
    budget: "$1,500/mo",
    location: "Any timezone",
  },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "a-1",
    type: "match",
    content: "3 new VA matches for Senior Executive Assistant",
    time: "2 min ago",
  },
  {
    id: "a-2",
    type: "message",
    content: "Sarah Chen sent you a weekly update report",
    time: "1 hr ago",
  },
  {
    id: "a-3",
    type: "interview",
    content: "Interview confirmed with Ana Reyes — Apr 18, 3:00 PM",
    time: "3 hrs ago",
  },
  {
    id: "a-4",
    type: "hired",
    content: "Marcus Reid officially onboarded as Social Media Manager",
    time: "Yesterday",
  },
  {
    id: "a-5",
    type: "invoice",
    content: "Invoice #VP-2025-041 paid — $3,900.00",
    time: "2 days ago",
  },
  {
    id: "a-6",
    type: "review",
    content: "Priya Menon completed 30-day performance review",
    time: "3 days ago",
  },
];

export const MOCK_MATCHES: Match[] = [
  {
    id: "m-1",
    name: "Ana Reyes",
    initials: "AR",
    avatarColor: "from-teal-500 to-emerald-400",
    role: "Executive Assistant",
    matchScore: 98,
    hourlyRate: "$9/hr",
    timezone: "GMT+8",
    skills: ["Notion", "Travel", "Calendar", "Slack"],
    responseTime: "< 1 hr",
    available: true,
  },
  {
    id: "m-2",
    name: "Lena Wu",
    initials: "LW",
    avatarColor: "from-purple-500 to-pink-400",
    role: "Executive Assistant",
    matchScore: 94,
    hourlyRate: "$11/hr",
    timezone: "GMT+8",
    skills: ["G-Suite", "Email", "CRM", "Reports"],
    responseTime: "< 2 hrs",
    available: true,
  },
  {
    id: "m-3",
    name: "Carlos Vega",
    initials: "CV",
    avatarColor: "from-blue-500 to-cyan-400",
    role: "Executive Assistant",
    matchScore: 91,
    hourlyRate: "$8/hr",
    timezone: "GMT-5",
    skills: ["Salesforce", "Calendar", "Travel", "Docs"],
    responseTime: "< 3 hrs",
    available: true,
  },
  {
    id: "m-4",
    name: "Nadia Islam",
    initials: "NI",
    avatarColor: "from-amber-500 to-orange-400",
    role: "Executive Assistant",
    matchScore: 89,
    hourlyRate: "$10/hr",
    timezone: "GMT+6",
    skills: ["Asana", "Email", "Zoom", "Reports"],
    responseTime: "< 1 hr",
    available: false,
  },
];

const {
  useState,
  useMemo,
  useEffect,
  useRef,
  createContext,
  useContext
} = React;

/* ── Inline icon library (Lucide SVG paths, no CDN needed) ── */
const _i = h => ({
  className,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: className,
  style: style,
  dangerouslySetInnerHTML: {
    __html: h
  }
});
const Sparkles = _i('<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>');
const CalendarCheck = _i('<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>');
const ArrowRight = _i('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>');
const Clock = _i('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>');
const AlertTriangle = _i('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>');
const FileWarning = _i('<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 9v4"/><path d="M12 17h.01"/>');
const Layers = _i('<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>');
const Bot = _i('<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>');
const Wrench = _i('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>');
const Crosshair = _i('<circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/>');
const Cog = _i('<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m11 13.73-4 6.93"/>');
const Brain = _i('<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>');
const Search = _i('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>');
const Code2 = _i('<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>');
const Scale = _i('<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>');
const Network = _i('<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>');
const TrendingUp = _i('<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>');
const Clock3 = _i('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16.5 12"/>');
const Banknote = _i('<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>');
const Compass = _i('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>');
const Hammer = _i('<path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 0 18.172 9H16a2 2 0 0 1-2-2V4.828a2 2 0 0 0-.586-1.414L11.5 1.5"/>');
const KeyRound = _i('<path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/>');
const Check = _i('<path d="M20 6 9 17l-5-5"/>');
const BadgeCheck = _i('<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>');
const Quote = _i('<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>');
const Mail = _i('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>');

/* ── Tweak defaults ──────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#f0653f",
  "brandName": "Digi team",
  "tagline": "Your AI team. Built for you.",
  "domainText": "digiteam.com.au",
  "email": "lance@modelcitizn.com",
  "calendlyUrl": "https://www.calendly.com/model_citizn",
  "stripeUrl": "https://buy.stripe.com/3cIbJ3czB8f1gRC9TY6Ri00",
  "totalPrice": "$3,000 (excl GST)",
  "setupPrice": "$2,500 (excl GST)",
  "maintenancePrice": "$500 (excl GST)",
  "maintenanceCadence": "for 2 months support · billed after month 1",
  "defaultAudience": "consultant",
  "heroTagline": "6 AI workers · setup in 2–3 weeks · pays for itself in under a month",
  "pricingNote": "Most people earn back the full $3,000 (excl GST) in the first month after the 3-month total project ends — from there, the time it saves is pure upside. The Claude subscription (Pro or Max) is separate; we'll help you pick the right plan."
} /*EDITMODE-END*/;

/* ── Static data ─────────────────────────────────────────── */
const ROI = {
  totalCost: 3000,
  defaultHourlyRate: 150,
  minHourlyRate: 75,
  maxHourlyRate: 400,
  defaultHoursPerWeek: 9,
  minHoursPerWeek: 3,
  maxHoursPerWeek: 20,
  weeksPerMonth: 4.33
};
const AUDIENCES = [{
  id: "consultant",
  label: "Fractional consultant",
  heroLine: "You're the advisor, the admin team, the researcher and the compliance officer — all at once. Hand the other four jobs to your AI team.",
  intro: "You're a fractional consultant or CFO. You're brilliant at the work — but you're also everything else.",
  pains: [{
    title: "Billable hours, lost",
    body: "Every hour on email triage and meeting prep is an hour you can't bill."
  }, {
    title: "Walking in cold",
    body: "Client meetings without a proper brief — because who has time to build one?"
  }, {
    title: "Compliance debt",
    body: "Regulatory questions parked 'for later' that quietly never get answered."
  }, {
    title: "AI-curious, time-poor",
    body: "You know AI could help, but setting it up properly is its own full-time job."
  }]
}, {
  id: "executive",
  label: "Busy manager / exec",
  heroLine: "You're drowning in meetings, inbox and follow-ups. Put a six-person AI team between you and the noise.",
  intro: "You're a manager or executive with too many meetings and not enough hours. Your AI team holds the line.",
  pains: [{
    title: "Inbox black hole",
    body: "Hundreds of emails a week, each one a decision you keep deferring."
  }, {
    title: "Meeting whiplash",
    body: "Back-to-back calls with no time to prep — so you're always half a step behind."
  }, {
    title: "Follow-ups that rot",
    body: "Action items from last week's meeting that never quite get actioned."
  }, {
    title: "No time to think",
    body: "Zero space for the strategic work that's actually your job."
  }]
}, {
  id: "founder",
  label: "Founder / owner",
  heroLine: "You're wearing every hat in the business. Your AI team takes five of them off your head.",
  intro: "You're a founder or small-business owner doing the work of a whole team. Now you've got one.",
  pains: [{
    title: "Everything is yours",
    body: "Sales, ops, admin, research, legal — it all lands on your desk."
  }, {
    title: "Can't afford to hire",
    body: "You need a team but not the payroll, super, and onboarding that comes with one."
  }, {
    title: "Context-switching tax",
    body: "Jumping between ten jobs a day means none of them get your best."
  }, {
    title: "Growth on hold",
    body: "The big-picture moves wait while you firefight the day-to-day."
  }]
}];
const TEAM = [{
  id: "hulk",
  name: "Hulk",
  role: "Ops Powerhouse",
  icon: Cog,
  blurb: "Calendar, inbox, meeting prep, follow-ups",
  detail: "Runs the admin engine of your day — triages your inbox, preps your calendar, drafts follow-ups, and never lets a loose end drop.",
  example: "Cleared a 40-email backlog into 6 decisions before 9am.",
  accent: "coral"
}, {
  id: "sam",
  name: "Sam",
  role: "Strategic Thinker",
  icon: Brain,
  blurb: "Decision support, pre-mortems, pitch review",
  detail: "Your sparring partner. Stress-tests big calls, runs pre-mortems, and pressure-checks a pitch before it ever leaves your desk.",
  example: "Found the hole in a proposal that would've cost the deal.",
  accent: "steel"
}, {
  id: "rich",
  name: "Rich",
  role: "Research Analyst",
  icon: Search,
  blurb: "Market scans, competitor briefs, regulatory updates",
  detail: "Walks you into every meeting prepared — company briefs, market scans, competitor intel, and the latest regulatory shifts.",
  example: "Built a full briefing pack overnight for a 30-minute meeting.",
  accent: "steel"
}, {
  id: "bob",
  name: "Bob",
  role: "Tech & Artefact Builder",
  icon: Code2,
  blurb: "Artifacts, automations, dashboards, integrations",
  detail: "Builds the things you wish existed — dashboards, calculators, automations, and integrations — so you focus on the high-value work.",
  example: "Turned a messy spreadsheet into a live dashboard.",
  accent: "coral"
}, {
  id: "karen",
  name: "Karen",
  role: "Legal & Compliance",
  icon: Scale,
  blurb: "Contract review, compliance, regulatory boundaries",
  detail: "Flags risk in real time — reviews contracts, watches compliance and regulatory boundaries, and kills the 'I'll check that later' debt.",
  example: "Caught a non-compliant clause before a contract was signed.",
  accent: "steel"
}, {
  id: "wally",
  name: "Wally",
  role: "Chief of Staff",
  icon: Network,
  blurb: "Orchestrates the team, routes work, holds context",
  detail: "The conductor. Holds context across the whole team, routes work to the right worker, and keeps everyone pulling in one direction.",
  example: "Coordinated all 5 workers to deliver a board pack in a day.",
  accent: "coral"
}];
const ORBIT = [{
  top: 6,
  left: 50
}, {
  top: 26,
  left: 90
}, {
  top: 72,
  left: 86
}, {
  top: 92,
  left: 50
}, {
  top: 72,
  left: 14
}, {
  top: 26,
  left: 10
}];
const PAIN_ICONS = [Clock, AlertTriangle, FileWarning, Layers];
const SOLUTION_POINTS = [{
  n: "01",
  icon: Bot,
  title: "Not a chatbot",
  body: "Purpose-built workers with deep context about your role, your workflows, and the way you operate — not a blank prompt box."
}, {
  n: "02",
  icon: Wrench,
  title: "No homework",
  body: "We do the setup end-to-end. You get a working system handed over, not a course to study."
}, {
  n: "03",
  icon: Crosshair,
  title: "Not generic",
  body: "Every worker is scoped to your role, your industry, and your regulatory environment."
}];
const STEPS = [{
  icon: Compass,
  title: "Discovery & design",
  body: "We learn how you work, map your workflows, and design your 6-worker team around how you actually operate.",
  meta: "Session 1 · 60–90 min"
}, {
  icon: Hammer,
  title: "Build & deploy",
  body: "We build every worker with custom personas, capabilities, and tool connections — then test real scenarios from your week.",
  meta: "Session 2 · 60–90 min"
}, {
  icon: KeyRound,
  title: "Train & handover",
  body: "We walk you through each worker, hand over full ownership, and stay on for 3 months to keep it humming.",
  meta: "Session 3 · 60 min"
}];
const CREDS = ["Chartered Accountant — ex-PwC, KPMG, Investec, NAB", "CEO / Founder of Model Citizn and EXL Cloud", "Co-author, CA ANZ Financial Modelling Study Guide", "Creator of the AI-Powered Accountant course (Maven)", "Runs 6+ AI digital workers daily across 4 businesses", "CCH-certified trainer · FMI-certified financial modeller"];

/* ── Contexts ────────────────────────────────────────────── */
const AudienceCtx = createContext(null);
const useAudience = () => useContext(AudienceCtx);
const AppCtx = createContext({});
const useApp = () => useContext(AppCtx);

/* ── Reveal ──────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setV(true);
        obs.disconnect();
      }
    }, {
      threshold
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return {
    ref,
    v
  };
}
function Reveal({
  children,
  delay = 0,
  className = ""
}) {
  const {
    ref,
    v
  } = useReveal();
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: className,
    style: {
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(24px)",
      transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${delay}s, transform .6s cubic-bezier(.22,1,.36,1) ${delay}s`
    }
  }, children);
}

/* ── Shared ──────────────────────────────────────────────── */
function DigiLogoIcon({
  height = 34
}) {
  const w = Math.round(height * 90 / 80);
  const svg = '<line x1="28" y1="16" x2="58" y2="8" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><line x1="28" y1="16" x2="6" y2="46" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><line x1="58" y1="8" x2="82" y2="44" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><line x1="28" y1="16" x2="82" y2="44" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="46" x2="50" y2="72" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><line x1="82" y1="44" x2="50" y2="72" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/><circle cx="28" cy="16" r="5" fill="var(--accent)"/><circle cx="58" cy="8" r="3.5" fill="var(--accent)"/><circle cx="6" cy="46" r="8" fill="var(--accent)"/><circle cx="82" cy="44" r="5.5" fill="var(--accent)"/><circle cx="50" cy="72" r="5.5" fill="var(--accent)"/>';
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: height,
    viewBox: "0 0 90 80",
    fill: "none",
    style: {
      display: 'block',
      flexShrink: 0
    },
    dangerouslySetInnerHTML: {
      __html: svg
    }
  });
}
function BrandLogo() {
  const {
    brandName
  } = useApp();
  const parts = brandName.trim().split(' ');
  const last = parts.pop();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1.25rem",
      letterSpacing: "-0.01em",
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      color: "#eef2f8"
    }
  }, parts.join(' ')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: "var(--accent)"
    }
  }, last));
}
function BookButton({
  className = "",
  label = "Book a free discovery call"
}) {
  const {
    calendlyUrl
  } = useApp();
  return /*#__PURE__*/React.createElement("a", {
    href: calendlyUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 ${className}`,
    style: {
      background: "var(--accent)",
      boxShadow: "0 10px 30px -8px rgba(240,101,63,0.6)"
    }
  }, /*#__PURE__*/React.createElement(CalendarCheck, {
    className: "h-4 w-4"
  }), label);
}
function BuyButton({
  className = "",
  label = "Buy now — get started today"
}) {
  const {
    stripeUrl
  } = useApp();
  return /*#__PURE__*/React.createElement("a", {
    href: stripeUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    className: `group inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${className}`,
    style: {
      borderColor: "#2c3a55",
      background: "rgba(25,35,59,0.6)",
      color: "#eef2f8",
      backdropFilter: "blur(8px)"
    }
  }, label, /*#__PURE__*/React.createElement(ArrowRight, {
    className: "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
  }));
}
function SectionHeading({
  eyebrow,
  title,
  accent,
  sub
}) {
  const words = eyebrow ? eyebrow.trim().split(" ") : [];
  const lastW = words.pop() || "";
  const lead = words.join(" ");
  const desc = [title, accent].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl"
  }, eyebrow && /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "Georgia,serif",
      fontSize: "clamp(2rem,5vw,3.5rem)",
      fontWeight: 600,
      lineHeight: 1.05,
      letterSpacing: "-0.02em"
    }
  }, lead && /*#__PURE__*/React.createElement("span", null, lead, " "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, lastW))), desc && /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.05
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "1.25rem",
      fontSize: "clamp(1.25rem,3vw,1.875rem)",
      fontWeight: 500,
      lineHeight: 1.3,
      color: "#eef2f8"
    }
  }, desc)), sub && /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "1rem",
      fontSize: "1.125rem",
      lineHeight: 1.7,
      color: "#aab6cc"
    }
  }, sub)));
}

/* ── Nav ─────────────────────────────────────────────────── */
function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, {
      passive: true
    });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [{
    href: "#team",
    label: "The team"
  }, {
    href: "#roi",
    label: "ROI"
  }, {
    href: "#how",
    label: "How it works"
  }, {
    href: "#pricing",
    label: "Pricing"
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "fixed inset-x-0 top-0 z-50 transition-all duration-300",
    style: {
      borderBottom: scrolled ? "1px solid rgba(44,58,85,0.7)" : "1px solid transparent",
      background: scrolled ? "rgba(18,26,46,0.8)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none"
    }
  }, /*#__PURE__*/React.createElement("nav", {
    className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement(DigiLogoIcon, {
    height: 34
  }), /*#__PURE__*/React.createElement(BrandLogo, null)), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:flex items-center gap-8"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    className: "text-sm transition-colors hover:text-white",
    style: {
      color: "#aab6cc"
    }
  }, l.label))), /*#__PURE__*/React.createElement(BookButton, {
    className: "hidden sm:inline-flex",
    label: "Book a call"
  })));
}

/* ── Hero ────────────────────────────────────────────────── */
function AudienceToggle() {
  const {
    audience,
    setAudienceId
  } = useAudience();
  return /*#__PURE__*/React.createElement("div", {
    className: "inline-flex rounded-full border p-1",
    style: {
      borderColor: "#2c3a55",
      background: "rgba(25,35,59,0.6)"
    }
  }, AUDIENCES.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    onClick: () => setAudienceId(a.id),
    className: "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
    style: {
      background: audience.id === a.id ? "var(--accent)" : "transparent",
      color: audience.id === a.id ? "#fff" : "#aab6cc"
    }
  }, a.label)));
}

/* ── Video Section ─────────────────────────────────────────── */
function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "relative",
    style: {
      padding: "5rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-5xl px-5"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "mb-10 text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium",
    style: {
      borderColor: "#2c3a55",
      background: "rgba(25,35,59,0.6)",
      color: "#aab6cc"
    }
  }, /*#__PURE__*/React.createElement(Sparkles, {
    className: "h-3.5 w-3.5",
    style: {
      color: "var(--accent)"
    }
  }), "2 minute overview"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: "1rem",
      fontFamily: "Georgia,serif",
      fontSize: "clamp(1.75rem,4vw,2.75rem)",
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: "-0.02em"
    }
  }, "See your team in ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "action.")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative overflow-hidden rounded-3xl border",
    style: {
      borderColor: "rgba(240,101,63,0.3)",
      background: "#0c1220",
      boxShadow: "0 40px 100px -30px rgba(0,0,0,0.8), 0 0 0 1px rgba(240,101,63,0.1) inset"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(240,101,63,0.08), transparent 65%)",
      pointerEvents: "none",
      zIndex: 1
    }
  }), /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    src: "digiteam-explainer.mp4",
    controls: true,
    playsInline: true,
    preload: "none",
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    style: {
      display: "block",
      width: "100%",
      borderRadius: "1.5rem",
      position: "relative",
      zIndex: 2,
      aspectRatio: "16/9",
      background: "#0c1220"
    }
  }), !playing && /*#__PURE__*/React.createElement("button", {
    onClick: handlePlay,
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      background: "rgba(12,18,32,0.6)",
      borderRadius: "1.5rem",
      backdropFilter: "blur(4px)",
      border: "none",
      cursor: "pointer",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      borderRadius: "50%",
      background: "var(--accent)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 12px 40px -8px rgba(240,101,63,0.8)",
      transition: "transform 0.2s",
      flexShrink: 0
    },
    onMouseEnter: e => e.currentTarget.style.transform = "scale(1.08)",
    onMouseLeave: e => e.currentTarget.style.transform = "scale(1)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "white",
    style: {
      marginLeft: 3
    }
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "5 3 19 12 5 21 5 3"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "Georgia,serif",
      fontSize: "1.125rem",
      fontWeight: 600,
      color: "#eef2f8"
    }
  }, "Watch the explainer"))))));
}
function Hero() {
  const {
    audience
  } = useAudience();
  const {
    domainText,
    heroTagline
  } = useApp();

  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "relative overflow-hidden",
    style: {
      paddingTop: "10rem",
      paddingBottom: "5rem"
    }
  }, /*#__PURE__*/React.createElement("video", {
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    src: "hero-bg.mp4",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.42,
      zIndex: 0,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0",
    style: {
      background: "linear-gradient(to bottom, rgba(18,26,46,0.55) 0%, rgba(18,26,46,0.4) 50%, rgba(18,26,46,0.85) 100%)",
      zIndex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0",
    style: {
      zIndex: 2,
      background: "radial-gradient(60% 50% at 15% 0%,rgba(240,101,63,0.16),transparent 60%),radial-gradient(50% 50% at 90% 10%,rgba(111,147,189,0.14),transparent 55%),radial-gradient(70% 60% at 50% 100%,rgba(240,101,63,0.08),transparent 60%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0",
    style: {
      zIndex: 2,
      backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.04) 1px,transparent 1px)",
      backgroundSize: "56px 56px",
      maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%,#000 30%,transparent 75%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative mx-auto max-w-7xl px-5 grid gap-16 lg:grid-cols-2 items-center",
    style: {
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium",
    style: {
      borderColor: "#2c3a55",
      background: "rgba(25,35,59,0.6)",
      color: "#aab6cc",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement(Sparkles, {
    className: "h-3.5 w-3.5",
    style: {
      color: "var(--accent)"
    }
  }), "A done-for-you AI workforce \xB7 powered by Claude"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: "1.5rem",
      fontFamily: "Georgia,serif",
      fontSize: "clamp(2.5rem,6vw,4.5rem)",
      fontWeight: 600,
      lineHeight: 1.05,
      letterSpacing: "-0.02em"
    }
  }, "Your AI digital", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "team."), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#eef2f8"
    }
  }, "Built for you.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "1.5rem",
      minHeight: "5.5rem",
      maxWidth: "36rem"
    }
  }, /*#__PURE__*/React.createElement("p", {
    key: audience.id,
    className: "text-lg",
    style: {
      lineHeight: 1.7,
      color: "#aab6cc"
    }
  }, audience.heroLine)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "1.75rem"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-2 text-xs font-medium uppercase",
    style: {
      letterSpacing: "0.1em",
      color: "#7e8aa3"
    }
  }, "I'm a\u2026"), /*#__PURE__*/React.createElement(AudienceToggle, null)), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 flex flex-col gap-3 sm:flex-row"
  }, /*#__PURE__*/React.createElement(BookButton, null), /*#__PURE__*/React.createElement(BuyButton, null)), /*#__PURE__*/React.createElement("p", {
    className: "mt-5 text-sm",
    style: {
      color: "#7e8aa3"
    }
  }, heroTagline)), /*#__PURE__*/React.createElement("div", {
    className: "relative mx-auto w-full max-w-md",
    style: {
      aspectRatio: "1/1"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    className: "absolute inset-0 h-full w-full",
    viewBox: "0 0 100 100",
    preserveAspectRatio: "none"
  }, ORBIT.map((p, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: "50",
    y1: "50",
    x2: p.left,
    y2: p.top,
    stroke: "url(#dtlg)",
    strokeWidth: "0.4",
    strokeDasharray: "1.5 2"
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "dtlg",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--accent)",
    stopOpacity: "0.6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#6f93bd",
    stopOpacity: "0.2"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border text-center",
    style: {
      borderColor: "rgba(240,101,63,0.4)",
      background: "#19233b",
      boxShadow: "0 0 60px -12px rgba(240,101,63,0.6)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs uppercase",
    style: {
      letterSpacing: "0.1em",
      color: "#7e8aa3"
    }
  }, "You"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold",
    style: {
      fontFamily: "Georgia,serif",
      color: "#eef2f8"
    }
  }, "In control")), TEAM.map((w, i) => {
    const pos = ORBIT[i];
    const Icon = w.icon;
    const coral = w.accent === "coral";
    return /*#__PURE__*/React.createElement("div", {
      key: w.id,
      className: "absolute z-10",
      style: {
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        animation: `dtFloat 7s ease-in-out infinite`,
        animationDelay: `${i * 0.6}s`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col items-center gap-1 rounded-xl border px-3 py-2.5",
      style: {
        borderColor: coral ? "rgba(240,101,63,0.5)" : "rgba(111,147,189,0.4)",
        background: "rgba(25,35,59,0.9)",
        backdropFilter: "blur(8px)",
        boxShadow: coral ? "0 8px 30px -10px rgba(240,101,63,0.5)" : "0 8px 30px -12px rgba(111,147,189,0.5)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      className: "h-5 w-5",
      style: {
        color: coral ? "var(--accent)" : "#6f93bd"
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-semibold",
      style: {
        color: "#eef2f8"
      }
    }, w.name)));
  }))), /*#__PURE__*/React.createElement("p", {
    className: "relative mt-16 text-center text-sm",
    style: {
      color: "#7e8aa3",
      zIndex: 3
    }
  }, domainText));
}

/* ── Problem ─────────────────────────────────────────────── */
function Problem() {
  const {
    audience
  } = useAudience();
  return /*#__PURE__*/React.createElement("section", {
    className: "relative",
    style: {
      padding: "6rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-7xl px-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl"
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "Georgia,serif",
      fontSize: "clamp(2rem,5vw,3.5rem)",
      fontWeight: 600,
      lineHeight: 1.05,
      letterSpacing: "-0.02em"
    }
  }, "The ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "problem")), /*#__PURE__*/React.createElement("p", {
    className: "mt-5",
    key: audience.id,
    style: {
      fontSize: "clamp(1.25rem,3vw,1.875rem)",
      fontWeight: 500,
      lineHeight: 1.3,
      color: "#eef2f8"
    }
  }, audience.intro)), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 grid gap-4 sm:grid-cols-2",
    key: audience.id
  }, audience.pains.map((p, i) => {
    const Icon = PAIN_ICONS[i];
    return /*#__PURE__*/React.createElement(Reveal, {
      key: p.title,
      delay: i * 0.07
    }, /*#__PURE__*/React.createElement("div", {
      className: "group rounded-2xl border p-6 transition-colors duration-300",
      style: {
        borderColor: "#2c3a55",
        background: "rgba(25,35,59,0.4)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start gap-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
      style: {
        background: "rgba(240,101,63,0.1)",
        color: "var(--accent)",
        boxShadow: "inset 0 0 0 1px rgba(240,101,63,0.2)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      className: "h-5 w-5"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "font-semibold",
      style: {
        color: "#eef2f8"
      }
    }, p.title), /*#__PURE__*/React.createElement("p", {
      className: "mt-1.5 text-sm",
      style: {
        lineHeight: 1.7,
        color: "#aab6cc"
      }
    }, p.body)))));
  }))));
}

/* ── Solution ────────────────────────────────────────────── */
function Solution() {
  return /*#__PURE__*/React.createElement("section", {
    className: "relative border-y",
    style: {
      borderColor: "rgba(44,58,85,0.6)",
      background: "rgba(12,18,32,0.4)",
      padding: "6rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-7xl px-5"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The solution",
    title: "A team of six AI workers,",
    accent: "deployed for you.",
    sub: "Each one has a distinct persona, capability set, and purpose \u2014 purpose-built and tuned to how you actually work."
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-14 grid gap-5 md:grid-cols-3"
  }, SOLUTION_POINTS.map((p, i) => {
    const Icon = p.icon;
    return /*#__PURE__*/React.createElement(Reveal, {
      key: p.n,
      delay: i * 0.1
    }, /*#__PURE__*/React.createElement("div", {
      className: "group relative h-full overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1",
      style: {
        borderColor: "#2c3a55",
        background: "rgba(25,35,59,0.4)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute -right-3 -top-7 font-bold select-none",
      style: {
        fontFamily: "Georgia,serif",
        fontSize: "5rem",
        color: "rgba(240,101,63,0.2)"
      }
    }, p.n), /*#__PURE__*/React.createElement("span", {
      className: "relative flex h-12 w-12 items-center justify-center rounded-xl",
      style: {
        background: "rgba(240,101,63,0.1)",
        color: "var(--accent)",
        boxShadow: "inset 0 0 0 1px rgba(240,101,63,0.2)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      className: "h-6 w-6"
    })), /*#__PURE__*/React.createElement("h3", {
      className: "relative mt-5 text-xl font-semibold",
      style: {
        fontFamily: "Georgia,serif",
        color: "#eef2f8"
      }
    }, p.title), /*#__PURE__*/React.createElement("p", {
      className: "relative mt-2.5 text-sm",
      style: {
        lineHeight: 1.7,
        color: "#aab6cc"
      }
    }, p.body)));
  }))));
}

/* ── Team ────────────────────────────────────────────────── */
function FlipCard({
  worker,
  index
}) {
  const [flipped, setFlipped] = useState(false);
  const Icon = worker.icon;
  const coral = worker.accent === "coral";
  const ac = coral ? "var(--accent)" : "#6f93bd";
  const acRgba = coral ? "rgba(240,101,63," : "rgba(111,147,189,";
  return /*#__PURE__*/React.createElement(Reveal, {
    delay: index * 0.06
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "16rem",
      perspective: "1400px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setFlipped(f => !f),
    className: "relative h-full w-full text-left",
    style: {
      transformStyle: "preserve-3d",
      transition: "transform 650ms cubic-bezier(.22,1,.36,1)",
      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex flex-col rounded-2xl border p-6",
    style: {
      backfaceVisibility: "hidden",
      borderColor: coral ? `${acRgba}0.4)` : "#2c3a55",
      background: "rgba(25,35,59,0.6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex h-12 w-12 items-center justify-center rounded-xl",
    style: {
      background: `${acRgba}0.1)`,
      color: ac,
      boxShadow: `inset 0 0 0 1px ${acRgba}0.4)`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    className: "h-6 w-6"
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-medium uppercase",
    style: {
      letterSpacing: "0.1em",
      color: "#7e8aa3"
    }
  }, "tap to flip")), /*#__PURE__*/React.createElement("h3", {
    className: "mt-5 text-2xl font-semibold",
    style: {
      fontFamily: "Georgia,serif",
      color: "#eef2f8"
    }
  }, worker.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium",
    style: {
      color: ac
    }
  }, worker.role), /*#__PURE__*/React.createElement("p", {
    className: "mt-auto text-sm",
    style: {
      lineHeight: 1.7,
      color: "#aab6cc"
    }
  }, worker.blurb)), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex flex-col rounded-2xl border p-6",
    style: {
      backfaceVisibility: "hidden",
      transform: "rotateY(180deg)",
      borderColor: `${acRgba}0.8)`,
      background: "linear-gradient(135deg,#223049,#19233b)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-semibold",
    style: {
      fontFamily: "Georgia,serif",
      color: "#eef2f8"
    }
  }, worker.name, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: ac
    }
  }, "\xB7 ", worker.role)), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-sm",
    style: {
      lineHeight: 1.7,
      color: "#aab6cc"
    }
  }, worker.detail), /*#__PURE__*/React.createElement("div", {
    className: "mt-auto rounded-lg border-l-2 p-3",
    style: {
      borderColor: ac,
      background: "rgba(12,18,32,0.4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold uppercase",
    style: {
      letterSpacing: "0.1em",
      color: "#7e8aa3"
    }
  }, "In action"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-sm",
    style: {
      color: "#eef2f8"
    }
  }, worker.example))))));
}
function TeamSection() {
  return /*#__PURE__*/React.createElement("section", {
    id: "team",
    className: "relative",
    style: {
      padding: "6rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-7xl px-5"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Meet the team",
    title: "Six workers.",
    accent: "Every one shaped around you.",
    sub: "Tap any card to see how each worker earns their keep. Every persona, tone, and capability is tailored to how you work."
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
  }, TEAM.map((w, i) => /*#__PURE__*/React.createElement(FlipCard, {
    key: w.id,
    worker: w,
    index: i
  })))));
}

/* ── ROI ─────────────────────────────────────────────────── */
function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format
}) {
  const pct = (value - min) / (max - min) * 100;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between gap-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-sm font-medium",
    style: {
      color: "#aab6cc"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-semibold shrink-0",
    style: {
      fontFamily: "Georgia,serif",
      color: "var(--accent)"
    }
  }, format(value))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value)),
    className: "mt-3",
    style: {
      background: `linear-gradient(to right,var(--accent) ${pct}%,#223049 ${pct}%)`
    }
  }));
}
function StatCard({
  icon: Icon,
  big,
  label,
  highlight = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl border p-6",
    style: {
      borderColor: highlight ? "rgba(240,101,63,0.4)" : "#2c3a55",
      background: highlight ? "rgba(25,35,59,0.8)" : "rgba(25,35,59,0.4)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    className: "h-5 w-5",
    style: {
      color: highlight ? "var(--accent)" : "#6f93bd"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 font-semibold",
    style: {
      fontFamily: "Georgia,serif",
      fontSize: "clamp(1.5rem,4vw,2.25rem)",
      letterSpacing: "-0.02em",
      color: highlight ? "var(--accent)" : "#eef2f8"
    }
  }, big), /*#__PURE__*/React.createElement("p", {
    className: "mt-1.5 text-sm",
    style: {
      color: "#aab6cc"
    }
  }, label));
}
function RoiCalculator() {
  const [rate, setRate] = useState(ROI.defaultHourlyRate);
  const [hours, setHours] = useState(ROI.defaultHoursPerWeek);
  const fmt = n => n.toLocaleString("en-AU", {
    maximumFractionDigits: 0
  });
  const {
    monthly,
    annual,
    paybackWeeks
  } = useMemo(() => {
    const weekly = rate * hours;
    return {
      monthly: weekly * ROI.weeksPerMonth,
      annual: weekly * ROI.weeksPerMonth * 12,
      paybackWeeks: weekly > 0 ? ROI.totalCost / weekly : 0
    };
  }, [rate, hours]);
  const paybackLabel = paybackWeeks < 1 ? "under a week" : paybackWeeks < 2 ? "about 1 week" : `about ${Math.round(paybackWeeks)} weeks`;
  return /*#__PURE__*/React.createElement("section", {
    id: "roi",
    className: "relative border-y",
    style: {
      borderColor: "rgba(44,58,85,0.6)",
      background: "rgba(12,18,32,0.4)",
      padding: "6rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-7xl px-5"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The ROI",
    title: "See what your time is",
    accent: "actually worth.",
    sub: "Drag the sliders to your numbers. Most people save 8\u201312 hours a week \u2014 here's what that's worth to you."
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-14 grid gap-6 lg:grid-cols-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl border p-7 sm:p-9",
    style: {
      borderColor: "#2c3a55",
      background: "rgba(25,35,59,0.5)"
    }
  }, /*#__PURE__*/React.createElement(SliderInput, {
    label: "What an hour of your time is worth",
    value: rate,
    min: ROI.minHourlyRate,
    max: ROI.maxHourlyRate,
    step: 5,
    onChange: setRate,
    format: v => `$${fmt(v)}/hr`
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-9"
  }, /*#__PURE__*/React.createElement(SliderInput, {
    label: "Hours a week lost to admin",
    value: hours,
    min: ROI.minHoursPerWeek,
    max: ROI.maxHoursPerWeek,
    step: 1,
    onChange: setHours,
    format: v => `${v} hrs`
  })), /*#__PURE__*/React.createElement("p", {
    className: "mt-8 text-xs",
    style: {
      lineHeight: 1.7,
      color: "#7e8aa3"
    }
  }, "Based on what an hour of your time is actually worth \u2014 your billable rate, or the value of the work you'd do instead of admin. Not raw salary cost.")), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-5 sm:grid-cols-2"
  }, /*#__PURE__*/React.createElement(StatCard, {
    icon: Banknote,
    big: `$${fmt(monthly)}`,
    label: "Value reclaimed / month",
    highlight: true
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: TrendingUp,
    big: `$${fmt(annual)}`,
    label: "Value reclaimed / year"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: Clock3,
    big: paybackLabel,
    label: "Of reclaimed time to cover the full $3,000"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col justify-between rounded-2xl border p-6",
    style: {
      borderColor: "rgba(240,101,63,0.4)",
      background: "linear-gradient(135deg,rgba(240,101,63,0.15),#19233b)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      lineHeight: 1.7,
      color: "#eef2f8"
    }
  }, "Your team costs ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold",
    style: {
      color: "var(--accent)"
    }
  }, "$3,000"), " all-in. After that, the time it gives back is yours."), /*#__PURE__*/React.createElement(BookButton, {
    className: "mt-4 w-full",
    label: "Book a call"
  }))))));
}

/* ── How it works ────────────────────────────────────────── */
function HowItWorks() {
  return /*#__PURE__*/React.createElement("section", {
    id: "how",
    className: "relative",
    style: {
      padding: "6rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-7xl px-5"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "How it works",
    title: "Live in",
    accent: "2\u20133 weeks.",
    sub: "Three focused sessions, all remote over Microsoft Teams. You end up owning the system \u2014 no dependency on us."
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-14 grid gap-5 md:grid-cols-3"
  }, STEPS.map((s, i) => {
    const Icon = s.icon;
    return /*#__PURE__*/React.createElement(Reveal, {
      key: s.title,
      delay: i * 0.1
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative h-full rounded-2xl border p-7",
      style: {
        borderColor: "#2c3a55",
        background: "rgba(25,35,59,0.4)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex h-12 w-12 items-center justify-center rounded-xl",
      style: {
        background: "rgba(240,101,63,0.1)",
        color: "var(--accent)",
        boxShadow: "inset 0 0 0 1px rgba(240,101,63,0.2)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      className: "h-6 w-6"
    })), /*#__PURE__*/React.createElement("span", {
      className: "font-bold select-none",
      style: {
        fontFamily: "Georgia,serif",
        fontSize: "3rem",
        color: "#223049"
      }
    }, i + 1)), /*#__PURE__*/React.createElement("h3", {
      className: "mt-5 text-xl font-semibold",
      style: {
        fontFamily: "Georgia,serif",
        color: "#eef2f8"
      }
    }, s.title), /*#__PURE__*/React.createElement("p", {
      className: "mt-2.5 text-sm",
      style: {
        lineHeight: 1.7,
        color: "#aab6cc"
      }
    }, s.body), /*#__PURE__*/React.createElement("p", {
      className: "mt-5 text-xs font-medium uppercase",
      style: {
        letterSpacing: "0.1em",
        color: "rgba(240,101,63,0.8)"
      }
    }, s.meta)));
  }))));
}

/* ── Pricing ─────────────────────────────────────────────── */
function PriceCard({
  tier,
  price,
  cadence,
  features,
  highlight = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "relative h-full overflow-hidden rounded-3xl border p-8 sm:p-9",
    style: {
      borderColor: highlight ? "rgba(240,101,63,0.5)" : "#2c3a55",
      background: highlight ? "linear-gradient(135deg,#19233b,#223049)" : "rgba(25,35,59,0.4)",
      boxShadow: highlight ? "0 30px 80px -30px rgba(240,101,63,0.4)" : "none"
    }
  }, highlight && /*#__PURE__*/React.createElement("span", {
    className: "absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-semibold text-white",
    style: {
      background: "var(--accent)"
    }
  }, "Start here"), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-semibold uppercase",
    style: {
      letterSpacing: "0.1em",
      color: "#aab6cc"
    }
  }, tier), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold",
    style: {
      fontFamily: "Georgia,serif",
      fontSize: "3rem",
      color: "#eef2f8"
    }
  }, price)), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-sm",
    style: {
      color: "#7e8aa3"
    }
  }, cadence), /*#__PURE__*/React.createElement("ul", {
    className: "mt-7 space-y-3"
  }, features.map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    className: "flex items-start gap-3 text-sm",
    style: {
      color: "#eef2f8"
    }
  }, /*#__PURE__*/React.createElement(Check, {
    className: "mt-0.5 h-4 w-4 shrink-0",
    style: {
      color: highlight ? "var(--accent)" : "#6f93bd"
    }
  }), f))));
}
function PricingSection() {
  const {
    totalPrice,
    setupPrice,
    maintenancePrice,
    maintenanceCadence,
    pricingNote
  } = useApp();
  const PRICING = {
    totalLabel: totalPrice,
    setup: {
      price: setupPrice,
      cadence: "one-off, upfront includings 1st month support",
      title: "Implementation",
      features: ["3 dedicated setup sessions", "6 custom AI digital workers", "Full persona + capability design", "Tool connections configured", "Ready to use from day one"]
    },
    maintenance: {
      price: maintenancePrice,
      cadence: maintenanceCadence,
      title: "Management",
      features: ["Monthly check-in session", "Worker tuning & refinement", "New capabilities added as you grow", "Priority support via WhatsApp/email", "Smooth handover to self-service"]
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    className: "relative border-y",
    style: {
      borderColor: "rgba(44,58,85,0.6)",
      background: "rgba(12,18,32,0.4)",
      padding: "6rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-7xl px-5"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "The investment",
    title: "One team.",
    accent: `${PRICING.totalLabel} all-in.`,
    sub: pricingNote
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-14 grid gap-5 lg:grid-cols-2"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(PriceCard, {
    tier: PRICING.setup.title,
    price: PRICING.setup.price,
    cadence: PRICING.setup.cadence,
    features: PRICING.setup.features,
    highlight: true
  })), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement(PriceCard, {
    tier: PRICING.maintenance.title,
    price: PRICING.maintenance.price,
    cadence: PRICING.maintenance.cadence,
    features: PRICING.maintenance.features
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.15
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-8 flex flex-col items-center gap-5 rounded-3xl border p-8 text-center sm:p-10",
    style: {
      borderColor: "#2c3a55",
      background: "rgba(25,35,59,0.5)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-semibold",
    style: {
      fontFamily: "Georgia,serif",
      color: "#eef2f8"
    }
  }, "Two ways to start"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2",
    style: {
      color: "#aab6cc"
    }
  }, "Not sure yet? Book a free call. Ready to go? Skip straight to setup.")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 sm:flex-row"
  }, /*#__PURE__*/React.createElement(BookButton, {
    label: "Book a free discovery call"
  }), /*#__PURE__*/React.createElement(BuyButton, {
    label: "Buy now \u2014 start this week"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: "#7e8aa3"
    }
  }, "No obligation on the call. We'll map your workflows and show you what your team could look like.")))));
}

/* ── Why Lance ───────────────────────────────────────────── */
function WhyLance() {
  return /*#__PURE__*/React.createElement("section", {
    className: "relative",
    style: {
      padding: "6rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto max-w-7xl px-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-10 lg:grid-cols-2 lg:items-center"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "Georgia,serif",
      fontSize: "clamp(2rem,5vw,3.5rem)",
      fontWeight: 600,
      lineHeight: 1.05,
      letterSpacing: "-0.02em"
    }
  }, "Why ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "us")), /*#__PURE__*/React.createElement("p", {
    className: "mt-5",
    style: {
      fontSize: "clamp(1.25rem,3vw,1.875rem)",
      fontWeight: 500,
      lineHeight: 1.3,
      color: "#eef2f8"
    }
  }, "Built by a practitioner, not a vendor."), /*#__PURE__*/React.createElement("p", {
    className: "mt-4 max-w-xl text-lg",
    style: {
      lineHeight: 1.7,
      color: "#aab6cc"
    }
  }, "This isn't theoretical. Lance Rubin built this exact system for his own businesses first \u2014 and runs it every day. You're getting a setup that's already proven, not a pitch."), /*#__PURE__*/React.createElement("ul", {
    className: "mt-8 grid gap-3 sm:grid-cols-2"
  }, CREDS.map(c => /*#__PURE__*/React.createElement("li", {
    key: c,
    className: "flex items-start gap-2.5 text-sm",
    style: {
      color: "#eef2f8"
    }
  }, /*#__PURE__*/React.createElement(BadgeCheck, {
    className: "mt-0.5 h-4 w-4 shrink-0",
    style: {
      color: "var(--accent)"
    }
  }), c))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("figure", {
    className: "relative rounded-3xl border p-8",
    style: {
      borderColor: "rgba(240,101,63,0.3)",
      background: "linear-gradient(135deg,#223049,#19233b)",
      boxShadow: "0 30px 80px -30px rgba(0,0,0,0.8)"
    }
  }, /*#__PURE__*/React.createElement(Quote, {
    className: "h-9 w-9",
    style: {
      color: "rgba(240,101,63,0.6)"
    }
  }), /*#__PURE__*/React.createElement("blockquote", {
    className: "mt-4 text-2xl font-medium",
    style: {
      fontFamily: "Georgia,serif",
      lineHeight: 1.3,
      color: "#eef2f8"
    }
  }, "\"We eat our own cooking \u2014 every single day. I wouldn't hand you a worker I don't trust to run my own business.\""), /*#__PURE__*/React.createElement("figcaption", {
    className: "mt-6 flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white",
    style: {
      fontFamily: "Georgia,serif",
      background: "var(--accent)"
    }
  }, "LR"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-semibold",
    style: {
      color: "#eef2f8"
    }
  }, "Lance Rubin, CA"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm",
    style: {
      color: "#aab6cc"
    }
  }, "Founder \xB7 Model Citizn & EXL Cloud"))))))));
}

/* ── Final CTA + Footer ──────────────────────────────────── */
function FinalCta() {
  return /*#__PURE__*/React.createElement("section", {
    className: "relative overflow-hidden",
    style: {
      padding: "7rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0",
    style: {
      background: "radial-gradient(60% 50% at 15% 0%,rgba(240,101,63,0.16),transparent 60%),radial-gradient(50% 50% at 90% 10%,rgba(111,147,189,0.14),transparent 55%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0",
    style: {
      backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.04) 1px,transparent 1px)",
      backgroundSize: "56px 56px",
      maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%,#000 30%,transparent 75%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative mx-auto max-w-3xl px-5 text-center"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "Georgia,serif",
      fontSize: "clamp(2rem,5vw,3.5rem)",
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: "-0.02em"
    }
  }, "Ready to build your", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "digital team?"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("p", {
    className: "mx-auto mt-6 max-w-xl text-lg",
    style: {
      lineHeight: 1.7,
      color: "#aab6cc"
    }
  }, "Book a free 30-minute discovery call. We'll map your workflows and show you exactly what your six workers could do \u2014 no obligation.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.15
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-9 flex flex-col justify-center gap-3 sm:flex-row"
  }, /*#__PURE__*/React.createElement(BookButton, null), /*#__PURE__*/React.createElement(BuyButton, null)))));
}
function SiteFooter() {
  const {
    email,
    brandName
  } = useApp();
  return /*#__PURE__*/React.createElement("footer", {
    className: "border-t",
    style: {
      borderColor: "rgba(44,58,85,0.6)",
      background: "rgba(12,18,32,0.6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement(DigiLogoIcon, {
    height: 28
  }), /*#__PURE__*/React.createElement(BrandLogo, null)), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${email}`,
    className: "inline-flex items-center gap-2 text-sm transition-colors hover:text-white",
    style: {
      color: "#aab6cc"
    }
  }, /*#__PURE__*/React.createElement(Mail, {
    className: "h-4 w-4"
  }), email), /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      color: "#7e8aa3"
    }
  }, "\xA9 2026 ", brandName, ". All rights reserved.")));
}

/* ── Root App ────────────────────────────────────────────── */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [audienceId, setAudienceId] = useState(t.defaultAudience || "consultant");
  const audience = AUDIENCES.find(a => a.id === audienceId) || AUDIENCES[0];
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accentColor);
  }, [t.accentColor]);
  return /*#__PURE__*/React.createElement(AppCtx.Provider, {
    value: t
  }, /*#__PURE__*/React.createElement(AudienceCtx.Provider, {
    value: {
      audience,
      setAudienceId
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#121a2e",
      color: "#eef2f8",
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      WebkitFontSmoothing: "antialiased",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(SiteNav, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(VideoSection, null), /*#__PURE__*/React.createElement(Problem, null), /*#__PURE__*/React.createElement(Solution, null), /*#__PURE__*/React.createElement(TeamSection, null), /*#__PURE__*/React.createElement(RoiCalculator, null), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(PricingSection, null), /*#__PURE__*/React.createElement(WhyLance, null), /*#__PURE__*/React.createElement(FinalCta, null)), /*#__PURE__*/React.createElement(SiteFooter, null)), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Brand"
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Brand name",
    value: t.brandName,
    onChange: v => setTweak("brandName", v)
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Domain",
    value: t.domainText,
    onChange: v => setTweak("domainText", v)
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Email",
    value: t.email,
    onChange: v => setTweak("email", v)
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Tagline",
    value: t.tagline,
    onChange: v => setTweak("tagline", v)
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Hero subline",
    value: t.heroTagline,
    onChange: v => setTweak("heroTagline", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Links"
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Calendly URL",
    value: t.calendlyUrl,
    onChange: v => setTweak("calendlyUrl", v)
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Stripe URL",
    value: t.stripeUrl,
    onChange: v => setTweak("stripeUrl", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Pricing"
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Total price",
    value: t.totalPrice,
    onChange: v => setTweak("totalPrice", v)
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Setup price",
    value: t.setupPrice,
    onChange: v => setTweak("setupPrice", v)
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Maintenance price",
    value: t.maintenancePrice,
    onChange: v => setTweak("maintenancePrice", v)
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Maintenance cadence",
    value: t.maintenanceCadence,
    onChange: v => setTweak("maintenanceCadence", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Accent colour"
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Colour",
    value: t.accentColor,
    options: ["#f0653f", "#2A6FDB", "#1F8A5B", "#7A5AE0"],
    onChange: v => setTweak("accentColor", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Default audience"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Audience",
    value: t.defaultAudience,
    options: ["consultant", "executive", "founder"],
    onChange: v => {
      setTweak("defaultAudience", v);
      setAudienceId(v);
    }
  }))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
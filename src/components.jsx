import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useReducer,
} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MeridianMist from "./components/ui/meridian-mist";
import { modules, routeMeta } from "./data";
import { candidates, initialDecision, decide } from "./model.mjs";
gsap.registerPlugin(ScrollTrigger);
const MotionContext = createContext({
  paused: false,
  reduced: false,
  toggle: () => {},
});
export function MotionProvider({ children }) {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = (e) => setReduced(e.matches);
    mq.addEventListener("change", change);
    return () => mq.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion =
      paused || reduced ? "paused" : "running";
  }, [paused, reduced]);
  useEffect(() => {
    const update = () =>
      (document.documentElement.dataset.hidden = document.hidden
        ? "true"
        : "false");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return (
    <MotionContext.Provider
      value={{ paused, reduced, toggle: () => setPaused((v) => !v) }}
    >
      {children}
    </MotionContext.Provider>
  );
}
export const useMotion = () => useContext(MotionContext);
export function Icon({ name, size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      className="icon"
      aria-hidden="true"
      {...props}
    >
      <use href={"/assets/icons/sprite.svg#" + name} />
    </svg>
  );
}
export function Button({
  to,
  children,
  variant = "dark",
  className = "",
  arrow = true,
  ...props
}) {
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Icon name="arrow-right" size={18} />}
    </>
  );
  return to ? (
    <Link
      to={to}
      className={`button button-${variant} ${className}`}
      {...props}
    >
      {content}
    </Link>
  ) : (
    <button className={`button button-${variant} ${className}`} {...props}>
      {content}
    </button>
  );
}
export function TextLink({ to, children, ...props }) {
  return (
    <Link className="text-link" to={to} {...props}>
      {children}
      <Icon name="arrow-up-right" size={18} />
    </Link>
  );
}
export function Eyebrow({ children, num }) {
  return (
    <div className="eyebrow">
      {num && <span className="chapter-num">{num}</span>}
      {children}
    </div>
  );
}
export function DemoBadge({ small = false }) {
  return (
    <span className={"demo-badge " + (small ? "small" : "")}>
      <span />
      DEMO — SYNTHETIC DATA
    </span>
  );
}
export function SectionHead({
  number,
  eyebrow,
  title,
  children,
  dark = false,
}) {
  return (
    <div className={"section-head reveal " + (dark ? "light" : "")}>
      <div>
        <Eyebrow num={number}>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {children && <div className="section-intro">{children}</div>}
    </div>
  );
}
export function MotionScene({ children, className = "", ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([e]) => (el.dataset.visible = e.isIntersecting ? "true" : "false"),
      { rootMargin: "100px" },
    );
    observer.observe(el);
    const visibility = () =>
      (el.dataset.hidden = document.hidden ? "true" : "false");
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={"motion-scene " + className}
      data-visible="false"
      {...props}
    >
      {children}
    </div>
  );
}
export function RouteEffects() {
  const { pathname, hash } = useLocation();
  const { paused, reduced } = useMotion();
  useLayoutEffect(() => {
    const meta = routeMeta[pathname.replace(/\/$/, "") || "/"];
    document.title = meta
      ? `${meta[0]} | CareKlin`
      : "Page not found | CareKlin";
    document.querySelector('meta[name="description"]').content =
      meta?.[1] || "CareKlin concept preview.";
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(() =>
        !document.querySelector("main")?.closest("[inert]") && document.querySelector("main")?.focus({ preventScroll: true }),
      );
    } else {
      requestAnimationFrame(() =>
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "instant" }),
      );
    }
  }, [pathname]);
  useLayoutEffect(() => {
    if (paused || reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) =>
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          },
        ),
      );
      gsap.utils.toArray("[data-parallax]").forEach((el) =>
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax),
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }),
      );
      if (document.querySelector(".hero-line"))
        gsap.from(".hero-line > span", {
          yPercent: 105,
          rotate: 1.5,
          duration: 1.15,
          stagger: 0.12,
          ease: "power4.out",
        });
      if (document.querySelector(".hero-side"))
        gsap.from(".hero-side", {
          opacity: 0,
          y: 22,
          duration: 0.8,
          delay: 0.45,
          ease: "power3.out",
        });
      if (document.querySelector(".hero-workspace"))
        gsap.to(".hero-workspace", {
          scale: 1,
          y: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-workspace",
            start: "top 95%",
            end: "center 45%",
            scrub: 1,
          },
        });
      // Scrubbed compositions: movement follows reading progress, never decisions.
      gsap.utils.toArray(".bridge-visual, .ecosystem-diagram, .cta-thread").forEach((el) => {
        gsap.fromTo(el, { y: 42, scale: .96 }, { y: -14, scale: 1, ease: "none",
          scrollTrigger: { trigger: el.closest("section") || el, start: "top 85%", end: "bottom 20%", scrub: .65 } });
      });
      gsap.utils.toArray(".module-media").forEach((el) => {
        gsap.fromTo(el, { scale: .96 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "center 45%", scrub: .5 } });
      });
      gsap.utils.toArray(".module-card").forEach((el, i) => {
        gsap.fromTo(el, { clipPath: "inset(12% 0 0 0 round 9px)" }, { clipPath: "inset(0% 0 0 0 round 9px)", ease: "none",
          scrollTrigger: { trigger: el, start: "top 96%", end: "top 55%", scrub: .5 } });
      });
      gsap.utils.toArray(".gate-strip > div, .score-row, .constraint-ribbon > span").forEach((el, i) => {
        gsap.fromTo(el, { y: 22, opacity: .35 }, { y: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 96%", end: "top 72%", scrub: .5 } });
      });
      gsap.utils.toArray(".travel-thread path").forEach((el) => {
        const length = el.getTotalLength();
        gsap.fromTo(el, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: ".bridge-section", start: "top 85%", end: "bottom 45%", scrub: .4 } });
      });
      gsap.utils.toArray(".section-head h2, .pilot-intro h2, .evaluation-copy h2").forEach((el) => {
        gsap.fromTo(el, { y: 26 }, { y: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 55%", scrub: .4 } });
      });
      gsap.to(".site-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    const timer = setTimeout(refresh, 400);
    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [pathname, paused, reduced]);
  return null;
}
export function Nav() {
  const { pathname } = useLocation();
  const { paused, reduced, toggle } = useMotion();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 35);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    setOpen(false);
    setProducts(false);
  }, [pathname]);
  useEffect(() => {
    const escape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setProducts(false);
        const target = document.activeElement?.closest(".mega")
          ? document.querySelector(".nav-products>button")
          : document.querySelector(".menu-toggle");
        target?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className={`nav ${scrolled ? "scrolled" : ""} ${pathname === "/" ? "nav-home" : ""}`}
      >
        <div className="nav-inner">
          <Link className="brand" to="/" aria-label="CareKlin home">
            <img
              src="/assets/brand/logo-on-orange.svg"
              width="167"
              height="39"
              alt="CareKlin"
            />
          </Link>
          <nav
            aria-label="Main navigation"
            className={open ? "nav-links open" : "nav-links"}
          >
            <div className="nav-products">
              <button
                className={products ? "nav-link active" : "nav-link"}
                aria-expanded={products}
                aria-controls="product-menu"
                onClick={() => setProducts((v) => !v)}
              >
                Products
                <Icon name="chevron-down" size={14} />
              </button>
              {products && (
                <div className="mega" id="product-menu">
                  <div className="mega-intro">
                    <span className="eyebrow">PROPOSED MODULES</span>
                    <strong>
                      One gap.
                      <br />
                      Five ways to help.
                    </strong>
                    <TextLink to="/products">Explore the platform</TextLink>
                  </div>
                  <div>
                    {modules.map((m) => (
                      <Link key={m.slug} to={"/products/" + m.slug}>
                        <Icon name={m.icon} size={23} />
                        <span>
                          <b>{m.name}</b>
                          <small>{m.offer}</small>
                        </span>
                        <Icon name="arrow-up-right" size={16} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <NavLink className="nav-link" to="/how-it-works">
              Workflow
            </NavLink>
            <NavLink className="nav-link" to="/evaluation">
              Why CareKlin
            </NavLink>
            <NavLink className="nav-link" to="/pilot">
              Pilot
            </NavLink>
            <Link className="mobile-sign" to="/sign-in">
              Sign in
            </Link>
          </nav>
          <div className="nav-actions">
            <Link className="nav-sign" to="/sign-in">
              Sign in
            </Link>
            <Button to="/request-pilot" className="nav-cta">
              Request a pilot
            </Button>
            <button
              className="menu-toggle"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      <button
        className="motion-control"
        onClick={toggle}
        aria-pressed={paused}
        title={
          reduced
            ? "Reduced motion is enabled by your device"
            : paused
              ? "Resume motion"
              : "Pause motion"
        }
      >
        <Icon name={paused || reduced ? "play" : "pause"} size={14} />
        <span>
          {reduced
            ? "Reduced motion"
            : paused
              ? "Motion paused"
              : "Pause motion"}
        </span>
      </button>
      {products && (
        <button
          className="nav-dismiss"
          aria-label="Close products menu"
          onClick={() => setProducts(false)}
        />
      )}
      <div className="site-progress" />
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div className="footer-brand">
          <img
            src="/assets/brand/logo-primary.svg"
            width="174"
            alt="CareKlin"
          />
          <p>
            A little more clarity.
            <br />A human in the loop.
          </p>
          <span className="concept-tag">
            CONCEPT PREVIEW · NOT AN OPERATING PRODUCT
          </span>
        </div>
        <div>
          <h3>Product</h3>
          {modules.map((m) => (
            <Link key={m.slug} to={"/products/" + m.slug}>
              {m.name}
            </Link>
          ))}
          <Link to="/preview">Interactive preview</Link>
        </div>
        <div>
          <h3>Explore</h3>
          {[
            ["/how-it-works", "How it works"],
            ["/use-cases", "Use cases"],
            ["/ecosystem", "Ecosystem"],
            ["/evaluation", "Evidence & evaluation"],
            ["/governance", "Governance"],
            ["/pilot", "Pilot & pricing"],
          ].map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h3>CareKlin</h3>
          <Link to="/company">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/request-pilot">Request a pilot</Link>
          <Link to="/sign-in">Sign in</Link>
          <a href="/sources.html">Research sources</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 CareKlin · Working brand. All examples synthetic.</span>
        <div>
          <Link to="/legal/privacy">Privacy</Link>
          <Link to="/legal/terms">Terms</Link>
          <Link to="/accessibility">Accessibility</Link>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">
        CareKlin<span>↗</span>
      </div>
    </footer>
  );
}
export function FlowBackdrop() {
  return (
    <div className="flow-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1440 1100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern
            id="finegrid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M100 0H0V100"
              fill="none"
              stroke="currentColor"
              strokeWidth=".5"
            />
          </pattern>
        </defs>
        <rect width="1440" height="1100" fill="url(#finegrid)" />
        <path
          className="ambient-route"
          d="M1370 -100V230Q1370 310 1290 310H1080Q1000 310 1000 390V640Q1000 720 920 720H200Q120 720 120 800V1200"
        />
        <circle className="ambient-dot" r="4" />
      </svg>
    </div>
  );
}
export function HeroSchedule() {
  return (
    <MotionScene className="hero-workspace">
      <div className="absence-toast">
        <span className="pulse-dot" />
        08:12 <span className="toast-divider" /> Absence reported
        <Icon name="chevron-down" size={14} />
      </div>
      <div className="schedule-board">
        <div className="schedule-toolbar">
          <div>
            <Icon name="visit-desk" />
            <strong>Tuesday, 20 October</strong>
            <span className="muted year">2026</span>
          </div>
          <DemoBadge small />
          <span className="schedule-view">
            Day view <Icon name="chevron-down" size={14} />
          </span>
        </div>
        <div className="schedule-grid">
          <div className="schedule-times">
            <span>CARE TEAM</span>
            <span>08:00</span>
            <span>09:00</span>
            <span>10:00</span>
          </div>
          {["A", "B", "C"].map((id, i) => (
            <div className={"schedule-row row-" + id} key={id}>
              <div className="caregiver">
                <span className="avatar">{id}</span>
                <div>
                  <b>Caregiver {id}</b>
                  <small>
                    {i === 2 ? "Available for review" : "Example day plan"}
                  </small>
                </div>
              </div>
              <div className={"visit-cell cell-" + i}>
                <b>
                  {i === 0
                    ? "DEMO-CLIENT-014"
                    : i === 1
                      ? "Prior commitment"
                      : "Availability opens"}
                </b>
                <small>
                  {i === 2
                    ? "08:30 — 11:00"
                    : i === 1
                      ? "Ends 08:50"
                      : "08:00 — 09:00"}
                </small>
              </div>
              <div
                className={
                  i === 0
                    ? "visit-cell gap-cell"
                    : i === 2
                      ? "visit-cell candidate-cell"
                      : "visit-cell"
                }
              >
                <b>
                  {i === 0
                    ? "Uncovered visit"
                    : i === 1
                      ? "Travel constraint"
                      : "Possible coverage"}
                </b>
                <small>
                  {i === 0
                    ? "09:00 — 10:00"
                    : i === 1
                      ? "Earliest arrival 09:15"
                      : "Review required"}
                </small>
                {i === 0 && <span className="gap-cross">+</span>}
              </div>
              <div className="visit-cell last-cell">
                <b>{i === 2 ? "Availability continues" : "Example visit"}</b>
                <small>10:00 — 11:00</small>
              </div>
            </div>
          ))}
        </div>
        <div className="schedule-foot">
          <span>
            <span className="tiny-dot" />1 exception in focus
          </span>
          <span>Example day plan · no live schedule</span>
        </div>
      </div>
      <div className="floating-review">
        <div className="floating-top">
          <span className="eyebrow">VISIT EXCEPTION</span>
          <span>001</span>
        </div>
        <h3>
          There’s a way
          <br />
          through this.
        </h3>
        <div className="mini-time">
          <Icon name="clock" size={16} />
          09:00—10:00 <span>1.0h</span>
        </div>
        <div className="review-candidate">
          <span className="avatar orange">C</span>
          <div>
            <b>Caregiver C</b>
            <small>08:50 arrival · within window</small>
          </div>
          <Icon name="check" size={18} />
        </div>
        <div className="hours-label">
          <span>Proposed / remaining</span>
          <b>1.0h / 3.0h</b>
        </div>
        <div className="hour-track">
          <span />
        </div>
        <div className="approval-strip">
          <Icon name="person" size={17} />
          Dispatcher approval required
        </div>
        <Link to="/preview" className="scene-link">
          Open this example
          <Icon name="arrow-up-right" size={17} />
        </Link>
      </div>
      <div className="scene-caption">
        <span>CONCEPT PREVIEW</span>
        <span>Source → constraints → human decision</span>
      </div>
    </MotionScene>
  );
}
export function CandidateList({ compact = false }) {
  return (
    <div className={"candidate-list " + (compact ? "compact" : "")}>
      {candidates.map((c) => (
        <div key={c.id} className={"candidate candidate-" + c.id}>
          <span className="avatar">{c.id}</span>
          <div>
            <b>{c.name}</b>
            <small>{c.reason}</small>
          </div>
          <span
            className={
              "status " + (c.id === "C" ? "status-good" : "status-neutral")
            }
          >
            {compact ? (c.id === "C" ? "Review" : "Excluded") : c.status}
          </span>
        </div>
      ))}
    </div>
  );
}
export function HoursMeter({ remaining = 3, requested = 1 }) {
  return (
    <div className="hours-meter">
      <div className="hours-label">
        <span>Authorization window</span>
        <b>08:00–12:00</b>
      </div>
      <div className="meter-numbers">
        <strong>
          {requested.toFixed(1)}
          <small>h proposed</small>
        </strong>
        <span>/</span>
        <strong>
          {remaining.toFixed(1)}
          <small>h remaining</small>
        </strong>
      </div>
      <div className={"meter-track " + (remaining < requested ? "over" : "")}>
        {Array.from({ length: 24 }, (_, i) => (
          <i
            key={i}
            style={{ "--i": i }}
            className={
              i < Math.min(24, Math.round((requested / remaining) * 24))
                ? "filled"
                : ""
            }
          />
        ))}
      </div>
      <p className="mono">
        {remaining < requested
          ? "BOUNDARY EXCEEDED · ABSTAIN"
          : "DEMO-AUTH-001 · recorded 08:05"}
      </p>
    </div>
  );
}
export function DecisionBox() {
  const [state, dispatch] = useReducer(decide, initialDecision);
  return (
    <div className="decision-box">
      <div className="decision-title">
        <Icon name="person" />
        <div>
          <b>Dispatcher Rowan</b>
          <small>Fictional reviewer · 20 Oct 2026</small>
        </div>
        <span
          className={
            "status " + (state.approved ? "status-good" : "status-warn")
          }
        >
          {state.approved ? "Simulated approval" : "Your review"}
        </span>
      </div>
      <p>
        {state.approved
          ? "Caregiver C is approved in this example. If allocated, 2.0 hours would remain. No assignment or message was sent."
          : "Skill, availability, travel and hours are visible. The decision stays with you."}
      </p>
      <Button
        variant={state.approved ? "outline" : "dark"}
        arrow={false}
        onClick={() =>
          dispatch(
            state.approved
              ? { type: "reset" }
              : { type: "approve", caseId: "DEMO-VIS-001", candidateId: "C" },
          )
        }
      >
        {state.approved ? (
          <>
            <Icon name="reset" size={16} />
            Undo simulated approval
          </>
        ) : (
          <>
            Simulate dispatcher approval
            <Icon name="check" size={16} />
          </>
        )}
      </Button>
      <div className="decision-live" role="status">
        {state.approved
          ? "08:15 · Local simulation recorded. Reversible."
          : "No external actions are connected."}
      </div>
      <div className="notification-draft">
        <Icon name="mail" />
        <div>
          <b>Family status update</b>
          <small>DRAFT — UNSENT</small>
        </div>
        <Icon name="lock" size={15} />
      </div>
    </div>
  );
}
export function Story({ standalone = false }) {
  const root = useRef(null);
  const [step, setStep] = useState(0);
  const { paused, reduced } = useMotion();
  const [pinned, setPinned] = useState(false);
  const trigger = useRef(null);
  useLayoutEffect(() => {
    if (paused || reduced) {
      setPinned(false);
      return;
    }
    const mm = gsap.matchMedia();
    mm.add("(min-width: 961px) and (min-height: 700px)", () => {
      setPinned(true);
      trigger.current = ScrollTrigger.create({
        trigger: root.current,
        start: "top 82px",
        end: "+=190%",
        pin: root.current.querySelector(".story-stage"),
        pinSpacing: true,
        onUpdate: (s) => {
          setStep(Math.min(2, Math.floor(s.progress * 3)));
          root.current.style.setProperty("--story-progress", s.progress);
        },
      });
      return () => {
        trigger.current = null;
        setPinned(false);
      };
    });
    return () => {
      const wasActive = trigger.current?.isActive;
      mm.revert();
      if (wasActive && root.current?.isConnected)
        window.scrollTo({
          top: root.current.getBoundingClientRect().top + window.scrollY - 82,
          behavior: "instant",
        });
    };
  }, [paused, reduced]);
  const choose = (i) => {
    if (trigger.current) {
      window.scrollTo({
        top:
          trigger.current.start +
          ((trigger.current.end - trigger.current.start) * (i + 0.4)) / 3,
        behavior: "instant",
      });
    }
    setStep(i);
  };
  const text = [
    [
      "08:12",
      "A gap appears.",
      "One absence. A whole day to consider.",
      "An absence arrives for a 09:00 visit. The record brings the source, service window and next reviewer into focus.",
    ],
    [
      "08:13",
      "Every option has a reason.",
      "Fit is more than being available.",
      "A lacks the required skill. B cannot make the travel time. C fits the recorded constraints—and still needs a dispatcher’s review.",
    ],
    [
      "08:15",
      "People make the call.",
      "A recommendation is not a decision.",
      "The dispatcher owns the next step. EVV stays separate, and the family update remains a draft. Try a reversible, local approval.",
    ],
  ][step];
  return (
    <section
      className={"story-section " + (standalone ? "standalone" : "")}
      id="the-story"
      ref={root}
    >
      <div className="story-stage">
        <div className="story-progress-line" aria-hidden="true" />
        <div className="container">
          <div className="story-top">
            <Eyebrow num="02">ONE TUESDAY. ONE EXCEPTION.</Eyebrow>
            <a href="#after-story" className="skip-story">
              Skip the story <Icon name="arrow-right" size={15} />
            </a>
          </div>
          <div className="story-tabs" aria-label="Exception story steps">
            {[
              "Detect the gap",
              "Check the constraints",
              "Review the next step",
            ].map((s, i) => (
              <button
                key={s}
                className={step === i ? "selected" : ""}
                aria-pressed={step === i}
                onClick={() => choose(i)}
              >
                <span>0{i + 1}</span>
                {s}
                <i />
              </button>
            ))}
          </div>
          <div className="story-layout">
            <div className="story-copy" key={"copy" + step}>
              <span className="story-clock">{text[0]}</span>
              <h2>{text[1]}</h2>
              <h3>{text[2]}</h3>
              <p>{text[3]}</p>
              <div className="story-hint">
                <span className="mini-scroll" />
                {pinned
                  ? "Scroll to follow the exception"
                  : "Choose a step above to explore"}
              </div>
            </div>
            <div className="story-visual" key={"visual" + step}>
              <div className="story-panel-top">
                <DemoBadge small />
                <span className="mono">DEMO-VIS-001</span>
              </div>
              {step === 0 ? (
                <div className="intake-scene">
                  <div className="intake-head">
                    <span className="large-icon">
                      <Icon name="visit-desk" size={32} />
                    </span>
                    <span className="status status-warn">Uncovered</span>
                  </div>
                  <h3>09:00—10:00</h3>
                  <p>Personal-care visit · DEMO-CLIENT-001</p>
                  <div className="source-row">
                    <Icon name="source" />
                    <div>
                      <b>Absence reported</b>
                      <small>DEMO-SRC-001 · 20 Oct 2026, 08:12</small>
                    </div>
                    <span className="source-tick">↗</span>
                  </div>
                  <div className="timeline-line">
                    <div>
                      <b>08:12</b>
                      <span>Reported</span>
                    </div>
                    <i />
                    <div>
                      <b>09:00</b>
                      <span>Scheduled start</span>
                    </div>
                  </div>
                  <div className="next-owner">
                    <span className="avatar">R</span>
                    <div>
                      <b>Dispatcher Rowan</b>
                      <small>Fictional review owner · next action 08:13</small>
                    </div>
                  </div>
                </div>
              ) : step === 1 ? (
                <>
                  <CandidateList />
                  <div className="constraint-pills">
                    {[
                      "Skill",
                      "Travel",
                      "Availability",
                      "Hours",
                      "Preference",
                    ].map((s) => (
                      <span key={s}>
                        <Icon name="check" size={13} />
                        {s}
                      </span>
                    ))}
                  </div>
                  <HoursMeter />
                </>
              ) : (
                <>
                  <div className="selected-candidate">
                    <span className="avatar orange">C</span>
                    <div>
                      <b>Caregiver C</b>
                      <small>08:50 arrival · 10 min before start</small>
                    </div>
                    <span className="status status-good">
                      Feasible in example
                    </span>
                  </div>
                  <DecisionBox />
                  <div className="evv-independent">
                    <span className="tiny-dot" /> EVV: not yet expected
                    <span>Separate verification</span>
                  </div>
                </>
              )}
              <div className="story-panel-foot">
                <Icon name="source" size={14} />
                Source-linked. Human-reviewed. Synthetic only.
              </div>
            </div>
          </div>
        </div>
      </div>
      <span id="after-story" />
    </section>
  );
}
export function ModuleVisual({ type }) {
  if (type === "visit-desk")
    return (
      <MotionScene className="module-art desk-art">
        <div className="mini-window">
          <div className="mini-window-head">
            <Icon name="visit-desk" size={16} />
            <b>Exception desk</b>
            <span>3 in focus</span>
          </div>
          {[
            ["001", "Uncovered visit", "08:12", "Review"],
            ["002", "Conflicting sources", "08:16", "Review"],
            ["003", "Hours exceeded", "08:19", "Blocked"],
          ].map(([id, t, time, status], i) => (
            <div className={"mini-queue q-" + i} key={id}>
              <span className="queue-square">{id}</span>
              <div>
                <b>{t}</b>
                <small>
                  DEMO-VIS-{id} · {time}
                </small>
              </div>
              <span
                className={
                  "status " + (i === 2 ? "status-danger" : "status-warn")
                }
              >
                {status}
              </span>
            </div>
          ))}
        </div>
        <div className="mini-float">
          <span className="pulse-dot" />
          <span>A gap has an owner.</span>
          <b>Rowan ↗</b>
        </div>
      </MotionScene>
    );
  if (type === "visit-review")
    return (
      <MotionScene className="module-art match-art">
        <svg className="match-lines" viewBox="0 0 500 260" aria-hidden="true">
          <path d="M70 65H175Q210 65 210 105V130H330" />
          <path d="M70 130H330" />
          <path
            className="active-flow"
            d="M70 195H175Q210 195 210 155V130H330"
          />
        </svg>
        <div className="match-options">
          {["A", "B", "C"].map((x, i) => (
            <div className={"match-option m-" + i} key={x}>
              <span className="avatar">{x}</span>
              <span>
                {["Skill missing", "Travel too late", "Fits constraints"][i]}
              </span>
              <Icon name={i === 2 ? "check" : "close"} size={15} />
            </div>
          ))}
        </div>
        <div className="match-destination">
          <Icon name="person" size={24} />
          <b>
            Human
            <br />
            review
          </b>
        </div>
        <span className="flow-particle" />
      </MotionScene>
    );
  if (type === "visit-proof")
    return (
      <MotionScene className="module-art proof-art">
        <div className="proof-time">
          <span>08:00</span>
          <b>AUTHORIZED WINDOW</b>
          <span>12:00</span>
        </div>
        <div className="proof-window">
          <div className="proof-block">
            <span>PROPOSED VISIT</span>
            <b>09:00–10:00</b>
          </div>
          <span className="proof-tick" />
        </div>
        <HoursMeter />
      </MotionScene>
    );
  if (type === "visit-signal")
    return (
      <MotionScene className="module-art signal-art">
        <div className="signal-source">
          <span className="source-icon">
            <Icon name="source" />
          </span>
          <div>
            <small>SCHEDULE SOURCE</small>
            <b>
              Visit end <span>11:00</span>
            </b>
          </div>
          <span className="signal-dot" />
        </div>
        <div className="signal-connector">
          <i />
          <span>
            <Icon name="warning" size={18} />
            Source conflict
          </span>
          <i />
        </div>
        <div className="signal-source">
          <span className="source-icon">
            <Icon name="clock" />
          </span>
          <div>
            <small>AVAILABILITY NOTE</small>
            <b>
              Available until <span>10:30</span>
            </b>
          </div>
        </div>
        <div className="signal-review">
          <span className="avatar">Q</span>Quinn · review required
          <Icon name="arrow-right" size={16} />
        </div>
      </MotionScene>
    );
  return (
    <MotionScene className="module-art report-art">
      <div className="orbit-ring ring-one" />
      <div className="orbit-ring ring-two" />
      <span className="orbit-node n-one">
        <Icon name="person" />
      </span>
      <span className="orbit-node n-two">
        <Icon name="lock" />
      </span>
      <div className="message-preview">
        <div>
          <Icon name="mail" />
          <span>DRAFT — UNSENT</span>
        </div>
        <b>
          A status update.
          <br />A permission check.
        </b>
        <p>
          Recipient role: family contact
          <br />
          Reviewer: dispatcher
        </p>
        <span className="message-lock">
          <Icon name="lock" size={14} />
          No outbound connection
        </span>
      </div>
    </MotionScene>
  );
}
export function ModuleGrid({ all = true }) {
  return (
    <div className="module-grid">
      {modules.slice(0, all ? 5 : 2).map((m, i) => (
        <article className={`module-card reveal module-card-${i}`} key={m.slug}>
          <div className="module-label">
            <span>
              {m.number} / {m.name.toUpperCase()}
            </span>
            <span>PROPOSED MODULE</span>
          </div>
          <div className="module-media">
            <ModuleVisual type={m.slug} />
            <span className="module-disclosure">DEMO / SYNTHETIC DATA</span>
          </div>
          <div className="module-copy">
            <h3>
              {m.title.split("\n").map((s, i) => (
                <React.Fragment key={s}>
                  {i > 0 && <br />}
                  {s}
                </React.Fragment>
              ))}
            </h3>
            <p>{m.offer}</p>
            <Link
              to={"/products/" + m.slug}
              className="module-cta"
              aria-label={"Explore " + m.name}
            >
              <span>Explore {m.name}</span>
              <span>
                <Icon name="arrow-up-right" size={21} />
              </span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
export function EcosystemDiagram() {
  return (
    <MotionScene className="ecosystem-diagram">
      <svg viewBox="0 0 800 420" aria-hidden="true">
        <path d="M100 90H240Q300 90 300 150V210H400M100 330H240Q300 330 300 270V210H400M700 90H560Q500 90 500 150V210H400M700 330H560Q500 330 500 270V210H400" />
        <path
          className="ecosystem-flow"
          d="M100 90H240Q300 90 300 150V210H500V150Q500 90 560 90H700"
        />
        <circle cx="400" cy="210" r="116" />
        <circle cx="400" cy="210" r="150" className="diagram-orbit" />
      </svg>
      <div className="eco-center">
        <img src="/assets/brand/symbol-orange.svg" alt="" />
        <b>CareKlin</b>
        <small>Proposed review layer</small>
      </div>
      <div className="eco-node eco-one">
        <Icon name="visit-desk" />
        <span>
          Incumbent
          <br />
          <b>scheduler</b>
        </span>
      </div>
      <div className="eco-node eco-two">
        <Icon name="visit-signal" />
        <span>
          State-governed
          <br />
          <b>EVV workflow</b>
        </span>
      </div>
      <div className="eco-node eco-three">
        <Icon name="credential" />
        <span>
          Agency-owned
          <br />
          <b>evidence</b>
        </span>
      </div>
      <div className="eco-node eco-four">
        <Icon name="person" />
        <span>
          Accountable
          <br />
          <b>human reviewer</b>
        </span>
      </div>
    </MotionScene>
  );
}
export function CTA() {
  return (
    <section className="cta-section">
      <BrandMist tone="warm" />
      <div className="container">
        <Eyebrow>START SMALL. LEARN SOMETHING REAL.</Eyebrow>
        <div className="cta-layout">
          <h2 className="reveal">
            Let’s find
            <br />
            your first gap<span>.</span>
          </h2>
          <div className="reveal">
            <p>
              Bring the workflow.
              <br />
              We’ll start with the questions.
            </p>
            <Button to="/request-pilot">Request a scoped pilot</Button>
            <small>
              For agency COOs and staffing directors.
              <br />
              One state. One branch. An agreed review gate.
            </small>
          </div>
        </div>
        <div className="cta-thread" aria-hidden="true">
          <i />
          <span />
          <i />
        </div>
      </div>
    </section>
  );
}

const warmMist = { inkColor: "#b5472d", navyColor: "#db6a40", royalColor: "#f58b55", skyColor: "#ffd4a4", lilacColor: "#e99c76", slateColor: "#f5ae78", mistColor: "#ffe0b4", lineColor: "#7c3824", depth: .4, haze: .7, bloom: 1.25, grain: .035, grainFps: 0, speed: .5, columns: [.16,.84], rows: [.22,.78], circles: 2, circleRadius: .43, lineOpacity: .12 };
const heroMist = { ...warmMist, circles: 0 };
const forestMist = { ...warmMist, circles: 0, inkColor: "#142e29", navyColor: "#1c4438", royalColor: "#397960", skyColor: "#8caf80", lilacColor: "#577e5e", slateColor: "#315f4d", mistColor: "#a9b489", lineColor: "#d2ddbb", depth: 1, haze: .4, lineOpacity: .1 };
export function BrandMist({ tone = "warm" }) {
  const { paused, reduced } = useMotion();
  const root = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setReady(true); io.disconnect(); } }, { rootMargin: "200px" });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);
  return <div ref={root} className={"brand-mist brand-mist-" + tone} aria-hidden="true">{ready && <MeridianMist height="100%" params={tone === "forest" ? forestMist : tone === "hero" ? heroMist : warmMist} paused={paused || reduced} interactive={false} maxDpr={1.25} />}</div>;
}
export function TravelThread() {
  return <div className="travel-thread" aria-hidden="true">
    <svg viewBox="0 0 600 240" fill="none"><path d="M0 190H105Q145 190 145 150V100Q145 60 185 60H320Q360 60 360 100V160Q360 200 400 200H600" stroke="currentColor" strokeWidth="2"/><circle cx="145" cy="112" r="7"/><circle cx="358" cy="126" r="7"/><circle cx="505" cy="200" r="7"/></svg>
    <span className="travel-chip travel-chip-a">A / SKILL MISMATCH</span><span className="travel-chip travel-chip-b">B / ARRIVES 09:15</span><span className="travel-chip travel-chip-c">C / ARRIVES 08:50 ↗</span>
  </div>;
}

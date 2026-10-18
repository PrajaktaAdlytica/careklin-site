import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BrandMist,
  TravelThread,
  Button,
  CTA,
  DemoBadge,
  EcosystemDiagram,
  Eyebrow,
  HeroSchedule,
  Icon,
  ModuleGrid,
  SectionHead,
  Story,
  TextLink,
} from "./components";
import { faq, gates } from "./data";
import { cases } from "./model.mjs";
export function FAQ() {
  return (
    <div className="faq-list">
      {faq.map(([q, a], i) => (
        <details key={q}>
          <summary>
            <span className="mono">0{i + 1}</span>
            <span>{q}</span>
            <i>+</i>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function CaseExplorer() {
  const [active, setActive] = useState(0);
  const c = cases[active];
  return (
    <div className="case-explorer">
      <div className="case-nav" aria-label="Synthetic cases">
        {cases.slice(0, 3).map((c, i) => (
          <button
            key={c.id}
            className={active === i ? "selected" : ""}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            <div>
              <b>
                {["A clear path", "An open question", "A reason to stop"][i]}
              </b>
              <small>
                {
                  [
                    "Feasible · human review",
                    "Ambiguous · source conflict",
                    "Blocked · abstain",
                  ][i]
                }
              </small>
            </div>
            <Icon name="arrow-up-right" size={18} />
          </button>
        ))}
      </div>
      <div className={"case-content case-" + active} key={active}>
        <div className="case-content-top">
          <DemoBadge small />
          <span className="mono">{c.id}</span>
        </div>
        <div className="case-icon">
          <Icon name={["check", "source", "abstain"][active]} size={34} />
        </div>
        <h3>{c.title}</h3>
        <p>{c.summary}</p>
        <div className="case-meta">
          <span>
            <b>{c.owner}</b>
            <small>Fictional owner · 20 Oct 2026, {c.at}</small>
          </span>
          <span
            className={
              "status " +
              ["status-good", "status-warn", "status-danger"][active]
            }
          >
            {c.status}
          </span>
        </div>
        <TextLink to={"/preview?case=" + c.id}>Inspect the example</TextLink>
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <>
      <section className="hero">
        <BrandMist tone="hero" />
        <div className="hero-texture" aria-hidden="true" />
        <div className="container">
          <div className="hero-label">
            <Eyebrow>HOME-CARE OPERATIONS / CONCEPT PREVIEW</Eyebrow>
            <span className="mono hero-edition">
              A HUMAN IN THE LOOP. ALWAYS.
            </span>
          </div>
          <div className="hero-heading">
            <h1 tabIndex={-1}>
              <span className="hero-line">
                <span>A gap in the day.</span>
              </span>
              <span className="hero-line">
                <span>A way forward.</span>
              </span>
            </h1>
            <div className="hero-side">
              <p>
                Resolve missed home-care visits with a dispatcher-approved
                exception desk.
              </p>
              <TextLink to="/preview">Explore the demo</TextLink>
              <button className="intro-replay" onClick={()=>window.dispatchEvent(new Event("careklin:replay-intro"))}>Watch the opening <span aria-hidden="true">↗</span></button>
              <span className="hero-note">
                Proposed software. Synthetic examples.
                <br />
                Your team stays in control.
              </span>
            </div>
          </div>
          <HeroSchedule />
        </div>
        <div className="hero-bottom">
          <span>BUILT AROUND THE EXCEPTION.</span>
          <a href="#the-story">
            FOLLOW ONE TUESDAY
            <Icon name="arrow-right" size={16} />
          </a>
        </div>
      </section>
      <div className="journey-rail">
        <div className="container">
          <span>
            <b>01</b> DETECT
          </span>
          <i />
          <span>
            <b>02</b> CHECK
          </span>
          <i />
          <span>
            <b>03</b> REVIEW
          </span>
        </div>
      </div>
      <Story />
      <section className="bridge-section container">
        <div className="bridge-visual">
          <div className="bridge-time" aria-hidden="true">09:00</div>
          <TravelThread />
        </div>
        <div className="bridge-copy reveal">
          <Eyebrow>THE VISIT IS THE POINT.</Eyebrow>
          <h2>
            Less chasing.
            <br />
            More clarity.
          </h2>
          <p>
            Availability is only the beginning. Travel, skills, preferences and
            authorized hours all shape what can happen next.
          </p>
          <span className="small-note">
            CareKlin’s proposed role: bring those constraints into view.
          </span>
        </div>
      </section>
      <section className="modules-section container" id="modules">
        <SectionHead
          number="03"
          eyebrow="FIVE PROPOSED MODULES"
          title={
            <>
              Built for the work
              <br />
              between visits.
            </>
          }
        >
          <p>
            Start with the exception desk. Test each adjacent workflow on its
            own merits.
          </p>
          <TextLink to="/products">See the product direction</TextLink>
        </SectionHead>
        <div className="constraint-ribbon" aria-label="Constraints reviewed">
          {["Skill", "Travel", "Availability", "Hours", "Preference"].map((label, i) => <span key={label}><i>0{i+1}</i>{label}<Icon name="check" size={14}/></span>)}
        </div>
        <ModuleGrid />
      </section>
      <section className="ecosystem-section">
        <BrandMist tone="forest" />
        <div className="container">
          <SectionHead
            number="04"
            eyebrow="A LAYER AROUND YOUR WORKFLOW"
            title={
              <>
                Keep the system.
                <br />
                Find the missing context.
              </>
            }
            dark
          >
            <p>
              Your scheduler and mandatory EVV stay in place. CareKlin’s
              proposed role begins with the exceptions between them.
            </p>
            <TextLink to="/ecosystem">
              Explore the integration questions
            </TextLink>
          </SectionHead>
          <EcosystemDiagram />
          <div className="ecosystem-bottom">
            <p>
              Manual dispatch. HHAeXchange. Axxess.
              <br />
              The starting point is your actual workflow.
            </p>
            <span>
              <Icon name="info" size={17} />
              Integration is a discovery question,
              <br />
              not a capability available today.
            </span>
          </div>
        </div>
      </section>
      <section className="cases-section container">
        <SectionHead
          number="05"
          eyebrow="CLARITY INCLUDES A STOP SIGNAL"
          title={
            <>
              A good system knows
              <br />
              when to pause.
            </>
          }
        >
          <p>
            A clear path, an unresolved question, and a blocked case. All three
            belong in the demo.
          </p>
        </SectionHead>
        <CaseExplorer />
      </section>
      <section className="evaluation-section container">
        <div className="evaluation-copy reveal">
          <Eyebrow num="06">PROVE THE WORKFLOW FIRST</Eyebrow>
          <h2>
            A useful pilot
            <br />
            starts with
            <br />
            <em>a baseline.</em>
          </h2>
          <p>
            Measure feasible coverage approved before a visit starts, compared
            with the agency’s own baseline.
          </p>
          <TextLink to="/evaluation">See the evaluation plan</TextLink>
        </div>
        <div className="evaluation-board reveal">
          <div className="evaluation-board-head">
            <span className="eyebrow">PILOT SCORECARD</span>
            <span className="status status-neutral">Not yet measured</span>
          </div>
          <div className="score-main">
            <span>Primary endpoint</span>
            <h3>
              Dispatcher-approved
              <br />
              feasible coverage
            </h3>
            <div className="score-formula">
              <span>Before scheduled start</span>
              <i>÷</i>
              <span>
                All missed visits
                <br />
                in the agreed cohort
              </span>
            </div>
          </div>
          <div className="score-row">
            <span>Baseline window</span>
            <b>To agree with sponsor</b>
          </div>
          <div className="score-row">
            <span>Authorization breaches</span>
            <b>Guardrail</b>
          </div>
          <div className="score-row">
            <span>Dispatcher minutes</span>
            <b>Guardrail</b>
          </div>
          <div className="score-foot">
            No measured savings, clinical benefit or ROI claimed.
          </div>
        </div>
      </section>
      <section className="pilot-section container">
        <div className="pilot-intro reveal">
          <Eyebrow num="07">A BOUNDED BEGINNING</Eyebrow>
          <h2>
            One branch.
            <br />
            One state.
            <br />
            One honest test.
          </h2>
          <p>
            Shadow the dispatch workflow. Replay anonymized missed shifts. Agree
            on what success—and stopping—look like.
          </p>
          <TextLink to="/pilot">What a scoped pilot needs</TextLink>
        </div>
        <div className="price-card reveal">
          <span className="eyebrow">HYPOTHETICAL TEST PRICE</span>
          <div className="price">
            <span>$</span>650<small>/ branch / month</small>
          </div>
          <div className="setup-price">
            + $3,000 <span>state / EVV setup</span>
          </div>
          <p>
            A pricing hypothesis to test with an agency COO. No active offer,
            payment collection or accepted market price.
          </p>
          <Button to="/request-pilot">Discuss a scoped pilot</Button>
          <span className="price-foot">
            Written scope · Named owner · Review gate
          </span>
        </div>
      </section>
      <div className="container gate-strip">
        {gates.map(([n, t]) => (
          <div key={t}>
            <strong>{n}</strong>
            <span>{t}</span>
          </div>
        ))}
      </div>
      <section className="faq-section container">
        <SectionHead
          number="08"
          eyebrow="A FEW IMPORTANT QUESTIONS"
          title={
            <>
              Clear from
              <br />
              the beginning.
            </>
          }
        >
          <p>
            What this concept is, what it needs to prove, and where the
            boundaries are.
          </p>
        </SectionHead>
        <FAQ />
      </section>
      <CTA />
    </>
  );
}

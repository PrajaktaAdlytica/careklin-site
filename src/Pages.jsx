import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  CTA,
  DemoBadge,
  EcosystemDiagram,
  Eyebrow,
  Icon,
  ModuleGrid,
  ModuleVisual,
  SectionHead,
  Story,
  TextLink,
} from "./components";
import { CaseExplorer, FAQ } from "./Home";
import { modules, gates, sources, routeMeta } from "./data";
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  tone = "paper",
}) {
  return (
    <section className={"page-hero " + tone}>
      <div className="container">
        <div className="page-breadcrumb">
          <Link to="/">CareKlin</Link>
          <span>/</span>
          <span>{eyebrow}</span>
        </div>
        <Eyebrow>CONCEPT PREVIEW / {eyebrow.toUpperCase()}</Eyebrow>
        <div className="page-hero-grid">
          <h1>{title}</h1>
          <div>
            <p>{description}</p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
export function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Five ways to bring
            <br />
            the day into focus.
          </>
        }
        description="Five proposed modules, connected by one principle: every exception needs evidence, an owner and a reviewable next step."
        tone="orange"
      >
        <Button to="/preview">Explore the synthetic desk</Button>
      </PageHero>
      <section className="container product-list-section">
        <div className="inline-note">
          <Icon name="info" />
          <p>
            These are separate product directions to test, not five live plans.
            The first pilot should select one module with the sponsor.
          </p>
        </div>
        <ModuleGrid />
      </section>
      <section className="container editorial-split">
        <div>
          <Eyebrow>THE STARTING WEDGE</Eyebrow>
          <h2>
            Begin where
            <br />
            the day breaks.
          </h2>
        </div>
        <div>
          <p className="large-copy">
            Start with missed-visit replacement suggestions and an EVV
            discrepancy queue over the incumbent scheduler.
          </p>
          <p>
            Confirm how the agency already handles the exception, what access is
            permitted, and where a new layer would earn its place.
          </p>
          <TextLink to="/ecosystem">Review the ecosystem</TextLink>
        </div>
      </section>
      <CTA />
    </>
  );
}
export function Product() {
  const { slug } = useParams();
  const m = modules.find((x) => x.slug === slug);
  if (!m) return <NotFound />;
  return (
    <>
      <PageHero
        eyebrow={m.name}
        title={m.title.split("\n").map((s, i) => (
          <React.Fragment key={s}>
            {i > 0 && <br />}
            {s}
          </React.Fragment>
        ))}
        description={m.desc}
        tone="orange"
      >
        <div className="button-row">
          <Button
            to={
              "/preview" + (slug === "visit-signal" ? "?case=DEMO-VIS-002" : "")
            }
          >
            Explore the example
          </Button>
          <span className="concept-tag">PROPOSED MODULE {m.number}</span>
        </div>
      </PageHero>
      <section className="container product-detail-feature">
        <div className="product-art-frame">
          <div className="art-frame-top">
            <DemoBadge />
            <span className="mono">{m.name.toUpperCase()}</span>
          </div>
          <ModuleVisual type={m.slug} />
          <span className="art-frame-bottom">
            Conceptual interface · no live data or integration
          </span>
        </div>
        <div className="product-feature-copy">
          <Eyebrow>THE OFFER, PRECISELY</Eyebrow>
          <h2>{m.offer}</h2>
          <p>{m.desc}</p>
          <TextLink to="/request-pilot">Test this workflow with us</TextLink>
        </div>
      </section>
      <section className="container product-contract">
        <SectionHead
          eyebrow="A REVIEWABLE WORKFLOW"
          title={
            <>
              From source
              <br />
              to next step.
            </>
          }
        />
        {[
          ["01", "What goes in", m.input],
          ["02", "What comes into view", m.output],
          ["03", "Where the boundary stays", m.limit],
        ].map(([n, t, p]) => (
          <div className="contract-row reveal" key={n}>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{p}</p>
          </div>
        ))}
      </section>
      <section className="container discovery-question">
        <Icon name={m.icon} size={32} />
        <Eyebrow>THE FIRST DISCOVERY QUESTION</Eyebrow>
        <h2>{m.question}</h2>
        <p>
          Answer it with a dispatcher and the accountable operations owner. Then
          test the workflow against anonymized historical exceptions.
        </p>
        <Button to="/request-pilot">Prepare a pilot inquiry</Button>
      </section>
      <section className="container related-modules">
        <h2>Follow the rest of the workflow.</h2>
        <div>
          {modules
            .filter((x) => x.slug !== slug)
            .map((x) => (
              <Link key={x.slug} to={"/products/" + x.slug}>
                <span className="mono">{x.number}</span>
                <Icon name={x.icon} />
                <b>{x.name}</b>
                <Icon name="arrow-up-right" size={18} />
              </Link>
            ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
export function Workflow() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            One absence.
            <br />A considered next step.
          </>
        }
        description="Follow a synthetic Tuesday visit from an absence report to a human-reviewed suggestion. Every source, constraint and owner stays in view."
        tone="orange"
      >
        <Button to="/preview">Open the full preview</Button>
      </PageHero>
      <Story standalone />
      <section className="container workflow-detail">
        <SectionHead
          eyebrow="WHAT HAPPENS AFTER THE SUGGESTION"
          title={
            <>
              Three states.
              <br />
              No hidden leap.
            </>
          }
        >
          <p>
            Approval, service verification and communication are separate
            states. One does not establish another.
          </p>
        </SectionHead>
        <div className="three-columns">
          {[
            [
              "person",
              "Dispatcher decision",
              "An explicit, attributed review. A scroll, recommendation or animation never approves a visit.",
            ],
            [
              "visit-signal",
              "EVV evidence",
              "Independent verification in the state-governed EVV workflow. A proposed match is not proof of service.",
            ],
            [
              "mail",
              "Status communication",
              "A permission-controlled draft. Every message stays unsent in this preview.",
            ],
          ].map(([icon, t, p]) => (
            <article key={t}>
              <Icon name={icon} size={27} />
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
export function UseCases() {
  return (
    <>
      <PageHero
        eyebrow="Use cases"
        title={
          <>
            The work between
            <br />
            “who’s free?” and “who fits?”
          </>
        }
        description="Designed around specific operations questions for a Medicaid-funded home-care agency. Start with one workflow, one geography and one accountable buyer."
        tone="orange"
      />
      <section className="container usecase-list">
        {[
          [
            "01",
            "An absence before a visit",
            "For dispatchers and staffing directors",
            "The day plan changes at 08:12. The scheduled start is 09:00. Which replacements are actually feasible?",
            "Review credentials, availability, travel, preference and hours together. Keep uncertain inputs visible.",
            "/products/visit-desk",
            "visit-desk",
          ],
          [
            "02",
            "Evidence that does not line up",
            "For EVV and operations reviewers",
            "The schedule and availability evidence disagree. Which source is current, and who can resolve it?",
            "Assign the discrepancy to an identified reviewer without silently overwriting either source.",
            "/products/visit-signal",
            "visit-signal",
          ],
          [
            "03",
            "An update with a boundary",
            "For branch managers and case coordination",
            "A visit status has changed. Who is permitted to receive an update, and who approves the wording?",
            "Make recipient role, permissions and draft status visible. The concept sends no messages.",
            "/products/visit-report",
            "visit-report",
          ],
        ].map(([n, t, who, problem, approach, to, icon]) => (
          <article className="usecase-row reveal" key={n}>
            <span className="usecase-number">{n}</span>
            <div>
              <Eyebrow>{who.toUpperCase()}</Eyebrow>
              <h2>{t}</h2>
              <p>{problem}</p>
              <p>{approach}</p>
              <TextLink to={to}>Explore this module</TextLink>
            </div>
            <div className="usecase-art">
              <ModuleVisual type={icon} />
            </div>
          </article>
        ))}
      </section>
      <CTA />
    </>
  );
}
export function Ecosystem() {
  const [selected, setSelected] = useState("Manual dispatch");
  const descriptions = {
    "Manual dispatch": [
      "The comparison",
      "SMS, spreadsheets and experienced dispatchers already handle parts of the workflow. An overlay has to show a useful operational gain against that baseline.",
      "Discovery question",
      "Where does context get re-entered, lost or checked twice?",
    ],
    HHAeXchange: [
      "The comparison",
      "HHAeXchange covers substantial agency, scheduling and EVV workflow. Confirm the installed configuration and permitted interface before proposing an add-on.",
      "Discovery question",
      "Which exception remains unresolved in your current configuration, and what data access does the vendor permit?",
    ],
    Axxess: [
      "The comparison",
      "Axxess Home Care includes scheduling and operations workflows. Start by documenting what the agency already uses and where an exception layer would differ.",
      "Discovery question",
      "What is the system of record, and which integration or export route is actually available?",
    ],
  };
  return (
    <>
      <PageHero
        eyebrow="Ecosystem"
        title={
          <>
            An overlay needs
            <br />
            to earn its place.
          </>
        }
        description="CareKlin must fit the agency’s real workflow, state rules and permitted interfaces. No current integration or vendor partnership is claimed."
        tone="orange"
      />
      <section className="ecosystem-section ecosystem-page">
        <div className="container">
          <EcosystemDiagram />
          <p className="diagram-caption">
            Proposed relationship only. No live connections.
          </p>
        </div>
      </section>
      <section className="container incumbent-section">
        <SectionHead
          eyebrow="START WITH THE ALTERNATIVE"
          title={
            <>
              What already
              <br />
              does this work?
            </>
          }
        />
        <div className="segmented" aria-label="Compare incumbent workflows">
          {Object.keys(descriptions).map((s) => (
            <button
              className={selected === s ? "selected" : ""}
              aria-pressed={selected === s}
              key={s}
              onClick={() => setSelected(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="incumbent-detail" key={selected}>
          <div>
            <Eyebrow>{descriptions[selected][0]}</Eyebrow>
            <h3>{selected}</h3>
            <p>{descriptions[selected][1]}</p>
          </div>
          <div>
            <Eyebrow>{descriptions[selected][2]}</Eyebrow>
            <p className="large-copy">{descriptions[selected][3]}</p>
          </div>
        </div>
      </section>
      <section className="container">
        <SectionHead
          eyebrow="INTEGRATION DISCOVERY"
          title={
            <>
              Permission
              <br />
              before connection.
            </>
          }
        />
        <div className="checklist-table">
          {[
            [
              "System of record",
              "Confirm which scheduler, EVV vendor and authorization source the agency trusts.",
            ],
            [
              "Interface and scope",
              "Confirm the vendor route, version, fields, export rights and state-specific rules.",
            ],
            [
              "Read and write permissions",
              "Begin with a bounded retrospective read. Any later write requires separately approved scope.",
            ],
            [
              "Accountable people",
              "Name the state-rule owner, operations sponsor, security reviewer and procurement owner.",
            ],
            [
              "Workforce policy",
              "Review worker consent, labor rules, travel realism and client preferences with the agency.",
            ],
          ].map(([t, p]) => (
            <div key={t}>
              <Icon name="check" />
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>
      <Sources />
      <CTA />
    </>
  );
}
export function Sources() {
  return (
    <section className="container sources-section">
      <Eyebrow>RESEARCH CONTEXT</Eyebrow>
      <h2>Start with the source.</h2>
      <div className="source-links">
        {sources.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
            <div>
              <b>{s.name}</b>
              <p>{s.detail}</p>
            </div>
            <Icon name="external-link" />
          </a>
        ))}
      </div>
      <p className="small-note">
        Official and vendor sources inform the problem context. They do not
        establish CareKlin’s efficacy, compliance or integration capability. No
        endorsement is implied.
      </p>
    </section>
  );
}
export function Evaluation() {
  return (
    <>
      <PageHero
        eyebrow="Evidence & evaluation"
        title={
          <>
            Earn the next step.
            <br />
            Measure the work.
          </>
        }
        description="The concept is a hypothesis. A paid pilot should follow evidence of workflow fit, permitted access and a clear operational baseline."
        tone="orange"
      >
        <Button to="/request-pilot">Discuss an exception replay</Button>
      </PageHero>
      <section className="container metric-section">
        <Eyebrow>THE PRIMARY ENDPOINT</Eyebrow>
        <h2>
          Feasible coverage,
          <br />
          approved before start.
        </h2>
        <div className="metric-equation">
          <div>
            <span>NUMERATOR</span>
            <b>
              Missed visits with dispatcher-approved
              <br />
              feasible coverage before scheduled start
            </b>
          </div>
          <span>÷</span>
          <div>
            <span>DENOMINATOR</span>
            <b>
              All missed visits
              <br />
              in the agreed cohort
            </b>
          </div>
        </div>
        <p>
          Compare with the agency’s baseline over an agreed window. Record the
          denominator, geography, decision-maker role and uncertainty. Track
          unfilled visits alongside the primary endpoint.
        </p>
        <div className="metric-guardrails">
          <span>
            <Icon name="visit-proof" />
            Authorization breaches
          </span>
          <span>
            <Icon name="clock" />
            Dispatcher minutes
          </span>
          <span>
            <Icon name="info" />
            Not measured yet
          </span>
        </div>
      </section>
      <section className="container validation-section">
        <SectionHead
          eyebrow="PILOT READINESS GATE"
          title={
            <>
              A sequence of evidence.
              <br />
              Not a leap of faith.
            </>
          }
        />
        <div className="gate-cards">
          {gates.map(([n, t, p]) => (
            <article key={t}>
              <strong>{n}</strong>
              <h3>{t}</h3>
              <p>{p}</p>
              <span className="mono">NOT YET ESTABLISHED</span>
            </article>
          ))}
        </div>
        <div className="inline-note">
          <Icon name="lock" />
          <p>
            Also required: signed data-access and security approvals, human
            oversight, workforce policy review, a named state-rule owner and a
            procurement owner.
          </p>
        </div>
      </section>
      <section className="container validation-process">
        <h2>Learn before expanding.</h2>
        {[
          [
            "Interview separately",
            "Talk with the buyer, dispatcher and oversight owner. Ask where the incumbent process fails and who can approve a change.",
          ],
          [
            "Observe the baseline",
            "Shadow dispatchers and document how exceptions are handled today. Use an agreed baseline window.",
          ],
          [
            "Replay with permission",
            "Secure bounded rights to anonymized missed-shift records. Review suggestions retrospectively with the agency.",
          ],
          [
            "Test a paid commitment",
            "Discuss the hypothetical price and per-visit economics. Get a director-approved scope, budget owner and review gate.",
          ],
          [
            "Agree on the stop rule",
            "Stop or reposition if there is no EVV route and state-rule owner, or suggestions violate travel, skill or authorized hours.",
          ],
        ].map(([t, p], i) => (
          <div className="contract-row" key={t}>
            <span>0{i + 1}</span>
            <h3>{t}</h3>
            <p>{p}</p>
          </div>
        ))}
      </section>
      <section className="container research-note">
        <h3>Where validation starts</h3>
        <p>
          Regional home-care associations and state Medicaid managed-care
          networks are the first channels to test. Franchise operations, EVV
          integrators and staffing partners are adjacent paths. No affiliation
          is established.
        </p>
        <p>
          Any traffic test should compare a missed-visit exception audit with a
          manual-workflow audit in the same buyer geography and spend cap.
          Role-confirmed pilot requests matter; clicks alone do not validate
          demand. Pause if the concept is interpreted as an operating or proven
          product.
        </p>
      </section>
      <Sources />
      <CTA />
    </>
  );
}
export function Pilot() {
  return (
    <>
      <PageHero
        eyebrow="Pilot & pricing"
        title={
          <>
            One branch.
            <br />
            One state. One test.
          </>
        }
        description="Begin with a workflow replay. Move to a limited, governed pilot only when the evidence, access and human oversight are in place."
        tone="orange"
      />
      <section className="container pilot-detail">
        <div>
          <Eyebrow>HYPOTHETICAL COMMERCIAL TEST</Eyebrow>
          <h2>
            A price to discuss.
            <br />A scope to define.
          </h2>
          <p className="large-copy">
            Test per-visit economics with the agency COO before assuming the
            overlay is worth buying.
          </p>
          <p>
            The setup hypothesis depends on state rules, vendor interfaces and
            onboarding effort. This is not an active offer, accepted market
            price or payment checkout.
          </p>
          <ul className="plain-list">
            <li>One geography and one selected starting module</li>
            <li>Written scope and named operating owner</li>
            <li>Agreed endpoint, guardrails and review date</li>
            <li>No promise of reimbursement, clinical outcomes or ROI</li>
          </ul>
        </div>
        <div className="price-card">
          <span className="eyebrow">HYPOTHETICAL TEST PRICE</span>
          <div className="price">
            <span>$</span>650<small>/ branch / month</small>
          </div>
          <div className="setup-price">
            + $3,000 <span>state / EVV setup</span>
          </div>
          <p>Not a current offer. No payment collected.</p>
          <Button to="/request-pilot">Request a scoped pilot</Button>
        </div>
      </section>
      <section className="container">
        <SectionHead
          eyebrow="BEFORE A LIMITED PILOT"
          title={
            <>
              Every gate
              <br />
              has an owner.
            </>
          }
        />
        <div className="gate-cards">
          {gates.map(([n, t, p]) => (
            <article key={t}>
              <strong>{n}</strong>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
        <div className="stop-rule">
          <Icon name="abstain" size={30} />
          <div>
            <h3>Stop, or change the thesis.</h3>
            <p>
              No EVV route and state-rule owner? Stop. Suggestions violate
              travel, skills or authorized hours? Stop. Signed data/security and
              human-oversight approvals are also prerequisites.
            </p>
          </div>
        </div>
      </section>
      <section className="container faq-section">
        <h2>Before you ask for a pilot.</h2>
        <FAQ />
      </section>
      <CTA />
    </>
  );
}
export function Governance() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title={
          <>
            Every exception
            <br />
            needs an owner.
          </>
        }
        description="The design starts with traceable evidence and accountable human judgment. These are concept boundaries, not compliance claims or certifications."
        tone="orange"
      />
      <section className="container">
        <div className="governance-principle">
          <span>01 / HUMAN OVERSIGHT</span>
          <h2>
            Nothing external
            <br />
            happens on autopilot.
          </h2>
          <p>
            Recommendations, scroll animations and example state changes do not
            authorize an action. Any future external action would require an
            identified reviewer, explicit permission and a separate approved
            scope.
          </p>
        </div>
        <div className="checklist-table">
          {[
            [
              "Source provenance",
              "Keep source IDs, dates, ownership and uncertainty beside the exception. Do not hide conflicting evidence.",
            ],
            [
              "Manual review",
              "Attribute approvals to a named role. Keep simulated decisions reversible and distinguish them from service delivery.",
            ],
            [
              "Permission states",
              "Distinguish source access, reviewer permission and recipient permission. Unsent remains unsent.",
            ],
            [
              "State-specific rules",
              "No uniform Medicaid workflow is assumed. The sponsor must name a state-rule owner and verify applicable requirements.",
            ],
            [
              "Fraud controls and workforce reality",
              "Visit fraud controls, caregiver labor rules, travel feasibility, client preferences and payer contracts constrain automation.",
            ],
            [
              "Synthetic boundaries",
              "No PHI, diagnosis, treatment, patient outreach, payment or live portal/EHR/EVV connection exists in the preview.",
            ],
          ].map(([t, p]) => (
            <div key={t}>
              <Icon name="lock" />
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container cases-section">
        <SectionHead
          eyebrow="UNCERTAINTY IS A VALID STATE"
          title={
            <>
              Review. Resolve.
              <br />
              Or abstain.
            </>
          }
        />
        <CaseExplorer />
      </section>
      <CTA />
    </>
  );
}
export function Company() {
  return (
    <>
      <PageHero
        eyebrow="About CareKlin"
        title={
          <>
            More room
            <br />
            for human judgment.
          </>
        }
        description="CareKlin is a research-stage concept for the operations work that follows a missed home-care visit. The proposed brand and product are still being validated."
        tone="orange"
      />
      <section className="container company-statement">
        <Eyebrow>THE THESIS</Eyebrow>
        <h2>
          When the day changes,
          <br />
          context should
          <br />
          <span>stay together.</span>
        </h2>
        <div>
          <p className="large-copy">
            A dispatcher should be able to see the exception, the evidence and
            the decision in one place.
          </p>
          <p>
            Our proposed mission starts with missed-visit replacement
            suggestions and an EVV discrepancy queue over the existing
            scheduler. We want to learn whether an accountable review layer can
            make that workflow meaningfully better.
          </p>
          <p>
            Expansion would be state by state, then across branches and adjacent
            authorization, EVV and payer-reporting workflows—only if
            interoperability, workforce economics and repeatable onboarding
            hold.
          </p>
        </div>
      </section>
      <section className="container company-honesty">
        <h2>What is true today.</h2>
        <div className="three-columns">
          <article>
            <Icon name="eye" />
            <h3>A concept to inspect</h3>
            <p>
              An original website and isolated synthetic demonstration. No live
              operating product.
            </p>
          </article>
          <article>
            <Icon name="source" />
            <h3>A hypothesis to test</h3>
            <p>
              No demand, revenue, customer adoption, efficacy or accepted
              pricing has been demonstrated.
            </p>
          </article>
          <article>
            <Icon name="person" />
            <h3>A buyer to learn from</h3>
            <p>
              A Medicaid-funded agency COO or staffing director in one state;
              dispatchers operate the queue.
            </p>
          </article>
        </div>
        <p className="small-note">
          CareKlin is a working brand. No trademark clearance or custom-domain
          ownership is asserted.
        </p>
      </section>
      <CTA />
    </>
  );
}
export function Inquiry({ contact = false }) {
  const [done, setDone] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (done) document.querySelector(".draft-success h2")?.focus();
  }, [done]);
  const submit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (!data.consent) {
      setError("Please acknowledge the local-draft notice.");
      return;
    }
    setError("");
    setDone(data);
  };
  const download = () => {
    const lines = [
      "CareKlin — local inquiry draft",
      "Not sent. No recipient or backend is connected.",
      "",
      ...Object.entries(done)
        .filter(([k]) => k !== "consent")
        .map(([k, v]) => `${k}: ${v}`),
      "",
      "Concept preview only. Do not include patient or clinical information.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "careklin-inquiry-draft.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <section className="inquiry-page">
      <div className="container inquiry-layout">
        <div className="inquiry-copy">
          <Eyebrow>
            {contact
              ? "LET’S TALK ABOUT THE WORKFLOW"
              : "REQUEST A SCOPED PILOT"}
          </Eyebrow>
          <h1>
            {contact ? (
              <>
                Make the
                <br />
                conversation
                <br />
                specific.
              </>
            ) : (
              <>
                Start with
                <br />
                one missed-
                <br />
                visit replay.
              </>
            )}
          </h1>
          <p>
            For agency COOs, staffing directors and the people who own the
            operations workflow.
          </p>
          <div className="inquiry-next">
            <h3>A useful first conversation</h3>
            <ol>
              <li>
                <span>01</span>Map the incumbent workflow.
              </li>
              <li>
                <span>02</span>Choose one state and one exception.
              </li>
              <li>
                <span>03</span>Confirm access, reviewers and a baseline.
              </li>
            </ol>
          </div>
          <div className="inquiry-boundary">
            <Icon name="lock" />
            <p>
              No patient information, clinical details or uploaded records. Keep
              your example about the process.
            </p>
          </div>
        </div>
        <div className="form-card">
          {done ? (
            <div className="draft-success">
              <span className="large-icon">
                <Icon name="check" size={32} />
              </span>
              <Eyebrow>LOCAL DRAFT READY</Eyebrow>
              <h2 tabIndex={-1}>
                Ready to review.
                <br />
                Not sent.
              </h2>
              <p>
                This concept has no inquiry backend or monitored recipient. Your
                draft is only in this page’s memory; download it if you want to
                keep it.
              </p>
              <dl>
                {Object.entries(done)
                  .filter(([k, v]) => k !== "consent" && v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt>{k.replaceAll("_", " ")}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
              </dl>
              <Button onClick={download}>
                Download inquiry draft
                <Icon name="download" size={18} />
              </Button>
              <button className="text-link" onClick={() => setDone(null)}>
                Start a new draft
                <Icon name="reset" size={17} />
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-heading">
                <h2>
                  {contact ? "Prepare an inquiry" : "Outline your workflow"}
                </h2>
                <span className="status status-neutral">Local draft</span>
              </div>
              <p className="form-notice">
                This preview prepares a draft; it does not send or store an
                inquiry. Required fields are marked *.
              </p>
              <div className="form-two">
                <label>
                  Your role *
                  <select required name="role" defaultValue="">
                    <option value="" disabled>
                      Select a role
                    </option>
                    {[
                      "COO / operations leader",
                      "Staffing director",
                      "Dispatcher",
                      "Compliance / oversight owner",
                      "EVV / integration partner",
                      "Other operations role",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Organization *
                  <input
                    required
                    name="organization"
                    autoComplete="organization"
                    maxLength="120"
                    placeholder="Agency or organization"
                  />
                </label>
              </div>
              <label>
                Work email *
                <input
                  required
                  type="email"
                  name="work_email"
                  autoComplete="email"
                  maxLength="180"
                  placeholder="you@organization.com"
                />
              </label>
              <div className="form-two">
                <label>
                  State / region *
                  <input
                    required
                    name="state_region"
                    maxLength="80"
                    placeholder="Your proposed pilot location"
                  />
                </label>
                <label>
                  EVV vendor <span>(optional)</span>
                  <input
                    name="evv_vendor"
                    maxLength="100"
                    placeholder="Current vendor, if known"
                  />
                </label>
              </div>
              <label>
                Branch count <span>(optional)</span>
                <select name="branch_count" defaultValue="">
                  <option value="">Select if useful</option>
                  <option>1</option>
                  <option>2–5</option>
                  <option>6–20</option>
                  <option>21+</option>
                </select>
              </label>
              <label>
                Where does a missed visit create the most work? *
                <textarea
                  required
                  name="workflow_fit"
                  rows="4"
                  minLength="10"
                  maxLength="1000"
                  placeholder="Describe the handoff, constraint or review step. Please leave out patient and clinical details."
                />
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  required
                  name="consent"
                  value="Local draft acknowledged"
                />
                <span>
                  I understand this is a local concept inquiry draft and have
                  included no patient or clinical information.{" "}
                  <Link to="/legal/privacy">Privacy notice</Link>
                </span>
              </label>
              {error && <p role="alert">{error}</p>}
              <Button type="submit">Prepare inquiry draft</Button>
              <p className="form-foot">
                No transmission · No account · No payment
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
export function SignIn() {
  return (
    <section className="signin-page">
      <div className="signin-art">
        <div className="signin-rings" />
        <img src="/assets/brand/symbol-ink.svg" alt="" />
        <h1>
          A preview,
          <br />
          before a portal.
        </h1>
        <p>Good operations start with a clear view.</p>
        <span className="mono">CAREKLIN / CONCEPT PREVIEW</span>
      </div>
      <div className="signin-content">
        <img src="/assets/brand/logo-primary.svg" alt="CareKlin" width="174" />
        <span className="status status-neutral">No live accounts yet</span>
        <h2>
          Explore the work.
          <br />
          No password needed.
        </h2>
        <p>
          CareKlin is not an operating service. The synthetic exception desk is
          open to explore, with no login, real records or connected systems.
        </p>
        <Button to="/preview">Open the concept preview</Button>
        <Button variant="outline" to="/request-pilot">
          Discuss a future pilot
        </Button>
        <Link to="/" className="text-link">
          Back to CareKlin
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </section>
  );
}
export function Legal({ type }) {
  const isPrivacy = type === "privacy",
    isAccess = type === "accessibility";
  return (
    <>
      <PageHero
        eyebrow={isAccess ? "Accessibility" : isPrivacy ? "Privacy" : "Terms"}
        title={
          isAccess ? (
            <>
              Your pace.
              <br />
              Your way through.
            </>
          ) : isPrivacy ? (
            <>
              Privacy,
              <br />
              in plain language.
            </>
          ) : (
            <>
              An honest
              <br />
              concept preview.
            </>
          )
        }
        description={
          isAccess
            ? "A motion-rich experience should still work when motion is reduced or paused."
            : isPrivacy
              ? "This notice describes the concept website as built, not a future operating product."
              : "What this demonstration shows—and what it does not establish."
        }
      />
      <article className="container prose-page">
        <span className="mono">NOTICE VERSION · 18 OCTOBER 2026</span>
        {isPrivacy ? (
          <>
            <h2>What this page does</h2>
            <p>
              The inquiry form keeps your entries in browser memory while this
              page is open. Preparing a draft does not send it to CareKlin.
              Downloading a draft creates a text file on your device. Reloading
              the page clears the form state.
            </p>
            <h2>No analytics or record collection</h2>
            <p>
              The application includes no advertising pixels, analytics SDKs,
              patient-record uploads, external form endpoints or tracking
              cookies. Fonts and interface assets are served locally with the
              website.
            </p>
            <h2>Hosting is separate</h2>
            <p>
              The hosting service may process ordinary access information, such
              as request metadata and security logs, under its own terms. This
              application does not control or promise the deletion of
              host-managed logs.
            </p>
            <h2>Keep sensitive information out</h2>
            <p>
              Do not enter patient names, real client locations, diagnoses,
              clinical details, claims, prescriptions or service records. All
              demonstration records are fictional.
            </p>
            <h2>Deletion and future changes</h2>
            <p>
              Clear this page or reload it to discard the local inquiry draft;
              delete any downloaded draft from your device separately. Before
              enabling real collection, the operator must establish a contact
              and deletion path, retention policy, consent timestamp, notice
              version and appropriate permissions. No such collection is active
              here.
            </p>
          </>
        ) : isAccess ? (
          <>
            <h2>Motion controls</h2>
            <p>
              Use the persistent “Pause motion” control to stop ongoing
              animation and return the scroll story to a normal-flow,
              step-controlled layout. Your device’s reduced-motion preference is
              respected automatically.
            </p>
            <h2>Navigate without a pointer</h2>
            <p>
              A skip link, visible focus states, semantic headings, buttons and
              form labels support keyboard navigation. Story steps are buttons,
              menu controls expose their state, and primary actions remain
              available without hover.
            </p>
            <h2>Read at your own pace</h2>
            <p>
              Native scrolling is retained. No decision occurs automatically.
              The story has a skip link, and the synthetic preview can be
              explored independently. Small and short viewports use a simpler
              layout without a pinned section.
            </p>
            <h2>Verification and limits</h2>
            <p>
              The build is checked for responsive overflow, readable contrast,
              keyboard access and reduced-motion behavior. This is not a formal
              accessibility certification. A broader assistive-technology audit
              should precede any public operating launch.
            </p>
            <Button to="/contact">Prepare accessibility feedback</Button>
          </>
        ) : (
          <>
            <h2>A research-stage demonstration</h2>
            <p>
              CareKlin is a proposed home-care operations concept. This website
              is not an operating product, an agency service, clinical guidance,
              legal advice or a compliance determination.
            </p>
            <h2>Synthetic examples only</h2>
            <p>
              Records, people, source identifiers, timestamps and interface
              states are illustrative. They do not describe actual patients,
              caregivers, integrations or measured results. Simulated approvals
              are local and reversible. Every notification remains unsent.
            </p>
            <h2>No commercial acceptance</h2>
            <p>
              The $650 per branch per month and $3,000 state/EVV setup figures
              are hypothetical willingness-to-pay tests. They are not an active
              offer or accepted price. No purchase, payment or service contract
              is available through this website.
            </p>
            <h2>Vendor and regulatory references</h2>
            <p>
              Links to CMS, state agencies and vendors provide context only.
              They do not imply a partnership, endorsement, live integration or
              CareKlin compliance. State-specific requirements and permitted
              interfaces must be confirmed with a pilot sponsor.
            </p>
            <h2>Working identity</h2>
            <p>
              CareKlin is a working brand. Trademark clearance and custom-domain
              ownership are not asserted. Any operating launch needs reviewed
              legal terms, privacy notices, access rights and approvals.
            </p>
          </>
        )}
      </article>
    </>
  );
}
export function NotFound() {
  return (
    <section className="not-found container">
      <span className="outline-number">404</span>
      <Eyebrow>A SMALL GAP IN THE ROUTE</Eyebrow>
      <h1>
        Let’s find
        <br />a way back.
      </h1>
      <p>This page isn’t part of the current concept.</p>
      <Button to="/">Return to CareKlin</Button>
    </section>
  );
}

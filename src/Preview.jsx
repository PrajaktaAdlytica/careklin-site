import React, { useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Button,
  CandidateList,
  DemoBadge,
  HoursMeter,
  Icon,
} from "./components";
import { cases, decide, initialDecision } from "./model.mjs";
export default function Preview() {
  const [search, setSearch] = useSearchParams();
  const first = cases.some((c) => c.id === search.get("case"))
    ? search.get("case")
    : cases[0].id;
  const [selected, setSelected] = useState(first);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [state, dispatch] = useReducer(decide, initialDecision);
  const [pane, setPane] = useState("Overview");
  const record = cases.find((c) => c.id === selected);
  const status = (c) =>
    c.id === "DEMO-VIS-001" && state.approved ? "Simulated approval" : c.status;
  const filtered = cases.filter(
    (c) =>
      (filter === "All" || status(c) === filter) &&
      (c.id + " " + c.summary + " " + c.owner)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const choose = (id) => {
    setSelected(id);
    setSearch({ case: id }, { replace: true });
    setPane("Overview");
  };
  return (
    <section className="preview-page">
      <div className="preview-watermark">
        DEMO — SYNTHETIC DATA <span>· CONCEPT PREVIEW</span>
      </div>
      <div className="container">
        <div className="preview-heading">
          <div>
            <span className="eyebrow">CONCEPT PREVIEW</span>
            <h1>The exception desk.</h1>
            <p>
              Fictional records. Real questions. Explore a decision without
              making a real-world change.
            </p>
          </div>
          <DemoBadge />
        </div>
        <div className="preview-notice">
          <Icon name="info" size={18} />
          <span>
            All data stays in this browser session. Decisions are simulated and
            reversible. There are no integrations, outbound messages or patient
            records.
          </span>
          <Button
            arrow={false}
            variant="outline"
            onClick={() => {
              dispatch({ type: "reset" });
              choose(cases[0].id);
              setFilter("All");
              setQuery("");
            }}
          >
            Reset demo
            <Icon name="reset" size={15} />
          </Button>
        </div>
        <div className="workbench">
          <aside className="queue-pane">
            <div className="queue-title">
              <h2>Exception queue</h2>
              <span className="count">{cases.length}</span>
            </div>
            <label className="search-input">
              <Icon name="search" size={16} />
              <input
                aria-label="Search synthetic records"
                placeholder="Search records or owners"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <label className="queue-filter">
              Status
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {[
                  "All",
                  "Awaiting review",
                  "Simulated approval",
                  "Needs review",
                  "Blocked",
                  "Pending",
                  "Review complete",
                  "Rejected",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <div className="queue-list">
              {filtered.length === 0 ? (
                <p className="empty-state">
                  No matching records. Try a different search or status.
                </p>
              ) : (
                filtered.map((c) => (
                  <button
                    className={
                      c.id === selected ? "queue-item selected" : "queue-item"
                    }
                    key={c.id}
                    onClick={() => choose(c.id)}
                    aria-pressed={c.id === selected}
                  >
                    <div>
                      <b>{c.id}</b>
                      <time>{c.at}</time>
                    </div>
                    <strong>{c.time}</strong>
                    <div>
                      <span
                        className={
                          "status " +
                          (c.kind === "blocked"
                            ? "status-danger"
                            : c.kind === "ambiguous"
                              ? "status-warn"
                              : "status-neutral")
                        }
                      >
                        {status(c)}
                      </span>
                      <Icon name="chevron-right" size={16} />
                    </div>
                  </button>
                ))
              )}
            </div>
            <p className="queue-note">
              “Review complete” describes the exception review, never delivery
              of care.
            </p>
          </aside>
          <div className="record-pane">
            <div className="record-head">
              <div>
                <span className="mono">
                  {record.id} / {record.client}
                </span>
                <h2>{record.title}</h2>
              </div>
              <span
                className={
                  "status " +
                  (record.kind === "blocked" ? "status-danger" : "status-warn")
                }
              >
                {status(record)}
              </span>
            </div>
            <div className="record-tabs" aria-label="Record views">
              {["Overview", "Evidence", "Decision log"].map((p) => (
                <button
                  key={p}
                  aria-pressed={pane === p}
                  className={pane === p ? "selected" : ""}
                  onClick={() => setPane(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="record-body" key={selected + pane}>
              {pane === "Overview" ? (
                <>
                  <div className="record-summary">
                    <Icon
                      name={record.kind === "blocked" ? "abstain" : "clock"}
                    />
                    <div>
                      <b>Tuesday, 20 Oct 2026 · {record.time}</b>
                      <p>{record.summary}</p>
                    </div>
                  </div>
                  {record.kind === "feasible" ? (
                    <>
                      <h3 className="small-title">Replacement constraints</h3>
                      <CandidateList />
                      <div className="record-two">
                        <HoursMeter />
                        <div className="record-preference">
                          <Icon name="person" />
                          <h3>Recorded preference</h3>
                          <p>Caregiver C matches the example preference.</p>
                          <small>
                            DEMO-PREF-001 · recorded 08:04
                            <br />
                            Availability: 08:30–11:00
                            <br />
                            Departure: 08:30 · travel: 20 min
                          </small>
                        </div>
                      </div>
                    </>
                  ) : record.kind === "ambiguous" ? (
                    <div className="evidence-conflict">
                      <h3>Review before recommending</h3>
                      <div>
                        <span>DEMO-SCHED-002 · 08:10</span>
                        <b>Visit end 11:00</b>
                      </div>
                      <div>
                        <span>DEMO-AVAIL-002 · freshness unresolved</span>
                        <b>Available until 10:30</b>
                      </div>
                      <p>
                        Ask the source owner to reconcile the conflict. No
                        feasible candidate is asserted.
                      </p>
                    </div>
                  ) : record.kind === "blocked" ? (
                    <>
                      <HoursMeter remaining={0.5} />
                      <div className="blocked-callout">
                        <Icon name="abstain" />
                        <div>
                          <h3>Abstain. Escalate to the rule owner.</h3>
                          <p>
                            No replacement satisfies the example constraints.
                            There is no override or assignment action.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="queue-context">
                      <h3>A bounded queue example</h3>
                      <p>{record.summary}</p>
                      <p>
                        Supporting detail has not been seeded for this
                        illustrative row. Open records 001–003 for the full
                        three-case scenario.
                      </p>
                    </div>
                  )}
                </>
              ) : pane === "Evidence" ? (
                <>
                  <h3 className="small-title">
                    Source evidence · synthetic documents
                  </h3>
                  {(record.kind === "feasible"
                    ? [
                        [
                          "DEMO-SRC-001",
                          "08:12",
                          "Absence report for the 09:00 visit.",
                        ],
                        [
                          "DEMO-CRED-C",
                          "08:01",
                          "Required skill present in the example credential record.",
                        ],
                        [
                          "DEMO-AVAIL-C",
                          "08:03",
                          "Available 08:30–11:00. Departure 08:30; estimated travel 20 min.",
                        ],
                        [
                          "DEMO-PREF-001",
                          "08:04",
                          "Example client preference matches Caregiver C.",
                        ],
                        [
                          "DEMO-AUTH-001",
                          "08:05",
                          "Window 08:00–12:00. 3.0 authorized hours remaining.",
                        ],
                      ]
                    : record.kind === "ambiguous"
                      ? [
                          [
                            "DEMO-SCHED-002",
                            "08:10",
                            "Schedule says visit ends 11:00.",
                          ],
                          [
                            "DEMO-AVAIL-002",
                            "Unknown",
                            "Availability note says 10:30. Freshness unresolved.",
                          ],
                        ]
                      : record.kind === "blocked"
                        ? [
                            [
                              "DEMO-AUTH-003",
                              "08:07",
                              "0.5 hours remain for a proposed 1.0-hour visit.",
                            ],
                            [
                              "DEMO-CONSTRAINT-003",
                              "08:18",
                              "Alternatives fail required skill or travel time.",
                            ],
                          ]
                        : [[record.source, record.at, record.summary]]
                  ).map(([id, time, detail]) => (
                    <div className="evidence-item" key={id}>
                      <Icon name="source" />
                      <div>
                        <b>{id}</b>
                        <p>{detail}</p>
                        <small>20 Oct 2026 · {time} · fictional source</small>
                      </div>
                    </div>
                  ))}
                  <p className="small-note">
                    These are descriptive fixture records, not imported
                    documents or external links.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="small-title">Attributed event history</h3>
                  <div className="log-item">
                    <time>{record.at}</time>
                    <div>
                      <b>Exception entered</b>
                      <p>
                        {record.source} · {record.owner} — fictional
                      </p>
                    </div>
                  </div>
                  {record.id === "DEMO-VIS-001" && state.approved ? (
                    <div className="log-item">
                      <time>08:15</time>
                      <div>
                        <b>Simulated approval</b>
                        <p>
                          {state.events[0].action}
                          <br />
                          {state.events[0].owner}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="empty-state">
                      No approval recorded for this case.
                    </p>
                  )}
                  <p className="small-note">
                    Reset removes this session’s simulated approval. No external
                    audit record is written.
                  </p>
                </>
              )}
            </div>
            <div className="record-footer">
              <span>
                <Icon name="person" size={16} />
                {record.owner} — fictional
              </span>
              <span>
                20 Oct 2026 ·{" "}
                {record.id === "DEMO-VIS-001" && state.approved
                  ? "review simulated 08:15"
                  : "next review " +
                    (record.kind === "feasible"
                      ? "08:13"
                      : record.kind === "ambiguous"
                        ? "08:20"
                        : record.kind === "blocked"
                          ? "08:25"
                          : "08:45")}
              </span>
            </div>
          </div>
          <aside className="review-pane">
            <span className="eyebrow">REVIEW & NEXT ACTION</span>
            <h3>
              {record.kind === "feasible"
                ? "Keep the decision human."
                : record.kind === "blocked"
                  ? "Stop at the boundary."
                  : "Keep the question open."}
            </h3>
            <p>
              {record.kind === "feasible"
                ? "Review the source evidence and constraints before simulating approval."
                : record.kind === "blocked"
                  ? "Escalate the authorization and constraint conflict to the named rule owner."
                  : "Clarify source evidence before considering a replacement."}
            </p>
            {record.kind === "feasible" ? (
              <Button
                arrow={false}
                onClick={() =>
                  dispatch(
                    state.approved
                      ? { type: "reset" }
                      : {
                          type: "approve",
                          caseId: record.id,
                          candidateId: "C",
                        },
                  )
                }
              >
                {state.approved
                  ? "Undo simulated approval"
                  : "Simulate approval"}
                <Icon name={state.approved ? "reset" : "check"} size={16} />
              </Button>
            ) : (
              <div className="no-action">
                <Icon name="lock" size={18} />
                {record.kind === "blocked"
                  ? "No override available"
                  : "Approval unavailable"}
              </div>
            )}
            <div className="review-feedback" role="status">
              {record.kind === "feasible" && state.approved
                ? "08:15 · Approval simulated. If allocated, 2.0h would remain. No assignment made."
                : "No external action taken."}
            </div>
            <div className="review-status">
              <Icon name="visit-signal" />
              <span>
                <b>EVV status</b>
                <small>{record.evv}</small>
              </span>
            </div>
            <div className="review-status">
              <Icon name="mail" />
              <span>
                <b>Family update</b>
                <small>DRAFT — UNSENT</small>
              </span>
              <Icon name="lock" size={14} />
            </div>
            <p className="review-footnote">
              A decision here is not proof of service, clinical guidance, a
              billing determination or a compliance result.
            </p>
          </aside>
        </div>
        <div className="preview-bottom">
          <span>DEMO — SYNTHETIC DATA · CONCEPT PREVIEW</span>
          <span>10 fictional records · no real client location</span>
        </div>
      </div>
    </section>
  );
}

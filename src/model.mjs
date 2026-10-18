export const candidates = [
  {
    id: "A",
    name: "Caregiver A",
    status: "Not feasible",
    reason: "Required skill missing",
    detail: "The required skill is absent from DEMO-CRED-A.",
    skill: false,
    availability: true,
    travel: true,
    hours: true,
    preference: true,
    departure: "08:25",
    minutes: 20,
    arrival: "08:45",
  },
  {
    id: "B",
    name: "Caregiver B",
    status: "Not feasible",
    reason: "09:15 · too late",
    detail: "08:50 departure + 25 minutes travel. Visit starts at 09:00.",
    skill: true,
    availability: true,
    travel: false,
    hours: true,
    preference: true,
    departure: "08:50",
    minutes: 25,
    arrival: "09:15",
  },
  {
    id: "C",
    name: "Caregiver C",
    status: "Review candidate",
    reason: "08:50 · within window",
    detail: "08:30 departure + 20 minutes travel. Available 08:30–11:00.",
    skill: true,
    availability: true,
    travel: true,
    hours: true,
    preference: true,
    departure: "08:30",
    minutes: 20,
    arrival: "08:50",
  },
];
export const cases = [
  {
    id: "DEMO-VIS-001",
    client: "DEMO-CLIENT-001",
    time: "09:00–10:00",
    status: "Awaiting review",
    kind: "feasible",
    owner: "Dispatcher Rowan",
    source: "DEMO-SRC-001",
    at: "08:12",
    title: "A feasible replacement to review",
    summary:
      "Caregiver A lacks the required skill. B arrives too late. C fits the recorded hours, availability and preference.",
    remaining: 3,
    requested: 1,
    evv: "Not yet expected",
    notification: "DRAFT — UNSENT",
  },
  {
    id: "DEMO-VIS-002",
    client: "DEMO-CLIENT-002",
    time: "10:00–11:00",
    status: "Needs review",
    kind: "ambiguous",
    owner: "Dispatcher Quinn",
    source: "DEMO-SRC-002",
    at: "08:16",
    title: "The evidence does not agree",
    summary:
      "The schedule records an 11:00 end; the availability note records 10:30. Evidence freshness is unresolved. No feasible replacement is asserted.",
    remaining: 2,
    requested: 1,
    evv: "Source conflict",
    notification: "DRAFT — UNSENT",
  },
  {
    id: "DEMO-VIS-003",
    client: "DEMO-CLIENT-003",
    time: "11:00–12:00",
    status: "Blocked",
    kind: "blocked",
    owner: "Rule owner Ellis",
    source: "DEMO-SRC-003",
    at: "08:19",
    title: "A clear reason to abstain",
    summary:
      "The proposed visit needs 1.0 hour. Only 0.5 hours remain in the example authorization. Alternatives also fail skill or travel constraints.",
    remaining: 0.5,
    requested: 1,
    evv: "Not yet expected",
    notification: "DRAFT — UNSENT",
  },
  ...[
    [
      "004",
      "12:00–13:00",
      "Pending",
      "Dispatcher Rowan",
      "Absence evidence awaiting triage.",
    ],
    [
      "005",
      "13:00–14:00",
      "Needs review",
      "Dispatcher Quinn",
      "Credential source needs a freshness check.",
    ],
    [
      "006",
      "14:00–15:00",
      "Pending",
      "Dispatcher Rowan",
      "Availability evidence awaiting review.",
    ],
    [
      "007",
      "15:00–16:00",
      "Review complete",
      "Dispatcher Quinn",
      "Duplicate exception reviewed; no service outcome recorded.",
    ],
    [
      "008",
      "16:00–17:00",
      "Rejected",
      "Dispatcher Rowan",
      "Suggested option rejected for insufficient travel time.",
    ],
    [
      "009",
      "17:00–18:00",
      "Review complete",
      "Dispatcher Quinn",
      "Source clarification reviewed; no service outcome recorded.",
    ],
    [
      "010",
      "18:00–19:00",
      "Pending",
      "Dispatcher Rowan",
      "Next-action owner assigned; no replacement reviewed.",
    ],
  ].map(([n, time, status, owner, summary], i) => ({
    id: "DEMO-VIS-" + n,
    client: "DEMO-CLIENT-" + n,
    time,
    status,
    kind: "queue",
    owner,
    source: "DEMO-SRC-" + n,
    at: `08:${22 + i * 3}`,
    title: "A source-linked queue record",
    summary,
    remaining: null,
    requested: 1,
    evv: "Not assessed",
    notification: "DRAFT — UNSENT",
  })),
];
export const initialDecision = {
  approved: false,
  notification: "DRAFT — UNSENT",
  events: [],
};
export function decide(state, action) {
  if (action.type === "reset") return { ...initialDecision, events: [] };
  if (
    action.type === "approve" &&
    action.caseId === "DEMO-VIS-001" &&
    action.candidateId === "C" &&
    !state.approved
  )
    return {
      ...state,
      approved: true,
      events: [
        {
          at: "08:15",
          owner: "Dispatcher Rowan — fictional",
          action:
            "Simulated approval of Caregiver C; no assignment or message sent.",
        },
      ],
    };
  return state;
}
export function feasible(candidate, record) {
  return (
    !!candidate &&
    record.kind === "feasible" &&
    record.remaining >= record.requested &&
    ["skill", "availability", "travel", "hours", "preference"].every(
      (k) => candidate[k] === true,
    )
  );
}

export const modules = [
  {
    slug: "visit-desk",
    name: "Visit Desk",
    number: "01",
    icon: "visit-desk",
    title: "Catch the gap.\nKeep the context.",
    offer: "Uncovered-visit and absence exception desk.",
    desc: "Bring the missed visit, its source and its next owner into one reviewable queue.",
    input: "Absence reports and scheduled visits from an agreed source.",
    output:
      "A source-linked exception, an assigned reviewer and a dated next action.",
    limit:
      "A queued exception is not proof that a visit was missed or a service was delivered.",
    question:
      "Where does your team first learn that a visit might go uncovered?",
  },
  {
    slug: "visit-review",
    name: "Visit Review",
    number: "02",
    icon: "visit-review",
    title: "Every option\nhas a reason.",
    offer:
      "Caregiver matching suggestions with credential/availability constraints.",
    desc: "See why a replacement might fit—and exactly which constraint rules another out.",
    input:
      "Credential records, availability, client preferences and realistic travel assumptions.",
    output:
      "Reviewable suggestions with supporting evidence and explicit uncertainty.",
    limit:
      "A suggestion never assigns a caregiver. Missing or conflicting evidence requires review.",
    question: "Which constraints do dispatchers verify outside your scheduler?",
  },
  {
    slug: "visit-proof",
    name: "Visit Proof",
    number: "03",
    icon: "visit-proof",
    title: "Know the window.\nRespect the limit.",
    offer: "Authorization and visit-hour boundary checker.",
    desc: "Put the service window and remaining authorized hours beside the proposed visit.",
    input:
      "A dated authorization, service window and an agreed balance source.",
    output: "A visible boundary check for the agency’s designated rule owner.",
    limit:
      "No determination of eligibility, reimbursement, billability or compliance.",
    question:
      "Who owns authorization rules and resolves conflicting hour balances?",
  },
  {
    slug: "visit-signal",
    name: "Visit Signal",
    number: "04",
    icon: "visit-signal",
    title: "A discrepancy.\nA clear next step.",
    offer: "EVV discrepancy reconciliation for human review.",
    desc: "Keep conflicting visit evidence visible until a human reviewer resolves it.",
    input:
      "Permitted EVV and scheduling evidence, subject to vendor-interface confirmation.",
    output:
      "A discrepancy queue with source timestamps, review status and an owner.",
    limit:
      "CareKlin is not an EVV replacement. Nothing is submitted to an EVV system in this preview.",
    question: "Which EVV discrepancies consume the most dispatcher time today?",
  },
  {
    slug: "visit-report",
    name: "Visit Report",
    number: "05",
    icon: "visit-report",
    title: "The right update.\nThe right permission.",
    offer:
      "Family/case-manager status communications with controlled permissions.",
    desc: "Make the recipient, permission and review state visible before a status update.",
    input:
      "An agency-approved communication policy and permitted recipient roles.",
    output:
      "A reviewable draft with its intended audience and an attributed decision.",
    limit:
      "Every notification in this concept remains DRAFT — UNSENT. No outreach is connected.",
    question: "Who may receive a visit-status update, and who approves it?",
  },
];
export const sources = [
  {
    name: "CMS · Electronic Visit Verification",
    url: "https://www.medicaid.gov/medicaid/home-community-based-services/home-community-based-services-guidance-additional-resources/electronic-visit-verification",
    detail:
      "Federal EVV context; state implementation must be verified separately.",
  },
  {
    name: "Pennsylvania DHS · EVV",
    url: "https://www.pa.gov/agencies/dhs/resources/for-providers/evv",
    detail:
      "An example state research lens, not a selected or supported pilot state.",
  },
  {
    name: "Pennsylvania DHS · Alternate EVV",
    url: "https://www.pa.gov/agencies/dhs/resources/for-providers/evv/alternate-evv",
    detail: "An example of state-specific interface requirements.",
  },
  {
    name: "HHAeXchange · Provider operations",
    url: "https://www.hhaexchange.com/solutions/providers/efficient-homecare-management",
    detail:
      "An incumbent with substantial scheduling and agency-workflow coverage.",
  },
  {
    name: "Axxess · Home Care",
    url: "https://www.axxess.com/home-care-software",
    detail: "An adjacent scheduling and home-care operations platform.",
  },
  {
    name: "Pennsylvania Homecare Association",
    url: "https://pahomecare.org/membership/",
    detail:
      "An example association channel for operator research; no affiliation.",
  },
];
export const gates = [
  [
    "08",
    "Buyer & dispatcher interviews",
    "One state; separate operations and oversight perspectives.",
  ],
  [
    "02",
    "Replay permissions",
    "Anonymized missed-shift records with bounded data rights.",
  ],
  [
    "01",
    "Confirmed EVV route",
    "Vendor interface, state-rule owner and permitted access.",
  ],
  [
    "01",
    "Paid branch pilot commitment",
    "Director-approved scope, budget, review gate and signed approvals.",
  ],
];
export const faq = [
  [
    "Is CareKlin an operating product?",
    "Not yet. This website and the interactive preview show a research-stage concept using synthetic records. No live integrations, customers, operational results or clinical outcomes are claimed.",
  ],
  [
    "Does this replace our scheduler or EVV system?",
    "No. The proposed starting point is an exception desk over an incumbent scheduler. Mandatory EVV stays in place. We first need to confirm the system of record, vendor interface, permissions and the state-specific workflow.",
  ],
  [
    "Which state is the pilot for?",
    "One state and one geography will be chosen with a pilot sponsor. The research includes Pennsylvania as an example, but no state implementation or support is established.",
  ],
  [
    "Who stays in control?",
    "An identified human reviewer owns every proposed action. Dispatchers review replacement suggestions; the agency’s rule owner resolves authorization and EVV questions. This preview cannot assign a caregiver, send a message or write to an external system.",
  ],
  [
    "How is the pilot price determined?",
    "The starting hypothesis is $650 per branch per month, plus $3,000 for state/EVV setup. This is a willingness-to-pay test, not an active offer, checkout or accepted market price. Per-visit economics must be tested with the agency COO.",
  ],
  [
    "What would make you stop?",
    "We would stop or reposition if there is no confirmed EVV route and state-rule owner, or if replacement suggestions violate travel, skill or authorized-hour constraints. A synthetic demo cannot establish safety, clinical benefit, billability or compliance.",
  ],
];
export const routeMeta = {
  "/": [
    "A gap in the day. A way forward.",
    "A proposed dispatcher-approved exception desk for missed home-care visits.",
  ],
  "/products": [
    "Five proposed modules. One reviewable workflow.",
    "Explore the five CareKlin module concepts.",
  ],
  "/how-it-works": [
    "From an absence to an accountable next step.",
    "Follow one synthetic Tuesday visit through a human-reviewed workflow.",
  ],
  "/preview": [
    "Explore the synthetic exception desk.",
    "A read-only concept preview with local, reversible decisions.",
  ],
  "/use-cases": [
    "Made around the work between visits.",
    "Three operations workflows for a bounded pilot.",
  ],
  "/ecosystem": [
    "Work around the systems you already use.",
    "Integration discovery for the proposed CareKlin overlay.",
  ],
  "/evaluation": [
    "A useful pilot starts with a baseline.",
    "The evidence, metric and readiness gates behind the CareKlin concept.",
  ],
  "/pilot": [
    "One branch. One state. One testable workflow.",
    "Hypothetical pilot pricing and prerequisites.",
  ],
  "/governance": [
    "Every exception needs an owner.",
    "Human review, source evidence and permission boundaries.",
  ],
  "/company": [
    "More room for human judgment.",
    "The purpose and research stage behind CareKlin.",
  ],
  "/request-pilot": [
    "Start with one missed-visit replay.",
    "Prepare a scoped pilot inquiry.",
  ],
  "/contact": [
    "Let’s make the conversation specific.",
    "Prepare an operations, research or integration inquiry.",
  ],
  "/sign-in": [
    "A preview, before a portal.",
    "There are no live CareKlin accounts yet.",
  ],
  "/legal/privacy": [
    "Privacy, in plain language.",
    "How this concept website handles information.",
  ],
  "/legal/terms": [
    "Concept preview terms.",
    "The scope and limitations of this demonstration.",
  ],
  "/accessibility": [
    "A story you can move through your way.",
    "Motion, navigation and accessibility in this concept.",
  ],
};
modules.forEach(
  (m) =>
    (routeMeta["/products/" + m.slug] = [
      m.name + " — " + m.title.replace("\n", " "),
      m.offer,
    ]),
);

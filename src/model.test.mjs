import test from "node:test";
import assert from "node:assert/strict";
import {
  cases,
  candidates,
  initialDecision,
  decide,
  feasible,
} from "./model.mjs";
test("only C is feasible for the clean example; ambiguous and blocked cases abstain", () => {
  assert.deepEqual(
    candidates.map((c) => feasible(c, cases[0])),
    [false, false, true],
  );
  for (const c of candidates) {
    assert.equal(feasible(c, cases[1]), false);
    assert.equal(feasible(c, cases[2]), false);
  }
});
test("only explicit approval of the allowed case changes the decision", () => {
  let state = decide(initialDecision, {
    type: "scroll",
    caseId: "DEMO-VIS-001",
  });
  assert.equal(state.approved, false);
  for (const id of ["DEMO-VIS-002", "DEMO-VIS-003"])
    assert.equal(
      decide(state, { type: "approve", caseId: id, candidateId: "C" }).approved,
      false,
    );
  state = decide(state, {
    type: "approve",
    caseId: "DEMO-VIS-001",
    candidateId: "C",
  });
  assert.equal(state.approved, true);
  assert.equal(state.notification, "DRAFT — UNSENT");
  assert.equal(state.events.length, 1);
  assert.equal(
    decide(state, { type: "approve", caseId: "DEMO-VIS-001", candidateId: "C" })
      .events.length,
    1,
  );
  assert.equal(decide(state, { type: "reset" }).approved, false);
});
test("ten unique records and all notifications remain unsent", () => {
  assert.equal(new Set(cases.map((r) => r.id)).size, 10);
  assert.ok(cases.every((r) => r.notification === "DRAFT — UNSENT"));
  assert.ok(cases.every((r) => r.source.startsWith("DEMO-SRC-")));
});

(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const forcedReduced = new URLSearchParams(location.search).get('motion') === 'reduce';
  const isReduced = () => reduced.matches || forcedReduced;
  const compact = matchMedia('(max-width: 960px), (max-height: 740px)');
  let userPaused = false, state = 0, approved = false, selectedCase = 'clean', lastScroll = -1, ticking = false;
  const root = document.documentElement;
  root.classList.add('js');
  function motionAllowed() { return !isReduced() && !userPaused; }
  function setMotion() {
    root.classList.toggle('motion-enabled', motionAllowed());
    root.classList.toggle('motion-paused', !motionAllowed() || document.hidden);
    root.classList.toggle('still-mode', isReduced());
    const button = $('#motion-toggle');
    if (button) {
      button.setAttribute('aria-pressed', String(!motionAllowed()));
      $('span', button).textContent = isReduced() ? 'Reduced motion' : userPaused ? 'Resume motion' : 'Pause motion';
      $('use', button).setAttribute('href', `assets/icons/sprite.svg#${motionAllowed() ? 'pause' : 'play'}`);
      button.title = isReduced() ? 'Your operating-system reduced-motion preference is respected.' : '';
    }
  }
  $('#motion-toggle')?.addEventListener('click', () => {
    if (isReduced()) { toast('Reduced motion follows your operating-system preference. All content remains available.'); return; }
    userPaused = !userPaused; setMotion();
  });
  reduced.addEventListener('change', () => { setMotion(); updateScroll(); });
  compact.addEventListener('change', () => { lastScroll = -1; updateScroll(); });
  document.addEventListener('visibilitychange', setMotion);
  setMotion();
  const nav = $('.site-nav');
  const menu = $('#main-nav');
  const menuButton = $('#menu-toggle');
  function closeMenu(returnFocus = false) {
    menu?.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    if (returnFocus) menuButton?.focus();
  }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('open', open); menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) $('a', menu)?.focus();
  });
  $$('a', menu || document).forEach(a => a.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.classList.contains('open')) closeMenu(true); });
  document.addEventListener('click', e => { if (menu?.classList.contains('open') && !nav.contains(e.target)) closeMenu(); });
  const revealObserver = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in-view'); revealObserver.unobserve(e.target); }
  }), { threshold: .08 });
  $$('.reveal').forEach(el => revealObserver.observe(el));
  const sceneObserver = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle('scene-offscreen', !e.isIntersecting)), { threshold: 0 });
  $$('[data-animate-scene]').forEach(el => sceneObserver.observe(el));
  let toastTimer;
  function toast(message) {
    const el = $('#toast'); if (!el) return;
    clearTimeout(toastTimer); el.textContent = message; el.classList.add('visible');
    toastTimer = setTimeout(() => el.classList.remove('visible'), 4000);
  }
  $$('[data-toast]').forEach(el => el.addEventListener('click', () => toast(el.dataset.toast)));
  $('#grid-toggle')?.addEventListener('click', e => {
    const mobile = $('#layout-demo').classList.toggle('mobile-grid');
    e.currentTarget.setAttribute('aria-pressed', String(mobile));
    e.currentTarget.textContent = mobile ? 'Show desktop grid' : 'Show mobile grid';
    $('#grid-label').textContent = mobile ? '4 COLUMNS / 20px MARGINS / 16px GAP' : '12 COLUMNS / 1320px MAX / 24px GAP';
  });
  $('#loading-demo')?.addEventListener('click', e => {
    const b = e.currentTarget; b.disabled = true; b.setAttribute('aria-busy', 'true'); b.textContent = 'Checking…';
    setTimeout(() => { b.disabled = false; b.removeAttribute('aria-busy'); b.textContent = 'Review ready'; toast('Simulated loading completed. No network request was made.'); }, 1100);
  });
  $('#demo-form')?.addEventListener('submit', e => {
    e.preventDefault(); let firstInvalid = null;
    ['role','organization','email','region','consent'].forEach(id => {
      const field = $('#' + id), error = $('#' + id + '-error');
      const valid = field.checkValidity(); field.setAttribute('aria-invalid', String(!valid));
      error.textContent = valid ? '' : id === 'email' ? 'Enter a valid example email address.' : id === 'consent' ? 'Confirm the local-demo notice to test this form.' : 'Complete this field to continue.';
      if (!valid && !firstInvalid) firstInvalid = field;
    });
    const feedback = $('#form-feedback');
    if (firstInvalid) { feedback.textContent = ''; firstInvalid.focus(); return; }
    feedback.textContent = 'Validation passed. This is a local demonstration: nothing was sent, saved or added to a waitlist.'; feedback.focus();
  });
  const moduleNotes = {
    'visit-desk': ['Visit Desk','Uncovered-visit and absence exception desk.','Absence intake → dated source → assigned owner → review queue. The orange rail identifies the exception. Keep the queue readable while one record is emphasized.','Do not equate a missed clock-in with a confirmed missed visit.'],
    'visit-review': ['Visit Review','Caregiver matching suggestions with credential/availability constraints.','A is ruled out by skill, B by travel time, C is a feasible suggestion for review. Animate evidence in sequence; keep rejection reasons visible.','Suggestions are not assignments. Client preference, credential freshness and availability need sources.'],
    'visit-proof': ['Visit Proof','Authorization and visit-hour boundary checker.','Show a 1.0-hour proposed allocation against 3.0 hours remaining. Only an explicit simulated approval changes the illustrative remainder to 2.0 hours.','An hour meter does not establish billability, reimbursement or proof of service.'],
    'visit-signal': ['Visit Signal','EVV discrepancy reconciliation for human review.','Place expected and recorded evidence side by side. Highlight the mismatched end time and assigned reviewer.','Never fabricate a clock event or animate an unresolved discrepancy into a resolved state.'],
    'visit-report': ['Visit Report','Family/case-manager status communications with controlled permissions.','Reveal the draft lines after permission context. Keep DRAFT — UNSENT visible throughout the sequence.','No patient outreach, send action or inferred permission.']
  };
  const dialog = $('#module-dialog'); let dialogTrigger;
  $$('[data-module]').forEach(b => b.addEventListener('click', () => {
    dialogTrigger = b; const [title, desc, animation, boundary] = moduleNotes[b.dataset.module];
    $('#dialog-title').textContent = title;
    $('#dialog-content').replaceChildren(...[desc, animation, boundary].map(t => { const p = document.createElement('p'); p.textContent = t; return p; }));
    dialog.showModal(); document.body.classList.add('modal-open');
    if (motionAllowed()) dialog.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:220,easing:'cubic-bezier(.22,1,.36,1)'});
  }));
  $$('.close-dialog').forEach(b => b.addEventListener('click', () => dialog.close()));
  dialog?.addEventListener('close', () => { document.body.classList.remove('modal-open'); dialogTrigger?.focus(); });
  dialog?.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  const stages = [
    ['01 / Detect','The visit\nis uncovered.','An absence arrives at 08:12 for a 09:00 visit. Bring the source, scheduled start and owner into one exception record.'],
    ['02 / Check','Every option\nhas a reason.','A lacks the required skill. B arrives after the scheduled start. C meets the synthetic skill, availability, travel and preference constraints.'],
    ['03 / Review','The dispatcher\nmakes the call.','The record is ready for a human decision. Use the explicit simulation control to preview approval; scrolling alone changes no decision.'],
    ['04 / Retain','Keep the evidence.\nKeep control.','Review state, source history, EVV status and the communication draft stay separate. The notification remains unsent.']
  ];
  function renderStage(next, animate = true) {
    if (!$('#story-title')) return;
    const changed = next !== state; state = next;
    const [eyebrow,title,description] = stages[state];
    $('#story-eyebrow').textContent = eyebrow; $('#story-title').textContent = title; $('#story-title').style.whiteSpace = 'pre-line'; $('#story-description').textContent = description;
    $$('.step-btn').forEach(b => b.setAttribute('aria-current', String(Number(b.dataset.step) === state)));
    $$('.candidate').forEach((c,i) => { c.classList.toggle('rejected', state >= 1 && i < 2); c.classList.toggle('recommended', state >= 1 && i === 2 && selectedCase === 'clean'); });
    updateCase();
    if (changed && animate && motionAllowed()) $('.story-copy').animate([{opacity:.6,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:260,easing:'cubic-bezier(.22,1,.36,1)'});
  }
  function updateCase() {
    if (!$('#record-status')) return;
    const clean = selectedCase === 'clean', ambiguous = selectedCase === 'ambiguous';
    $('#record-title').textContent = clean ? 'Tuesday / 09:00–10:00' : ambiguous ? 'Conflicting source evidence' : 'No feasible replacement';
    $('#record-meta').textContent = `${clean ? 'DEMO-VIS-001' : ambiguous ? 'DEMO-VIS-002' : 'DEMO-VIS-003'} · 20 OCT 2026 · DEMO COUNTY`;
    $('#record-owner').textContent = ambiguous ? 'Owner: Quinn — fictional' : 'Owner: Rowan — fictional';
    $('#record-status').textContent = clean ? approved ? 'Simulated approval recorded' : state === 0 ? 'Uncovered visit' : 'Awaiting dispatcher review' : ambiguous ? 'Needs review · conflicting sources' : 'ABSTAIN · authorized hours exceeded';
    $('#candidates').hidden = !clean;
    $('#evidence-title').textContent = clean ? 'Authorization evidence' : ambiguous ? 'Evidence cannot be reconciled yet' : 'Authorization boundary';
    $('#evidence-copy').textContent = clean ? approved ? '1.0h allocation simulated. 2.0h would remain; no system write.' : '08:00–12:00 window · 1.0h proposed of 3.0h remaining.' : ambiguous ? 'Availability sources conflict. End-time evidence is inconsistent. Verify dated sources before asserting feasibility.' : '1.0h proposed, only 0.5h remaining. Other candidates fail skill or travel constraints. No override.';
    $('#source-copy').textContent = clean ? 'DEMO-AUTH-001 / 08:13 / synthetic evidence' : ambiguous ? 'DEMO-EVV-002-A + B / source freshness unresolved / Quinn — fictional' : 'DEMO-AUTH-003 / 08:13 / escalate to designated rule owner';
    const approve = $('#approve-button'); approve.disabled = !clean || state < 2 || approved;
    approve.textContent = approved && clean ? 'Simulation approved' : 'Simulate dispatcher approval';
    $('#decision-label').textContent = clean ? approved ? '08:15 / Dispatcher Rowan — fictional / simulated approval. EVV: not yet expected. Notification: draft — unsent.' : state < 2 ? 'Continue to stage 03 to simulate review. EVV: not yet expected. Notification: draft — unsent.' : 'Awaiting human review. EVV: not yet expected. Notification: draft — unsent.' : 'Abstain from assignment. Source verification / escalation required. Notification: draft — unsent.';
  }
  $('#case-select')?.addEventListener('change', e => { selectedCase=e.target.value; approved=false; renderStage(Math.max(2,state)); });
  $('#approve-button')?.addEventListener('click', () => { if (selectedCase !== 'clean' || state < 2) return; approved=true; updateCase(); });
  $('#reset-button')?.addEventListener('click', () => { approved=false; selectedCase='clean'; $('#case-select').value='clean'; updateCase(); toast('Synthetic review reset. No external action occurred.'); });
  $$('.step-btn').forEach(b => b.addEventListener('click', () => {
    const n=Number(b.dataset.step); renderStage(n);
    const track=$('#story-track');
    if (!compact.matches && !isReduced()) {
      const top=track.getBoundingClientRect().top+scrollY-84;
      const range=track.offsetHeight-innerHeight+84;
      scrollTo({top:top+(n/3)*range,behavior:'instant'});
    } else track?.style.setProperty('--progress',String(n/3));
  }));
  function updateScroll() {
    ticking=false; nav?.classList.toggle('scrolled',scrollY>12);
    const track=$('#story-track'); if (!track || compact.matches || isReduced()) return;
    const y=track.getBoundingClientRect().top-84, range=track.offsetHeight-innerHeight+84;
    const p=Math.max(0,Math.min(1,-y/range)); track.style.setProperty('--progress',String(p));
    const n=Math.min(3,Math.floor(p*4));
    if (n!==lastScroll) { lastScroll=n; renderStage(n); }
  }
  addEventListener('scroll', () => { if(!ticking){ticking=true;requestAnimationFrame(updateScroll);} }, {passive:true});
  addEventListener('resize', () => { lastScroll=-1; updateScroll(); });
  renderStage(0,false); updateScroll();
})();

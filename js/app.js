(() => {
  'use strict';

  const stages = window.SCALE_STAGES;
  if (!Array.isArray(stages) || stages.length !== 35) throw new Error('Expected exactly 35 stages.');

  const journey = document.getElementById('journey');
  const categoryEl = document.getElementById('stage-category');
  const counterEl = document.getElementById('stage-counter');
  const nameEl = document.getElementById('stage-name');
  const scaleEl = document.getElementById('stage-scale');
  const qualifierEl = document.getElementById('stage-qualifier');
  const descriptionEl = document.getElementById('stage-description');
  const scienceNote = document.getElementById('science-note');
  const progressDots = document.getElementById('progress-dots');
  const nextJourney = document.getElementById('next-journey');
  const nextJourneyButton = document.getElementById('next-journey-button');
  const replayButton = document.getElementById('replay-button');

  const slots = [...document.querySelectorAll('.object-slot')].map((element) => ({
    element,
    image: element.querySelector('img'),
    stageIndex: null
  }));

  const STORAGE_KEY = 'scaleOfExistence.progress.v1';
  const BASE_AXIS_PX = 300;
  const PEEK_PX = 22;
  const MAX_VISUAL_SCALE = 140;
  const HUMAN_HOLD_VH = 1.65;

  let viewportWidth = innerWidth;
  let viewportHeight = innerHeight;
  let segmentDistances = [];
  let cumulative = [];
  let journeyTravelPx = 0;
  let humanHoldPx = 0;
  let visibleStage = 0;
  let lastVisibleStage = -1;
  let maxStageReached = 0;
  let complete = false;
  let rafPending = false;

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const pad2 = (n) => String(n).padStart(2, '0');
  const isLiteral = (s) => s && s.scaleMode === 'literal' && Number.isFinite(s.characteristicMeters) && s.characteristicMeters > 0;

  const logLerp = (a, b, t) => {
    const la = Math.log10(a);
    const lb = Math.log10(b);
    return Math.pow(10, lerp(la, lb, t));
  };

  const targetPx = (stageIndex) => {
    if (stageIndex === 34) return viewportWidth < 768 ? 430 : Math.min(560, viewportHeight * 0.62);
    if (viewportWidth < 768) return clamp(viewportWidth * 0.58, 175, 235);
    return clamp(viewportHeight * 0.34, 280, 340);
  };

  function loadProgress() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!data || data.version !== 1) return;
      maxStageReached = clamp(Number(data.maxStageReached || 0), 0, 35);
      complete = Boolean(data.completedPart1);
    } catch (_) {}
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: 1,
        completedPart1: complete,
        maxStageReached,
        completedAt: complete ? new Date().toISOString() : null
      }));
    } catch (_) {}
  }

  function buildDots() {
    const frag = document.createDocumentFragment();
    stages.forEach((stage, index) => {
      const dot = document.createElement('span');
      dot.className = 'progress-dot';
      dot.dataset.index = index;
      frag.appendChild(dot);
    });
    progressDots.appendChild(frag);
  }

  function updateDots(active) {
    [...progressDots.children].forEach((dot, i) => {
      dot.classList.toggle('is-past', i < active);
      dot.classList.toggle('is-current', i === active);
    });
    progressDots.setAttribute('aria-valuenow', String(active + 1));
  }

  function segmentVH(from, to, index) {
    if (index === 0) return 1.9;
    if (index === 1) return 1.35;
    if (index === 2) return 1.55;
    if (!isLiteral(from) || !isLiteral(to)) return 1.35;
    const decades = Math.abs(Math.log10(to.characteristicMeters / from.characteristicMeters));
    return clamp(1.1 + 0.22 * decades, 1.1, 2.2);
  }

  function recalc() {
    viewportWidth = innerWidth;
    viewportHeight = innerHeight;
    segmentDistances = [];
    cumulative = [0];

    for (let i = 0; i < stages.length - 1; i += 1) {
      const px = segmentVH(stages[i], stages[i + 1], i) * viewportHeight;
      segmentDistances.push(px);
      cumulative.push(cumulative[cumulative.length - 1] + px);
    }

    journeyTravelPx = cumulative[cumulative.length - 1];
    humanHoldPx = HUMAN_HOLD_VH * viewportHeight;
    journey.style.height = `${journeyTravelPx + humanHoldPx + viewportHeight}px`;
  }

  function symbolicPixels(objectIndex, focusIndex) {
    if (objectIndex === 0) return focusIndex === 0 ? targetPx(0) : 0.2;
    if (objectIndex === 1) {
      if (focusIndex === 0) return 12;
      if (focusIndex === 1) return 90;
      if (focusIndex === 2) return 34;
      return 4;
    }
    if (objectIndex === 2) {
      if (focusIndex === 1) return 42;
      if (focusIndex === 2) return 90;
      if (focusIndex === 3) return 22;
      return 4;
    }
    return 1;
  }

  function restPixels(objectIndex, focusIndex) {
    const obj = stages[objectIndex];
    const focus = stages[focusIndex];
    if (!obj || !focus) return 0;

    if (objectIndex <= 2 || focusIndex <= 2) {
      if (objectIndex <= 2) return symbolicPixels(objectIndex, focusIndex);
      if (focusIndex === 2 && objectIndex === 3) return 150;
      return 8;
    }

    if (isLiteral(obj) && isLiteral(focus)) {
      return (obj.characteristicMeters / focus.characteristicMeters) * targetPx(focusIndex);
    }

    return targetPx(focusIndex);
  }

  function transitionPixels(objectIndex, fromIndex, t) {
    const from = stages[fromIndex];
    const to = stages[fromIndex + 1];

    if (fromIndex >= 3 && isLiteral(from) && isLiteral(to)) {
      const cameraMeters = logLerp(from.characteristicMeters, to.characteristicMeters, ease(t));
      const cameraPx = lerp(targetPx(fromIndex), targetPx(fromIndex + 1), ease(t));
      const obj = stages[objectIndex];
      if (isLiteral(obj)) return (obj.characteristicMeters / cameraMeters) * cameraPx;
    }

    return lerp(restPixels(objectIndex, fromIndex), restPixels(objectIndex, Math.min(fromIndex + 1, 34)), ease(t));
  }

  function restX(role, pixels) {
    const w = viewportWidth;
    if (role === 0) return w * 0.5;
    if (role === -1) return pixels > w * 0.9 ? PEEK_PX - pixels / 2 : w * 0.12;
    if (role === 1) return pixels > w * 0.9 ? w - PEEK_PX + pixels / 2 : w * 0.88;
    if (role <= -2) return -w * 0.24;
    if (role >= 2) return pixels > w ? w + pixels / 2 : w * 1.22;
    return w * 0.5;
  }

  function transitionX(objectIndex, fromIndex, t) {
    const p0 = restPixels(objectIndex, fromIndex);
    const p1 = restPixels(objectIndex, Math.min(fromIndex + 1, 34));
    const x0 = restX(objectIndex - fromIndex, p0);
    const x1 = restX(objectIndex - (fromIndex + 1), p1);
    return lerp(x0, x1, ease(t));
  }

  function assignSlot(slot, index) {
    if (slot.stageIndex === index) return;
    slot.stageIndex = index;

    if (index < 0 || index >= stages.length) {
      slot.image.removeAttribute('src');
      slot.element.style.opacity = '0';
      return;
    }

    const stage = stages[index];
    slot.image.src = stage.asset;
    slot.element.classList.toggle('measure-height', stage.axis === 'height');
  }

  function renderSlots(fromIndex, t) {
    const indices = [fromIndex - 1, fromIndex, fromIndex + 1, fromIndex + 2];

    slots.forEach((slot, i) => {
      const objectIndex = indices[i];
      assignSlot(slot, objectIndex);

      if (objectIndex < 0 || objectIndex >= stages.length) return;

      const pixels = transitionPixels(objectIndex, fromIndex, t);
      const x = transitionX(objectIndex, fromIndex, t);
      const locator = pixels > 0 && pixels < 1 && objectIndex < fromIndex + 1 && objectIndex > 0;

      slot.element.classList.toggle('is-locator', locator);
      slot.element.style.left = `${x}px`;
      slot.element.style.top = objectIndex === 34 ? '39%' : '42%';
      slot.element.style.setProperty('--object-base-size', `${BASE_AXIS_PX}px`);
      slot.element.style.setProperty('--object-scale', String(clamp(pixels / BASE_AXIS_PX, 1 / BASE_AXIS_PX, MAX_VISUAL_SCALE)));

      let opacity = 1;
      if (objectIndex === fromIndex + 2) opacity = clamp(t * 1.35, 0, 1) * 0.82;
      if (objectIndex === fromIndex - 1) opacity = clamp(1 - t * 1.4, 0.25, 1);
      slot.element.style.opacity = String(opacity);
    });
  }

  function infoOpacity(t) {
    if (t < 0.15) return 1 - t / 0.15;
    if (t > 0.82) return (t - 0.82) / 0.18;
    return 0;
  }

  function setStage(index) {
    const stage = stages[index];
    categoryEl.textContent = stage.category;
    counterEl.textContent = `${pad2(stage.id)} / 35`;
    nameEl.textContent = stage.name;
    scaleEl.textContent = stage.displayScale;
    qualifierEl.textContent = stage.qualifier || '';
    descriptionEl.textContent = stage.description;
    document.documentElement.style.setProperty('--journey-bg', stage.background || '#FBFAF6');
    scienceNote.classList.toggle('is-visible', index === 1 || index === 2);
    updateDots(index);
    visibleStage = index;

    if (index + 1 > maxStageReached) {
      maxStageReached = index + 1;
      saveProgress();
    }

    preload(index);
  }

  function applyCompletion() {
    if (!complete) return;
    nextJourney.classList.add('is-unlocked');
    nextJourneyButton.textContent = 'Journey unlocked';
  }

  function unlock() {
    if (maxStageReached < 35) return;
    complete = true;
    saveProgress();
    applyCompletion();
  }

  function mapScroll(y) {
    if (y >= journeyTravelPx) {
      return {segment:33,t:1,hold:true,holdProgress:clamp((y - journeyTravelPx) / humanHoldPx, 0, 1)};
    }

    let segment = 0;
    for (let i = 0; i < segmentDistances.length; i += 1) {
      if (y >= cumulative[i]) segment = i;
      if (y < cumulative[i + 1]) break;
    }

    return {segment,t:clamp((y - cumulative[segment]) / segmentDistances[segment], 0, 1),hold:false,holdProgress:0};
  }

  function preload(index) {
    [index - 1, index, index + 1, index + 2].forEach((i) => {
      if (!stages[i]) return;
      const img = new Image();
      img.src = stages[i].asset;
    });
  }

  function render() {
    rafPending = false;
    const top = journey.getBoundingClientRect().top + scrollY;
    const localY = clamp(scrollY - top, 0, journeyTravelPx + humanHoldPx);
    const state = mapScroll(localY);

    renderSlots(state.segment, state.t);

    const nextVisible = state.hold ? 34 : (state.t < 0.5 ? state.segment : Math.min(state.segment + 1, 34));
    if (nextVisible !== lastVisibleStage) {
      setStage(nextVisible);
      lastVisibleStage = nextVisible;
    }

    if (state.hold) {
      const fade = clamp(1 - (state.holdProgress - 0.48) / 0.42, 0, 1);
      document.documentElement.style.setProperty('--stage-info-opacity', String(fade));
      if (state.holdProgress >= 0.92) {
        maxStageReached = 35;
        unlock();
      }
    } else {
      document.documentElement.style.setProperty('--stage-info-opacity', String(infoOpacity(state.t)));
    }

    const reached = state.hold ? 35 : clamp(state.segment + (state.t > 0.92 ? 2 : 1), 1, 35);
    if (reached > maxStageReached) {
      maxStageReached = reached;
      saveProgress();
    }
  }

  function requestRender() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(render);
  }

  addEventListener('scroll', requestRender, {passive:true});
  addEventListener('resize', () => { recalc(); requestRender(); });
  replayButton.addEventListener('click', () => scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}));

  loadProgress();
  buildDots();
  recalc();
  applyCompletion();
  stages.slice(0,3).forEach((s) => { const i = new Image(); i.src = s.asset; });
  setStage(0);
  requestRender();
})();

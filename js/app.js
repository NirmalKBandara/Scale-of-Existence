(() => {
  "use strict";

  const stages = window.SCALE_STAGES;

  if (!Array.isArray(stages) || stages.length !== 35) {
    throw new Error("Expected exactly 35 stages.");
  }

  /* ========================================================
     DOM
     ======================================================== */

  const landing = document.getElementById("landing");
  const journey = document.getElementById("journey");
  const completion = document.getElementById("completion");
  const stageLayer = document.getElementById("stage-layer");

  const categoryEl = document.getElementById("stage-category");
  const counterEl = document.getElementById("stage-counter");
  const nameEl = document.getElementById("stage-name");
  const scaleEl = document.getElementById("stage-scale");
  const qualifierEl = document.getElementById("stage-qualifier");
  const descriptionEl = document.getElementById("stage-description");
  const stageInfo = document.getElementById("stage-info");
  const scienceNote = document.getElementById("science-note");
  const progressDots = document.getElementById("progress-dots");
  const revisitGrid = document.getElementById("revisit-grid");

  /* ========================================================
     CONSTANTS
     ======================================================== */

  const BASE_CANVAS_PX = 300;
  const ANALYSIS_SIZE = 128;
  const ALPHA_THRESHOLD = 28;

  // Browser-safe visual cap. The underlying mathematical ratio is not changed.
  // Huge objects are shown as cropped edge fragments instead of creating
  // multi-billion-pixel DOM elements.
  const MAX_SUBJECT_AXIS_PX = 42000;

  const ANIMATION_MS = 720;
  const REDUCED_ANIMATION_MS = 180;

  const STORAGE_KEY = "scaleOfExistence.progress.v2";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  /* ========================================================
     STATE
     ======================================================== */

  let currentStage = 0;
  let isAnimating = false;
  let wheelLatched = false;
  let wheelResetTimer = null;

  let touchStartY = null;
  let touchStartedInsideJourney = false;

  let completed = false;

  const assetCache = new Map();
  const objectNodes = new Map();

  /* ========================================================
     GENERIC HELPERS
     ======================================================== */

  const clamp = (value, min, max) =>
    Math.min(max, Math.max(min, value));

  const lerp = (a, b, t) =>
    a + (b - a) * t;

  const easeInOut = (t) =>
    t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const pad2 = (value) =>
    String(value).padStart(2, "0");

  const isLiteral = (stage) =>
    stage &&
    stage.scaleMode === "literal" &&
    Number.isFinite(stage.characteristicMeters) &&
    stage.characteristicMeters > 0;

  const viewport = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  });

  /* ========================================================
     PERSISTENCE
     ======================================================== */

  function loadProgress() {
    try {
      const data = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "null"
      );

      completed = Boolean(data?.completed);
    } catch {
      completed = false;
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 2,
          completed,
          completedAt: completed
            ? new Date().toISOString()
            : null
        })
      );
    } catch {
      // Persistence is optional.
    }
  }

  /* ========================================================
     IMAGE LOADING + AUTOMATIC TRANSPARENT-PADDING ANALYSIS

     Every generated PNG can have a different amount of empty
     transparent canvas. We measure the visible alpha bounds at
     runtime and scale/position the SUBJECT rather than the 2048px
     PNG canvas. This fixes many apparent scale inconsistencies.
     ======================================================== */

  async function loadStageAsset(index) {
    if (assetCache.has(index)) {
      return assetCache.get(index);
    }

    const promise = new Promise((resolve) => {
      const stage = stages[index];
      const image = new Image();

      image.decoding = "async";
      image.src = stage.asset;

      image.onload = async () => {
        try {
          if (image.decode) {
            await image.decode();
          }
        } catch {
          // The image is already loaded; decode failure is non-fatal.
        }

        const bounds = analyseAlphaBounds(image);

        resolve({
          image,
          bounds
        });
      };

      image.onerror = () => {
        resolve({
          image: null,
          bounds: {
            x: 0.1,
            y: 0.1,
            width: 0.8,
            height: 0.8,
            cx: 0.5,
            cy: 0.5
          }
        });
      };
    });

    assetCache.set(index, promise);
    return promise;
  }

  function analyseAlphaBounds(image) {
    const canvas = document.createElement("canvas");
    canvas.width = ANALYSIS_SIZE;
    canvas.height = ANALYSIS_SIZE;

    const context = canvas.getContext("2d", {
      willReadFrequently: true
    });

    context.clearRect(0, 0, ANALYSIS_SIZE, ANALYSIS_SIZE);
    context.drawImage(
      image,
      0,
      0,
      ANALYSIS_SIZE,
      ANALYSIS_SIZE
    );

    const pixels = context.getImageData(
      0,
      0,
      ANALYSIS_SIZE,
      ANALYSIS_SIZE
    ).data;

    let minX = ANALYSIS_SIZE;
    let minY = ANALYSIS_SIZE;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < ANALYSIS_SIZE; y += 1) {
      for (let x = 0; x < ANALYSIS_SIZE; x += 1) {
        const alpha =
          pixels[(y * ANALYSIS_SIZE + x) * 4 + 3];

        if (alpha < ALPHA_THRESHOLD) {
          continue;
        }

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }

    if (maxX < minX || maxY < minY) {
      return {
        x: 0.1,
        y: 0.1,
        width: 0.8,
        height: 0.8,
        cx: 0.5,
        cy: 0.5
      };
    }

    // Add a tiny safety margin around anti-aliased edges.
    const pad = 2;

    minX = clamp(minX - pad, 0, ANALYSIS_SIZE - 1);
    minY = clamp(minY - pad, 0, ANALYSIS_SIZE - 1);
    maxX = clamp(maxX + pad, 0, ANALYSIS_SIZE - 1);
    maxY = clamp(maxY + pad, 0, ANALYSIS_SIZE - 1);

    const x = minX / ANALYSIS_SIZE;
    const y = minY / ANALYSIS_SIZE;
    const width = (maxX - minX + 1) / ANALYSIS_SIZE;
    const height = (maxY - minY + 1) / ANALYSIS_SIZE;

    return {
      x,
      y,
      width,
      height,
      cx: x + width / 2,
      cy: y + height / 2
    };
  }

  async function ensureObjectNode(index) {
    if (index < 0 || index >= stages.length) {
      return null;
    }

    if (objectNodes.has(index)) {
      return objectNodes.get(index);
    }

    const asset = await loadStageAsset(index);

    const node = document.createElement("div");
    node.className = "stage-object";
    node.dataset.stage = String(index);

    const scaler = document.createElement("div");
    scaler.className = "stage-object__scale";

    const image = document.createElement("img");
    image.src = stages[index].asset;
    image.alt = "";
    image.draggable = false;

    /*
      Put the PNG so its measured visible subject centre sits on
      the stage object's origin.
    */
    image.style.left =
      `${-BASE_CANVAS_PX * asset.bounds.cx}px`;

    image.style.top =
      `${-BASE_CANVAS_PX * asset.bounds.cy}px`;

    scaler.appendChild(image);
    node.appendChild(scaler);
    stageLayer.appendChild(node);

    const record = {
      node,
      scaler,
      image,
      bounds: asset.bounds
    };

    objectNodes.set(index, record);
    return record;
  }

  async function prepareAround(index) {
    const indexes = new Set([
      index - 1,
      index,
      index + 1,
      index + 2
    ]);

    await Promise.all(
      [...indexes]
        .filter((i) => i >= 0 && i < stages.length)
        .map((i) => ensureObjectNode(i))
    );
  }

  function backgroundPreload() {
    const preloadOne = async (index) => {
      if (index >= stages.length) {
        return;
      }

      await loadStageAsset(index);

      if ("requestIdleCallback" in window) {
        requestIdleCallback(
          () => preloadOne(index + 1),
          { timeout: 1400 }
        );
      } else {
        setTimeout(() => preloadOne(index + 1), 120);
      }
    };

    preloadOne(4);
  }

  /* ========================================================
     PHYSICAL / VISUAL SCALE MODEL
     ======================================================== */

  function targetCurrentAxisPx(index) {
    const { width, height } = viewport();

    // On mobile the current subject gets roughly the central 80%
    // of the width, while height prevents collisions with copy.
    const normal = Math.min(
      width * (width < 768 ? 0.80 : 0.46),
      height * (width < 768 ? 0.36 : 0.35)
    );

    if (index === 34) {
      // Human is a tall final subject.
      return Math.min(
        width < 768 ? width * 0.72 : width * 0.34,
        height * (width < 768 ? 0.52 : 0.56)
      );
    }

    return clamp(
      normal,
      width < 768 ? 200 : 270,
      width < 768 ? 310 : 350
    );
  }

  /*
    The first three stages require authored symbolic choreography.

    - String is theoretical.
    - Quark and electron do not have measured physical diameters.

    Therefore giant right-edge previews for those transitions are
    explicitly symbolic and the UI tells the user so.

    From Proton onward, literal relative linear dimensions are used.
  */
  function subjectAxisPixelsAtRest(objectIndex, focusIndex) {
    if (
      objectIndex < 0 ||
      objectIndex >= stages.length ||
      focusIndex < 0 ||
      focusIndex >= stages.length
    ) {
      return 0;
    }

    const object = stages[objectIndex];
    const focus = stages[focusIndex];
    const target = targetCurrentAxisPx(focusIndex);

    if (objectIndex === focusIndex) {
      return target;
    }

    if (focusIndex <= 2) {
      if (objectIndex < focusIndex) {
        return 0.15;
      }

      if (objectIndex === focusIndex + 1) {
        // Deliberately enormous edge cue.
        return MAX_SUBJECT_AXIS_PX;
      }

      return 0;
    }

    if (!isLiteral(object)) {
      // Point-like/theoretical objects behind a finite-size focus.
      return 0.15;
    }

    if (!isLiteral(focus)) {
      return target;
    }

    const physicalRatio =
      object.characteristicMeters /
      focus.characteristicMeters;

    return clamp(
      target * physicalRatio,
      0.000001,
      MAX_SUBJECT_AXIS_PX
    );
  }

  function recordMetrics(index, subjectAxisPx) {
    const record = objectNodes.get(index);

    if (!record) {
      return null;
    }

    const stage = stages[index];
    const bounds = record.bounds;

    const axisFraction =
      stage.axis === "height"
        ? bounds.height
        : bounds.width;

    const safeAxisFraction =
      Math.max(axisFraction, 0.03);

    const scale =
      subjectAxisPx /
      (BASE_CANVAS_PX * safeAxisFraction);

    const subjectWidthPx =
      BASE_CANVAS_PX *
      bounds.width *
      scale;

    const subjectHeightPx =
      BASE_CANVAS_PX *
      bounds.height *
      scale;

    return {
      scale,
      subjectWidthPx,
      subjectHeightPx
    };
  }

  function peekWidthPx() {
    const { width } = viewport();

    // User requested roughly 3–5% of the viewport.
    return clamp(width * 0.05, 16, 72);
  }

  function restXForRole(role, subjectWidthPx) {
    const { width } = viewport();
    const peek = peekWidthPx();

    if (role === 0) {
      return width * 0.5;
    }

    if (role < 0) {
      // Previous object: never invade the centre.
      if (subjectWidthPx <= peek) {
        return peek * 0.55;
      }

      // Only the rightmost ~5vw of its visible subject remains.
      return peek - subjectWidthPx / 2;
    }

    if (role > 0) {
      // Next object: if enormous, show only a small left edge.
      if (subjectWidthPx <= peek) {
        return width - peek * 0.55;
      }

      return (
        width -
        peek +
        subjectWidthPx / 2
      );
    }

    return width * 0.5;
  }

  function objectY() {
    const { width, height } = viewport();

    return height * (width < 768 ? 0.36 : 0.39);
  }

  function stateForObject(objectIndex, focusIndex) {
    const subjectAxisPx =
      subjectAxisPixelsAtRest(
        objectIndex,
        focusIndex
      );

    const metrics =
      recordMetrics(objectIndex, subjectAxisPx);

    if (!metrics) {
      return {
        x: 0,
        y: objectY(),
        scale: 0,
        opacity: 0,
        locator: false,
        subjectAxisPx: 0
      };
    }

    const role = objectIndex - focusIndex;

    const locator =
      role < 0 &&
      subjectAxisPx > 0 &&
      subjectAxisPx < 1;

    return {
      x: restXForRole(
        role,
        metrics.subjectWidthPx
      ),
      y: objectY(),
      scale: metrics.scale,
      opacity:
        Math.abs(role) <= 1 ? 1 : 0,
      locator,
      subjectAxisPx
    };
  }

  function interpolatePositive(a, b, t) {
    if (a <= 0 || b <= 0) {
      return lerp(a, b, t);
    }

    return Math.exp(
      lerp(
        Math.log(a),
        Math.log(b),
        t
      )
    );
  }

  /* ========================================================
     SCENE RENDERING
     ======================================================== */

  function applyObjectState(
    index,
    state,
    zIndex
  ) {
    const record = objectNodes.get(index);

    if (!record) {
      return;
    }

    record.node.classList.toggle(
      "is-locator",
      state.locator
    );

    record.node.style.zIndex = String(zIndex);

    record.node.style.transform =
      `translate3d(${state.x}px, ${state.y}px, 0)`;

    record.node.style.opacity =
      String(state.opacity);

    record.scaler.style.transform =
      `scale(${Math.max(state.scale, 0.000001)})`;
  }

  function hideUnused(usedIndexes) {
    for (const [index, record] of objectNodes) {
      if (!usedIndexes.has(index)) {
        record.node.style.opacity = "0";
        record.node.classList.remove(
          "is-locator"
        );
      }
    }
  }

  function renderStatic(focusIndex) {
    const used = new Set();

    for (
      let index = focusIndex - 1;
      index <= focusIndex + 1;
      index += 1
    ) {
      if (
        index < 0 ||
        index >= stages.length ||
        !objectNodes.has(index)
      ) {
        continue;
      }

      used.add(index);

      const state =
        stateForObject(index, focusIndex);

      const role = index - focusIndex;
      const zIndex =
        role === 0 ? 6 : 3;

      applyObjectState(
        index,
        state,
        zIndex
      );
    }

    hideUnused(used);
  }

  async function animateStage(
    fromIndex,
    toIndex
  ) {
    if (fromIndex === toIndex) {
      return;
    }

    await Promise.all([
      prepareAround(fromIndex),
      prepareAround(toIndex)
    ]);

    const used = new Set();

    for (
      let index =
        Math.min(fromIndex, toIndex) - 1;
      index <=
        Math.max(fromIndex, toIndex) + 1;
      index += 1
    ) {
      if (
        index >= 0 &&
        index < stages.length
      ) {
        used.add(index);
      }
    }

    const states = new Map();

    for (const index of used) {
      states.set(index, {
        from: stateForObject(
          index,
          fromIndex
        ),
        to: stateForObject(
          index,
          toIndex
        )
      });
    }

    const duration =
      reducedMotion.matches
        ? REDUCED_ANIMATION_MS
        : ANIMATION_MS;

    const startTime = performance.now();

    await new Promise((resolve) => {
      function frame(now) {
        const raw =
          (now - startTime) / duration;

        const t =
          easeInOut(clamp(raw, 0, 1));

        for (const index of used) {
          const pair =
            states.get(index);

          const subjectAxisPx =
            interpolatePositive(
              pair.from.subjectAxisPx,
              pair.to.subjectAxisPx,
              t
            );

          const metrics =
            recordMetrics(
              index,
              Math.max(
                subjectAxisPx,
                0.000001
              )
            );

          const x =
            lerp(
              pair.from.x,
              pair.to.x,
              t
            );

          const y =
            lerp(
              pair.from.y,
              pair.to.y,
              t
            );

          const opacity =
            lerp(
              pair.from.opacity,
              pair.to.opacity,
              t
            );

          const locator =
            t > 0.8
              ? pair.to.locator
              : pair.from.locator;

          const isDestination =
            index === toIndex;

          const isOrigin =
            index === fromIndex;

          applyObjectState(
            index,
            {
              x,
              y,
              scale:
                metrics?.scale || 0,
              opacity,
              locator,
              subjectAxisPx
            },
            isDestination
              ? 7
              : isOrigin
                ? 6
                : 3
          );
        }

        if (raw < 1) {
          requestAnimationFrame(frame);
        } else {
          resolve();
        }
      }

      requestAnimationFrame(frame);
    });

    hideUnused(
      new Set([
        toIndex - 1,
        toIndex,
        toIndex + 1
      ])
    );

    renderStatic(toIndex);
  }

  /* ========================================================
     TEXT / UI
     ======================================================== */

  function setStageText(index) {
    const stage = stages[index];

    categoryEl.textContent =
      stage.category;

    counterEl.textContent =
      `${pad2(stage.id)} / ${stages.length}`;

    nameEl.textContent =
      stage.name;

    scaleEl.textContent =
      stage.displayScale;

    qualifierEl.textContent =
      stage.qualifier || "";

    descriptionEl.textContent =
      stage.description;

    document.documentElement.style.setProperty(
      "--journey-bg",
      stage.background || "#FBFAF6"
    );

    scienceNote.classList.toggle(
      "is-visible",
      index <= 2
    );

    updateProgress(index);
  }

  function buildProgress() {
    const fragment =
      document.createDocumentFragment();

    stages.forEach(() => {
      const dot =
        document.createElement("span");

      dot.className = "progress-dot";
      fragment.appendChild(dot);
    });

    progressDots.appendChild(fragment);
  }

  function updateProgress(index) {
    [...progressDots.children].forEach(
      (dot, i) => {
        dot.classList.toggle(
          "is-past",
          i < index
        );

        dot.classList.toggle(
          "is-current",
          i === index
        );
      }
    );

    progressDots.setAttribute(
      "aria-valuenow",
      String(index + 1)
    );
  }

  function buildRevisitGrid() {
    const fragment =
      document.createDocumentFragment();

    stages.forEach((stage, index) => {
      const button =
        document.createElement("button");

      button.type = "button";
      button.className = "revisit-button";

      button.innerHTML = `
        <span class="revisit-button__number">${pad2(stage.id)}</span>
        <span class="revisit-button__name">${stage.name}</span>
      `;

      button.addEventListener(
        "click",
        async () => {
          currentStage = index;

          await prepareAround(
            currentStage
          );

          setStageText(
            currentStage
          );

          renderStatic(
            currentStage
          );

          journey.scrollIntoView({
            behavior:
              reducedMotion.matches
                ? "auto"
                : "smooth",
            block: "start"
          });
        }
      );

      fragment.appendChild(button);
    });

    revisitGrid.appendChild(fragment);
  }

  /* ========================================================
     JOURNEY NAVIGATION
     ======================================================== */

  function journeyAlignment() {
    const rect =
      journey.getBoundingClientRect();

    return {
      rect,
      aligned:
        Math.abs(rect.top) <=
          Math.max(4, innerHeight * 0.035)
    };
  }

  async function goToStage(nextIndex) {
    if (
      isAnimating ||
      nextIndex < 0 ||
      nextIndex >= stages.length ||
      nextIndex === currentStage
    ) {
      return;
    }

    isAnimating = true;

    stageInfo.classList.add(
      "is-transitioning"
    );

    const from =
      currentStage;

    await animateStage(
      from,
      nextIndex
    );

    currentStage =
      nextIndex;

    setStageText(
      currentStage
    );

    stageInfo.classList.remove(
      "is-transitioning"
    );

    isAnimating = false;
  }

  async function navigateDirection(direction) {
    if (isAnimating) {
      return;
    }

    if (direction > 0) {
      if (
        currentStage <
        stages.length - 1
      ) {
        await goToStage(
          currentStage + 1
        );
        return;
      }

      completed = true;
      saveProgress();

      completion.scrollIntoView({
        behavior:
          reducedMotion.matches
            ? "auto"
            : "smooth",
        block: "start"
      });

      return;
    }

    if (currentStage > 0) {
      await goToStage(
        currentStage - 1
      );
      return;
    }

    landing.scrollIntoView({
      behavior:
        reducedMotion.matches
          ? "auto"
          : "smooth",
      block: "start"
    });
  }

  /* ========================================================
     DESKTOP WHEEL
     One deliberate wheel/trackpad gesture = one stage.
     ======================================================== */

  function resetWheelLatchSoon() {
    clearTimeout(
      wheelResetTimer
    );

    wheelResetTimer =
      setTimeout(() => {
        wheelLatched = false;
      }, 170);
  }

  window.addEventListener(
    "wheel",
    (event) => {
      const { rect, aligned } =
        journeyAlignment();

      /*
        Approaching journey from the landing:
        first scroll gesture lands on String.
      */
      if (
        !aligned &&
        event.deltaY > 0 &&
        rect.top > 0 &&
        rect.top <
          innerHeight * 0.72
      ) {
        event.preventDefault();

        journey.scrollIntoView({
          behavior:
            reducedMotion.matches
              ? "auto"
              : "smooth",
          block: "start"
        });

        return;
      }

      if (!aligned) {
        return;
      }

      event.preventDefault();
      resetWheelLatchSoon();

      if (
        wheelLatched ||
        Math.abs(event.deltaY) < 8
      ) {
        return;
      }

      wheelLatched = true;

      navigateDirection(
        event.deltaY > 0 ? 1 : -1
      );
    },
    { passive: false }
  );

  /* ========================================================
     MOBILE TOUCH
     One swipe = one stage while the journey is aligned.
     ======================================================== */

  window.addEventListener(
    "touchstart",
    (event) => {
      if (
        event.touches.length !== 1
      ) {
        return;
      }

      const { aligned } =
        journeyAlignment();

      touchStartedInsideJourney =
        aligned;

      touchStartY =
        event.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (event) => {
      if (
        touchStartedInsideJourney
      ) {
        event.preventDefault();
      }
    },
    { passive: false }
  );

  window.addEventListener(
    "touchend",
    (event) => {
      if (
        !touchStartedInsideJourney ||
        touchStartY === null
      ) {
        touchStartY = null;
        touchStartedInsideJourney =
          false;
        return;
      }

      const endY =
        event.changedTouches[0]?.clientY;

      if (!Number.isFinite(endY)) {
        return;
      }

      const delta =
        touchStartY - endY;

      touchStartY = null;
      touchStartedInsideJourney =
        false;

      if (Math.abs(delta) < 35) {
        return;
      }

      navigateDirection(
        delta > 0 ? 1 : -1
      );
    },
    { passive: true }
  );

  /* ========================================================
     KEYBOARD
     ======================================================== */

  window.addEventListener(
    "keydown",
    (event) => {
      const { aligned } =
        journeyAlignment();

      if (!aligned) {
        return;
      }

      if (
        [
          "ArrowDown",
          "PageDown",
          " "
        ].includes(event.key)
      ) {
        event.preventDefault();
        navigateDirection(1);
      }

      if (
        [
          "ArrowUp",
          "PageUp"
        ].includes(event.key)
      ) {
        event.preventDefault();
        navigateDirection(-1);
      }
    }
  );

  /* ========================================================
     RESIZE
     ======================================================== */

  let resizeTimer = null;

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(() => {
          renderStatic(
            currentStage
          );
        }, 80);
    }
  );

  /* ========================================================
     BOOT
     ======================================================== */

  async function boot() {
    loadProgress();
    buildProgress();
    buildRevisitGrid();

    await prepareAround(0);

    setStageText(0);
    renderStatic(0);

    // First few images should be decoded immediately.
    await Promise.all(
      [1, 2, 3]
        .filter(
          (index) =>
            index < stages.length
        )
        .map(
          (index) =>
            loadStageAsset(index)
        )
    );

    backgroundPreload();
  }

  boot().catch((error) => {
    console.error(
      "Scale of Existence failed to initialize:",
      error
    );
  });
})();

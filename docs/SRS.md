# Scale of Existence — Software Requirements Specification (SRS)

**Document:** `SRS.md`  
**Product:** Scale of Existence  
**Version:** 1.0  
**Status:** Implementation-ready baseline  
**Target stack:** Plain HTML + CSS + Vanilla JavaScript  
**Primary experience:** Smallest/theoretical scales → Human  
**Primary route:** `scale.nirmalbandara.com` or equivalent deployment path  
**Main journey length:** 35 stages  
**Generated image assets assumed available:** 35 journey illustrations + favicon + OG image

---

## 1. Purpose

Scale of Existence is a single-page educational scrolling website designed to help ordinary people **feel how scale changes across reality**.

The first journey begins at an explicitly theoretical string-scale visualization and travels through elementary particles, composite particles, atoms, molecules, biological structures, microscopic organisms, small animals, and finally the human scale.

The website is not intended to behave like a scientific database, a dashboard, a quiz, or a conventional slideshow. Its core purpose is experiential:

> The visitor should repeatedly feel: **“That next thing is really that much larger?”**

The experience must communicate size primarily through **relative visual scale and camera movement**, not through paragraphs of explanation.

---

## 2. Product Vision

The product should feel like a beautiful, modern illustrated science book that becomes interactive when the user scrolls.

It must be:

- simple;
- warm;
- approachable;
- visually memorable;
- understandable without scientific training;
- scientifically responsible about uncertainty;
- lightweight enough to run as a static website;
- usable on desktop and mobile;
- fully functional without a backend.

It must **not** feel like:

- a futuristic control panel;
- a cyberpunk interface;
- a space game;
- a data dashboard;
- an academic lecture slide;
- an encyclopedia article;
- a collection of cards.

---

## 3. Scope

### 3.1 Included in Version 1

Version 1 shall include:

1. One minimal landing viewport.
2. One continuous scroll-controlled scale journey.
3. Thirty-five ordered scale stages.
4. A centered current object.
5. A previous object located to the left.
6. A next object located to the right.
7. Scientifically meaningful relative scaling where physical dimensions are valid.
8. Explicit handling of theoretical and point-like stages.
9. A thin curved visual journey ribbon.
10. Current-stage title, representative scale, and one short explanation.
11. Minimal progress indication.
12. A final Human stage.
13. A completion state after Human.
14. A locked/unlocked “Beyond You” continuation area.
15. Local completion persistence using `localStorage`.
16. Responsive desktop/mobile behavior.
17. Reduced-motion accessibility behavior.
18. Favicon and Open Graph metadata.
19. No server-side component.

### 3.2 Not Included in Version 1

The following are out of scope:

- Human → Universe content itself;
- accounts or authentication;
- comments;
- social feeds;
- backend database;
- cloud synchronization;
- user-generated content;
- quizzes;
- achievements or gamification;
- autoplay sound;
- WebGL dependency;
- 3D rendering dependency;
- AR/VR;
- scientific simulation;
- localization beyond architecture readiness;
- CMS/admin interface.

---

## 4. Core Experience Rule

At every normal journey stop:

- **Previous object = left**
- **Current object = center**
- **Next object = right**

Only the **current object** receives visible educational text.

Previous and next objects shall not receive:

- labels;
- cards;
- names;
- “previous”/“next” text;
- buttons;
- tooltips;
- arrows.

The visitor discovers the next object by scrolling toward it.

---

## 5. Scientific Accuracy Policy

Scientific honesty takes priority over visual convenience.

### 5.1 The Journey Is a Scale Sequence, Not a Formation Chain

The website must never imply:

`String → Quark → Electron → Proton → Nucleus → Atom`

as a causal manufacturing sequence.

The ribbon represents **movement through characteristic size scales**, not “this object becomes the next object.”

No wording such as “then this combines and becomes…” may be used unless that relationship is scientifically correct for the specific pair.

### 5.2 Characteristic Dimension

For real macroscopic and microscopic objects, each stage uses one representative **characteristic dimension**, such as:

- diameter;
- length;
- width;
- body length.

This dimension is explicitly stored in the data model.

A cross-category scale comparison is therefore a comparison of representative linear dimensions, **not volume, mass, area, or biological complexity**.

### 5.3 Variation

Many biological objects vary naturally in size.

The website shall use a representative value for visual scaling and may store a range for documentation.

The UI should use `≈` for representative values.

### 5.4 Fundamental String

A fundamental string is not an experimentally confirmed object.

The first stage is an intentionally theoretical opening.

Required wording:

- label: **Fundamental String**
- scale line: `~10⁻³⁵ m`
- qualifier: `Hypothetical · String theory`

The internal model may use the 2022 CODATA Planck length, approximately `1.616255 × 10⁻³⁵ m`, only as a **theoretical illustrative anchor**, not as a measured string size.

The website must not claim:

> “A string is the smallest thing in the universe.”

### 5.5 Quark

Quarks are treated as fundamental and point-like in the Standard Model. CERN reports no evidence of substructure down to approximately `10⁻²⁰ m`.

Therefore:

- no literal measured diameter shall be claimed;
- `10⁻²⁰ m` may only be presented as an experimental probing/upper-limit context, not the quark’s measured size;
- the quark asset is symbolic;
- any aura around the quark is not part of its physical size.

### 5.6 Electron

The electron is also treated as point-like in current particle physics.

Therefore:

- do **not** assign the electron a physical diameter such as `10⁻¹⁵ m`;
- do **not** portray its decorative cloud as a measured electron radius;
- do **not** represent the electron as a tiny planet on an orbit;
- its stage is a symbolic elementary-particle stop.

### 5.7 Proton

True representative dimensional scaling resumes at the proton stage.

Use approximately:

- proton charge radius: `0.84075 fm`;
- illustrative diameter: approximately `1.6815 fm = 1.6815 × 10⁻¹⁵ m`.

The UI may simplify this to:

`≈ 1.7 × 10⁻¹⁵ m across`

### 5.8 Atom

Atoms do not have perfectly hard geometric boundaries.

The Hydrogen stage uses a representative atomic diameter around twice the Bohr radius:

`≈ 1.06 × 10⁻¹⁰ m`

This is a characteristic scale, not a solid-shell diameter.

---

## 6. Target Users

### 6.1 Primary Users

- general public;
- school students;
- university students outside physics;
- curious adults;
- people browsing educational content casually;
- mobile users discovering the site through a shared link.

### 6.2 Required User Knowledge

None.

A person should understand how to use the site within approximately five seconds:

> **Scroll.**

---

## 7. User Goals

A visitor should be able to:

1. understand the site’s concept immediately;
2. start without creating an account;
3. scroll naturally;
4. observe scale changes;
5. identify the current object;
6. read one simple explanation;
7. understand which objects are theoretical or symbolically rendered;
8. reach Human;
9. recognize that the first journey is complete;
10. unlock the next journey only after completing the first one.

---

## 8. Information Architecture

Version 1 is primarily one continuous page:

```text
Landing
  ↓
Journey
  ├─ Stage 01
  ├─ Stage 02
  ├─ ...
  ├─ Stage 35
  ↓
Completion
  ↓
Beyond You unlock
```

There is no traditional navigation bar.

---

# 9. Landing Screen

## 9.1 Layout

The first viewport must be visually simple.

### Top-left

Small wordmark:

**Scale of Existence**

No menu items.

### Center

Large title:

# Scale of Existence

Subtitle:

**A journey through the sizes of reality — from the smallest scales to you.**

Instruction:

**Scroll to begin**

A tiny mouse or down-arrow animation may appear beneath the instruction.

### Prohibited Landing Elements

Do not show:

- Earth;
- galaxies;
- a human character;
- insects;
- atoms;
- a collage of journey items;
- cards;
- statistics;
- category menu;
- large CTA button;
- navbar links;
- sign-in;
- footer content above the fold.

## 9.2 Landing Background

Base:

`#FBFAF6`

Allowed decoration:

- a few tiny pastel dots;
- subtle star-like four-point decorative marks;
- one or two abstract soft curved shapes;
- one barely visible curved line.

Decoration must remain secondary to the title.

## 9.3 Landing Transition

After approximately one viewport of downward scrolling:

- landing content moves upward;
- opacity decreases;
- the journey viewport takes over;
- the first stage becomes current;
- no hard page navigation occurs.

---

# 10. Journey Viewport

## 10.1 Sticky Experience

The journey shall use a viewport-height sticky scene.

Recommended structure:

```html
<section class="journey">
  <div class="journey-sticky">
    <div class="world"></div>
    <div class="stage-info"></div>
    <div class="stage-counter"></div>
    <div class="progress-dots"></div>
  </div>
</section>
```

Vertical page distance drives the internal animation.

## 10.2 Main Visual Anchors

Reference desktop viewport:

`1440 × 900`

Nominal anchors:

- previous object world anchor: `12vw`
- current object anchor: `50vw`
- next object world anchor: `88vw`

These are not rigid screen positions during transition.

The camera/world transform determines what is visible.

## 10.3 Current Object

At rest:

- centered horizontally;
- main subject clear;
- typically about `25–35vh` in its relevant characteristic axis;
- Human may use `55–65vh`.

Under the object:

1. name;
2. representative scale;
3. optional scientific qualifier;
4. one sentence description.

Text maximum width:

`480px`

## 10.4 Previous Object

Previous object:

- is placed to the left in the same world;
- uses the current camera scale;
- may become tiny;
- may become sub-pixel;
- may disappear completely;
- shall never be artificially enlarged merely to remain visible.

When physical rendering becomes less than one pixel, a separate 3–5 px low-opacity **locator dot** may remain.

The locator dot is not the physical object.

## 10.5 Next Object

Next object:

- is placed to the right;
- uses the same current camera scale;
- may be larger than the viewport;
- may appear only as a small curved edge or fragment;
- shall not be shrunk simply so the whole image fits.

Cropping is a desired part of the experience.

---

# 11. Relative Scale Engine

## 11.1 Literal Scale Mode

For stages with a meaningful physical characteristic dimension:

```text
pixelsPerMeter =
    targetCurrentCharacteristicPixels
    / currentStage.characteristicMeters
```

For a neighboring object:

```text
neighborCharacteristicPixels =
    neighborStage.characteristicMeters
    × pixelsPerMeter
```

This is the primary true-relative-scale rule.

## 11.2 Asset Normalization

Transparent image canvas size must not be treated as the object’s physical size.

Each object requires metadata describing:

- image width;
- image height;
- normalized subject bounding box;
- characteristic measurement axis;
- characteristic-axis fraction inside the subject bounding box.

Recommended pre-processing:

1. keep original 2048 × 2048 generated asset;
2. identify alpha bounding box;
3. create metadata;
4. render based on measured subject bounds rather than transparent canvas bounds.

Example metadata:

```js
{
  id: 23,
  slug: "ant",
  image: "assets/items/23-ant.webp",
  characteristicMeters: 0.005,
  measurementAxis: "body-length",
  subjectBounds: {
    x: 0.08,
    y: 0.22,
    width: 0.84,
    height: 0.56
  }
}
```

## 11.3 Camera Normalization

Each current object should fit an intended characteristic pixel size.

Recommended default:

```text
desktop: 280–340 px
tablet: 240–300 px
mobile: 180–240 px
```

Different shapes may use a stage-level `targetPx` override.

This controls the camera, not the physical neighbor relationship.

## 11.4 Very Large Neighbor

If the calculated size exceeds viewport size:

- preserve calculated scale;
- allow clipping;
- render only visible intersection;
- avoid giant raster layout dimensions when possible.

Implementation may cap the DOM image element’s actual dimensions and apply an equivalent transform or canvas-independent clip strategy, provided the resulting on-screen ratio remains perceptually correct.

## 11.5 Very Small Neighbor

If rendered characteristic size is:

- `>= 1px`: show the image normally;
- `< 1px`: object may visually disappear;
- optional locator dot may remain.

Do not clamp the object itself to a visible minimum.

## 11.6 Symbolic Scale Mode

Stages 01–03 require special behavior.

Supported scale modes:

```text
theoretical
pointlike-limit
pointlike-symbolic
literal
```

### String → Quark

Do not claim a measured literal size ratio.

The transition may communicate an enormous conceptual gap using:

- long scroll duration;
- shrinking string visualization;
- scale ticker;
- a short uncertainty note.

### Quark ↔ Electron

Do not scale one as a measured larger physical object than the other.

Both appear as symbolic point-like markers.

Use a mostly horizontal transition with minimal “size competition.”

Display once:

`Elementary particles are treated as point-like; these illustrations are symbolic.`

### Electron → Proton

Electron remains a point-like symbolic marker.

Proton becomes the first composite object with a meaningful measured charge scale.

---

# 12. Scroll and Motion Model

## 12.1 Input

Primary input:

- mouse wheel;
- trackpad vertical scroll;
- touchscreen vertical swipe;
- keyboard/page scrolling through normal browser behavior.

The website must not hijack horizontal wheel gestures.

## 12.2 Motion Direction

User scrolls downward.

The world visually advances from right to left so the upcoming object moves from the right into the center.

Current object then moves toward the left.

## 12.3 Transition Phases

Every transition uses four logical phases.

### Phase A — Rest

- current object centered;
- information visible;
- previous on left;
- next on right.

### Phase B — Departure

- current text fades;
- world begins shifting;
- current object moves left;
- camera starts changing scale.

### Phase C — Scale Transition

- camera interpolates logarithmically where possible;
- previous/current/next retain correct relative scale;
- upcoming object approaches center.

### Phase D — Arrival

- upcoming object reaches center;
- camera settles;
- new title/scale/description fades in;
- stage counter updates;
- stage is marked visited.

## 12.4 Easing

Recommended:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Avoid:

- bounce;
- elastic overshoot;
- abrupt snap;
- spinning;
- unnecessary rotation.

## 12.5 Logarithmic Camera Interpolation

For literal scales, camera zoom should interpolate in logarithmic space.

If:

- current characteristic size = `S1`
- next characteristic size = `S2`

then camera scale should transition using:

```text
logS(t) = log10(S1) + easedT × [log10(S2) - log10(S1)]
```

This produces a natural scale journey.

## 12.6 Scroll Distance

Base transition distance:

`110vh`

For literal stages:

```text
decades = abs(log10(nextSize/currentSize))

recommendedScrollVH =
  clamp(110 + 22 × decades, 110, 220)
```

This means large scale jumps physically take longer to travel.

For theoretical/point-like special transitions, use authored distances between:

`130vh–220vh`

## 12.7 Scroll Reversal

Scrolling upward must reverse the same visual transition.

No separate backward animation system is required.

The experience must be deterministic from current scroll progress.

---

# 13. Scale Ribbon

A single visual ribbon connects the journey.

## 13.1 Style

- thin;
- soft indigo/blue-grey;
- approximately 1.5–2px;
- low contrast;
- gently curved;
- visually hand-drawn rather than geometric;
- no neon glow.

## 13.2 Behavior

Ribbon:

- moves with world;
- passes near each object anchor;
- bends gently;
- does not imply that one object transforms into another;
- remains a navigational visual metaphor only.

SVG is preferred.

No raster asset is required.

---

# 14. Stage Information

Only current-stage information is visible.

Required structure:

```text
Object Name
Representative Scale
Optional qualifier
One-sentence explanation
```

Examples:

```text
Tardigrade
≈ 0.5 mm
A microscopic animal with four pairs of short legs.
```

```text
Fundamental String
~10⁻³⁵ m
Hypothetical · String theory
A theoretical one-dimensional object proposed in string theory.
```

Text must remain brief.

No paragraph longer than approximately 18–24 words should appear during the journey.

---

# 15. Journey Categories

Category labels may appear subtly in the top-left.

Suggested categories:

1. `THEORETICAL`
2. `ELEMENTARY PARTICLES`
3. `SUBATOMIC`
4. `ATOMIC`
5. `MOLECULAR`
6. `CELLULAR MACHINERY`
7. `MICROSCOPIC LIFE`
8. `MICRO-ANIMALS`
9. `VISIBLE LIFE`
10. `HUMAN SCALE`

Category transition should be subtle and not create extra pages.

---

# 16. Progress UI

## 16.1 Stage Counter

Top-right:

`01 / 35`

Small and unobtrusive.

## 16.2 Progress Dots

Bottom center:

35 tiny dots.

Recommended:

- future: 2–3 px, low opacity;
- completed: slightly darker;
- current: approximately 5 px.

Progress dots are not clickable in Version 1.

No scrubber bar.

No timeline labels.

No direct stage skipping.

---

# 17. Background Evolution

The background stays light and calm.

Suggested states:

| Category | Background tendency |
|---|---|
| Theoretical | warm off-white with faint violet |
| Elementary | off-white / pale violet |
| Subatomic | off-white |
| Atomic | warm cream |
| Molecular | cream with faint blue |
| Cellular | slight mint tint |
| Microscopic life | pale blue-green |
| Micro-animals | soft pale blue |
| Visible life | warm natural cream |
| Human | clean warm off-white |

Transitions must be subtle.

No starfields or outer-space photography.

---

# 18. Design System

## 18.1 Colors

```css
--bg-main: #FBFAF6;
--bg-alt: #F6F4EE;
--text-main: #18223A;
--text-muted: #6F7482;
--accent-indigo: #696FFB;
--accent-coral: #FF8D7C;
--accent-blue: #78B7FF;
--accent-mint: #7FD8BC;
--accent-yellow: #F5C96B;
--accent-violet: #A994F5;
```

## 18.2 Typography

Preferred:

`Nunito Sans`

Fallback:

```css
system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

### Landing title

- desktop: approximately `clamp(3.5rem, 8vw, 7rem)`
- weight: `800`
- line-height: approximately `0.95–1.0`

### Stage name

- `clamp(2rem, 4vw, 3.75rem)`
- weight `700–800`

### Scale

- `clamp(1rem, 1.5vw, 1.35rem)`
- weight `600`

### Description

- `clamp(0.95rem, 1.2vw, 1.1rem)`
- line-height `1.5`

## 18.3 Corners and Cards

The main journey should not use cards.

The final unlock area may use one gently rounded container.

No glassmorphism.

---

# 19. Canonical 35-Stage Dataset

The values below are representative design values used for linear visual comparison.

**Important:** biological sizes vary. Values marked symbolic/theoretical must not be presented as measured object diameters.

| # | Stage | Canonical characteristic value | Measurement basis | Scale mode | Asset |
|---:|---|---:|---|---|---|
| 01 | Fundamental String | 1.616255e-35 m | theoretical Planck-scale anchor | theoretical | `01-string.webp` |
| 02 | Quark | `<1e-20 m` context only | experimental substructure limit, not diameter | pointlike-limit | `02-quark.webp` |
| 03 | Electron | no measured radius | point-like elementary particle | pointlike-symbolic | `03-electron.webp` |
| 04 | Proton | 1.6815e-15 m | approx. 2 × proton charge radius | literal | `04-proton.webp` |
| 05 | Carbon-12 Nucleus | 5.4e-15 m | representative nuclear diameter | literal | `05-atomic-nucleus.webp` |
| 06 | Hydrogen Atom | 1.058e-10 m | approx. 2 × Bohr radius | literal | `06-hydrogen-atom.webp` |
| 07 | Water Molecule | 2.75e-10 m | representative molecular extent | literal | `07-water-molecule.webp` |
| 08 | Hemoglobin Protein | 5.5e-9 m | representative molecular dimension | literal | `08-hemoglobin.webp` |
| 09 | Ribosome | 2.5e-8 m | representative diameter | literal | `09-ribosome.webp` |
| 10 | T4 Bacteriophage | 2.0e-7 m | representative overall length | literal | `10-bacteriophage.webp` |
| 11 | Mycoplasma | 3.0e-7 m | representative cell dimension | literal | `11-mycoplasma.webp` |
| 12 | Mitochondrion | 1.5e-6 m | representative length | literal | `12-mitochondrion.webp` |
| 13 | E. coli | 2.0e-6 m | representative cell length | literal | `13-e-coli.webp` |
| 14 | Yeast Cell | 5.0e-6 m | representative diameter | literal | `14-yeast.webp` |
| 15 | Red Blood Cell | 7.5e-6 m | typical diameter | literal | `15-red-blood-cell.webp` |
| 16 | Human Sperm Cell | 5.0e-5 m | representative total length | literal | `16-sperm-cell.webp` |
| 17 | Paramecium | 2.0e-4 m | representative body length | literal | `17-paramecium.webp` |
| 18 | Rotifer | 3.0e-4 m | representative body length | literal | `18-rotifer.webp` |
| 19 | Tardigrade | 5.0e-4 m | representative body length | literal | `19-tardigrade.webp` |
| 20 | C. elegans | 1.0e-3 m | adult body length | literal | `20-c-elegans.webp` |
| 21 | Daphnia | 2.0e-3 m | representative body length | literal | `21-daphnia.webp` |
| 22 | Fruit Fly | 2.5e-3 m | representative body length | literal | `22-fruit-fly.webp` |
| 23 | Ant | 5.0e-3 m | representative worker body length | literal | `23-ant.webp` |
| 24 | Ladybird Beetle | 8.0e-3 m | representative body length | literal | `24-ladybird.webp` |
| 25 | Honey Bee | 1.3e-2 m | representative worker body length | literal | `25-honey-bee.webp` |
| 26 | House Cricket | 2.0e-2 m | representative body length | literal | `26-house-cricket.webp` |
| 27 | Garden Snail | 3.5e-2 m | representative body length | literal | `27-garden-snail.webp` |
| 28 | Bee Hummingbird | 5.82e-2 m | representative total length | literal | `28-bee-hummingbird.webp` |
| 29 | Small Mouse | 9.0e-2 m | representative body length excluding tail | literal | `29-small-mouse.webp` |
| 30 | House Sparrow | 1.6e-1 m | representative total length | literal | `30-house-sparrow.webp` |
| 31 | Human Hand | 1.8e-1 m | representative adult hand length | literal | `31-human-hand.webp` |
| 32 | Rock Cavy | 2.2e-1 m | body length | literal | `32-rock-cavy.webp` |
| 33 | Red Panda | 5.9e-1 m | representative body length excluding tail | literal | `33-red-panda.webp` |
| 34 | Beaver | 1.1 m | representative total length | literal | `34-beaver.webp` |
| 35 | Human | 1.7 m | representative adult standing height | literal | `35-human.webp` |

---

# 20. Canonical Stage Copy

Descriptions should stay short and may be refined for tone, but must preserve scientific meaning.

| # | Name | Display scale | Required short description / qualifier |
|---:|---|---|---|
| 01 | Fundamental String | `~10⁻³⁵ m` | `Hypothetical · A string-theory scale, not an experimentally observed object.` |
| 02 | Quark | `<10⁻²⁰ m probed` | `A fundamental particle with no known internal structure.` |
| 03 | Electron | `Point-like` | `An elementary particle with no measured physical radius.` |
| 04 | Proton | `≈1.7 × 10⁻¹⁵ m across` | `A composite particle built from quarks and gluons.` |
| 05 | Carbon-12 Nucleus | `≈5.4 × 10⁻¹⁵ m` | `A compact cluster of six protons and six neutrons.` |
| 06 | Hydrogen Atom | `≈1.1 × 10⁻¹⁰ m` | `An atomic-scale electron cloud surrounding one proton.` |
| 07 | Water Molecule | `≈0.28 nm` | `One oxygen atom bonded to two hydrogen atoms.` |
| 08 | Hemoglobin | `≈5.5 nm` | `A folded protein that carries oxygen in red blood cells.` |
| 09 | Ribosome | `≈25 nm` | `A molecular machine that builds proteins.` |
| 10 | T4 Bacteriophage | `≈200 nm` | `A virus specialized to infect bacteria.` |
| 11 | Mycoplasma | `≈0.3 μm` | `Among the smallest independently reproducing cellular organisms.` |
| 12 | Mitochondrion | `≈1.5 μm` | `A cell organelle that helps produce usable energy.` |
| 13 | E. coli | `≈2 μm` | `A rod-shaped bacterium commonly used in biology research.` |
| 14 | Yeast Cell | `≈5 μm` | `A single-celled fungus.` |
| 15 | Red Blood Cell | `≈7.5 μm` | `A flexible human cell specialized for oxygen transport.` |
| 16 | Human Sperm Cell | `≈50 μm long` | `A highly specialized human reproductive cell.` |
| 17 | Paramecium | `≈0.2 mm` | `A single-celled organism large enough to have complex internal structures.` |
| 18 | Rotifer | `≈0.3 mm` | `A microscopic multicellular animal.` |
| 19 | Tardigrade | `≈0.5 mm` | `A tiny eight-legged animal often called a water bear.` |
| 20 | C. elegans | `≈1 mm` | `A tiny roundworm widely used in biological research.` |
| 21 | Daphnia | `≈2 mm` | `A small freshwater crustacean often called a water flea.` |
| 22 | Fruit Fly | `≈2.5 mm` | `A tiny insect widely used in genetics research.` |
| 23 | Ant | `≈5 mm` | `A representative small worker ant.` |
| 24 | Ladybird Beetle | `≈8 mm` | `A small rounded beetle.` |
| 25 | Honey Bee | `≈13 mm` | `A representative worker honey bee.` |
| 26 | House Cricket | `≈20 mm` | `A small insect with powerful jumping legs.` |
| 27 | Garden Snail | `≈35 mm` | `A small land mollusc carrying a spiral shell.` |
| 28 | Bee Hummingbird | `≈5.8 cm` | `The world’s smallest living bird species.` |
| 29 | Small Mouse | `≈9 cm body length` | `A representative small mouse, excluding its tail.` |
| 30 | House Sparrow | `≈16 cm` | `A familiar small bird found around people worldwide.` |
| 31 | Human Hand | `≈18 cm` | `A familiar reference scale from your own body.` |
| 32 | Rock Cavy | `≈22 cm` | `A small South American mammal related to guinea pigs.` |
| 33 | Red Panda | `≈59 cm body length` | `A small mammal with a long tail not included in this scale value.` |
| 34 | Beaver | `≈1.1 m` | `A large semi-aquatic rodent.` |
| 35 | Human | `≈1.7 m` | `You have reached the scale of a person.` |

---

# 21. Stage Data Model

Recommended `scale-data.js` structure:

```js
export const stages = [
  {
    id: 1,
    slug: "string",
    name: "Fundamental String",
    category: "theoretical",
    scaleMode: "theoretical",
    characteristicMeters: 1.616255e-35,
    displayScale: "~10⁻³⁵ m",
    qualifier: "Hypothetical · String theory",
    description:
      "A string-theory scale, not an experimentally observed object.",
    measurementAxis: "theoretical-length",
    targetPxDesktop: 300,
    targetPxMobile: 210,
    asset: "assets/items/01-string.webp",
    alt: "Stylized illustration of a hypothetical fundamental string",
    sourceNote: "Theoretical Planck-scale anchor"
  },

  // ...

  {
    id: 35,
    slug: "human",
    name: "Human",
    category: "human-scale",
    scaleMode: "literal",
    characteristicMeters: 1.7,
    displayScale: "≈1.7 m",
    qualifier: null,
    description: "You have reached the scale of a person.",
    measurementAxis: "standing-height",
    targetPxDesktop: 560,
    targetPxMobile: 430,
    asset: "assets/items/35-human.webp",
    alt: "Full-body illustrated adult human standing neutrally"
  }
];
```

For Quark and Electron:

```js
characteristicMeters: null
```

A separate contextual field may be used:

```js
experimentalLimitMeters: 1e-20
```

Never feed that value into literal diameter rendering.

---

# 22. Rendering State Model

Required states:

```text
LANDING
TRANSITION_TO_JOURNEY
STAGE_ACTIVE
STAGE_TRANSITION
HUMAN_ACTIVE
COMPLETION_TRANSITION
COMPLETE_LOCKED_STATE
COMPLETE_UNLOCKED_STATE
```

In normal operation the user should experience them continuously rather than as visible application “modes.”

---

# 23. Stage Visit Tracking

A stage counts as visited when:

- its center transition progress reaches the defined arrival threshold;
- recommended threshold: `>= 0.92` of its incoming transition.

Store in memory:

```js
visitedStages = new Set()
```

Part One completion requires:

```text
all 35 stages visited in sequence
AND
Human completion threshold crossed
```

A user must not unlock Part Two merely by changing a URL hash.

---

# 24. Human Stage

Human is the emotional endpoint.

## 24.1 Layout

- full human illustration;
- roughly 55–65vh high on desktop;
- centered;
- generous empty space.

Text:

# Human

`≈ 1.7 m`

`You have reached the scale of a person.`

Optional secondary line after a short delay:

`From a theoretical Planck-scale beginning to a scale you know instinctively.`

Do not overload this screen.

## 24.2 Extra Scroll

Human should remain visible for a deliberate amount of scroll before completion begins.

Recommended:

`140–180vh`

This prevents the ending from feeling accidental.

---

# 25. Completion Experience

After the required post-Human scroll:

Human gently recedes.

Main completion text:

# You made it here.

Secondary:

**35 scales explored.**

No confetti.

No score.

No badge.

No “100%” gaming UI.

---

# 26. Beyond You Unlock

## 26.1 Initial Locked State

Before completion, the future journey exists conceptually but is inaccessible.

Do not expose a direct clickable skip from the landing page for first-time visitors.

## 26.2 Unlock Animation

After Part One completion:

1. simple lock outline visible;
2. outline gently changes;
3. lock opens;
4. container brightens slightly;
5. continuation content fades in.

Animation should be restrained.

## 26.3 Copy

Small label:

**NEXT JOURNEY**

Title:

# Beyond You

Description:

**Continue outward — from the human scale toward planets, stars, galaxies, and the observable universe.**

If the next journey is already implemented:

Button:

**Continue outward →**

If the next journey is not implemented yet:

Show:

**Journey unlocked**

and hide/disable navigation without presenting a broken link.

## 26.4 Reused Asset

Use the same `35-human.webp`.

Do not generate a second Human illustration for the unlock area.

---

# 27. Persistence

Use `localStorage`.

Recommended schema:

```js
{
  version: 1,
  completedPart1: true,
  completedAt: "ISO-8601 timestamp",
  maxStageReached: 35
}
```

Recommended key:

```text
scaleOfExistence.progress.v1
```

No personal data is required.

If storage is unavailable, experience must still work during the current session.

---

# 28. Returning Visitor Behavior

If Part One is completed:

Landing still displays the original:

**Scroll to begin**

A subtle secondary option may appear:

**Continue outward →**

Only show this if the next journey has a valid destination.

The original journey must remain replayable.

---

# 29. Image Assets

Assume the following main assets have been generated and approved:

```text
assets/items/01-string.webp
assets/items/02-quark.webp
assets/items/03-electron.webp
assets/items/04-proton.webp
assets/items/05-atomic-nucleus.webp
assets/items/06-hydrogen-atom.webp
assets/items/07-water-molecule.webp
assets/items/08-hemoglobin.webp
assets/items/09-ribosome.webp
assets/items/10-bacteriophage.webp
assets/items/11-mycoplasma.webp
assets/items/12-mitochondrion.webp
assets/items/13-e-coli.webp
assets/items/14-yeast.webp
assets/items/15-red-blood-cell.webp
assets/items/16-sperm-cell.webp
assets/items/17-paramecium.webp
assets/items/18-rotifer.webp
assets/items/19-tardigrade.webp
assets/items/20-c-elegans.webp
assets/items/21-daphnia.webp
assets/items/22-fruit-fly.webp
assets/items/23-ant.webp
assets/items/24-ladybird.webp
assets/items/25-honey-bee.webp
assets/items/26-house-cricket.webp
assets/items/27-garden-snail.webp
assets/items/28-bee-hummingbird.webp
assets/items/29-small-mouse.webp
assets/items/30-house-sparrow.webp
assets/items/31-human-hand.webp
assets/items/32-rock-cavy.webp
assets/items/33-red-panda.webp
assets/items/34-beaver.webp
assets/items/35-human.webp
```

Additional:

```text
assets/meta/scale-icon.png
assets/meta/og-scale-of-existence.webp
```

Total exported image assets:

**37**

---

# 30. Asset Validation Requirements

Before integration every main image must be checked for:

- transparent background;
- no baked-in text;
- no border;
- no unwanted backdrop;
- no watermark;
- consistent illustration style;
- full subject not accidentally cropped;
- correct filename;
- valid alpha channel;
- visually useful orientation;
- scientifically recognizable subject.

If any generated image contains large transparent padding inconsistent with others, do not solve the problem using arbitrary CSS size guesses. Record a subject bounding box.

---

# 31. Responsive Requirements

## 31.1 Desktop

Target:

`>= 1024px`

- full three-object composition;
- current object centered;
- fragments of neighboring objects visible when physical scaling permits.

## 31.2 Tablet

Target:

`768–1023px`

- preserve current object center;
- previous/next may move closer to edges;
- reduce text width;
- retain true relative scaling.

## 31.3 Mobile

Target:

`<768px`

- portrait-first;
- current centered;
- previous mostly outside left;
- next mostly outside right;
- side fragments are acceptable;
- stage text positioned below current subject;
- stage counter top-right;
- progress dots may reduce visual spacing.

Do not convert mobile into stacked cards.

## 31.4 Very Small Mobile

At approximately `320px` width:

- title must not overflow;
- stage name must wrap at most once;
- description must stay readable;
- current object must not cover text;
- unlock card must become single-column.

---

# 32. Accessibility Requirements

## 32.1 Reduced Motion

Honor:

```css
@media (prefers-reduced-motion: reduce)
```

Reduced-motion mode shall:

- reduce zoom amplitude;
- reduce parallax;
- remove decorative drift;
- shorten easing duration;
- keep sequence and content;
- preserve relative scale concept using crossfade + restrained resizing.

## 32.2 Text

All educational text must be real DOM text.

Do not bake labels into images.

## 32.3 Alternative Text

Each meaningful image requires concise alt text.

Decorative ribbon/background SVG should use:

```html
aria-hidden="true"
```

## 32.4 Contrast

Body text and controls should meet WCAG AA contrast against the chosen background where practical.

## 32.5 Keyboard

Normal browser keyboard scrolling must work.

No keyboard trap.

## 32.6 Focus

Only actual interactive controls receive focus.

Progress dots are non-interactive and must not enter tab order.

---

# 33. Performance Requirements

This site contains 35 large transparent images, so image loading must be controlled.

## 33.1 Formats

Production:

- WebP preferred;
- PNG master preserved outside production bundle if desired.

## 33.2 Loading Strategy

Initial load:

- landing assets;
- Stage 01;
- Stage 02;
- optionally Stage 03.

Then prefetch:

- current;
- previous;
- next;
- next + 1.

Do not eagerly decode all 35 full-resolution assets on first paint.

## 33.3 Image Sizing

Provide appropriately compressed production assets.

Suggested maximum per journey image:

- preferred `< 300 KB`;
- acceptable `< 500 KB` for complex transparent subjects;
- optimize without visible degradation.

## 33.4 Core Web Performance Targets

Target on a modern mid-range device and good connection:

- LCP under ~2.5 s where practical;
- CLS near zero;
- interaction/scroll stays near 60 fps;
- no repeated layout thrashing.

## 33.5 Animation Implementation

Prefer:

- `transform`;
- `opacity`;
- `requestAnimationFrame`;
- passive scroll listeners where applicable.

Avoid:

- animating width/height every frame;
- reading/writing layout repeatedly inside one frame;
- hundreds of independent DOM animations.

---

# 34. Browser Requirements

Support current stable versions of:

- Chrome;
- Edge;
- Firefox;
- Safari;
- Samsung Internet;
- mobile Chrome;
- mobile Safari.

The experience should degrade gracefully if advanced interpolation APIs are unavailable.

---

# 35. Technical Architecture

Recommended structure:

```text
/
├── index.html
├── css/
│   ├── styles.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── scale-data.js
│   ├── scale-engine.js
│   ├── progress.js
│   └── asset-loader.js
├── assets/
│   ├── items/
│   │   ├── 01-string.webp
│   │   ├── ...
│   │   └── 35-human.webp
│   └── meta/
│       ├── scale-icon.png
│       └── og-scale-of-existence.webp
├── favicon.ico
├── robots.txt
├── sitemap.xml
└── SRS.md
```

The implementation may be simplified to fewer JS files if code quality remains clear.

No build system is required.

---

# 36. HTML Requirements

Use semantic structure where appropriate:

```html
<header>
<main>
<section>
<figure>
<h1>
<h2>
<p>
<button>
<footer>
```

The sticky visual world may require neutral `<div>` wrappers.

The site must remain understandable to assistive technology without relying on visual object placement.

---

# 37. JavaScript Requirements

JavaScript is responsible for:

- scroll progress mapping;
- current stage calculation;
- camera interpolation;
- world translation;
- stage information updates;
- progress tracking;
- asset preloading;
- completion detection;
- localStorage state;
- reduced-motion behavior.

JavaScript must not:

- make external API calls for core content;
- require a framework;
- require login;
- fetch scientific values dynamically.

All canonical stage data ships with the site.

---

# 38. CSS Requirements

CSS is responsible for:

- typography;
- backgrounds;
- responsive layout;
- sticky viewport;
- object layers;
- ribbon;
- progress dots;
- completion card;
- reduced-motion styling;
- decorative landing shapes.

Do not use large amounts of inline style generated every frame when CSS variables can be updated instead.

Recommended dynamic variables:

```css
--world-x
--camera-scale
--stage-opacity
--bg-progress
```

---

# 39. Functional Requirements

## Landing

**FR-001** The system shall display a one-viewport landing screen.  
**FR-002** The landing screen shall show the product name.  
**FR-003** The landing screen shall show a short description.  
**FR-004** The landing screen shall instruct the user to scroll.  
**FR-005** The landing screen shall not contain a conventional navigation bar.  
**FR-006** Vertical scrolling shall transition directly into the journey.

## Journey

**FR-007** The system shall contain exactly 35 Part One stages.  
**FR-008** Stages shall appear in the canonical order defined by this SRS.  
**FR-009** At rest, the current stage shall be centered.  
**FR-010** The previous stage shall exist to the left when applicable.  
**FR-011** The next stage shall exist to the right when applicable.  
**FR-012** Only the current stage shall show a name.  
**FR-013** Only the current stage shall show a description.  
**FR-014** The current stage shall show a scale or scientifically appropriate qualifier.  
**FR-015** Scrolling downward shall advance the visual world leftward.  
**FR-016** Scrolling upward shall reverse the journey.  
**FR-017** Literal scale stages shall use representative linear-size ratios.  
**FR-018** Neighbor objects shall not be clamped to a fake minimum or maximum merely for visibility.  
**FR-019** Oversized objects may be clipped by the viewport.  
**FR-020** Sub-pixel objects may disappear.  
**FR-021** A locator dot may represent the location of an invisible prior object.  
**FR-022** Quark and Electron shall use symbolic point-like rendering rules.  
**FR-023** Fundamental String shall be visibly identified as hypothetical.  
**FR-024** Journey progression shall include a 35-stage counter.  
**FR-025** The system shall provide a minimal progress indicator.  
**FR-026** Progress indicator dots shall not allow stage skipping.

## Motion

**FR-027** Scale interpolation for literal objects shall occur in logarithmic scale space.  
**FR-028** Large order-of-magnitude gaps shall receive greater scroll distance.  
**FR-029** Stage text shall fade during transition and return at arrival.  
**FR-030** Motion shall avoid bounce/elastic effects.

## Completion

**FR-031** Human shall be Stage 35.  
**FR-032** Human shall remain visible for an intentional post-arrival scroll segment.  
**FR-033** Completion shall not occur before Human is visited.  
**FR-034** Completion shall not occur until the post-Human threshold is crossed.  
**FR-035** The completion screen shall display `You made it here.`  
**FR-036** The completion screen shall display `35 scales explored.`  
**FR-037** The Beyond You area shall remain locked before completion.  
**FR-038** The Beyond You area shall unlock after completion.  
**FR-039** Completion state shall be stored locally.  
**FR-040** Replaying Part One shall remain possible after completion.

## Assets

**FR-041** The system shall use the 35 approved journey image assets.  
**FR-042** Decorative UI elements shall be built with HTML/CSS/SVG where practical.  
**FR-043** Previous/current/next scale calculations shall use subject bounds rather than transparent canvas dimensions.

---

# 40. Non-Functional Requirements

**NFR-001 — Simplicity:** A new visitor shall understand the primary interaction without instruction beyond “Scroll to begin.”

**NFR-002 — Scientific integrity:** The site shall distinguish measured, representative, bounded, symbolic, and theoretical scales.

**NFR-003 — Visual consistency:** All 35 illustrations shall appear to belong to one illustration system.

**NFR-004 — Performance:** Scrolling shall remain smooth on modern desktop and mobile devices.

**NFR-005 — Accessibility:** Reduced-motion preferences shall be respected.

**NFR-006 — Responsiveness:** The experience shall work from 320px mobile width through large desktop screens.

**NFR-007 — Privacy:** No personal information shall be required.

**NFR-008 — Maintainability:** Stage content shall be data-driven from a single canonical dataset.

**NFR-009 — Portability:** The site shall deploy as static files to common hosts/CDNs.

**NFR-010 — No vendor lock-in:** Core experience shall not depend on a proprietary framework or API.

---

# 41. SEO and Sharing

Required `<title>`:

`Scale of Existence — From the Smallest Scales to You`

Suggested meta description:

`Scroll through the scale of reality, from theoretical fundamental scales through particles, cells and tiny creatures to the human scale.`

Open Graph:

- image: `assets/meta/og-scale-of-existence.webp`
- dimensions: `1200 × 630`

Canonical URL should be configured at deployment.

---

# 42. Privacy and Security

The site should make no unnecessary network requests.

Do not include:

- user accounts;
- tracking pixels by default;
- fingerprinting;
- location requests;
- microphone/camera access;
- unnecessary cookies.

`localStorage` is used only for journey progress.

If analytics are later added, they must be documented separately and must not be required for core functionality.

---

# 43. Failure and Fallback Behavior

## Images Fail to Load

If one image fails:

- preserve stage title/scale/description;
- show a neutral placeholder circle/shape;
- continue the journey.

## JavaScript Disabled

A fully animated journey is not required without JS.

However, the page should provide a basic noscript message such as:

`This interactive scale journey requires JavaScript to animate the relative-size experience.`

## localStorage Failure

Completion remains valid for the current page session.

No blocking error message is required.

---

# 44. Reduced-Motion Alternative

When reduced motion is enabled:

- keep each stage visually distinct;
- use shorter fades;
- limit continuous camera movement;
- show size changes using restrained interpolated resize;
- avoid strong zoom acceleration.

Scientific scale ratios should still influence visible size.

---

# 45. Quality Assurance — Visual Acceptance

The implementation fails visual acceptance if any of the following occur:

1. Journey looks like a futuristic dashboard.
2. A navbar appears during the journey.
3. Previous or next objects have labels.
4. Objects are contained in cards.
5. Every neighboring object is forced to fit on screen.
6. Tiny previous objects are artificially enlarged.
7. Huge next objects are artificially shrunk.
8. Quark is presented as a measured physical sphere.
9. Electron is presented as having a `10⁻¹⁵ m` diameter.
10. Electron is illustrated as a planet orbiting a nucleus.
11. String is described as experimentally proven.
12. Progress dots are used as stage-skip buttons.
13. Homepage becomes a collage.
14. Human ending is rushed.
15. Unlock animation becomes gamified.

---

# 46. Quality Assurance — Scientific Acceptance

The implementation fails scientific acceptance if:

- “string” is called the confirmed smallest thing in the universe;
- the `10⁻²⁰ m` quark probing limit is described as a measured quark diameter;
- the electron receives an invented literal radius;
- the proton visual is treated as three fixed classical balls;
- the atom is presented as a hard-shell object without qualification;
- the journey wording implies every adjacent object is formed directly from the prior object;
- natural biological size variation is presented as exact;
- red panda scale includes tail while the stored value is body-only;
- mouse value is visually compared using tail length when the stored scale is body-only;
- Human 1.7 m is described as a universal average rather than a representative scale.

---

# 47. Test Cases

## TC-001 — Landing

**Given** a first-time visitor  
**When** the page loads  
**Then** only a minimal landing composition is visible  
**And** “Scroll to begin” is clearly understandable.

## TC-002 — Enter Journey

**When** the user scrolls past the landing threshold  
**Then** the first journey stage becomes active without a page reload.

## TC-003 — Current/Previous/Next

**Given** a middle literal stage  
**Then** current is centered  
**And** previous is left  
**And** next is right.

## TC-004 — Huge Scale Gap

**Given** Carbon-12 nucleus → Hydrogen atom  
**When** Carbon-12 nucleus is current  
**Then** the atom is allowed to be vastly larger than the viewport  
**And** the system does not reduce it to a convenient thumbnail.

## TC-005 — Tiny Previous Object

**Given** Hydrogen atom is current  
**Then** the Carbon-12 nucleus should become extremely small relative to it.

## TC-006 — Point-Like Particle

**Given** Electron is current  
**Then** no measured physical diameter is shown.

## TC-007 — Reverse Scroll

**When** the user scrolls upward  
**Then** the prior transition reverses smoothly and deterministically.

## TC-008 — Completion Lock

**Given** Stage 35 has not been completed  
**Then** Beyond You remains inaccessible.

## TC-009 — Completion Unlock

**Given** all stages were visited and Human completion threshold is crossed  
**Then** Beyond You unlocks.

## TC-010 — Persistence

**Given** Part One was completed  
**When** the user reloads  
**Then** completion remains stored locally.

## TC-011 — Mobile

**Given** a 360 × 800 viewport  
**Then** current object and text remain readable  
**And** side objects may be clipped  
**And** no horizontal document scrollbar appears.

## TC-012 — Reduced Motion

**Given** `prefers-reduced-motion: reduce`  
**Then** the site preserves the complete journey with substantially reduced motion.

## TC-013 — Asset Bounds

**Given** an illustration with large transparent margins  
**Then** visual scale is calculated from subject bounds, not full 2048px canvas size.

---

# 48. Recommended Implementation Order

1. Create final static folder structure.
2. Convert/compress all 35 approved assets to WebP.
3. Validate transparency and filenames.
4. Record subject bounding boxes.
5. Implement `scale-data.js`.
6. Build landing viewport.
7. Build one sticky journey viewport.
8. Implement three-stage renderer: previous/current/next.
9. Implement literal scale math.
10. Implement log camera interpolation.
11. Implement special symbolic rules for stages 01–03.
12. Add stage copy.
13. Add ribbon.
14. Add background transitions.
15. Add progress indicator.
16. Add Human ending.
17. Add completion/unlock.
18. Add localStorage.
19. Add mobile behavior.
20. Add reduced-motion behavior.
21. Optimize images/loading.
22. Run scientific QA.
23. Run responsive QA.
24. Run performance QA.
25. Deploy.

---

# 49. Definition of Done

Part One is complete only when:

- all 35 stages are implemented;
- every approved image is correctly integrated;
- stage order matches the canonical dataset;
- symbolic stages are scientifically qualified;
- literal relative-scale rendering works;
- extreme scale gaps visibly communicate their magnitude;
- vertical scroll controls the horizontal journey;
- no journey navbar exists;
- only the current object is labeled;
- the landing screen is minimal;
- Human has a deliberate ending moment;
- Beyond You remains locked before completion;
- completion persists locally;
- mobile is usable;
- reduced-motion mode works;
- no core console errors occur;
- no missing production assets occur;
- site loads as static HTML/CSS/JS;
- scientific wording passes the acceptance checks above.

---

# 50. Scientific Reference Basis

These references are not intended to turn the page into an academic paper. They define the factual baseline used when authoring the stage data.

### Fundamental constants / Planck scale

NIST, CODATA Recommended Values of the Fundamental Physical Constants: 2022  
https://physics.nist.gov/cuu/pdf/all.pdf

NIST fundamental constants portal  
https://physics.nist.gov/constants

CERN Courier — discussion of strings and the Planck-length scale  
https://cerncourier.com/a/testing-times-for-strings/

### Quarks, atoms, nuclei

CERN — CMS probes quarks to approximately `10⁻²⁰ m` with no evidence of compositeness  
https://home.cern/cms-looks-deep-inside-quarks/

CERN — LHC guide, representative atom/nucleus/quark scales  
https://home.cern/sites/default/files/2018-07/CERN-Brochure-2017-002-Eng_0.pdf

### Proton

Particle Data Group / CODATA proton charge radius context  
https://pdgprod.lbl.gov/pdgprod/pdgLive/DataBlock.action?node=S016CR

### Cellular scale

National Institute of General Medical Sciences — representative organelle and cell dimensions  
https://nigms.nih.gov/biobeat/2021/03/take-a-tour-of-your-cells-organelles

### Red blood cell

NCBI Bookshelf — typical red blood cell diameter approximately `7.5 μm`  
https://www.ncbi.nlm.nih.gov/sites/books/NBK263/

### C. elegans

NCBI Bookshelf / WormBook — adult approximately `1 mm` long  
https://www.ncbi.nlm.nih.gov/books/NBK299460/

### Bee hummingbird

Animal Diversity Web — average length approximately `5.82 cm`  
https://animaldiversity.org/accounts/Mellisuga_helenae/

### Honey bee

Animal Diversity Web — worker adults typically approximately `10–15 mm`  
https://animaldiversity.org/accounts/Apis_mellifera/

### House sparrow

Cornell Lab of Ornithology — approximately `15–17 cm` long  
https://www.allaboutbirds.org/guide/House_Sparrow/id

### Rock cavy

Smithsonian National Zoo — approximately `22 cm` long  
https://nationalzoo.si.edu/animals/rock-cavy

### Red panda

Smithsonian National Zoo — approximately `56–62.5 cm` body length plus tail  
https://nationalzoo.si.edu/animals/red-panda

### Beaver

Smithsonian National Zoo — approximately `1–1.2 m` long  
https://nationalzoo.si.edu/animals/beaver

---

# 51. Final Product Principle

When deciding between two implementation options, prioritize in this order:

1. **Scientific honesty**
2. **The feeling of scale**
3. **Clarity**
4. **Smoothness**
5. **Visual beauty**
6. **Extra features**

If an extra visual element does not help the visitor understand or feel the scale, remove it.

The product succeeds when someone can scroll from the theoretical smallest scale to Human and understand — mostly through motion and relative size — just how enormous the gaps between those scales are.

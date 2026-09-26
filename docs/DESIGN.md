# Scale of Existence — Design Specification

## 1. Project Goal

Create a simple, friendly, illustrated scrolling experience that lets an ordinary person **feel the scale of reality**.

This is not a futuristic science dashboard.

It should feel:

- Friendly
- Curious
- Calm
- Slightly cartoon-like
- Educational without feeling like a textbook
- Visually beautiful but simple
- Easy enough for a child or adult to understand immediately

The first journey contains **35 scale stops**, beginning at the smallest theoretical scale and ending at the human scale.

The experience should be implemented using:

- Plain HTML
- Plain CSS
- Vanilla JavaScript
- No React
- No UI framework
- No component library
- No WebGL requirement

---

# 2. Core Concept

The visitor scrolls **vertically**.

However, the visual journey behaves as though the camera is moving **horizontally through scale**.

At every major scale stop:

- Previous object is on the LEFT.
- Current object is in the CENTER.
- Next object is on the RIGHT.

Only the CURRENT object receives:

- Name
- Scale
- One very short description

The previous and next objects should NOT have:

- Cards
- Names
- Explanations
- Buttons
- Labels

They simply exist in the scene.

The user should understand where they came from and where they are going purely through the visual composition.

---

# 3. Main Visual Principle

## Current object

The current object should normally appear around:

**25–35% of viewport height**

It should be visually clear and recognizable.

The camera scale changes between stages so that the current object becomes comfortably visible.

Example:

When the current object is a proton:

- Proton fits comfortably in the center.
- Previous object may be effectively invisible on the left.
- Next object may be so large that only part of it enters from the right.

After scrolling:

- Camera zooms outward.
- Proton becomes extremely small and moves left.
- Next object moves toward the center.
- Next object becomes the new current object.

This is the main illusion of the website.

---

# 4. Real Scale Rule

The website must NOT fake relative sizes just to make the layout convenient.

For normal objects:

`rendered relative size = real characteristic size of object ÷ characteristic size of current object`

Example:

If object B is 100× larger than object A:

When A is current:

- A may appear 300 px wide.
- B would mathematically appear around 30,000 px wide.
- The viewport should therefore show only a tiny section/edge of B entering from the right.

Do NOT resize B down merely so the whole object fits.

When B becomes current:

- Camera zooms outward.
- B now fits around 300 px.
- A becomes around 3 px on the left.

This behavior is essential.

---

# 5. Objects Smaller Than One Pixel

Some previous objects will become much smaller than one screen pixel.

Do NOT artificially enlarge them.

Their actual illustrated layer may become invisible.

However, for orientation, a separate subtle locator may remain:

- 3–5 px neutral dot
- Very low opacity
- No object name
- No card

This locator is NOT the object itself.

It simply communicates:

“There is something back there.”

---

# 6. Objects Larger Than the Viewport

A next object can become dramatically larger than the viewport.

That is desirable.

Possible appearance:

- A curved edge entering from the right
- Part of a cell membrane
- Part of an insect body
- A giant curve
- A texture covering part of the right side

Do NOT force the entire object to fit.

Cropping communicates scale.

---

# 7. Scientific Special Cases

## Fundamental String

String is hypothetical.

It can be visually represented as:

- Tiny flexible loop
- Single curved strand
- Simple soft-colored line

The illustration thickness is only artistic.

Display:

**Fundamental String**

`~10⁻³⁵ m`

Small secondary text:

`Hypothetical · String theory`

Do not state that strings are experimentally confirmed.

---

## Quark

A quark has no measured physical diameter.

Current physics treats it as point-like within experimental limits.

Therefore:

- Do NOT depict it as a literal colored ball with a physical surface.
- Main representation should be a tiny point.
- A soft decorative circular aura can surround it for visibility.
- The aura is NOT part of the scale measurement.

---

## Electron

Same rule as the quark.

Electron should NOT be shown as a miniature classical planet orbiting something.

Use:

- Central point
- Small soft cloud / probability-inspired glow
- No nucleus
- No planetary orbit graphics

Quark → Electron should behave mostly like a horizontal transition rather than pretending there is a scientifically known diameter ratio.

During these stages show a tiny unobtrusive note:

`Elementary particles are treated as point-like; illustration is symbolic.`

This note disappears after leaving the elementary-particle stages.

---

# 8. Overall Art Direction

## Style

Use modern educational cartoon illustration.

Think:

- Children's science book
- Modern editorial illustration
- Soft mobile-app illustration
- Friendly museum exhibit

Do NOT use:

- Cyberpunk
- Neon HUD
- Glassmorphism dashboards
- Futuristic holograms
- Sci-fi control panels
- Space-game UI
- Heavy glowing effects
- Metallic interfaces
- Complicated graphs
- Excessive gradients
- Photorealistic renders

---

# 9. Illustration Style

All 35 main object images must belong to the same illustration system.

Each image:

- Transparent background
- Centered subject
- No text
- No border
- No frame
- No shadow outside the object
- Soft rounded shapes
- Clear silhouette
- Maximum 3–5 main colors
- Gentle internal shading
- Minimal highlights
- Slight handmade/cartoon feeling
- Scientifically recognizable
- Not childish clip-art
- Not anime character style
- Not photorealistic

Use clean modern cartoon science illustration.

---

# 10. Color System

## Main Background

Warm off-white:

`#FBFAF6`

Alternative light areas:

`#F6F4EE`

The website should feel warm rather than sterile white.

---

## Main Text

Deep blue-black:

`#18223A`

---

## Muted Text

`#6F7482`

---

## Main Accent

Soft indigo:

`#696FFB`

---

## Secondary Accent Colors

Soft coral:

`#FF8D7C`

Soft blue:

`#78B7FF`

Soft mint:

`#7FD8BC`

Soft yellow:

`#F5C96B`

Soft violet:

`#A994F5`

These should mainly appear inside illustrations.

---

# 11. Typography

Use one friendly font family across the website.

Recommended:

**Nunito Sans**

Fallback:

`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Title:

- ExtraBold / 800
- Rounded feeling

Object names:

- Bold / 700

Descriptions:

- Regular / 400–500

Avoid ultra-thin typography.

---

# 12. Homepage

The homepage occupies exactly one viewport.

No complicated navigation.

No navigation bar.

No About / Explore / Scale / Contact links.

---

## Homepage Layout

Top-left:

Small text wordmark:

**Scale of Existence**

Nothing else in the header.

---

## Main Area

Centered vertically and horizontally.

Large title:

# Scale of Existence

Below:

**A journey through the sizes of reality — from the smallest scales to you.**

Maximum two lines.

Below that:

A simple text:

**Scroll to begin**

And a minimal mouse/arrow animation.

No large CTA button is required.

Scrolling itself begins the experience.

---

# 13. Homepage Background

Keep it mostly empty.

Use only several very soft decorative CSS shapes:

- Small dots
- Tiny stars
- One or two curved pastel shapes
- A very subtle flowing line

Do NOT place:

- Earth
- Galaxies
- Humans
- Ants
- Cells
- Multiple science illustrations
- A collage of future objects

The homepage should create curiosity rather than reveal the entire journey.

---

# 14. Homepage → Journey Transition

After approximately one viewport of scrolling:

The homepage content:

- Moves upward
- Slightly fades
- Scale wordmark disappears
- Background becomes the journey canvas

The first object enters.

There should NOT be:

- Page reload
- Hard section jump
- Button click
- Navigation change

It should feel like one continuous world.

---

# 15. Journey Screen Layout

Once the journey begins, there is NO navigation bar.

The entire screen is the experience.

---

## Top Left

Small category text when useful:

`THEORETICAL SCALE`

or

`PARTICLE SCALE`

or

`MICROSCOPIC LIFE`

etc.

Very subtle.

---

## Top Right

Small stage counter:

`01 / 35`

This is information, not navigation.

---

## Center

Current object.

Below object:

### Object Name

Example:

**Proton**

Below:

`≈ 1.7 × 10⁻¹⁵ m`

Below:

One sentence maximum.

Example:

`A particle found inside atomic nuclei.`

Maximum description width:

480 px.

---

# 16. Previous Object

Previous object exists left of the current object.

Position target:

approximately `10–18vw` from the left edge.

It can:

- Become microscopic
- Become partially visible
- Become completely invisible

Do not add its name.

Do not add “Previous”.

Do not place an arrow.

Do not place a card.

If it is too small to see, only the subtle locator dot may remain.

---

# 17. Next Object

Next object exists toward the right.

Target world position:

approximately `80–95vw` relative to the current camera before zoom.

Its actual visible size depends entirely on the relative scale.

It may be:

- Tiny
- Fully visible
- Partially visible
- Mostly outside the viewport
- So enormous that only a curved edge is visible

Do not write its name.

The user discovers what it is after scrolling to it.

This creates curiosity.

---

# 18. The Scale Ribbon

A single thin line passes through the journey.

This is NOT a glowing futuristic line.

Style:

- 1.5–2 px
- Soft indigo / grey
- Slightly imperfect curve
- Very low visual weight

It can gently bend around objects.

It visually connects:

previous → current → next

The ribbon should resemble a hand-drawn path through the scale journey.

The ribbon may be generated entirely using SVG/CSS.

No image asset required.

---

# 19. Scroll Motion

Every object transition has four phases.

## Phase A — Rest

Current object centered.

Previous on left.

Next on right.

Text visible.

---

## Phase B — Start Scroll

Current description fades.

Entire world begins moving left.

Camera begins changing scale.

---

## Phase C — Transformation

Current object:

- Moves toward left
- Changes apparent size according to relative scale

Next object:

- Moves toward center
- Changes apparent size accordingly

Ribbon moves with the world.

---

## Phase D — New Rest

Next object reaches center.

Its object name, scale and description fade in.

Stage counter updates.

---

# 20. Animation Feel

Motion must be:

- Smooth
- Slow enough to understand
- Slightly eased
- Never bouncy
- Never flashy

Recommended easing:

`cubic-bezier(0.22, 1, 0.36, 1)`

Use transforms rather than continuously modifying layout properties.

Animations should preferably use:

- `transform`
- `opacity`

---

# 21. Scroll Distance

Each stage should require approximately:

`100–140vh`

of vertical scroll distance.

Objects with extreme scale jumps may use:

`160–220vh`

This allows the zoom to communicate how enormous the difference is.

Do not make every object transition the same speed.

Large scale jumps should physically feel longer.

---

# 22. Background Evolution

The background remains simple throughout.

It gradually changes extremely subtly depending on the scale category.

## Fundamental / particle

Almost white with faint violet.

## Atomic / molecular

Warm cream with tiny soft dots.

## Cellular

Slight mint tint.

## Microscopic creatures

Very pale blue/green.

## Visible creatures

Warm natural cream.

## Human

Clean neutral warm background.

These changes should be subtle enough that users may not consciously notice them.

---

# 23. Progress

Do NOT add a large timeline.

Do NOT add navigation buttons.

Do NOT add “Previous / Next”.

At the very bottom center:

35 extremely small dots may be used.

Default:

2–3 px.

Current stage:

5 px.

Completed stages:

slightly darker.

Future stages:

very faint.

These dots are visual progress only.

They are not clickable.

---

# 24. Human Stage — Item 35

Human is the emotional ending of Part One.

The human illustration should enter gradually from the right.

When it becomes current:

- Full illustrated human visible
- Approximately 55–65% viewport height
- Plenty of empty space
- Background becomes especially clean

Title:

# Human

Scale:

`≈ 1.7 m`

Description:

`After travelling across more than thirty orders of scale, you have reached your own size.`

Do not immediately show the next journey.

Allow the user to remain here.

---

# 25. Completion Transition

After another deliberate scroll following Human:

Human slowly becomes slightly smaller.

Text fades.

A completion message appears.

# You made it here.

Below:

`35 scales explored.`

Then below that appears the locked-next-journey area.

---

# 26. Next Journey Unlock

Before completing all 35 stages, the next journey must remain inaccessible.

The user should not be able to skip directly to it.

Once Stage 35 is reached and its completion scroll finishes:

The card visually changes from locked → unlocked.

Animation:

1. Small closed lock icon
2. Line draws around card
3. Lock gently opens
4. Card becomes slightly brighter
5. Button appears

No confetti.

No gaming-style reward animation.

---

## Next Journey Card

Small text:

**NEXT JOURNEY**

Large title:

# Beyond You

Description:

`Continue outward — from the human scale to planets, stars, galaxies, and the observable universe.`

Button:

**Continue outward →**

Use the same Human illustration from Item 35 at the left side of the card.

Do NOT generate another human image.

---

# 27. Returning Visitor Behavior

Store completion in:

`localStorage`

Example:

`scaleJourneyPart1Complete = true`

If the user has completed the journey previously:

Homepage may show a tiny secondary text beneath “Scroll to begin”:

`Continue outward →`

Do not replace the original experience.

---

# 28. Mobile Design

Mobile should preserve the same concept.

Current object:

center.

Previous:

mostly outside left edge.

Next:

mostly outside right edge.

Because the viewport is narrow, showing only fragments is acceptable.

Current name and scale appear below object.

Description can move toward the bottom.

Stage counter remains top-right.

Do not turn it into cards or vertical lists.

---

# 29. Accessibility

Respect:

`prefers-reduced-motion`

When enabled:

- Reduce zoom animation
- Reduce parallax
- Use quicker fades
- Maintain the same sequence

All text must remain selectable HTML text.

Do not put descriptions inside images.

Every object image requires useful alt text.

---

# 30. Desktop Reference Layout

Design reference viewport:

`1440 × 900`

Journey visual area:

100vw × 100vh.

Suggested placement:

Current object center:
`x: 50vw`

Previous world anchor:
`x: 12vw`

Next world anchor:
`x: 88vw`

These are starting anchors only.

Actual transforms change continuously while scrolling.

---

# 31. HTML Structure

Recommended structure:

`index.html`

Main sections:

- `landing`
- `journey`
- `completion`

Inside journey:

- sticky viewport
- world
- scale ribbon
- object layers
- current information layer
- stage counter
- progress indicator

Do not create 35 completely separate visual webpages.

Use one sticky journey viewport and change the world/camera state through JavaScript.

---

# 32. File Structure

`/index.html`

`/css/styles.css`

`/js/app.js`

`/js/scale-data.js`

`/assets/items/`

`/assets/meta/`

Suggested item naming:

`01-string.webp`

`02-quark.webp`

...

`35-human.webp`

---

# 33. Image Technical Specification

Every scale-item illustration:

Canvas:

`2048 × 2048`

Preferred master:

PNG with transparency.

Production web version:

WebP with transparency.

Keep meaningful transparent margin around subjects:

approximately 8–12%.

No text inside any asset.

No background.

Do not bake shadows into the empty canvas.

---

# 34. The 35 Required Main Illustrations

## 01 — Fundamental String

Filename:

`01-string.webp`

Visual:

Single flexible closed or partially closed string-like filament.

Simple, elegant curve.

Soft violet / coral.

No futuristic glow.

No particle explosion.

---

## 02 — Quark

Filename:

`02-quark.webp`

Visual:

Extremely simple point-like particle visualization.

Tiny central point with a soft decorative color aura.

Do not create a physical sphere.

No internal structure.

---

## 03 — Electron

Filename:

`03-electron.webp`

Visual:

Tiny central point with a gentle fuzzy probability-like surrounding cloud.

Blue/cyan family.

Do NOT create an atom.

Do NOT use planetary electron orbit imagery.

---

## 04 — Proton

Filename:

`04-proton.webp`

Visual:

Friendly scientific illustration showing three internal quark regions conceptually.

Rounded composite appearance.

Do not make it a glass sci-fi sphere.

---

## 05 — Atomic Nucleus

Filename:

`05-atomic-nucleus.webp`

Visual:

One clear nucleus consisting of clustered protons/neutrons.

Use only one nucleus example.

No second nucleus stage later.

---

## 06 — Hydrogen Atom

Filename:

`06-hydrogen-atom.webp`

Visual:

Modern simplified educational visualization of hydrogen.

Central proton plus soft electron probability cloud.

Avoid classical hard orbit rings where possible.

---

## 07 — Water Molecule

Filename:

`07-water-molecule.webp`

Visual:

Recognizable H₂O geometry.

One oxygen, two hydrogen atoms.

Simple ball-and-stick/cartoon science style.

---

## 08 — Hemoglobin Protein

Filename:

`08-hemoglobin.webp`

Visual:

Simplified folded protein structure.

Recognizably biological.

Not an incomprehensible spaghetti render.

Use a clear chunky ribbon-like cartoon form.

---

## 09 — Ribosome

Filename:

`09-ribosome.webp`

Visual:

Two recognizable ribosomal subunits.

Friendly cellular illustration.

No surrounding cell.

---

## 10 — Bacteriophage

Filename:

`10-bacteriophage.webp`

Visual:

Classic bacteriophage structure.

Head, tail and leg-like fibers.

This should feel visually very different from the previous items.

---

## 11 — Mycoplasma

Filename:

`11-mycoplasma.webp`

Visual:

Tiny irregular/simple bacterial organism.

Soft cellular membrane.

No flagella unless appropriate to selected species representation.

---

## 12 — Mitochondrion

Filename:

`12-mitochondrion.webp`

Visual:

Single mitochondrion.

Cutaway-like appearance.

Visible folded inner membrane.

Friendly textbook-cartoon style.

---

## 13 — E. coli

Filename:

`13-e-coli.webp`

Visual:

Single rod-shaped bacterium.

Several simple flagella.

No colony.

---

## 14 — Yeast Cell

Filename:

`14-yeast.webp`

Visual:

Single round/oval budding yeast cell.

One visible budding structure.

---

## 15 — Red Blood Cell

Filename:

`15-red-blood-cell.webp`

Visual:

Single biconcave red blood cell.

Three-quarter angle.

Clean red/coral illustration.

---

## 16 — Human Sperm Cell

Filename:

`16-sperm-cell.webp`

Visual:

Single sperm cell.

Clear head, midpiece and long tail.

Neutral scientific illustration.

---

## 17 — Paramecium

Filename:

`17-paramecium.webp`

Visual:

Single slipper-shaped paramecium.

Visible fine cilia.

Several simplified internal structures.

---

## 18 — Rotifer

Filename:

`18-rotifer.webp`

Visual:

A recognizable rotifer.

Corona/ciliated head clearly visible.

Transparent-ish body styling permitted.

---

## 19 — Tardigrade

Filename:

`19-tardigrade.webp`

Visual:

Side/three-quarter profile.

Four pairs of legs.

Cute but scientifically recognizable.

Do not add facial expressions.

---

## 20 — C. elegans Roundworm

Filename:

`20-c-elegans.webp`

Visual:

Single thin curved roundworm.

Slight translucent biological illustration.

Keep silhouette clearly readable.

---

## 21 — Daphnia / Water Flea

Filename:

`21-daphnia.webp`

Visual:

Side profile.

Recognizable large eye and transparent crustacean body.

---

## 22 — Fruit Fly

Filename:

`22-fruit-fly.webp`

Visual:

Side/three-quarter profile.

Wings open enough to read silhouette.

Simple biological cartoon rendering.

---

## 23 — Ant

Filename:

`23-ant.webp`

Visual:

Side profile.

Clear head, thorax, abdomen and six legs.

---

## 24 — Ladybird Beetle

Filename:

`24-ladybird.webp`

Visual:

Three-quarter profile.

Recognizable red/orange shell with dark spots.

---

## 25 — Honey Bee

Filename:

`25-honey-bee.webp`

Visual:

Side/three-quarter profile.

Natural yellow/brown/black pattern.

Transparent wings.

---

## 26 — House Cricket

Filename:

`26-house-cricket.webp`

Visual:

Side profile.

Large rear legs clearly visible.

---

## 27 — Garden Snail

Filename:

`27-garden-snail.webp`

Visual:

Side/three-quarter profile.

Clearly visible spiral shell.

Simple natural earth colors.

---

## 28 — Bee Hummingbird

Filename:

`28-bee-hummingbird.webp`

Visual:

Side profile or gentle hovering pose.

Wings visible.

No flowers or background.

---

## 29 — Small Mouse

Filename:

`29-small-mouse.webp`

Visual:

Side/three-quarter standing mouse.

Natural proportions.

Tail visible.

No accessories.

---

## 30 — House Sparrow

Filename:

`30-house-sparrow.webp`

Visual:

Simple side profile.

Standing pose.

Recognizable sparrow proportions and markings.

---

## 31 — Human Hand

Filename:

`31-human-hand.webp`

Visual:

Open relaxed human hand.

Palm slightly angled toward viewer.

Neutral skin tone suitable for a universal educational illustration.

No sleeve required.

---

## 32 — Rock Cavy

Filename:

`32-rock-cavy.webp`

Visual:

Side/three-quarter profile.

Natural standing pose.

No environment.

---

## 33 — Red Panda

Filename:

`33-red-panda.webp`

Visual:

Standing or neutral walking side profile.

Tail clearly visible.

No branch or tree.

---

## 34 — Beaver

Filename:

`34-beaver.webp`

Visual:

Natural side/three-quarter pose.

Large flat tail clearly visible.

No water/background.

---

## 35 — Human

Filename:

`35-human.webp`

Visual:

One full-body adult human.

Neutral relaxed standing pose.

Slight three-quarter angle.

Simple casual clothing.

Friendly universal illustrated style.

No dramatic pose.

No backpack.

No phone.

No background.

This exact image is reused in the completion/unlock screen.

---

# 35. Additional Required Visual Assets

Only TWO additional exported assets are required.

Everything else should be HTML/CSS/SVG generated.

---

## 36 — Favicon / App Icon

Filename:

`scale-icon.png`

Size:

`512 × 512`

Design:

Simple curved scale ribbon with one small dot.

Warm off-white background.

Indigo line.

No letters.

---

## 37 — Social Sharing Image

Filename:

`og-scale-of-existence.webp`

Size:

`1200 × 630`

Design:

Warm off-white background.

Title:

**Scale of Existence**

Small subtitle:

`From the smallest scales to you.`

One simple curved ribbon moving from tiny dot → human silhouette.

No collage.

---

# 36. Images That Must NOT Be Created

Do not create separate images for:

- Homepage background
- Clouds
- Stars
- Ribbon
- Progress dots
- Scroll mouse
- Arrows
- Lock
- Unlock icon
- Stage counter
- Buttons
- Cards
- Background textures
- Previous/next indicators

Create these using CSS or inline SVG.

Therefore the total required exported image assets are:

**37**

35 journey illustrations  
+ 1 favicon  
+ 1 social preview image

---

# 37. Current Information Layout

Current object information should appear beneath the object.

Example:

**Tardigrade**

`≈ 0.5 mm`

`A microscopic animal with eight short legs.`

Maximum:

- Object name: one line
- Scale: one line
- Description: one short sentence

No paragraphs.

---

# 38. Hover Behavior

The core experience should not depend on hover.

Desktop may use subtle hover behavior for the completion button only.

Objects themselves should not become clickable.

No tooltips during the first version.

---

# 39. Sound

No sound should autoplay.

First version should contain no sound requirement.

The design must work completely silently.

---

# 40. Non-Negotiable Rules

1. No navigation bar during the journey.
2. No futuristic UI.
3. No glass panels.
4. No object cards around previous/current/next.
5. Only current object's name is visible.
6. Previous and next objects remain visual only.
7. Relative scale must not be faked for convenience.
8. Huge next objects are allowed to be mostly off-screen.
9. Tiny previous objects are allowed to disappear.
10. Camera zoom communicates the scale difference.
11. All item illustrations use one consistent cartoon educational style.
12. Homepage stays extremely simple.
13. No collage on homepage.
14. Vertical scrolling controls the experience.
15. The journey itself feels horizontally directional.
16. User must complete all 35 stages before Part Two unlocks.
17. Human is the emotional ending of Part One.
18. Next journey uses the same visual language.

---

# 41. Desired Feeling

The website should make a user repeatedly think:

**“Wait… THAT is how much bigger it is?”**

The visual scale difference is more important than text.

The best stages should require almost no explanation.

Examples:

A previous object disappearing into a microscopic dot.

A future object appearing only as a giant curved wall on the right.

A tiny creature gradually becoming a recognizable animal.

Finally reaching the human body after beginning near the theoretical smallest scale.

That feeling is the core product.
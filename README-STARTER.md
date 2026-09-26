# Scale of Existence — Starter Implementation

Copy these four files into the repository root:

- `index.html`
- `styles.css`
- `scale-data.js`
- `app.js`

The code references the PNG files already in the repository root, so do not move or rename the 35 generated images yet.

## Run locally

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Already implemented

- minimal landing page
- vertical scroll / horizontal visual progression
- all 35 stages
- previous/current/next world layout
- symbolic String/Quark/Electron handling
- literal scale math from Proton onward
- logarithmic scale interpolation
- giant-object edge peeking
- sub-pixel previous-object locator
- stage counter and progress dots
- Human ending
- Beyond You unlock state
- localStorage persistence
- mobile layout
- reduced-motion CSS

## Next refinement after the first browser test

Because generated transparent PNGs often contain different transparent margins, calibrate each image with subject-bound metadata after visually testing this version. Do not compensate by changing scientific sizes.

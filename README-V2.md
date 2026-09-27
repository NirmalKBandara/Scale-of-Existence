# Scale of Existence — V2 Replacement

Replace these four files in the existing repository:

- `index.html`
- `css/styles.css`
- `js/scale-data.js`
- `js/app.js`

Do not move or rename the existing image assets.

## Main behavior changes

- One deliberate wheel/trackpad gesture = exactly one scale stage.
- One mobile swipe = exactly one scale stage.
- Current object occupies the central viewing area.
- Previous/next objects are constrained to edge peeks.
- Literal stages from Proton onward use representative linear-size ratios.
- String/Quark/Electron transitions remain explicitly symbolic because quarks and electrons do not have measured physical diameters.
- Huge upcoming objects show only ~5% of the viewport as an edge fragment.
- Tiny previous objects disappear into a locator dot.
- PNG transparent padding is measured automatically in the browser using alpha bounds.
- Images are cached and progressively preloaded to prevent repeated/stale-image flashes.
- Locked "Beyond You" card removed.
- Replay button removed.
- Completion page now lets the user choose any of the 35 stages to revisit.
- Mobile side-object overlap is prevented by edge placement.

## Test locally

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

Hard-refresh after replacing files.

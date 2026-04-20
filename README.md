<p align="center">
  <img src="media/Marquee_Tile_(1400x560).png" alt="Vibe Code Detector" width="100%">
</p>

<br>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="https://chromewebstore.google.com/detail/vibe-code-detector/pfnebgaajbopnhipbigfldmdjpaemgcg"><img src="https://img.shields.io/badge/Chrome%20Web%20Store-Install-4285F4?logo=googlechrome&logoColor=white" alt="Chrome Web Store"></a>
  <a href="https://github.com/paladini/vibe-code-detector/releases"><img src="https://img.shields.io/github/v/release/paladini/vibe-code-detector?color=blue" alt="Latest Release"></a>
  <a href="https://developer.chrome.com/docs/extensions/mv3/intro/"><img src="https://img.shields.io/badge/Chrome-Manifest%20V3-4285F4?logo=googlechrome&logoColor=white" alt="Manifest V3"></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
</p>

---

**Vibe Code Detector** is an open-source browser extension that performs forensic analysis on any webpage to detect the AI tools, IDEs, and platforms used to build it. In the age of "Vibe Coding", every AI tool leaves a unique signature — this extension reads it.

## What it detects

### AI IDEs & Agents
Signatures from **Cursor**, **Windsurf**, **Trae**, **Replit Agent**, **Devin**, and **Claude Code**.

### Generation Platforms
Markers from **v0.dev**, **Lovable.dev**, **Bolt.new**, **Stackblitz**, and **Google AI Studio**.

### Structural Heuristics
- **Tailwind Density** — high utility class ratio per element is a strong prompt-based styling indicator
- **Shadcn/Radix DNA** — `data-radix-*` attributes combined with standard Shadcn CSS variables
- **Lucide Iconography** — the default icon library for almost every AI code generator
- **Placeholder Patterns** — generic texts and layouts left behind by AI prompts

## Installation

### For users (recommended)

1. Install directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/vibe-code-detector/pfnebgaajbopnhipbigfldmdjpaemgcg).

### Alternative (manual install from GitHub release)

1. Download the latest `.zip` from the [Releases](https://github.com/paladini/vibe-code-detector/releases) page.
2. Unzip the file.
3. In Chrome, go to `chrome://extensions/` and enable **Developer Mode**.
4. Click **Load unpacked** and select the unzipped folder.

### From source

```bash
git clone https://github.com/paladini/vibe-code-detector.git
cd vibe-code-detector
npm install
npm run build
```

Then load the `extension/` folder in Chrome as described above.

## How it works

The detector runs a multi-layer heuristic scan on the active tab:

1. **Utility Density** — calculates the ratio of Tailwind classes per DOM element
2. **Component Fingerprinting** — identifies specific Radix/Shadcn attribute patterns
3. **IDE Signatures** — scans for internal markers like `__cursor` or AI-generated comment blocks
4. **Platform Metadata** — checks for generator tags and deployment-specific signatures

The final score is a weighted sum across all heuristics, producing a confidence verdict: **Human**, **Likely AI**, or **Almost Certainly AI**.

## Architecture

| File | Purpose |
|------|---------|
| `src/lib/vibe-detector.ts` | Single source of truth for all heuristics and scoring logic |
| `extension/content.js` | Plain-JS mirror of the detection logic (no ES module imports) |
| `src/components/VibePopup.tsx` | Extension popup UI — contains no inline heuristic logic |

> `extension/content.js` must always be kept in sync with `src/lib/vibe-detector.ts`.

## Development

```bash
npm run dev      # Start Vite dev server (App preview)
npm run build    # Build the Chrome extension into extension/
npm run lint     # Run ESLint
```

CI runs on every push via GitHub Actions. Releases can be published by:

- bumping `extension/manifest.json` and `package.json` versions on `main` (the workflow automatically creates/updates the matching `vX.Y.Z` GitHub release),
- pushing a version tag (`v*.*.*`), or
- manually triggering the **Release Extension** workflow with an optional version input.

Published GitHub releases include the packaged extension zip and checksum, while the recommended user install path remains the Chrome Web Store listing:

- Chrome Web Store: https://chromewebstore.google.com/detail/vibe-code-detector/pfnebgaajbopnhipbigfldmdjpaemgcg

```bash
git tag v1.0.1
git push origin v1.0.1
```

## Contributing

New AI tools appear every week. Contributions to keep heuristics current are very welcome:

- **New heuristics** — found a new tool's signature? Open a PR with examples.
- **Scoring refinements** — help balance weights for better accuracy.
- **UI improvements** — enhance the forensic aesthetic.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

## License

Distributed under the [MIT License](./LICENSE).

---

<p align="center">
  Built by <a href="https://github.com/paladini">Fernando Paladini</a> · For a more transparent web.
</p>
